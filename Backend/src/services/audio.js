import db from "../db/index.js";
async function transcribeAudio(filePath) {
  return "Transcribed text from audio file";
}

export async function processAudio(file) {
  const transcript = await transcribeAudio(file.path);

  db.run(
    "INSERT INTO documents (source, content) VALUES (?, ?)",
    [file.originalname, transcript]
  );
}