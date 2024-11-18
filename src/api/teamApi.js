import apiClient from "./index";

export const registerTeam = async (teamData, accessToken) => {
  try {
    const formData = new FormData();
    formData.append("name", teamData.name);
    formData.append("description", teamData.description);
    formData.append("deadlineAt", teamData.deadlineAt);
    formData.append("image", teamData.image); // 이미지 파일 추가

    console.log("FormData 내용:", Array.from(formData.entries()));

    const response = await apiClient.post("/team/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`, // 토큰 추가
      },
    });
    console.log("토큰:", accessToken);
    console.log("Authorization 헤더:", `Bearer ${accessToken}`);

    return response.data;
  } catch (error) {
    console.error("[ERROR] Team Register:", error.response || error.message);
    console.log("토큰:", accessToken);
    console.log("Authorization 헤더:", `Bearer ${accessToken}`);
    console.log("Base URL:", apiClient.defaults.baseURL);

    throw error;
  }
};

export const showTeampleList = async (page = 0) => {
  try {
    console.log("API 호출: /team/", page); // 요청 URL 확인
    console.log("요청 URL:", `${apiClient.defaults.baseURL}team/${page}`);
    const response = await apiClient.get(`/team/${page}`);
    console.log("API 응답 데이터:", response.data); // 응답 데이터 확인
    if (!response.data) {
      console.log("API 응답 데이터 오류");
    }
    return response.data;
  } catch (error) {
    console.error("[ERROR] teamApi/showTeampleList 오류");
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};
