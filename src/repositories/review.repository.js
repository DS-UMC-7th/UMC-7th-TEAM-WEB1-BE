import { pool } from "../../config/db.js";

// 추천순 리뷰 조회
export const getReviewsByRecommendation = async (lectureId, limit, offset) => {
  const query = `
    SELECT r.id AS reviewId, r.rating, r.created_at AS date, r.period AS duration, r.content AS reviewContent,
          (SELECT COUNT(*) FROM review_Likes WHERE review_Likes.review_id = r.id) AS recommendations
    FROM review r
    WHERE r.lecture_id = ?
    ORDER BY recommendations DESC, r.created_at DESC
    LIMIT ? OFFSET ?
  `;

  console.log("실행 쿼리:", query);
  console.log("쿼리 파라미터:", [lectureId, limit, offset]);

  const [data] = await pool.query(query, [lectureId, limit, offset]);

  const countQuery = `
    SELECT COUNT(*) AS totalReviews
    FROM review
    WHERE lecture_id = ?
  `;
  const [[{ totalReviews }]] = await pool.query(countQuery, [lectureId]);
  return { data: data || [], totalReviews: totalReviews || 0 };
};

// 최신순 리뷰 조회
export const getReviewsByLatest = async (lectureId, limit, offset) => {
  const query = `
    SELECT r.id AS reviewId, r.rating, r.created_at AS date, r.period AS duration, r.content AS reviewContent,
          (SELECT COUNT(*) FROM review_Likes WHERE review_Likes.review_id = r.id) AS recommendations
    FROM review r
    WHERE r.lecture_id = ?
    ORDER BY r.created_at DESC
    LIMIT ? OFFSET ?
  `;
  const [data] = await pool.query(query, [lectureId, limit, offset]);

  const countQuery = `
    SELECT COUNT(*) AS totalReviews
    FROM review
    WHERE lecture_id = ?
  `;
  const [[{ totalReviews }]] = await pool.query(countQuery, [lectureId]);
  return { data: data || [], totalReviews: totalReviews || 0 };
};


// 리뷰 추가
export const addReview = async (reviewDto) => {
  const { lectureId, rating, content, period } = reviewDto;

  const [result] = await pool.query(
    `INSERT INTO review (lecture_id, rating, content, period)
    VALUES (?, ?, ?, ?)`,
    [lectureId, rating, content, period]
  );

  return { id: result.insertId };
};
