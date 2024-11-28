import dotenv from "dotenv";
import cors from 'cors';
import express from "express";
import SwaggerUi from "swagger-ui-express";
import { specs } from "../config/swagger.config.js";
import { handleCreateReview } from "./controllers/review.controller.js";
import { GetAllPopularReviews, GetAllLatestReviews } from "./controllers/main.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// 공통 응답 헬퍼 함수
app.use((req, res, next) => {
  res.success = (result, message = "요청이 성공적으로 처리되었습니다.") => {
    return res.json({
      isSuccess: true,
      code: 200,
      message,
      result,
    });
  };

  res.error = ({ errorCode = "unknown", message = "잘못된 요청입니다.", data = null }) => {
    return res.json({
      isSuccess: false,
      code: 400,
      message,
      result: data || null,
    });
  };

  next();
});

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 강의평 등록
app.post("/api/reviews", handleCreateReview);

// 메인화면 인기 리뷰 조회 API
app.get("/reviews/popular", GetAllPopularReviews);

// 메인화면 최신 리뷰 조회 API
app.get("/reviews/latest", GetAllLatestReviews);



// 전역 오류 처리 미들웨어
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reasone: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

