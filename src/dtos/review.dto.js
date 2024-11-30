// 요청 DTO
export class ReviewRequestDto {
  constructor({ lectureId, limit = 5, page = 1 }) {
    this.lectureId = parseInt(lectureId, 10);
    this.limit = parseInt(limit, 10);
    this.page = parseInt(page, 10);

    this.validate();
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

// 요청 바디를 Review DTO로 변환
export const bodyToReview = (body) => {
  if (!body.lecture_id || isNaN(body.lecture_id)) {
    throw new Error("유효한 lecture_id가 필요합니다.");
  }
  if (!body.rating || isNaN(body.rating) || body.rating < 1 || body.rating > 5) {
    throw new Error("평점은 1~5 사이의 값이어야 합니다.");
  }

  const reviewDto = {
    lectureId: parseInt(body.lecture_id, 10),
    rating: parseFloat(body.rating),
    content: body.review || "",
    period: body.duration || "",
  };

  console.log("bodyToReview의 변환된 reviewDto: ", reviewDto);
  return reviewDto;
};

