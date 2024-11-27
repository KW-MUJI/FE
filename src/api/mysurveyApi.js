import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const SurveyResults = async (accessToken, surveyId) => {
  const response = await axios.get(
    `${API_BASE_URL}/mysurvey/result/${surveyId}`,
    {
      // URL 수정
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
      },
    }
  );
  return response.data.data;
};

export const fetchSurvey = async (accessToken) => {
  const response = await axios.get(`${API_BASE_URL}/mysurvey`, {
    headers: {
      "Content-Type": "application/json", // Content-Type 헤더 추가
      Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
    },
  });
  return response;
};
export const endSurvey = async (accessToken, id) => {
  const response = await fetch(`${API_BASE_URL}/mysurvey/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const deleteSurvey = async (accessToken, id) => {
  const response = await axios.delete(`${API_BASE_URL}/mysurvey/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
