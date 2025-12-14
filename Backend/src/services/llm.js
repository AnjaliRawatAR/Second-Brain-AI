import axios from 'axios';

export async function generateAnswer(context, query) {
  const prompt = `
You are a helpful assistant.
Answer the user's question using ONLY the context below.

Context:
${context}

Question:
${query}
`;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content;
}
