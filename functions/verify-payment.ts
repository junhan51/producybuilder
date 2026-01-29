// Verify payment status by checkout ID

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  PAID_SESSIONS: KVNamespace;
}

interface PagesContext {
  request: Request;
  env: Env;
}

export async function onRequest(context: PagesContext): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const { checkoutId } = await context.request.json() as { checkoutId?: string };

    if (!checkoutId) {
      return new Response(JSON.stringify({ verified: false, error: 'Missing checkoutId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Check if payment exists in KV
    if (!context.env.PAID_SESSIONS) {
      // Fallback: If KV not configured, return success for development
      console.warn('PAID_SESSIONS KV not configured');
      return new Response(JSON.stringify({
        verified: true,
        sessionToken: `dev_${checkoutId}`,
        warning: 'KV not configured - development mode',
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const sessionToken = await context.env.PAID_SESSIONS.get(`checkout:${checkoutId}`);

    if (!sessionToken) {
      return new Response(JSON.stringify({ verified: false, error: 'Payment not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Get session data
    const sessionData = await context.env.PAID_SESSIONS.get(sessionToken);

    return new Response(JSON.stringify({
      verified: true,
      sessionToken,
      session: sessionData ? JSON.parse(sessionData) : null,
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    return new Response(JSON.stringify({ verified: false, error: 'Verification failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
