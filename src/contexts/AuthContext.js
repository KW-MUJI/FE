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
      // JWT의 페이로드 추출 (토큰은 'header.payload.signature' 형식)
      const base64Url = token.split(".")[1]; // 두 번째 부분이 페이로드
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join("")
      );

      // JSON으로 파싱
      const { exp } = JSON.parse(jsonPayload);

      // 현재 시간과 만료 시간 비교
      return Date.now() >= exp * 1000;
    } catch (error) {
      console.error("JWT 디코딩 실패:", error);
      return true; // 디코딩에 실패하면 만료된 것으로 간주
    }
  };

  console.log("AuthProvider 엑세스토큰: ", accessToken);
  console.log("AuthProvider refresh토큰: ", refreshToken);

  useEffect(() => {
    const checkToken = async () => {
      if (accessToken && isTokenExpired(accessToken)) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          setAccessToken(newAccessToken);
        } catch (error) {
          console.error("Access Token 갱신 실패:", error);
          handleLogout();
        }
      }
    };

    checkToken();

    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem("accessToken"));
    };

    // 이벤트 리스너 등록
    window.addEventListener("storage", handleStorageChange);

    // 클린업
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider
      value={{
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
