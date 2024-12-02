//index.js
import axios from "axios";
import { refreshAccessToken } from "../api/authApi";
import { getAccessToken } from "../contexts/AuthContext";
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  //   timeout: 5000, 벡엔드와 상의, 벡엔드 타임아웃 보다는 짧게
  headers: { "content-type": process.env.REACT_APP_DEFAULT_CONTENT_TYPE },
});

// Request Interceptor: Access Token 추가
apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("401 Unauthorized 에러:", error);
      alert("인증 정보가 만료되었습니다. 다시 로그인하세요.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
