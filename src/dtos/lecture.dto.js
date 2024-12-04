export const lectureToDto = (lecture) => {
  const lectureDto = {
    lectureId : lecture.id,
    lectureName : lecture.name,
    instructorName : lecture.teacher,
    platform : lecture.platform,
    rating : lecture.review_rating,
    date: lecture.created_at,
  }

  console.log("lectureToBody의 변환된 lectureDto: ",  lectureDto);

  return lectureDto;
}