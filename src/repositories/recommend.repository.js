import { pool } from "../../config/db.js";

const recommendReview = async (reviewId) => {
  try {
    // 리뷰 추천 추가
    const [result] = await pool.query(
      "INSERT INTO review_Likes (review_id) VALUES (?);",
      [reviewId]
    );
    return result.insertId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTotalRecommendations = async (reviewId) => {
  try {
    // 총 추천 수 가져오기
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS totalRecommendations FROM review_Likes WHERE review_id = ?;",
      [reviewId]
    );
    return rows[0].totalRecommendations;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
    recommendReview,
  getTotalRecommendations,
};
