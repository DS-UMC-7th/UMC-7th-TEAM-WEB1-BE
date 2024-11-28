import { findLecturesByKeyword } from "../repositories/lecture.repository.js";
import { lectureToDto } from "../dtos/lecture.dto.js";

export const getLecturesByKeyword = async (keyword) => {
  const lectures = await findLecturesByKeyword(keyword);

  const transformedLectures = lectures.map(lectureToDto);
  
  return transformedLectures;
};