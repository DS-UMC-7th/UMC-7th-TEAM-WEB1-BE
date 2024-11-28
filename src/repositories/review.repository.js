import { pool } from "../../config/db.js";

export const addReview = async (reviewDto) => {
  const conn = await pool.getConnection();

  const { lectureId, rating, content, period } = reviewDto;

    const [result] = await pool.query(
      `INSERT INTO review (lecture_id, rating, content, period)
      VALUES (?, ?, ?, ?)`,
      [lectureId, rating, content, period]
    );

    return { id: result.insertId }
}