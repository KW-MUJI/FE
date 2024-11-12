// src/api/authApi.js
import apiClient from "./index.js";

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
