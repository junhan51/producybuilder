// Using OpenAI Responses API with published prompt

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

// Define the interface for the Cloudflare environment
interface Env {
  OPENAI_API_KEY: string;
  PAID_SESSIONS?: KVNamespace;
}

interface PagesContext {
  request: Request;
  env: Env;
}

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// The onRequest function is the entry point for the Cloudflare Function
export async function onRequest(context: PagesContext): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  try {
    // Verify payment session
    const sessionToken = context.request.headers.get('X-Session-Token');

    if (context.env.PAID_SESSIONS && sessionToken) {
      const sessionData = await context.env.PAID_SESSIONS.get(sessionToken);
      if (!sessionData) {
        return new Response(JSON.stringify({ error: 'Invalid or expired session. Please complete payment.' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Mark session as used (optional: can limit to single use)
      const session = JSON.parse(sessionData);
      session.lastUsed = Date.now();
      await context.env.PAID_SESSIONS.put(sessionToken, JSON.stringify(session), {
        expirationTtl: 86400,
      });
    }

    const formData = await context.request.formData();
    const photo = formData.get('photo');
    const height = formData.get('height');
    const weight = formData.get('weight');

    if (!photo || !(photo instanceof File)) {
      return new Response(JSON.stringify({ error: 'No photo provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Validate file size
    if (photo.size > MAX_FILE_SIZE) {
      return new Response(JSON.stringify({ error: 'File too large. Maximum size is 10MB.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(photo.type)) {
      return new Response(JSON.stringify({ error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
    
    // Convert image to base64 (using Web API since Buffer is not available in Cloudflare Workers)
    const imageBuffer = await photo.arrayBuffer();
    const imageBase64 = btoa(
      new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    const heightStr = typeof height === 'string' ? height : 'unknown';
    const weightStr = typeof weight === 'string' ? weight : 'unknown';

    // Use published prompt via OpenAI Responses API
    const responseData = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        prompt: {
          id: 'pmpt_697b414096b8819483ef484e373192530a7e4c31f90652ef',
          version: '1',
        },
        input: [
          {
            role: 'user',
            content: [
              { type: 'input_text', text: `Height: ${heightStr} cm, Weight: ${weightStr} kg` },
              {
                type: 'input_image',
                image_url: `data:${photo.type};base64,${imageBase64}`,
              },
            ],
          },
        ],
      }),
    });

    if (!responseData.ok) {
      const errorText = await responseData.text();
      console.error('OpenAI API error:', errorText);
      throw new Error('Analysis failed');
    }

    const response = await responseData.json() as { output?: Array<{ content?: Array<{ text?: string }> }> };

    // Extract text from Responses API format
    const output = response.output;
    let analysis = 'No analysis could be generated.';
    if (output && output[0]?.content) {
      const textContent = output[0].content.find((c: { type?: string; text?: string }) => c.type === 'output_text' || c.text);
      if (textContent?.text) {
        analysis = textContent.text;
      }
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while processing your request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
