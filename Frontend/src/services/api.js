const API_BASE = 'http://localhost:4000/api';

export async function sendQuery(query) {
  const res = await fetch(`${API_BASE}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  if (!res.ok) {
    throw new Error('Failed to fetch response');
  }

  return res.json();
}
