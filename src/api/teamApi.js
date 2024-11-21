import apiClient from "./index";

export const registerTeam = async (teamData, accessToken) => {
  try {
    const formData = new FormData();
    formData.append("name", teamData.name);
    formData.append("description", teamData.description);
    formData.append("deadlineAt", teamData.deadlineAt);
    formData.append("image", teamData.image); // 이미지 파일 추가

    console.log("이미지 내용:", teamData.image);

    console.log("FormData 내용:", Array.from(formData.entries()));

    const response = await apiClient.post("/team/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`, // 토큰 추가
      },
    });
    console.log("토큰:", accessToken);
    console.log("Authorization 헤더:", `Bearer ${accessToken}`);
    console.log("데이터 내용:", response.data);

    return response.data;
  } catch (error) {
    console.error("[ERROR] Team Register:", error.response || error.message);
    console.log("토큰:", accessToken);
    console.log("Authorization 헤더:", `Bearer ${accessToken}`);
    console.log("Base URL:", apiClient.defaults.baseURL);

    throw error;
  }
};

export const getTeampleDetail = async (projectId, accessToken) => {
  try {
    const response = await apiClient.get(`/team/${projectId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("getTeampleDetail데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "[ERROR] teamApi/getTeampleDetail 오류",
      error.response || error.message
    );
    throw error;
  }
};

export const getPortfolioList = async (accessToken) => {
  try {
    const response = await apiClient.get(`/team/apply`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postPortfolio = async (accessToken, resumeId, projectId) => {
  const url = "/team/apply";
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const body = {
    resumeId,
    projectId,
  };
  try {
    const response = await apiClient.post(url, body, { headers });
    if (response.data.code === 200) {
      console.log("포트폴리오 선택 성공 :", response.data.data);
      return response.data.data;
    } else {
      console.error("포트폴리오 선택 실패 오류 코드 :", response.data.code);
    }
    return response.data;
  } catch (error) {
    console.error("postProtfolio API 에러:", error.response || error.message);
    throw error;
  }
};

export const getTeampleList = async (page = 0) => {
  try {
    console.log("API 호출: /team/", page); // 요청 URL 확인
    console.log("요청 URL:", `${apiClient.defaults.baseURL}/team/${page}`);
    console.log("요청 파라미터:", { page });
    const response = await apiClient.get("/team", {
      params: {
        page,
      },
    });
    console.log("API 응답 데이터:", response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error("[ERROR] teamApi/getTeampleList 오류");
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
