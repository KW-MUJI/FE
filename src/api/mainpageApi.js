// src/api.js
import axios from 'axios';

const API_URL = 'http://15.165.62.195:8080'; // 기본 API URL

export const fetchData = async (token, month) => {
    try {
        const response = await axios.get(`${API_URL}/mainpage/${month}`, { // 적절한 엔드포인트로 변경
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data.data; // 필요한 데이터만 리턴
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있도록
    }
};
