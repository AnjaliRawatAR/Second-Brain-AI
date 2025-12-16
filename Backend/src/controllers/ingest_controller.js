import path from "path";
import { processDocument } from "../services/document.js";
import { processAudio } from "../services/audio.js";

export async function ingestFile(req, res) {
  const file = req.file;
  const ext = path.extname(file.originalname).toLowerCase();

  try {
    if (ext === ".pdf" || ext === ".txt") {
      await processDocument(file);
    } else if (ext === ".mp3" || ext === ".wav") {
      await processAudio(file);
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    res.json({ message: "File ingested successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ingestion failed" });
  }
}