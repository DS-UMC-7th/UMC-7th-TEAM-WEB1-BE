// main.repository.js

import { pool } from "../../config/db.js";

export const findPopularReviews = async (limit) => {
    const query = `
      SELECT 
        l.name AS lecture_name, 
        l.teacher, 
        l.platform, 
        l.review_rating, 
        r.content, 
        r.created_at
      FROM review r
      INNER JOIN lecture l ON r.lecture_id = l.id
      ORDER BY 
        (SELECT COUNT(*) FROM review_likes rl WHERE rl.review_id = r.id) DESC
      ${limit ? "LIMIT ?" : ""}
    `;
  
    const params = limit ? [limit] : []; 
    const [rows] = await pool.query(query, params);
    return rows;
  };
  
  export const findLatestReviews = async (limit) => {
    const query = `
      SELECT 
        l.name AS lecture_name, 
        l.teacher, 
        l.platform, 
        l.review_rating, 
        r.content, 
        r.created_at
      FROM review r
      INNER JOIN lecture l ON r.lecture_id = l.id
      ORDER BY r.created_at DESC
      ${limit ? "LIMIT ?" : ""}
    `;
  
    const params = limit ? [limit] : []; // limit이 null일 경우 빈 배열
    const [rows] = await pool.query(query, params);
    return rows;
  };
  