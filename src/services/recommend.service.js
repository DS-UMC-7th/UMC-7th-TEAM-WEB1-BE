import reviewRepository from "../repositories/recommend.repository.js";

const recommendReview = async (reviewId) => {
  // 추천 추가
  await reviewRepository.recommendReview(reviewId);

  // 총 추천 수 가져오기
  const totalRecommendations = await reviewRepository.getTotalRecommendations(
    reviewId
  );

  return { reviewId, totalRecommendations };
};

export default {
    recommendReview,
};
