import { pool } from "../../config/db.js";

export const findLecturesByKeyword = async (keyword) => {
  const query = `
  SELECT 
      l.id AS lecture_id,
      l.name AS lecture_name,
      l.teacher AS instructor_name,
      l.platform,
      l.review_rating,
      l.created_at AS lecture_created_at,
      r.id AS review_id,
      r.rating AS review_rating,
      r.content AS review_content,
      r.period AS review_period,
      r.created_at AS review_created_at
  FROM 
      lecture l
  LEFT JOIN 
      review r ON l.id = r.lecture_id
  WHERE 
      l.name LIKE ?;
  `;

  const [results] = await pool.query(query, [`%${keyword}%`]).catch((error) => {
    console.error("Database Query Error:", error);
    throw error;
  });

  // 데이터 가공: 강의별 리뷰 데이터를 그룹화
  const lectures = results.reduce((acc, row) => {
    const existingLecture = acc.find((lecture) => lecture.lectureId === row.lecture_id);
    const review = row.review_id
      ? {
          reviewId: row.review_id,
          rating: row.review_rating,
          content: row.review_content,
          period: row.review_period,
          createdAt: row.review_created_at,
        }
      : null;

    if (existingLecture) {
      if (review) {
        existingLecture.reviews.push(review);
      }
    } else {
      acc.push({
        lectureId: row.lecture_id,
        lectureName: row.lecture_name,
        instructorName: row.instructor_name,
        platform: row.platform,
        rating: row.review_rating,
        date: row.lecture_created_at,
        reviews: review ? [review] : [],
      });
    }

    return acc;
  }, []);

  return lectures;
};