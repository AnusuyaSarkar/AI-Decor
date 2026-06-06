const { openai } = require('../config/openai');

const parseStructuredResponse = (text) => {
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (_error) {
    return {
      raw: text,
    };
  }
};

const analyzeRoomDesign = async ({ imageUrl, prompt, model = process.env.OPENAI_MODEL || 'gpt-4o-mini' }) => {
  const response = await openai.responses.create({
    model,
    input: [
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: `You are an interior design expert. Analyze the room image and user prompt. Return strict JSON with keys: decorationSuggestions (array), budgetRecommendation (string), colorPalette (array), furnitureSuggestions (array), summary (string). User prompt: ${prompt}`,
          },
          {
            type: 'input_image',
            image_url: imageUrl,
          },
        ],
      },
    ],
  });

  const parsed = parseStructuredResponse(response.output_text);

  return {
    decorationSuggestions: parsed.decorationSuggestions || [],
    budgetRecommendation: parsed.budgetRecommendation || '',
    colorPalette: parsed.colorPalette || [],
    furnitureSuggestions: parsed.furnitureSuggestions || [],
    summary: parsed.summary || response.output_text || '',
    raw: response.output_text || '',
  };
};

const generateRoomRedesign = async ({ imageUrl, style, prompt, model = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1' }) => {
  const response = await openai.images.generate({
    model,
    prompt: `Generate a high-quality redesigned interior image. Style: ${style}. Room context: ${prompt}. Maintain the room structure while transforming the decor tastefully.`,
    size: '1024x1024',
  });

  const imageData = response.data?.[0] || {};
  const generatedImage = imageData.url || (imageData.b64_json ? `data:image/png;base64,${imageData.b64_json}` : '');

  return {
    generatedImage,
    raw: response,
    sourceImage: imageUrl,
  };
};

module.exports = {
  analyzeRoomDesign,
  generateRoomRedesign,
};