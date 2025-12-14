import db from '../db/index.js';
import { embedText } from '../services/embedding.js';
import { searchVectors } from './vectorStore.js';

export async function retrieveRelevantChunks(query) {
  const queryEmbedding = await embedText(query);

  const candidates = searchVectors(queryEmbedding);

  const results = [];

  for (const item of candidates) {
    const row = await db.get(
      `SELECT text_chunk, created_at FROM documents WHERE id = ?`,
      item.id
    );
    if (row) results.push(row);
  }

  return results;
}
