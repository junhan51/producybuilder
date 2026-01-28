import OpenAI from 'openai';

// Define the interface for the Cloudflare environment
interface Env {
  OPENAI_API_KEY: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

// The onRequest function is the entry point for the Cloudflare Function
export async function onRequest(context: PagesContext): Promise<Response> {
  // Only allow POST requests
  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const formData = await context.request.formData();
    const photo = formData.get('photo');
    const height = formData.get('height');
    const weight = formData.get('weight');

    if (!photo || !(photo instanceof File)) {
      return new Response('No photo provided', { status: 400 });
    }
    
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: context.env.OPENAI_API_KEY,
    });

    // Convert image to base64 (using Web API since Buffer is not available in Cloudflare Workers)
    const imageBuffer = await photo.arrayBuffer();
    const imageBase64 = btoa(
      new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    const heightStr = typeof height === 'string' ? height : 'unknown';
    const weightStr = typeof weight === 'string' ? weight : 'unknown';

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: `Please provide a "looksmax" analysis for the person in this image. Their height is ${heightStr} cm and their weight is ${weightStr} kg. Provide advice on potential improvements.` },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const analysis = response.choices[0].message.content ?? 'No analysis could be generated.';

    return new Response(JSON.stringify({ analysis }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(error);
    return new Response('An error occurred while processing your request.', { status: 500 });
  }
};
