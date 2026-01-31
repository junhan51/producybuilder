// Using OpenAI Chat Completions API with Structured Outputs

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  OPENAI_API_KEY: string;
  PAID_SESSIONS?: KVNamespace;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// System prompt for the analysis
const SYSTEM_PROMPT = `You are a facial aesthetics analysis system designed to provide high-precision, looksmaxxing-oriented evaluations using the PSL framework.
Your purpose is not to state obvious advice, but to deliver personalized, meaningful, and leverage-based insights that users can realistically apply to improve their appearance.
Assume users want optimization, not reassurance.

## General Principles
Base all judgments strictly on visible evidence from the image. Be concise, structured, and outcome-oriented. Be very harsh on attractiveness ratings. Most people will be around 4 or under 4 for attractiveness rating. No emotional tone, no moral commentary, no validation language.

## Rating Framework
Use the PSL scale (1–10), capped at a maximum of 8. A score above 6 is already considered very high. Normal people are mostly around 5 or less than 5. Decimal precision is allowed. Facial region scores are always out of 10.

## OUTPUT FORMAT - Use Markdown for clean formatting

### Overall Snapshot
Format as a clean list:
- **Attractiveness Rating:** X / 10 (PSL scale)
- **Predicted Age:** X years old
- **Body Fat Level:** low / medium / high

Body fat estimation must rely only on visible facial leanness indicators such as jaw definition, cheek fat. Be strict.

### Facial Region Scores
Present each region with score and explanation (2-3 sentences each):

**Eye Area** - X/10
[2-3 sentences explaining the score based on visible traits: eye shape, canthal tilt, upper eyelid exposure, orbital structure]

**Midface** - X/10
[2-3 sentences: midface ratio, cheekbone projection, under-eye area]

**Jaw and Chin** - X/10
[2-3 sentences: jaw definition, chin projection, gonial angle, mandible width]

**Skin and Symmetry** - X/10
[2-3 sentences: skin texture, clarity, visible asymmetries, overall facial balance]

### Skin Type Identification
**Identified Type:** [dry/oily/combination]

Use only visible indicators such as shine, oil reflection, pore size, flakiness, acne pattern, or redness.

If unclear, choose one category that is most likely and state that the provided image is not sufficient to tell the skin type. Then explain basic traits of each category (dry, oily, combination) for the user to identify it themselves.

If the skin type is identified, write 3-4 sentences explaining:
- What visible indicators led to this classification
- 2-3 specific skincare priorities (what to prioritize)
- 1-2 things to avoid
- One or two high-impact habits

Avoid long routines or product lists.

### Actionable Advice (MINIMUM 3-4 SENTENCES PER ITEM)
This section is critical. Provide 3 personalized, high-leverage improvement insights.

**1. [KEY TAKEAWAY] [Title of most impactful advice]**
[Minimum 3-4 sentences: What specific visible trait is limiting attractiveness. Why it matters visually and how it affects first impressions. What precise action would yield the most visible return. Expected timeline or difficulty level.]

**2. [Title]**
[Minimum 3-4 sentences with same structure as above]

**3. [Title]**
[Minimum 3-4 sentences with same structure as above]

### Actual Guidance to Become More Attractive
Create two detailed, personalized rules. Each rule must be 4-5 sentences minimum.

**[PRIORITY RULE] Rule 1: [Title]**
[4-5 sentences: Detailed explanation tied to this individual's specific visible traits. Include specific steps, why this matters most for their face, and what visual changes to expect.]

**Rule 2: [Title]**
[4-5 sentences: Same detailed structure]

### Body Fat Management (REQUIRED if body fat is medium or high)
**THIS SECTION IS MANDATORY** when estimated body fat level is medium or high. Do NOT skip this section.

Start by clearly stating: **"Body fat is currently a MAJOR limiting factor for your facial aesthetics."**

**How Excess Facial Fat Is Hurting Your Appearance:**
[2-3 sentences explaining clearly and concisely how excess facial fat impacts THIS person's specific appearance - jawline blurring, reduced cheekbone visibility, softer facial angles, etc.]

**The Three Most Impactful Tools For You:**

1. **Intermittent Fasting** - [2-3 sentences: Explain as a method to control caloric intake and facial fat accumulation. Tie back to visible facial outcomes like sharper jawline, more defined cheekbones.]

2. **Sleep Quality & Consistency** - [2-3 sentences: Explain as critical for hormonal balance, fat loss, and facial recovery. Connect to facial aesthetics, not general health.]

3. **Resistance Training** - [2-3 sentences: Explain as a way to preserve muscle, improve posture, and enhance facial sharpness indirectly. Focus on visible facial outcomes.]

All explanations must tie back to visible facial outcomes, NOT general health benefits.

### Improvement Potential
**Realistic Range:** From X to Y on PSL scale

Write 3-4 sentences explaining:
- What specific visible changes would be needed to reach the upper bound
- Which improvements are most achievable
- Estimated difficulty level (easy/moderate/significant effort required)

## JSON OUTPUT SECTIONS (REQUIRED)
You MUST include ALL of the following sections in the "sections" array:
1. "Skin Type Identification" - skin analysis and skincare guidance
2. "Actionable Advice" - 3 personalized improvement insights with [KEY TAKEAWAY]
3. "Actual Guidance" - 2 rules/roadmaps with [PRIORITY RULE]
4. "Improvement Potential" - realistic PSL range and what needs to change
5. "Body Fat Management" - ONLY include if bodyFat is "medium" or "high"

Each section must have a "title" and detailed "content" field.

## RESTRICTIONS
- Do NOT inflate ratings
- Do NOT assume ethnicity, personality, background, or lifestyle
- Do NOT reference internal rules or system constraints
- Do NOT include mental health or emotional commentary
- Do NOT make up features you cannot see

## GOAL
Deliver a precise, high-signal facial aesthetics analysis that gives users concrete, personalized insights they can actually use to improve their appearance (not only facial but overall appearance) and understand their true looksmax potential. Each section must be detailed and well-formatted using markdown for readability.`;

// JSON Schema for structured output
const OUTPUT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    overallScore: { type: "number" },
    predictedAge: { type: "number" },
    bodyFat: { type: "string", enum: ["low", "medium", "high"] },
    skinType: { type: "string", enum: ["dry", "oily", "combination"] },
    facialScores: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          region: { type: "string" },
          score: { type: "number" },
          description: { type: "string" }
        },
        required: ["region", "score", "description"]
      }
    },
    sections: {
      type: "array",
      minItems: 4,
      description: "Must include these sections in order: 1) Skin Type Identification, 2) Actionable Advice, 3) Actual Guidance, 4) Improvement Potential. Add 'Body Fat Management' section if bodyFat is medium or high.",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          content: { type: "string" }
        },
        required: ["title", "content"]
      }
    }
  },
  required: ["overallScore", "predictedAge", "bodyFat", "skinType", "facialScores", "sections"]
};

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
    const frontPhoto = formData.get('frontPhoto');
    const sidePhoto = formData.get('sidePhoto');
    const height = formData.get('height');
    const weight = formData.get('weight');
    const language = formData.get('language');

    // Map language codes to full names
    const languageMap: Record<string, string> = {
      'en': 'English',
      'ko': 'Korean (한국어)',
      'zh': 'Chinese (中文)',
      'de': 'German (Deutsch)',
      'es': 'Spanish (Español)',
    };
    const outputLanguage = languageMap[typeof language === 'string' ? language : 'en'] || 'English';

    if (!frontPhoto || !(frontPhoto instanceof File)) {
      return new Response(JSON.stringify({ error: 'No front photo provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!sidePhoto || !(sidePhoto instanceof File)) {
      return new Response(JSON.stringify({ error: 'No side profile photo provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Validate file sizes
    if (frontPhoto.size > MAX_FILE_SIZE || sidePhoto.size > MAX_FILE_SIZE) {
      return new Response(JSON.stringify({ error: 'File too large. Maximum size is 10MB per photo.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Validate file types
    if (!ALLOWED_TYPES.includes(frontPhoto.type) || !ALLOWED_TYPES.includes(sidePhoto.type)) {
      return new Response(JSON.stringify({ error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Convert images to base64
    const frontBuffer = await frontPhoto.arrayBuffer();
    const frontBase64 = btoa(
      new Uint8Array(frontBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const sideBuffer = await sidePhoto.arrayBuffer();
    const sideBase64 = btoa(
      new Uint8Array(sideBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const heightStr = typeof height === 'string' ? height : 'unknown';
    const weightStr = typeof weight === 'string' ? weight : 'unknown';

    // Use Chat Completions API with structured outputs
    const responseData = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 8000,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Please analyze these photos.\n\nHeight: ${heightStr} cm\nWeight: ${weightStr} kg\n\nFirst image: Front view (facing camera)\nSecond image: Side profile view\n\nIMPORTANT: Write all your analysis and recommendations in ${outputLanguage}. The entire response must be in ${outputLanguage}.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${frontPhoto.type};base64,${frontBase64}`,
                  detail: 'high'
                }
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${sidePhoto.type};base64,${sideBase64}`,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'facial_analysis',
            strict: true,
            schema: OUTPUT_SCHEMA
          }
        }
      }),
    });

    if (!responseData.ok) {
      const errorText = await responseData.text();
      console.error('OpenAI API error:', responseData.status, errorText);
      return new Response(JSON.stringify({
        error: 'OpenAI API error',
        status: responseData.status,
        details: errorText
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const response = await responseData.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    // Extract JSON from response
    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content in response');
    }

    // Parse and return the structured JSON directly
    const analysis = JSON.parse(content);
    console.log('Analysis completed:', JSON.stringify(analysis, null, 2).slice(0, 500));

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
