import {
  getReviewsByRecommendation,
  getReviewsByLatest,
  addReview,
} from "../repositories/review.repository.js";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; 
};

// 추천순 리뷰 조회
export const fetchRecommendedReviews = async (lectureId, limit, page) => {
  const offset = (page - 1) * limit;
  const reviews = await getReviewsByRecommendation(lectureId, limit, offset);

  if (!reviews.data || reviews.data.length === 0) {
    return {
      totalReviews: 0,
      totalPages: 0,
      currentPage: page,
      reviews: [],
    };
  }

  const formattedReviews = reviews.data.map((review) => ({
    ...review,
    date: formatDate(review.date),
  }));

  return {
    totalReviews: reviews.totalReviews,
    totalPages: Math.ceil(reviews.totalReviews / limit),
    currentPage: page,
    reviews: formattedReviews,
  };
};

// 최신순 리뷰 조회
export const fetchLatestReviews = async (lectureId, limit, page) => {
  const offset = (page - 1) * limit;
  const reviews = await getReviewsByLatest(lectureId, limit, offset);

  if (!reviews.data || reviews.data.length === 0) {
    return {
      totalReviews: 0,
      totalPages: 0,
      currentPage: page,
      reviews: [],
    };
  }
  
  const formattedReviews = reviews.data.map((review) => ({
    ...review,
    date: formatDate(review.date),
  }));

  return {
    totalReviews: reviews.totalReviews,
    totalPages: Math.ceil(reviews.totalReviews / limit),
    currentPage: page,
    reviews: formattedReviews,
  };
};

// 리뷰 생성
export const reviewCreate = async (reviewDto) => {
  // 평점 유효성 검증
  if (reviewDto.rating < 1 || reviewDto.rating > 5) {
    throw new Error("평점은 1~5 사이 값이어야 합니다.");
  }

  // 데이터베이스에 리뷰 저장
  const review = await addReview(reviewDto);

  return review;
};
