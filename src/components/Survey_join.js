import React, { useState, useEffect } from 'react';
import styles from '../styles/Survey_join.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const SurveyJoin = () => {
    const { surveyId } = useParams(); // URL 파라미터에서 surveyId 추출
    const [survey, setSurvey] = useState(null); // 설문조사 정보를 저장할 상태
    const [answers, setAnswers] = useState({}); // 설문조사 답변 저장 상태
    const navigate = useNavigate();
    // Mock 데이터
    const mockSurveyData = {
        surveyId: 1,
        title: '패션 앱 관련 설문조사',
        description: '안녕하세요!! 저는 패션쪽 마케팅을 준비하고 있는 3학년입니다.\n패션 앱 관련 아이디어를 얻기 위해, 설문조사 부탁드립니다:)',
        createdAt: '2024-09-21T00:00:00Z',
        endDate: '2024-10-10T00:00:00Z',
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
                questionText: '무신사 얼마나 사용?',
                questionType: 'CHOICE',
                choices: [
                    { choiceId: 1, choiceText: '0~1' },
                    { choiceId: 2, choiceText: '2~3' },
                    { choiceId: 3, choiceText: '4~5' },
                    { choiceId: 4, choiceText: '6~' }
                ]
            },
            {
                questionId: 3,
                questionText: '무신사 한 단어로?',
                questionType: 'TEXT'
            },
            {
                questionId: 4,
                questionText: '한마디',
                questionType: 'TEXT'
            }
        ]
    };
    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const response = await axios.get(`/api/surveys/${surveyId}`); // 설문조사 ID에 따라 데이터 가져오기
                setSurvey(response.data.data); // API 응답 데이터 설정
            } catch (error) {
                console.error('Error fetching survey, using mock data:', error);
                setSurvey(mockSurveyData); // API 호출 실패 시 Mock 데이터 설정
            }
        };
        fetchSurvey();
    }, [surveyId]);

    if (!survey) return <div>Loading...</div>; // 데이터 로딩 중 표시

    const { title, description, createdAt, endDate, questions } = survey;

    const formatPeriod = (startDate, endDate) => {
        const start = moment(startDate).format('YYYY.MM.DD');
        const end = moment(endDate).format('YYYY.MM.DD');
        return `${start} ~ ${end}`;
    };

    const handleOptionChange = (questionIndex, option) => {
        setAnswers({
            ...answers,
            [questionIndex]: option,
        });
    };

    const handleShortAnswerChange = (questionIndex, value) => {
        setAnswers({
            ...answers,
            [questionIndex]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 답변 포맷팅
        const formattedAnswers = questions.map((q, index) => {
            if (q.questionType === 'CHOICE') {
                const selectedChoiceIndex = q.choices.findIndex(choice => choice.choiceText === answers[index]);
                return {
                    questionId: q.questionId,
                    choiceId: selectedChoiceIndex !== -1 ? q.choices[selectedChoiceIndex].choiceId : null,
                };
            } else if (q.questionType === 'TEXT') {
                return {
                    questionId: q.questionId,
                    answerText: answers[index] || '',
                };
            }
            return null;
        }).filter(answer => answer !== null); // null 값 필터링

        try {
            // API 요청 전송
            await axios.post('/api/surveys/submit', { answers: formattedAnswers });
            navigate("/survey_complete");
        } catch (error) {
            console.error('Error submitting answers:', error);
        }

        console.log(formattedAnswers); // 제출된 답변 확인
        navigate("/survey_complete");
    };

    const isSubmitDisabled = () => {
        return questions.some((_, index) => !answers[index]);
    };

    return (
        <div className={styles.survey_container}>
            <h1>설문조사 참여하기</h1>
            <div className={styles.post}>
                <h2>{title}</h2>
                <p>{formatPeriod(createdAt, endDate)}</p>
                <h3>{description}</h3>
            </div>
            {questions.map((q, index) => (
                <div key={q.questionId} className={styles.quest_box}>
                    <p className={styles.quest}>{q.questionText}</p>
                    {q.questionType === 'CHOICE' && (
                        <div>
                            {q.choices.map(choice => (
                                <div key={choice.choiceId} className={styles.multipleChoice}>
                                    <input
                                        className={styles.radio}
                                        type="radio"
                                        name={`question-${index}`} // 각 질문마다 고유한 name 부여
                                        value={choice.choiceText}
                                        checked={answers[index] === choice.choiceText}
                                        onChange={() => handleOptionChange(index, choice.choiceText)}
                                    />
                                    <span className={styles.text}>{choice.choiceText}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {q.questionType === 'TEXT' && (
                        <div>
                            <input
                                className={styles.shortAnswer}
                                type="text"
                                value={answers[index] || ''}
                                onChange={(e) => handleShortAnswerChange(index, e.target.value)}
                                placeholder="답변을 입력해주세요"
                            />
                        </div>
                    )}
                </div>
            ))}
            <button
                className={styles.submit}
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitDisabled()} // 모든 답변이 입력되지 않으면 버튼 비활성화
            >
                제출
            </button>
        </div>
    );
};

export default SurveyJoin;
