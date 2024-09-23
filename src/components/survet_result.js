import React, { useState } from 'react';
import styles from '../styles/SurveyResult.module.css'; // CSS 파일 임포트

const SurveyResult = () => {
    const [currentResponseIndex, setCurrentResponseIndex] = useState(0);

    const surveyData = [
        {
            title: '패션 앱 관련 설문조사',
            content: '안녕하세요!! 저는 패션쪽 마케팅을 준비하고 있는 3학년입니다.\n패션 앱 관련 아이디어를 얻기 위해, 설문조사 부탁드립니다:)',
            startDate: '2024-09-21',
            endDate: '2024-10-10',
            questions: [
                { text: '성별', type: 'multipleChoice', options: ['남성', '여성'] },
                { text: '무신사 얼마나 사용?', type: 'multipleChoice', options: ['0~1', '2~3', '4~5', '6~'] },
                { text: '무신사 한 단어로?', type: 'shortAnswer' },
                { text: '한마디', type: 'shortAnswer' }
            ]
        }
    ];

    const surveyResponses = [
        {
            title: '패션 앱 관련 설문조사',
            responses: [
                { question: '성별', answer: '여성' },
                { question: '무신사 얼마나 사용?', answer: '2~3' },
                { question: '무신사 한 단어로?', answer: '다양성' },
                { question: '한마디', answer: '무신사는 항상 새로운 트렌드를 반영해서 좋습니다. 더 많은 브랜드가 추가되면 좋겠어요!' }
            ]
        },
        {
            title: '패션 앱 관련 설문조사',
            responses: [
                { question: '성별', answer: '남성' },
                { question: '무신사 얼마나 사용?', answer: '4~5' },
                { question: '무신사 한 단어로?', answer: '트렌디' },
                { question: '한마디', answer: '좋은 아이디어가 많았으면 좋겠어요!' }
            ]
        },
        {
            title: '패션 앱 관련 설문조사',
            responses: [
                { question: '성별', answer: '여성' },
                { question: '무신사 얼마나 사용?', answer: '0~1' },
                { question: '무신사 한 단어로?', answer: '기본' },
                { question: '한마디', answer: '기본적인 아이템이 많이 필요해요.' }
            ]
        },
        {
            title: '패션 앱 관련 설문조사',
            responses: [
                { question: '성별', answer: '남성' },
                { question: '무신사 얼마나 사용?', answer: '6~' },
                { question: '무신사 한 단어로?', answer: '최신' },
                { question: '한마디', answer: '항상 새로운 스타일을 제공해줘서 좋아요.' }
            ]
        }
    ];

    const handleNext = () => {
        if (currentResponseIndex < surveyResponses.length - 1) {
            setCurrentResponseIndex(currentResponseIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentResponseIndex > 0) {
            setCurrentResponseIndex(currentResponseIndex - 1);
        }
    };

    return (
        <div className={styles.survey_container}>
            <h1>설문조사 결과</h1>
            <div className={styles.post}>
                <h2>{surveyResponses[currentResponseIndex].title}</h2>
                <p>{formatPeriod(surveyData[0].startDate, surveyData[0].endDate)}</p>
                <h3>{surveyData[0].content}</h3>
            </div>
            <div className={styles.name_box}>
            <p className={styles.name}>응답자 {currentResponseIndex + 1}</p>
            </div>
            {surveyData[0].questions.map((question, index) => (
                <div key={index} className={styles.quest_box}>
                    <p className={styles.quest}>{question.text}</p>
                    {question.type === 'multipleChoice' && (
                        <div>
                            {question.options.map((option, idx) => (
                                <div key={idx} className={styles.multipleChoice}>
                                    <input
                                        className={styles.radio}
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={surveyResponses[currentResponseIndex].responses[index].answer === option} // 체크 여부 설정
                                        readOnly // 읽기 전용으로 설정
                                    />
                                    <span className={styles.text}>{option}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === 'shortAnswer' && (
                        <div>
                            <input
                                className={styles.shortAnswer}
                                type="text"
                                placeholder={surveyResponses[currentResponseIndex].responses[index].answer}
                                readOnly
                            />
                        </div>
                    )}
                </div>
            ))}
            <div className={styles.arrows}>
            <svg
                className={`${styles.arrow} ${currentResponseIndex === 0 ? styles.disabled : styles.active}`}
                width="51" height="28" viewBox="0 0 16 28" fill="none" onClick={handlePrev}
            >
                <path d="M14 26L2 14L14 2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg
                className={`${styles.arrow} ${currentResponseIndex === surveyResponses.length - 1 ? styles.disabled : styles.active}`}
                width="51" height="28" viewBox="0 0 16 28" fill="none" onClick={handleNext}
            >
                <path d="M2 26L14 14L2 2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </div>
        </div>
    );
}

const formatPeriod = (startDate, endDate) => {
    return `${startDate} ~ ${endDate}`;
}

export default SurveyResult;
