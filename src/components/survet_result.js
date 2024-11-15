import React, { useState, useEffect } from 'react';
import styles from '../styles/SurveyResult.module.css'; // CSS 파일 임포트
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SurveyResult = () => {
    const [currentResponseIndex, setCurrentResponseIndex] = useState(0);
    const [surveyData, setSurveyData] = useState(null); // 설문조사 데이터 상태
    const [surveyResponses, setSurveyResponses] = useState([]); // 응답 데이터 상태
    const { surveyId } = useParams(); // URL 파라미터에서 surveyId 추출

    useEffect(() => {
        const fetchSurveyResults = async () => {
            try {
                const response = await axios.get(`http://15.165.62.195:8080/mysurvey/result/${surveyId}`, { // URL 수정
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Authorization 헤더 추가
                    }
                });
                
                const data = response.data.data;

                setSurveyData({
                    surveyId: data.surveyId,
                    title: data.title,
                    content: data.description,
                    startDate: data.createdAt,
                    endDate: data.endDate,
                    questions: data.questions.map(q => ({
                        text: q.questionText,
                        type: q.questionType === 'CHOICE' ? 'multipleChoice' : 'shortAnswer',
                        options: q.choices ? q.choices.map(choice => choice.choiceText) : []
                    }))
                });

                // 응답 데이터 가공
                const responses = data.responses.map(response => ({
                    title: data.title,
                    responses: response.answers.map(answer => ({
                        question: answer.questionText,
                        answer: answer.answerText
                    }))
                }));

                setSurveyResponses(responses);
            } catch (error) {
                console.error('Error fetching survey results:', error);
            }
        };

        fetchSurveyResults(); // 컴포넌트 마운트 시 데이터 가져오기
    }, [surveyId]); // 의존성 배열에 surveyId 추가

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

    // 데이터가 로드되지 않은 경우 로딩 메시지 표시
    if (!surveyData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.survey_container}>
            <h1>설문조사 결과</h1>
            <div className={styles.post}>
                <h2>{surveyResponses[currentResponseIndex]?.title}</h2>
                <p>{formatPeriod(surveyData.startDate, surveyData.endDate)}</p>
                <h3>{surveyData.content}</h3>
            </div>
            <div className={styles.name_box}>
                <p className={styles.name}>응답자 {currentResponseIndex + 1}</p>
            </div>
            {surveyData.questions.map((question, index) => (
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
                                        checked={surveyResponses[currentResponseIndex]?.responses[index]?.answer === option} // 체크 여부 설정
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
                                value={surveyResponses[currentResponseIndex]?.responses[index]?.answer || ''} // 안전하게 접근
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
};

const formatPeriod = (startDate, endDate) => {
    return `${startDate} ~ ${endDate}`;
};

export default SurveyResult;
