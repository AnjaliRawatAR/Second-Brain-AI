import fs from 'fs';
import db from '../db/index.js';
import { chunkText } from '../utils/chunker.js';

export async function processDocument(file) {
  const text = fs.readFileSync(file.path, 'utf-8');
  const chunks = chunkText(text);

  for (let i = 0; i < chunks.length; i++) {
    await db.run(
      `INSERT INTO documents (content_type, source, chunk_index, text_chunk)
       VALUES (?, ?, ?, ?)`,
      ['document', file.originalname, i, chunks[i]]
    );
  }
}
