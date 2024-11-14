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
