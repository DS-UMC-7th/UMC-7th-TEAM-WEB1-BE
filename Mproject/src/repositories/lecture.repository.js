import pool from "../config/db.config.js";

const getRatingStatsByLectureId = async (lectureId) => {
  const query = `
    SELECT 
      ROUND(AVG(rating), 2) AS averageRating,
      COUNT(rating) AS totalReviewes,
      SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) AS '5',
      SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) AS '4',
      SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) AS '3',
      SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) AS '2',
      SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) AS '1'
    FROM reviewes
    WHERE lecture_id = ?;
  `;
  const [rows] = await pool.query(query, [lectureId]);
  return rows[0];
};


export default { getRatingStatsByLectureId };
