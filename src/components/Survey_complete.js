import React, { useState } from 'react';
import styles from '../styles/Survey_complete.module.css';
import moment from 'moment';
// 회원가입 컴포넌트
const SurveyComplete = () => {
    const title = '패션 앱 관련 설문조사';
    const content = '안녕하세요!! 저는 패션쪽 마케팅을 준비하고 있는 3학년입니다.\n패션 앱 관련 아이디어를 얻기 위해, 설문조사 부탁드립니다:)';
    const startDate = '2024-09-21';
    const endDate = '2024-10-10';

    const formatPeriod = (startDate, endDate) => {
        const start = moment(startDate).format('YYYY.MM.DD');
        const end = moment(endDate).format('YYYY.MM.DD');
        return `${start} ~ ${end}`;
    };
    return (
        <div className={styles.survey_container}>
            <h1>설문조사 참여하기</h1>
            <div className={styles.post}>
                <h2>{title}</h2>
                <p>{formatPeriod(startDate, endDate)}</p>
                <h3>{content}</h3>
            </div>
            <div className={styles.complete}>
                <p>설문에 참여해 주셔서 감사합니다:)</p>
            </div>
        </div>
    );
};

export default SurveyComplete;
