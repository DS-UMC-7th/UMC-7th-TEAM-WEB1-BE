import { getLecturesByKeyword } from "../services/lecture.service.js";

export const handleSearchLectures = async (req, res) => {
  try {

    console.log("'강의 검색을 요청했습니다!");
    console.log("query: ", req.query);

    // 클라이언트 -> 검색어 query 요청
    const { keyword } = req.query;

    if (!keyword) {
      return res.error({
        errorCode: "Missing Keyword",
        message: "검색어가 필요합니다.",
      });
    }

    // 강의 검색
    const lectures = await getLecturesByKeyword(keyword);
    
    // 검색 결과가 없을 때 빈 배열 return
    if (lectures.length === 0) {
      return res.success([], "검색 결과가 없습니다.");
    }

    // 검색된 강의 반환
    return res.success(lectures, "강의 검색 성공");
  
  } catch (error) {
    console.error("강의 검색 오류: ", error);
    return res.error({
      errorCode: "lecture search Failed",
      message: "강의 검색 중 오류가 발생했습니다.",
    });
  }
};