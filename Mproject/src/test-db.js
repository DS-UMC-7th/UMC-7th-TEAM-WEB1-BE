import pool from "./config/db.config.js"; // 파일 확장자 필요

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("DB 연결 성공!");
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error("DB 연결 실패:", error.message);
    process.exit(1);
  }
})();
