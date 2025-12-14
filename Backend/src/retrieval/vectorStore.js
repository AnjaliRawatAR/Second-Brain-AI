const vectors = [];

export function addVector(id, embedding, metadata) {
  vectors.push({ id, embedding, metadata });
}

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

export function searchVectors(queryEmbedding, topK = 5) {
  return vectors
    .map(v => ({
      ...v,
      score: cosineSimilarity(queryEmbedding, v.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
