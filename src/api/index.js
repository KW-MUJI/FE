import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { handleTokenRefresh } from "../utils/authUtil";
import { useNavigate } from "react-router-dom";

const AUTH_URL = {
  baseUrl: "/auth",
  newAccessToken: "/newToken",
  newRefreshToken: "/newrefreshToken",
};

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
    const { response } = error;
    if (response && response.status === 401) {
      // AuthContext에서 값 가져오기

      const { refreshToken, setAccessToken, navigate } = useAuth();

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
      `${AUTH_URL.baseUrl}${AUTH_URL.newAccessToken}`,
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
