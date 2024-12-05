export const lectureToDto = (lecture) => {
  const lectureDto = {
    lectureId: lecture.lectureId,
    lectureName: lecture.lectureName,
    instructorName: lecture.instructorName,
    platform: lecture.platform,
    rating: lecture.rating,
    date: lecture.date,
    reviews: Array.isArray(lecture.reviews)
      ? lecture.reviews.map((review) => ({
          reviewId: review.reviewId,
          rating: review.rating,
          content: review.content,
          period: review.period,
          createdAt: review.createdAt,
        }))
      : [],
  };

  console.log("lectureToDto의 변환된 lectureDto: ", lectureDto);

  return lectureDto;
};