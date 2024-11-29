import express from "express";
import { getRatingStats } from "../controllers/lectures.controller.js";

const router = express.Router();

router.get("/:lectureId/rating-stats", getRatingStats);

export default router;
