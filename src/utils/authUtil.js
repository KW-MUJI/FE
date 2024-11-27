// authUtils.js
import { newAcessToken, getNewRefreshToken } from "../api";

export const handleTokenRefresh = async (refreshToken, setAccessToken) => {
  if (!refreshToken) {
    console.error("No refresh token available");
    setAccessToken(null);
    window.location.href = "/login";
    return;
  }
  try {
    const response = await newAcessToken(refreshToken);
    setAccessToken(response.accessToken);
    localStorage.setItem("accessToken", response.accessToken);
  } catch (error) {
    console.error("Failed to refresh access token");

    // Refresh Token 갱신 시도
    try {
      const newRefreshResponse = await getNewRefreshToken(refreshToken);
      localStorage.setItem("refreshToken", newRefreshResponse.refreshToken);

      const response = await newAcessToken(newRefreshResponse.refreshToken);
      const { accessToken } = response.data;
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", response.accessToken);
    } catch (refreshError) {
      console.error("Failed to refresh both tokens:", refreshError);
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw refreshError;
    }
  }
};
