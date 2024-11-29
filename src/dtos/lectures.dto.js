// src/dto/lectureRatingStats.dto.js
class LectureRatingStatsDTO {
    constructor(averageRating, ratingCount, totalReviews) {
        this.isSuccess = true;
        this.code = 200;
        this.message = "별점 통계 조회 성공";
        this.result = {
            averageRating,
            ratingCount,
            totalReviews
        };
    }
}

module.exports = LectureRatingStatsDTO;
