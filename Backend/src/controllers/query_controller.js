import { retrieveRelevantChunks } from '../retrieval/retriever.js';
import { generateAnswer } from '../services/llm.js';

export async function answerQuery(req, res, next) {
  try {
    const { query } = req.body;

    const chunks = await retrieveRelevantChunks(query);
    const context = chunks.map(c => c.text_chunk).join('\n');

    const answer = await generateAnswer(context, query);

    res.json({ answer });
  } catch (err) {
    next(err);
  }
}
