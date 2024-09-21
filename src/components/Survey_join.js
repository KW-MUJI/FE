import React, { useState } from 'react';
import styles from '../styles/Survey_join.module.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
// 회원가입 컴포넌트
const SurveyJoin = () => {
    const title = '패션 앱 관련 설문조사';
    const content = '안녕하세요!! 저는 패션쪽 마케팅을 준비하고 있는 3학년입니다.\n패션 앱 관련 아이디어를 얻기 위해, 설문조사 부탁드립니다:)';
    const startDate = '2024-09-21';
    const endDate = '2024-10-10';
    const [questions, setQuestions] = useState([
        { text: '성별', type: 'multipleChoice', options: ['남성', '여성'] },
        { text: '무신사 얼마나 사용?', type: 'multipleChoice', options: ['0~1', '2~3', '4~5', '6~'] },
        { text: '무신사 한 단어로?', type: 'shortAnswer' },
        { text: '한마디', type: 'shortAnswer' }
    ]);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const goToComplete = () => {
        navigate("/survey_complete");
    }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(answers); // 제출된 답변 확인
        goToComplete();
    };

    return (
        <div className={styles.survey_container}>
            <h1>설문조사 참여하기</h1>
            <div className={styles.post}>
                <h2>{title}</h2>
                <p>{formatPeriod(startDate, endDate)}</p>
                <h3>{content}</h3>
            </div>
            {questions.map((q, index) => (
                <div key={index} className={styles.quest_box}>
                    <p className={styles.quest}>{q.text}</p>
                    {q.type === 'multipleChoice' && (
                        <div>
                            {q.options.map((option, idx) => (
                                <div key={idx} className={styles.multipleChoice}>
                                    <input
                                        className={styles.radio}
                                        type="radio"
                                        name={`question-${index}`} // 각 질문마다 고유한 name 부여
                                        value={option}
                                        checked={answers[index] === option} // 선택된 값 확인
                                        onChange={() => handleOptionChange(index, option)} // 선택 시 상태 업데이트
                                    />
                                    <span className={styles.text}>{option}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {q.type === 'shortAnswer' && (
                        <div>
                            <input
                                className={styles.shortAnswer}
                                type="text"
                                value={answers[index] || ''} // 단답식 답변을 answers에서 가져옴
                                onChange={(e) => handleShortAnswerChange(index, e.target.value)} // 선택 시 상태 업데이트
                                placeholder="답변을 입력해주세요"
                            />
                        </div>
                    )}
                </div>
            ))}
            <button className={styles.submit} type="submit" onClick={handleSubmit}>제출</button>
        </div>
    );
};

export default SurveyJoin;
