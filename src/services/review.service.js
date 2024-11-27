import { bodyToReview } from "../dtos/review.dto.js";
import { addReview } from "../repositories/review.repository.js";

export const reviewCreate = async (reviewDto) => {
  // 평점 유효성 검증
  if (reviewDto.rating < 1 || reviewDto.rating > 5) {
    throw new Error("평점은 1~5 사이 값이어야 합니다.");
  }

  // 데이터베이스에 리뷰 저장
  const review = await addReview(reviewDto);

  return review;
}