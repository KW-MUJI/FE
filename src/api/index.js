import axios from "axios";
import { refreshTokens, refreshAccessToken } from "../api/authApi";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  //   timeout: 5000, 벡엔드와 상의, 벡엔드 타임아웃 보다는 짧게
  headers: { "content-type": process.env.REACT_APP_DEFAULT_CONTENT_TYPE },
});

// Request Interceptor: Access Token 추가
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.error("Refresh Token 없음. 로그아웃 처리.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }
      try {
        // Step 1: Access Token 갱신
        const newAccessToken = await refreshAccessToken(refreshToken);

        // Step 2: refresh Token 갱신
        const newRefreshToken = await refreshTokens(refreshToken);

        // Step 3: 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient.request(originalRequest);
      } catch (refreshError) {
        console.error("Access Token 갱신 실패. 로그아웃 처리.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
