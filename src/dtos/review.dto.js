// 요청 DTO
export class ReviewRequestDto {
  constructor({ lectureId, limit = 5, page = 1 }) {
    this.lectureId = parseInt(lectureId, 10);
    this.limit = parseInt(limit, 10);
    this.page = parseInt(page, 10);
  }

  validate() {
    if (!this.lectureId || isNaN(this.lectureId)) {
      throw new Error("lectureId는 유효한 숫자여야 합니다.");
    }
    if (!this.limit || isNaN(this.limit) || this.limit <= 0) {
      throw new Error("limit은 1 이상의 숫자여야 합니다.");
    }
    if (!this.page || isNaN(this.page) || this.page <= 0) {
      throw new Error("page는 1 이상의 숫자여야 합니다.");
    }
  }
}

// 응답 DTO
export class ReviewResponseDto {
  constructor({ data, totalReviews, message }) {
    this.data = data.map((item) => ({
      rating: item.rating,
      date: item.date,
      duration: item.duration,
      reviewContent: item.reviewContent,
      recommendations: item.recommendations,
    }));
    this.totalReviews = totalReviews;
    this.message = message || "요청이 성공적으로 처리되었습니다.";
  }
}
