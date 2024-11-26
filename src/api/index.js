import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { handleTokenRefresh } from "../utils/authUtil";
const AUTH_URL = {
  baseUrl: "/auth",
  newAcessToken: "/newToken",
  newRefreshToken: "/newrefreshToken",
};

export const apiClient = axios.create({
  baseURL: "http://15.165.62.195",

  //   timeout: 5000, 벡엔드와 상의, 벡엔드 타임아웃 보다는 짧게
  headers: { "content-type": "application/json" },
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
    const { response } = error;
    if (response && response.status === 401) {
      // AuthContext에서 값 가져오기
      const refreshToken = localStorage.getItem("refreshToken");
      const setAccessToken = useAuth().setAccessToken;

      try {
        // Token 갱신
        const newAccessToken = await handleTokenRefresh(
          refreshToken,
          setAccessToken
        );
        // 이전 요청 재시도
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export const newAcessToken = async (refreshToken) => {
  try {
    const response = await apiClient.get(
      `${AUTH_URL.baseUrl}${AUTH_URL.newAcessToken}`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Token refresh error:", error.response || error);
    throw error;
  }
};

export const getNewRefreshToken = async (refreshToken) => {
  try {
    const response = await apiClient.get(
      `${AUTH_URL.baseUrl}${AUTH_URL.newRefreshToken}`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Refresh Token renew error:", error.response || error);
    throw error;
  }
};
