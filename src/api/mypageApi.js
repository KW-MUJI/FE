// src/api.js
import axios from 'axios';

const API_URL = 'http://15.165.62.195'; // 기본 API URL

export const CheckPassword = async (pass, accessToken) => {
    try {
      const formData = new FormData();
      formData.append("password", pass);
      console.log(pass.password);
  
      const response = await fetch('http://15.165.62.195/mypage/checkPw', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(pass.password),
    });
  
      return response.data;
    } catch (error) {
      console.error("[ERROR] Update Project:", error.response || error.message);
      throw error;
    }
  };
  
  export const deleteUser = async (accessToken) => {
    
    try {
        const response = await axios.delete(`http://15.165.62.195/mypage/deleteUser`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.data.code === 200) {
            alert(response.data.data); // "홍길동의 포트폴리오 삭제" 메시지
        } else {
            alert('회원 탈퇴가 실패했습니다.');
        }
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
};