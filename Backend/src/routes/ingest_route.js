import express from "express";
import multer from "multer";
import { ingestFile } from "../controllers/ingest_controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), ingestFile);

export default router;