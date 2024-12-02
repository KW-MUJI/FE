// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
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
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
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
