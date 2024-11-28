import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import SwaggerUi from "swagger-ui-express";
import { specs } from "../config/swagger.config.js";
import {
  getRecommendedReviews,
  getLatestReviews,
} from "./controllers/review.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  res.success = (result, message = "요청이 성공적으로 처리되었습니다.") => {
    return res.status(200).json({
      isSuccess: true,
      code: 200,
      message,
      result,
    });
  };

  res.error = ({ errorCode = "unknown", message = "잘못된 요청입니다.", data = null }) => {
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    isSuccess: false,
    code: 500,
    message: "Internal Server Error",
    result: null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
