export const bodyToReview = (body) => {
  
  const reviewDto = {
    lectureId: body.lecture_id,  // lecture_id를 lectureId로 변환
    rating: body.rating,         // 평점
    content: body.review,       // 리뷰 내용
    period: body.duration || "",   // 수강 기간
  };

  console.log("bodyToReview의 변환된 reviewDto: ", reviewDto);  // 변환된 DTO 확인

  return reviewDto;
};