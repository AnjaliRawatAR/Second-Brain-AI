const API_BASE_URL = "http://localhost:4000/api";

/**
 * Send a text-based query to the backend
 * Used when the user asks a normal question
 */
export async function sendQuery(query) {
  const response = await fetch(`${API_BASE_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error("Failed to fetch AI response");
  }

  return response.json();
}

/**
 * Upload a file (audio / document) with optional text
 * This prepares the frontend for multi-modal ingestion
 */
export async function uploadAttachment({ file, text }) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  if (text) {
    formData.append("text", text);
  }

  const response = await fetch(`${API_BASE_URL}/ingest`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  return response.json();
}

// const API_BASE = 'http://localhost:4000/api';

// export async function sendQuery(query) {
//   const res = await fetch(`${API_BASE}/query`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query })
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch response');
//   }

//   return res.json();
// }
