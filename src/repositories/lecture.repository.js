import { pool } from "../../config/db.js";

export const findLecturesByKeyword = async (keyword) => {
  const query = `
  SELECT * FROM lecture
  WHERE name LIKE ?;
`;

const [lectures] = await pool.query(query, [`%${keyword}%`])
.catch((error) => {
  console.error("Database Query Error:", error); // error 객체 출력
  throw error;
});

return lectures;
}