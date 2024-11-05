import React, { useState, useEffect } from 'react';
import styles from '../styles/SurveyResult.module.css'; // CSS 파일 임포트
import axios from 'axios';

const SurveyResult = () => {
    const [currentResponseIndex, setCurrentResponseIndex] = useState(0);
    const [surveyData, setSurveyData] = useState(null); // 설문조사 데이터 상태
    const [surveyResponses, setSurveyResponses] = useState([]); // 응답 데이터 상태

    useEffect(() => {
        const fetchSurveyResults = async () => {
            try {
                const response = await axios.get('/api/surveys/results'); // API 요청
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

                // Mock 데이터 설정
                const mockData = {
                    code: 200,
                    data: {
                        surveyId: 1,
                        title: '패션 앱 관련 설문조사',
                        description: '안녕하세요!! 저는 패션쪽 마케팅을 준비하고 있는 3학년입니다.\n패션 앱 관련 아이디어를 얻기 위해, 설문조사 부탁드립니다:)',
                        isOngoing: true,
                        createdAt: '2024-08-20',
                        endDate: '2024-09-20',
                        questions: [
                            {
                                questionId: 1,
                                questionText: '성별',
                                questionType: 'CHOICE',
                                choices: [
                                    { choiceId: 1, choiceText: '남성' },
                                    { choiceId: 2, choiceText: '여성' }
                                ]
                            },
                            {
                                questionId: 2,
                                questionText: '무인샵을 얼마나 자주 사용합니까?',
                                questionType: 'CHOICE',
                                choices: [
                                    { choiceId: 1, choiceText: '주 0~1회' },
                                    { choiceId: 2, choiceText: '주 2~3회' },
                                    { choiceId: 3, choiceText: '주 4~5회' },
                                    { choiceId: 4, choiceText: '주 6회 이상' }
                                ]
                            },
                            {
                                questionId: 3,
                                questionText: '무인샵을 주로 사용하는 목적은 무엇입니까?',
                                questionType: 'CHOICE',
                                choices: [
                                    { choiceId: 1, choiceText: '저렴한 가격' },
                                    { choiceId: 2, choiceText: '편리함' },
                                    { choiceId: 3, choiceText: '다양한 상품' }
                                ]
                            },
                            {
                                questionId: 4,
                                questionText: '무인샵에 대한 한 단어 키워드는?',
                                questionType: 'TEXT'
                            },
                            {
                                questionId: 5,
                                questionText: '무인샵에 대한 긍정적인 의견을 입력해주세요.',
                                questionType: 'TEXT'
                            }
                        ],
                        responses: [
                            {
                                responseId: 1,
                                answers: [
                                    { questionId: 1, questionText: '성별', questionType: 'CHOICE', answerText: '여성' },
                                    { questionId: 2, questionText: '무인샵을 얼마나 자주 사용합니까?', questionType: 'CHOICE', answerText: '주 4~5회' },
                                    { questionId: 3, questionText: '무인샵을 주로 사용하는 목적은 무엇입니까?', questionType: 'CHOICE', answerText: '저렴한 가격' },
                                    { questionId: 4, questionText: '무인샵에 대한 한 단어 키워드는?', questionType: 'TEXT', answerText: '편리함' },
                                    { questionId: 5, questionText: '무인샵에 대한 긍정적인 의견을 입력해주세요.', questionType: 'TEXT', answerText: '앞으로도 더 많은 곳에서 활용되었으면 좋겠습니다.' }
                                ]
                            },
                            {
                                responseId: 2,
                                answers: [
                                    { questionId: 1, questionText: '성별', questionType: 'CHOICE', answerText: '남성' },
                                    { questionId: 2, questionText: '무인샵을 얼마나 자주 사용합니까?', questionType: 'CHOICE', answerText: '주 2~3회' },
                                    { questionId: 3, questionText: '무인샵을 주로 사용하는 목적은 무엇입니까?', questionType: 'CHOICE', answerText: '다양한 상품' },
                                    { questionId: 4, questionText: '무인샵에 대한 한 단어 키워드는?', questionType: 'TEXT', answerText: '편리함' },
                                    { questionId: 5, questionText: '무인샵에 대한 긍정적인 의견을 입력해주세요.', questionType: 'TEXT', answerText: '상품이 다양해야 합니다.' }
                                ]
                            }
                        ]
                    }
                };

                // Mock 데이터로 상태 업데이트
                setSurveyData({
                    surveyId: mockData.data.surveyId,
                    title: mockData.data.title,
                    content: mockData.data.description,
                    startDate: mockData.data.createdAt,
                    endDate: mockData.data.endDate,
                    questions: mockData.data.questions.map(q => ({
                        text: q.questionText,
                        type: q.questionType === 'CHOICE' ? 'multipleChoice' : 'shortAnswer',
                        options: q.choices ? q.choices.map(choice => choice.choiceText) : []
                    }))
                });

                // Mock 응답 데이터 가공
                const mockResponses = mockData.data.responses.map(response => ({
                    title: mockData.data.title,
                    responses: response.answers.map(answer => ({
                        question: answer.questionText,
                        answer: answer.answerText
                    }))
                }));

                setSurveyResponses(mockResponses);
            }
        };

        fetchSurveyResults(); // 컴포넌트 마운트 시 데이터 가져오기
    }, []);

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
                <h2>{surveyResponses[currentResponseIndex].title}</h2>
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
                                value={surveyResponses[currentResponseIndex].responses[index].answer}
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
