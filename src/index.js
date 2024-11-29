import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import SwaggerUi from "swagger-ui-express";
import { specs } from "../config/swagger.config.js";
import {
  getRecommendedReviews,
  getLatestReviews,
  handleCreateReview,
} from "./controllers/review.controller.js";
import {
  GetAllPopularReviews,
  GetAllLatestReviews,
} from "./controllers/main.controller.js";
import { handleSearchLectures } from "./controllers/lecture.controller.js";
import { lectureRoutes } from "./routes/lectures.routes.js";
import { reviewRoutes } from "./routes/recommend.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// 공통 응답 헬퍼 함수
app.use((req, res, next) => {
  res.success = (result, message = "요청이 성공적으로 처리되었습니다.") => {
    return res.status(200).json({
      isSuccess: true,
      code: 200,
      message,
      result,
    });
  };

  res.error = ({
    errorCode = "unknown",
    message = "잘못된 요청입니다.",
    data = null,
  }) => {
    return res.status(400).json({
      isSuccess: false,
      code: 400,
      message,
      result: data || null,
    });
  };

  next();
});

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 추천순 리뷰 조회
app.get("/lectures/:lectureId/reviews/recommended", getRecommendedReviews);

// 최신순 리뷰 조회
app.get("/lectures/:lectureId/reviews/latest", getLatestReviews);

// 강의평 등록
app.post("/api/reviews", handleCreateReview);

// 메인화면 인기 리뷰 조회 API
app.get("/reviews/popular", GetAllPopularReviews);

// 메인화면 최신 리뷰 조회 API
app.get("/reviews/latest", GetAllLatestReviews);

// 강의 검색
app.get("/api/lectures/search", handleSearchLectures);

// 강의 관련 라우트
app.use("/lectures", lectureRoutes);

// 리뷰 추천 관련 라우트
app.use("/comments", reviewRoutes);

// 전역 오류 처리 미들웨어
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    isSuccess: false,
    code: 500,
    errorCode: err.errorCode || "unknown",
    message: err.reason || err.message || "Internal Server Error",
    result: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
