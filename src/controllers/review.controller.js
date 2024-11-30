import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import {
  fetchRecommendedReviews,
  fetchLatestReviews,
  reviewCreate,
} from "../services/review.service.js";

// 추천순 리뷰 조회
export const getRecommendedReviews = async (req, res, next) => {
  const { lectureId } = req.params;
  const limit = Math.max(parseInt(req.query.limit, 10) || 5, 1);
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

  try {
    if (!lectureId || isNaN(lectureId)) {
      return res.error({ message: "유효한 lectureId가 필요합니다." });
    }

    const result = await fetchRecommendedReviews(lectureId, limit, page);
    res.success(result, "추천순 리뷰 조회 성공");
  } catch (error) {
    console.error("추천순 리뷰 조회 중 오류 발생:", error);
    next(error);
  }
};

// 최신순 리뷰 조회
export const getLatestReviews = async (req, res, next) => {
  const { lectureId } = req.params;
  const limit = Math.max(parseInt(req.query.limit, 10) || 5, 1);
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

  try {
    if (!lectureId || isNaN(lectureId)) {
      return res.error({ message: "유효한 lectureId가 필요합니다." });
    }

    const result = await fetchLatestReviews(lectureId, limit, page);
    res.success(result, "최신순 리뷰 조회 성공");
  } catch (error) {
    console.error("최신순 리뷰 조회 중 오류 발생:", error);
    next(error);
  }
};

// 리뷰 생성
export const handleCreateReview = async (req, res, next) => {
  try {
    console.log("강의평 등록 요청!");
    console.log("body: ", req.body);

    // 요청 데이터 -> DTO 변환
    const reviewDto = bodyToReview(req.body);
    console.log("변환된 reviewDto: ", reviewDto);

    // 필수 필드 검증
    if (!reviewDto.lectureId || !reviewDto.rating) {
      return res.error({ message: "강의 ID 또는 평점이 필요합니다." });
    }

    // period 값 검증
    const validPeriods = [
      "일주일 이내",
      "3달 이내",
      "6달 이내",
      "1년 이내",
      "아직 수강중임",
    ];
    if (reviewDto.period && !validPeriods.includes(reviewDto.period)) {
      return res.error({ message: "유효하지 않은 수강 기간입니다." });
    }

    // 서비스 호출 (리뷰 생성)
    const review = await reviewCreate(reviewDto);

    // 성공 응답
    res.success(review, "강의평이 성공적으로 등록되었습니다.");
  } catch (error) {
    console.error("리뷰 등록 중 오류 발생:", error);
    next(error);
  }
};
