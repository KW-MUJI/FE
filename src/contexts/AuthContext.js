// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 구현
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  console.log("AuthProvider 엑세스토큰: ", accessToken);

  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem("accessToken"));
    };


     // 이벤트 리스너 등록
    window.addEventListener("storage", handleStorageChange);

    // 초기 상태 동기화
    handleStorageChange(); 

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
