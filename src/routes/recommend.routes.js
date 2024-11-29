import express from "express";
import recommendController from "../controllers/recommend.controller.js";

const router = express.Router();

// 추천 API
router.post("/:reviewId/recommend", recommendController.recommendReview);

export default router;
