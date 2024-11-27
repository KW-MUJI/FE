// src/api/authApi.js
import { apiClient } from "./index.js";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
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

  const response = await apiClient.fetch(`${API_BASE_URL}/auth/mailSend`, {
    method: "POST",
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

export const verifyPinRequest = async (email, pin) => {
  const requestBody = {
    email: email,
    authNum: pin,
  };

  const response = await apiClient.fetch(`${API_BASE_URL}/auth/authCheck`, {
    method: "POST",
    body: JSON.stringify(requestBody),
  });

  return await response.json();
};

export const signupRequest = async (requestBody) => {
  const response = await apiClient.fetch(`${API_BASE_URL}/auth/signUp`, {
    method: "POST",
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

  const response = await apiClient.fetch(`${API_BASE_URL}/auth/findPw`, {
    method: "POST",
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

  const response = await apiClient.fetch(`${API_BASE_URL}/auth/resetPw`, {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
