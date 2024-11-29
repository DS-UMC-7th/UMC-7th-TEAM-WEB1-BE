// main.controller.js

import { getPopularReviews, getLatestReviews } from "../services/main.service.js";

export const GetAllPopularReviews = async (req, res, next) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit, 10) : null; // limit이 없으면 전체 조회
      const reviews = await getPopularReviews(limit);
      return res.success({ reviews }, "인기 리뷰 조회 성공");
    } catch (error) {
      console.error('Error occurred in GetAllPopularReviews:', error);  // 에러 로그 출력
      next(error);
    }
  };
  
  export const GetAllLatestReviews = async (req, res, next) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit, 10) : null; // limit이 없으면 전체 조회
      const reviews = await getLatestReviews(limit);
      return res.success({ reviews }, "최신 리뷰 조회 성공");
    } catch (error) {
      console.error('Error occurred in GetAllLatestReviews:', error);  // 에러 로그 출력
      next(error);
    }
  };
  
  
