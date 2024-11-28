import lectureRepository from "../repositories/lecture.repository.js";

const getRatingStats = async (lectureId) => {
    const stats = await lectureRepository.getRatingStatsByLectureId(lectureId);
    
    if (!stats || stats.totalReviews === 0) {
      throw new Error("Invalid lectureId or no reviews found");
    }
  
    return {
      averageRating: stats.averageRating,
      ratingCount: {
        "5": stats["5"] || 0,
        "4": stats["4"] || 0,
        "3": stats["3"] || 0,
        "2": stats["2"] || 0,
        "1": stats["1"] || 0,
      },
      totalReview: stats.totalReview,
    };
  };

export default { getRatingStats };

