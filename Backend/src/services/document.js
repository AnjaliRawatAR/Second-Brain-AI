import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
import db from "../db/index.js";

export async function processDocument(file) {
  let text = "";

  if (file.originalname.endsWith(".pdf")) {
    const data = await pdf(fs.readFileSync(file.path));
    text = data.text;
  } else {
    text = fs.readFileSync(file.path, "utf-8");
  }

  db.run(
    "INSERT INTO documents (source, content) VALUES (?, ?)",
    [file.originalname, text]
  );
}