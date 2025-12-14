import db from '../db/index.js';
import { chunkText } from '../utils/chunker.js';

// Placeholder for transcription logic
async function transcribeAudio(filePath) {
  return 'Transcribed text from audio file';
}

export async function processAudio(file) {
  const transcript = await transcribeAudio(file.path);
  const chunks = chunkText(transcript);

  for (let i = 0; i < chunks.length; i++) {
    await db.run(
      `INSERT INTO documents (content_type, source, chunk_index, text_chunk)
       VALUES (?, ?, ?, ?)`,
      ['audio', file.originalname, i, chunks[i]]
    );
  }
}
