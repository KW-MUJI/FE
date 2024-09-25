import React, { useState } from 'react';
import styles from '../styles/My_survey.module.css'; // CSS 파일 임포트

const MySurvey = () => {
    const [questions, setQuestions] = useState([
        { id: 1, title: '패션 앱 관련 설문조사', endDate: '2024-09-10' },
        { id: 2, title: '헬스 앱 관련 설문조사', endDate: '2024-10-15' },
    ]);

    const currentDate = new Date(); // 현재 날짜 가져오기

    const handleEndSurvey = (id) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === id ? { ...q, endDate: new Date(currentDate.setDate(currentDate.getDate() - 1)).toISOString().split('T')[0] } : q
            )
        );
    };

    const handleDeleteSurvey = (id) => {
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    };

    return (
        <div className={styles.container}>
            <h1>
                <svg width="27" height="33" viewBox="0 0 27 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4923 1.91699H4.78245C4.00604 1.91699 3.26142 2.22428 2.71242 2.77126C2.16341 3.31824 1.85498 4.06011 1.85498 4.83366V28.167C1.85498 28.9405 2.16341 29.6824 2.71242 30.2294C3.26142 30.7764 4.00604 31.0837 4.78245 31.0837H22.3473C23.1237 31.0837 23.8683 30.7764 24.4173 30.2294C24.9663 29.6824 25.2747 28.9405 25.2747 28.167V10.667M16.4923 1.91699L25.2747 10.667M16.4923 1.91699V10.667H25.2747M19.4198 17.9587H7.70992M19.4198 23.792H7.70992M10.6374 12.1253H7.70992" stroke="#8B0B02" strokeWidth="2.92747" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                MY 설문
            </h1>
            {questions.map((q) => (
                <div key={q.id} className={styles.survey}>
                    <p className={styles.quest}>{q.title}</p>
                    <div className={styles.buttons}>
                        <svg 
                            className={styles.icon} 
                            width="34" 
                            height="86" 
                            viewBox="0 0 34 38" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleDeleteSurvey(q.id)} // 아이콘 클릭 시 삭제
                        >
                            <path d="M2 8.99967H5.33333M5.33333 8.99967H32M5.33333 8.99967V32.333C5.33333 33.2171 5.68452 34.0649 6.30964 34.69C6.93477 35.3152 7.78261 35.6663 8.66667 35.6663H25.3333C26.2174 35.6663 27.0652 35.3152 27.6904 34.69C28.3155 34.0649 28.6667 33.2171 28.6667 32.333V8.99967M10.3333 8.99967V5.66634C10.3333 4.78229 10.6845 3.93444 11.3096 3.30932C11.9348 2.6842 12.7826 2.33301 13.6667 2.33301H20.3333C21.2174 2.33301 22.0652 2.6842 22.6904 3.30932C23.3155 3.93444 23.6667 4.78229 23.6667 5.66634V8.99967M13.6667 17.333V27.333M20.3333 17.333V27.333" stroke="#8B0B02" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <button onClick={() => handleEndSurvey(q.id)} disabled={new Date(q.endDate) < currentDate}>설문종료</button>
                        <button>결과보기</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MySurvey;
