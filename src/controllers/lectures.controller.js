import lectureService from "../services/lectures.service.js";

export const getRatingStats = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const stats = await lectureService.getRatingStats(lectureId);
    res.status(200).json({
      isSuccess: true,
      code: 200,
      message: "별점 통계 조회 성공",
      result: stats,
    });
  } catch (error) {
    res.status(500).json({
      error: "서버 오류",
      details: error.message,
    });
  }
};
