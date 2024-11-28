import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewCreate } from "../services/review.service.js";

export const handleCreateReview = async (req,  res, next) => {
  
  try {
  console.log("'강의평 등록을 요청했습니다!");
  console.log("body: ", req.body);

  // 요청 데이터 -> DTO 변환
  const reviewDto = bodyToReview(req.body);
  console.log("변환된 reviewDto: ", reviewDto);

  // 필수 필드 검증
  if (!reviewDto.lectureId || !reviewDto.rating) {
    return res.error({ message: "강의 id 또는 평점이 필요합니다."});
  }

  // period 값 검증
  const validPeriods =  ['일주일 이내', '3달 이내', '6달 이내', '1년 이내', '아직 수강중임'];
  if (reviewDto.duration && !validPeriods.includes(reviewDto.duration)) {
    return res.error({ message : "유효하지 않은 수강 기간입니다." });
  }

  // 서비스 호출 (리뷰 생성)
  const review = await reviewCreate(reviewDto);
  
  // 성공 응답
  res.success(review, "강의평이 성공적으로 등록되었습니다.");
} catch (error) {
  console.error("리뷰 등록 중 오류 발생", error);
  next(error);  
  }
};