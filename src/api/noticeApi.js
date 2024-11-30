import { apiClient } from "./index";

export const getNotices = async (page, searchVal, srCategoryId) => {
  const url = "/notices";
  const params = {
    page, // 페이지 번호 (기본값: 1)
    ...(searchVal && { searchVal }), // 검색어가 있으면 추가
    ...(srCategoryId !== null && { srCategoryId }), // 카테고리 ID가 있으면 추가
  };
  try {
    const response = await apiClient.get(url, {
      params, // 쿼리 파라미ㄴ터 전달
    });
    if (response.data.code === 200) {
      console.log("공지사항 요청 성공:", response.data);
      return response.data.data; // notices와 maxPage 반환
    } else {
      console.error("공지사항 요청 실패 코드:", response.data.code);
      return null;
    }
  } catch (error) {
    console.error("getNotices API 에러:", error.response || error.message);
    throw error;
  }
};
