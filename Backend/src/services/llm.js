import axios from "axios";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export async function generateAnswer(context, query) {
  const prompt = `
Answer the user's question using ONLY the context below.

Context:
${context}

Question:
${query}
`;

  const response = await axios.post(
    `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }]
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}
