// src/api/authApi.js
import { apiClient } from "./index.js";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_SERVER;
// 로그인
export const signIn = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/signIn", credentials);

    return response.data;
  } catch (error) {
    console.error("[ERROR] sign-in:", error);
    throw error;
  }
};

export const sendAuthRequest = async (email, flag) => {
  const requestBody = {
    email: email,
    flag: flag,
  };

  const response = await apiClient.post(`/auth/mailSend`, requestBody);

  return response;
};

export const verifyPinRequest = async (email, pin) => {
  const requestBody = {
    email: email,
    authNum: pin,
  };

  const response = await fetch(`${API_BASE_URL}/auth/authCheck`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return await response.json();
};

export const signupRequest = async (requestBody) => {
  const response = await fetch(`${API_BASE_URL}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

export const pwMailsend = async (email, pin) => {
  const requestBody = {
    email: email,
    authNum: pin,
  };

  const response = await fetch(`${API_BASE_URL}/auth/findPw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
export const resetPw = async (email, pass, passcon) => {
  const requestBody = {
    password: pass,
    confirmPassword: passcon,
    email: email,
  };

  const response = await fetch(`${API_BASE_URL}/auth/resetPw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

// 엑세스 토큰 재발급
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await apiClient.get("/auth/newToken", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { accessToken } = response.data;

    // 새 Access Token을 localStorage에 저장
    localStorage.setItem("accessToken", accessToken);

    console.log("Access Token 갱신 성공:", accessToken);

    return accessToken;
  } catch (error) {
    console.error("Access Token 갱신 실패:", error.response?.data || error);
    throw error;
  }
};

// // 리프레시토큰 재발급
// export const refreshTokens = async (refreshToken) => {
//   try {
//     const response = await apiClient.get("/auth/newrefreshToken", {
//       headers: {
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     });

//     const { refreshToken: newRefreshToken } = response.data;

//     // 새 Refresh Token을 localStorage에 저장
//     localStorage.setItem("refreshToken", newRefreshToken);

//     console.log("Refresh Token 갱신 성공:", newRefreshToken);
//     return newRefreshToken;
//   } catch (error) {
//     console.error("Refresh Token 갱신 실패:", error.response?.data || error);
//     throw error;
//   }
// };
