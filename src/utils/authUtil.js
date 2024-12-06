// authUtils.js
import { newAcessToken, getNewRefreshToken } from "../api";

export const handleTokenRefresh = async (refreshToken, setAccessToken) => {

  if (!refreshToken) {
    console.error("No refresh token available");
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    return;
  }
  
  try {
    // Step 1: Access Token 갱신
    const response = await newAcessToken(refreshToken);
    const { accessToken } = response.data;
    const { refreshToken: firstRefreshToken } = response.data;

    if (accessToken) {
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", firstRefreshToken);
      // console.log("accesstoken 발급됨 :", accessToken);
      return;
    }
  } catch (error) {
    console.error("Failed to refresh access token");

    try {
      // Step 2: Refresh Token 갱신
      const refreshResponse = await getNewRefreshToken(refreshToken);
      const { refreshToken: newRefreshToken } = refreshResponse.data;
      localStorage.setItem("refreshToken", newRefreshToken);
      // console.log("refreshToken발급됨 :", newRefreshToken);

      // Step 3: 새 Refresh Token으로 Access Token 갱신
      const accessResponse = await newAcessToken(newRefreshToken);
      const { accessToken: newAccessToken } = accessResponse.data;

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        // console.log("새 Access token 갱신 성공:", newAccessToken);
        return;
      }

      throw new Error("Access token 갱신 실패");
    } catch (error) {
      console.error("토큰 갱신 실패, 로그아웃 처리:", error);
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  }
};
