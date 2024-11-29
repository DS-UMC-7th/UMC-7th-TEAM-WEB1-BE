import reviewService from "../services/recommend.service.js";

const recommendReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const result = await reviewService.recommendReview(reviewId);
    res.status(200).json({
      isSuccess: true,
      code: 200,
      message: "추천 성공!",
      result,
    });
  } catch (error) {
    res.status(500).json({ error: "서버 오류", details: error.message });
  }
};

export default {
    recommendReview,
};
