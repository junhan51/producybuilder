// Polar Webhook Handler
// Verifies payment and stores session tokens

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  POLAR_WEBHOOK_SECRET: string;
  PAID_SESSIONS: KVNamespace;
}

interface PagesContext {
  request: Request;
  env: Env;
}

interface WebhookPayload {
  type: string;
  data: {
    id: string;
    status: string;
    customer_email?: string;
    metadata?: Record<string, string>;
    product_id?: string;
  };
}

// Verify webhook signature from Polar
async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const signatureBytes = hexToBytes(signature);
  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(payload)
  );

  return isValid;
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

// Generate secure session token
function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function onRequest(context: PagesContext): Promise<Response> {
  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const payload = await context.request.text();
    const signature = context.request.headers.get('webhook-signature') ||
                      context.request.headers.get('x-polar-signature') || '';

    // Verify signature if secret is configured
    if (context.env.POLAR_WEBHOOK_SECRET) {
      const isValid = await verifyWebhookSignature(
        payload,
        signature,
        context.env.POLAR_WEBHOOK_SECRET
      );

      if (!isValid) {
        console.error('Invalid webhook signature');
        return new Response('Invalid signature', { status: 401 });
      }
    }

    const event: WebhookPayload = JSON.parse(payload);

    // Handle checkout completed event
    if (event.type === 'checkout.completed' || event.type === 'order.created') {
      const checkoutId = event.data.id;
      const sessionToken = generateSessionToken();

      // Store session token with 24-hour expiry
      if (context.env.PAID_SESSIONS) {
        await context.env.PAID_SESSIONS.put(sessionToken, JSON.stringify({
          checkoutId,
          customerEmail: event.data.customer_email,
          createdAt: Date.now(),
          used: false,
        }), {
          expirationTtl: 86400, // 24 hours
        });

        // Also store by checkout ID for verification
        await context.env.PAID_SESSIONS.put(`checkout:${checkoutId}`, sessionToken, {
          expirationTtl: 86400,
        });
      }

      console.log(`Payment verified for checkout: ${checkoutId}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Webhook processing failed', { status: 500 });
  }
}
