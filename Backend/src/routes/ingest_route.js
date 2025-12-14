import express from 'express';
import multer from 'multer';
import { ingestAudio, ingestDocument } from '../controllers/ingest_controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/audio', upload.single('file'), ingestAudio);
router.post('/document', upload.single('file'), ingestDocument);

export default router;
