import React, { useState, useEffect } from 'react';
import styles from '../styles/Survey_join.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { fetchSurvey, surveySubmit } from '../api/surveyApi';
const SurveyJoin = () => {
    const { surveyId } = useParams(); // URL 파라미터에서 surveyId 추출
    const [survey, setSurvey] = useState(null); // 설문조사 정보를 저장할 상태
    const [answers, setAnswers] = useState({}); // 설문조사 답변 저장 상태
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        try {
            const getSurveyData = async () => {
                const response = await fetchSurvey(accessToken, surveyId);
                setSurvey(response); // API 응답 데이터 설정
            }
            getSurveyData();
        } catch (error) {
            console.error('Error fetching surveys, using mock data:', error);
        }

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
            const response = await surveySubmit(accessToken, surveyId, formattedAnswers);

            navigate(`/survey_complete/${surveyId}`);

        } catch (error) {
            console.error('Error submitting answers:', error.response ? error.response.data : error.message);
            if (error.response.data.code == 409) {
                alert("이미 참여한 설문조사입니다.");
            }
        }


        console.log(formattedAnswers); // 제출된 답변 확인
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
