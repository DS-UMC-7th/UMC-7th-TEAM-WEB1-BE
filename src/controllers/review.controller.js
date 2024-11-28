import { fetchRecommendedReviews, fetchLatestReviews } from "../services/review.service.js";

export const getRecommendedReviews = async (req, res, next) => {
  const { lectureId } = req.params;
  const limit = parseInt(req.query.limit, 10) || 5;
  const page = parseInt(req.query.page, 10) || 1;

  try {
    const result = await fetchRecommendedReviews(lectureId, limit, page);
    res.success(result, "추천순 리뷰 조회 성공");
  } catch (error) {
    next(error);
  }
};

export const getLatestReviews = async (req, res, next) => {
  const { lectureId } = req.params;
  const limit = parseInt(req.query.limit, 10) || 5;
  const page = parseInt(req.query.page, 10) || 1;

  try {
    const result = await fetchLatestReviews(lectureId, limit, page);
    res.success(result, "최신순 리뷰 조회 성공");
  } catch (error) {
    next(error);
  }
};
