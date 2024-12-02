// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { refreshAccessToken } from "../api/authApi";
// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 구현

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    alert("인증이 만료되었습니다. 다시 로그인하세요.");
    window.location.href = "/login";
  };
  // 토큰 만료 확인 함수
  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      const base64Url = token.split(".")[1]; // JWT의 페이로드 추출
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const { exp } = JSON.parse(atob(base64)); // JSON 파싱
      return Date.now() >= exp * 1000; // 현재 시간과 만료 시간 비교
    } catch (error) {
      console.error("JWT 디코딩 실패:", error);
      return true; // 디코딩 실패 시 만료된 것으로 간주
    }
  };

  const getAccessToken = () => localStorage.getItem("accessToken");

  console.log("AuthProvider 엑세스토큰: ", accessToken);
  console.log("AuthProvider refresh토큰: ", refreshToken);

  useEffect(() => {
    const checkToken = async () => {
      if (accessToken && isTokenExpired(accessToken)) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          setAccessToken(newAccessToken);
          localStorage.setItem("accessToken", newAccessToken);
        } catch (error) {
          console.error("Access Token 갱신 실패:", error);
          handleLogout();
        }
      }
    };

    checkToken();

    const interval = setInterval(checkToken, 5 * 60 * 1000); // 5분마다 실행

    return () => clearInterval(interval); // 클린업
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        getAccessToken,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);
export const getAccessToken = () => localStorage.getItem("accessToken"); // 추가
