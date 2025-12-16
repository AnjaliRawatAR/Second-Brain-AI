import express from "express";
import { answerQuery } from "../controllers/query_controller.js";

const router = express.Router();
router.post("/", answerQuery);

export default router;
