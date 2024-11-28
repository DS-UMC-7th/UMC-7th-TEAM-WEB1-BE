import { pool } from "../../config/db.js"; 

// 추천순 리뷰 조회
export const getReviewsByRecommendation = async (lectureId, limit, offset) => {
  const query = `
    SELECT rating, created_at AS date, period AS duration, content AS reviewContent, recommendations
    FROM review
    WHERE lecture_id = ?
    ORDER BY recommendations DESC
    LIMIT ? OFFSET ?
  `;
  const [data] = await pool.query(query, [lectureId, limit, offset]);

  const countQuery = `
    SELECT COUNT(*) AS totalReviews
    FROM review
    WHERE lecture_id = ?
  `;
  const [[{ totalReviews }]] = await pool.query(countQuery, [lectureId]);
  return { data, totalReviews };
};

// 최신순 리뷰 조회
export const getReviewsByLatest = async (lectureId, limit, offset) => {
  const query = `
    SELECT rating, created_at AS date, period AS duration, content AS reviewContent, recommendations
    FROM review
    WHERE lecture_id = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;
  const [data] = await pool.query(query, [lectureId, limit, offset]);

  const countQuery = `
    SELECT COUNT(*) AS totalReviews
    FROM review
    WHERE lecture_id = ?
  `;
  const [[{ totalReviews }]] = await pool.query(countQuery, [lectureId]);
  return { data, totalReviews };
};
