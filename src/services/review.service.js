import {
  getReviewsByRecommendation,
  getReviewsByLatest,
} from "../repositories/review.repository.js";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; 
};

export const fetchRecommendedReviews = async (lectureId, limit, page) => {
  const offset = (page - 1) * limit;
  const reviews = await getReviewsByRecommendation(lectureId, limit, offset);

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

export const fetchLatestReviews = async (lectureId, limit, page) => {
  const offset = (page - 1) * limit;
  const reviews = await getReviewsByLatest(lectureId, limit, offset);

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
