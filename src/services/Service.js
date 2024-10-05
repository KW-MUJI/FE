//API 호출 로직
import axios from 'axios';
import { calendar as mockCalendar, calendar_add as mockAddCalendar } from '../components/mockData.js';; // Mock 데이터

const CALENDAR_URL = '/api/calendar';


// 일정 조회 yyyy-mm
export const fetchCalendar = async (yearMonth) => {
    try {
        const response = await axios.get(`${CALENDAR_URL}/${yearMonth}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    }
    catch (error) {
        console.warn('실제 API 호출 실패. Mock 데이터를 사용합니다.');
        console.log("Mock 데이터:", mockCalendar); // Mock 데이터 확인
        return mockCalendar.response; // API 호출이 실패하면 Mock 데이터 반환
    }
  };
  

 // 일정 추가
export const addCalendarEvent = async (eventData) => {
    try {
        const response = await axios.post(`${CALENDAR_URL}/add`, eventData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.warn('실제 API 호출 실패. Mock 데이터를 사용합니다.');
        return mockAddCalendar.response; // API 호출이 실패하면 Mock 데이터 반환
    }
};