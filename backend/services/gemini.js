import { GEMINI_MODEL, GEMINI_API_URL, getSymptomAnalysisPrompt } from '../utils/prompts.js';

export const analyzeSymptoms = async (symptoms, apiKey) => {
  const prompt = getSymptomAnalysisPrompt(symptoms);
  
  const response = await fetch(
    `${GEMINI_API_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || 'Gemini API error');
  }

  const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textResponse) {
    throw new Error('No response from API');
  }

  const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
  
  if (!jsonMatch) {
    throw new Error('Failed to parse response');
  }

  return JSON.parse(jsonMatch[0]);
};
