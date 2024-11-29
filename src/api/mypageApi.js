// src/api.js
import axios from "axios";
import { apiClient } from "./index";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // 기본 API URL

export const CheckPassword = async (pass, accessToken) => {
  try {
    const formData = new FormData();
    formData.append("password", pass);
    console.log(pass.password);

    const response = await fetch(`${API_BASE_URL}/mypage/checkPw`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(pass.password),
    });
    console.log(response);
    return response.status;
  } catch (error) {
    console.error("[ERROR] Update Project:", error.response || error.message);
    throw error;
  }
};

export const deleteUser = async (accessToken) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/mypage/deleteUser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.code === 200) {
      alert(response.data.data); // "홍길동의 포트폴리오 삭제" 메시지
    } else {
      alert("회원 탈퇴가 실패했습니다.");
    }

    return response.data.code;
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    alert("회원 탈퇴 중 오류가 발생했습니다.");
  }
};
// mypageApi.js
export const getUserInfo = async (accessToken) => {
  const response = await fetch(`http://15.165.62.195/mypage/update`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};
// mypageApi.js
export const updateUserInfo = async (accessToken, formData) => {
  const response = await axios.patch(
    `http://15.165.62.195/mypage/update`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log(response);
  return response;
};

export const getInfo = async (accessToken) => {
  const response = await axios.get(`http://15.165.62.195/mypage`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}
export const addPortfolio = async (accessToken, formData) => {
  const response = await axios.post(
    `http://15.165.62.195/mypage/add`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
}
export const deletePortfolio = async (accessToken, id) => {
  const response = await axios.delete(
    `http://15.165.62.195/mypage/deleteResume/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.data;
}
