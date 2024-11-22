// src/api.js
import axios from 'axios';

const API_URL = 'http://15.165.62.195'; // 기본 API URL

export const fetchData = async (token, month) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // 토큰이 있을 경우 Authorization 헤더 추가
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.get(`${API_URL}/mainpage/${month}`, config);
        return response.data.data; // 필요한 데이터만 리턴
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있도록
    }
};
