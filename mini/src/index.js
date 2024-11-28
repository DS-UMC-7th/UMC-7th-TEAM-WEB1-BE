import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import lectureRoutes from "./routes/lecture.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use("/lectures", lectureRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
