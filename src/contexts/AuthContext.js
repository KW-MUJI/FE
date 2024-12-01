// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 구현

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const refreshToken = localStorage.getItem("refreshToken");

  console.log("AuthProvider 엑세스토큰: ", accessToken);
  console.log("AuthProvider refresh토큰: ", refreshToken);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        // Access Token이 없는 경우 로그아웃 처리된 상태로 간주
        console.warn("Access Token 없음. 로그아웃 처리된 상태로 설정.");
        setAccessToken(null);
      } else {
        setAccessToken(token);
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("storage", handleStorageChange);

    // 클린업
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);
