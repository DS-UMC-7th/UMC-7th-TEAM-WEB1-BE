export const lectureToDto = (lecture) => {
  const lectureDto = {
    lectureId : lecture.id,
    lectureName : lecture.name,
    instructorName : lecture.teacher,
    platform : lecture.platform
  }

  console.log("lectureToBody의 변환된 lectureDto: ",  lectureDto);

  return lectureDto;
}