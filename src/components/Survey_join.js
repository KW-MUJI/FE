import React, { useState } from 'react';
import styles from '../styles/Survey_join.module.css';
import { Link } from 'react-router-dom';

// 회원가입 컴포넌트
const SurveyJoin = () => {
    const title = '패션 앱 관련 설문조사';
    const content = '안녕하세요!! 저는 패션쪽 마케팅을 준비하고 있는 3학년입니다.\n패션 앱 관련 아이디어를 얻기 위해, 설문조사 부탁드립니다:)';
    const [questions, setQuestions] = useState([
        { text: '성별', type: 'multipleChoice', options: ['남성', '여성'] },
        { text: '무신사 얼마나 사용?', type: 'multipleChoice', options: ['0~1', '2~3', '4~5', '6~'] },
        { text: '무신사 한 단어로?', type: 'shortAnswer', options: [''] },
    ]);
    const [surveyDescription, setSurveyDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.survey_container}>
            <h1>설문조사 참여하기</h1>
            <div className={styles.post}>
                <h2>{title}</h2>
                <h3>{content}</h3>
            </div>
            {questions.map((q, index) => (
                <div key={index} className={styles.quest_box}>
                    <p className={styles.quest}>{q.text}</p>
                    {q.type === 'multipleChoice' && (
                        <div>
                            {q.options.map((option, idx) => (
                                <div key={idx} className={styles.multipleChoice}>
                                    <input className={styles.radio} type="radio" />
                                    <span className={styles.text}>{q.options[idx]}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {q.type === 'shortAnswer' && (
                        <div>
                            <input
                                className={styles.shortAnswer}
                                type="text"
                                value={surveyDescription}
                                onChange={(e) => setSurveyDescription(e.target.value)}
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
