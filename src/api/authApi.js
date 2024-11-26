// src/api/authApi.js
import {apiClient} from "./index.js";


const API_URL = 'http://15.165.62.195';
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

  const response = await fetch(`${API_URL}/auth/mailSend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const verifyPinRequest = async (email, pin) => {
  const requestBody = {
    email: email,
    authNum: pin,
  };

  const response = await fetch(`${API_URL}/auth/authCheck`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });


  return await response.json();
};

export const signupRequest = async (requestBody) => {
  const response = await fetch(`${API_URL}/auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const pwMailsend = async (email, pin) => {
  const requestBody = {
    email: email,
    authNum: pin,
  };

  const response = await fetch(`${API_URL}/auth/findPw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};
export const resetPw = async (email, pass, passcon) => {
  const requestBody = {
    password: pass,
    confirmPassword: passcon,
    email: email
  };

  const response = await fetch(`${API_URL}/auth/resetPw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};




