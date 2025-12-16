import axios from 'axios';

const EMBEDDING_MODEL = 'text-embedding-3-small';

export async function embedText(text) {
  const response = await axios.post(
    'https://api.openai.com/v1/embeddings',
    {
      model: EMBEDDING_MODEL,
      input: text
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.data[0].embedding;
}