import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import styles from '../styles/My_survey.module.css'; // CSS 파일 임포트
import axios from 'axios';

const MySurvey = () => {
    const [surveys, setSurveys] = useState([]);
    const navigate = useNavigate(); // navigate 초기화

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const response = await axios.get(`http://15.165.62.195:8080/mysurvey`, {
                    headers: {
                        'Content-Type': 'application/json', // Content-Type 헤더 추가
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Authorization 헤더 추가
                    }
                });
                const surveysData = response.data.data.map(survey => ({
                    id: survey.surveyId,
                    title: survey.title,
                    description: survey.description,
                    isOngoing: survey.isOngoing, // isOngoing 속성 사용
                    createdAt: survey.createdAt    // 생성일 추가
                }));
                setSurveys(surveysData); // 상태 업데이트
            } catch (error) {
                console.error('Error fetching surveys:', error);
            }
        };

        fetchSurveys(); // 컴포넌트 마운트 시 데이터 가져오기
    }, []);

    const handleEndSurvey = async (id) => {
        try {
            // API 요청으로 설문조사 종료
            await axios.post(`http://15.165.62.195:8080/mysurvey/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            // 상태 업데이트
            setSurveys((prevSurveys) =>
                prevSurveys.map((s) =>
                    s.id === id ? { ...s, isOngoing: false } : s // isOngoing을 false로 설정
                )
            );
        } catch (error) {
            console.error('Error ending survey:', error);
            alert('설문 종료 중 오류가 발생했습니다.'); // 오류 메시지 표시
        }
    };
    
    const handleDeleteSurvey = async (id) => {
        try {
            // API 요청으로 설문조사 삭제
            await axios.delete(`http://15.165.62.195:8080/mysurvey/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            // 상태 업데이트
            setSurveys((prevSurveys) => prevSurveys.filter((s) => s.id !== id));
        } catch (error) {
            console.error('Error deleting survey:', error);
            alert('설문 삭제 중 오류가 발생했습니다.'); // 오류 메시지 표시
        }
    };

    const handleViewResults = (id) => {
        navigate(`/survey_result/${id}`); // 결과 보기 페이지로 이동
    };

    return (
        <div className={styles.container}>
            <h1>
                <svg width="27" height="33" viewBox="0 0 27 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4923 1.91699H4.78245C4.00604 1.91699 3.26142 2.22428 2.71242 2.77126C2.16341 3.31824 1.85498 4.06011 1.85498 4.83366V28.167C1.85498 28.9405 2.16341 29.6824 2.71242 30.2294C3.26142 30.7764 4.00604 31.0837 4.78245 31.0837H22.3473C23.1237 31.0837 23.8683 30.7764 24.4173 30.2294C24.9663 29.6824 25.2747 28.9405 25.2747 28.167V10.667M16.4923 1.91699L25.2747 10.667M16.4923 1.91699V10.667H25.2747M19.4198 17.9587H7.70992M19.4198 23.792H7.70992M10.6374 12.1253H7.70992" stroke="#8B0B02" strokeWidth="2.92747" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                MY 설문
            </h1>
            {surveys.length === 0 ? (
                <p>설문조사가 없습니다.</p> // 데이터가 없을 경우 메시지 표시
            ) : (
                surveys.map((s) => (
                    <div key={s.id} className={styles.survey}>
                        <p className={styles.quest}>{s.title}</p>
                        <div className={styles.buttons}>
                            <svg 
                                className={styles.icon} 
                                width="34" 
                                height="86" 
                                viewBox="0 0 34 38" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => handleDeleteSurvey(s.id)} // 아이콘 클릭 시 삭제
                            >
                                <path d="M2 8.99967H5.33333M5.33333 8.99967H32M5.33333 8.99967V32.333C5.33333 33.2171 5.68452 34.0649 6.30964 34.69C6.93477 35.3152 7.78261 35.6663 8.66667 35.6663H25.3333C26.2174 35.6663 27.0652 35.3152 27.6904 34.69C28.3155 34.0649 28.6667 33.2171 28.6667 32.333V8.99967M10.3333 8.99967V5.66634C10.3333 4.78229 10.6845 3.93444 11.3096 3.30932C11.9348 2.6842 12.7826 2.33301 13.6667 2.33301H20.3333C21.2174 2.33301 22.0652 2.6842 22.6904 3.30932C23.3155 3.93444 23.6667 4.78229 23.6667 5.66634V8.99967M13.6667 17.333V27.333M20.3333 17.333V27.333" stroke="#8B0B02" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <button onClick={() => handleEndSurvey(s.id)} disabled={!s.isOngoing}>설문종료</button> {/* isOngoing에 따라 활성화 */}
                            <button onClick={() => handleViewResults(s.id)}>결과보기</button> {/* 결과 보기 클릭 시 이동 */}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MySurvey;
