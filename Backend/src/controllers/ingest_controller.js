import { processAudio } from '../services/audio.js';
import { processDocument } from '../services/document.js';

export async function ingestAudio(req, res, next) {
  try {
    await processAudio(req.file);
    res.json({ status: 'Audio ingested successfully' });
  } catch (err) {
    next(err);
  }
}

export async function ingestDocument(req, res, next) {
  try {
    await processDocument(req.file);
    res.json({ status: 'Document ingested successfully' });
  } catch (err) {
    next(err);
  }
}
