import db from "../db/index.js";
import { generateAnswer } from "../services/llm.js";

export async function answerQuery(req, res) {
  const { query } = req.body;

  db.all("SELECT content FROM documents", async (err, rows) => {
    const context = rows.map(r => r.content).join("\n");

    const answer = await generateAnswer(context, query);

    // Store chat history
    db.run("INSERT INTO chats (role, message) VALUES (?, ?)", ["user", query]);
    db.run("INSERT INTO chats (role, message) VALUES (?, ?)", ["ai", answer]);

    res.json({ answer });
  });
}