import React, { useEffect, useState } from 'react';
import styles from '../styles/Survey_complete.module.css';
import moment from 'moment';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fetchSurvey } from '../api/surveyApi';
const SurveyComplete = () => {
    const [surveyData, setSurveyData] = useState(null);
    const { surveyId } = useParams(); // URL 파라미터에서 surveyId 추출
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        try {
            const getSurveyData = async () => {
                const response = await fetchSurvey(accessToken, surveyId);
                setSurveyData(response); // API 응답 데이터 설정
            }
            getSurveyData();
        }catch(error){
            console.error('Error fetching surveys, using mock data:', error);
        }

    }, [surveyId]);

    const formatPeriod = (startDate, endDate) => {
        const start = moment(startDate).format('YYYY.MM.DD');
        const end = moment(endDate).format('YYYY.MM.DD');
        return `${start} ~ ${end}`;
    };

    if (!surveyData) {
        return <div>로딩 중...</div>; // 데이터가 로딩될 때 표시할 내용
    }

    const { title, description, createdAt, endDate } = surveyData;

    return (
        <div className={styles.survey_container}>
            <h1>설문조사 참여하기</h1>
            <div className={styles.post}>
                <h2>{title}</h2>
                <p>{formatPeriod(createdAt, endDate)}</p>
                <h3>{description}</h3>
            </div>
            <div className={styles.complete}>
                <p>설문에 참여해 주셔서 감사합니다:)</p>
            </div>
        </div>
    );
};

export default SurveyComplete;
