// Polar Checkout API with secure session handling

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  POLAR_ACCESS_TOKEN: string;
  POLAR_PRODUCT_ID: string;
  POLAR_SANDBOX?: string; // "true" for sandbox mode
  APP_URL?: string; // Base URL for redirects (e.g., https://your-app.dev)
  PAID_SESSIONS?: KVNamespace;
}

interface PagesContext {
  request: Request;
  env: Env;
}

interface CheckoutRequest {
  successUrl?: string;
  customerEmail?: string;
}

export async function onRequest(context: PagesContext): Promise<Response> {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const body: CheckoutRequest = await context.request.json().catch(() => ({}));

    // Get the origin for success/cancel URLs
    // Use APP_URL env var if set, otherwise try to get from request headers
    const requestOrigin = context.request.headers.get('origin') ||
                          context.request.headers.get('referer')?.replace(/\/$/, '') ||
                          new URL(context.request.url).origin;
    const origin = context.env.APP_URL || requestOrigin;

    // Create checkout session with Polar API
    // Use POLAR_SANDBOX env var to determine API endpoint
    const isSandbox = context.env.POLAR_SANDBOX === 'true';
    const apiBase = isSandbox
      ? 'https://sandbox-api.polar.sh'
      : 'https://api.polar.sh';

    console.log(`Using Polar API: ${apiBase} (sandbox: ${isSandbox})`);
    console.log(`Product ID: ${context.env.POLAR_PRODUCT_ID}`);
    console.log(`Success URL: ${origin}/result?checkout=success&checkout_id={CHECKOUT_ID}`);

    const checkoutResponse = await fetch(`${apiBase}/v1/checkouts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.POLAR_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: [context.env.POLAR_PRODUCT_ID],
        success_url: body.successUrl || `${origin}/result?checkout=success&checkout_id={CHECKOUT_ID}`,
        ...(body.customerEmail && { customer_email: body.customerEmail }),
      }),
    });

    if (!checkoutResponse.ok) {
      const errorText = await checkoutResponse.text();
      console.error('Polar API error:', checkoutResponse.status, errorText);
      return new Response(JSON.stringify({
        error: 'Failed to create checkout session',
        details: errorText,
        status: checkoutResponse.status
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const checkoutData = await checkoutResponse.json();

    return new Response(JSON.stringify({
      checkoutUrl: checkoutData.url,
      checkoutId: checkoutData.id,
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
