import React, { useState, useEffect } from 'react';
import styles from '../styles/Survey_write.module.css';

const SurveyWrite = () => {
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyDescription, setSurveyDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentType, setCurrentType] = useState('multipleChoice');
    const [options, setOptions] = useState(['', '']); // 기본 2개의 옵션

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: currentQuestion, type: currentType, options }]);
        setCurrentQuestion('');
        setOptions(['', '']);
    };
    useEffect(() => {
        // 컴포넌트가 처음 마운트될 때 기본 질문 추가
        setQuestions([{ text: '', type: 'multipleChoice', options: ['', ''] }]);
    }, [])
    const handleDeleteQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = (questionIndex) => {
        const newQuestions = [...questions];
        if (newQuestions[questionIndex]) {
            newQuestions[questionIndex].options.push('');
            setQuestions(newQuestions);
        }
    };

    const handleDeleteOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        if (newQuestions[questionIndex].options.length > 2) {
            newQuestions[questionIndex].options.splice(optionIndex, 1);
            setQuestions(newQuestions);
        }
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].text = value;
        setQuestions(newQuestions);
    };

    const handleTypeChange = (index, type) => {
        const newQuestions = [...questions];
        newQuestions[index].type = type;
        setQuestions(newQuestions);
    };

    const handleOptionForQuestionChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('설문 제목:', surveyTitle);
        console.log('설문 설명:', surveyDescription);
        console.log('질문 목록:', questions);
    };

    return (
        <div>
            <div className={styles.survey_container}>
                <div className={styles.top_container}>
                    <p>설문조사 글쓰기</p>
                </div>
                <div className={styles.post}>
                    <input
                        className={styles.post_title}
                        type="text"
                        value={surveyTitle}
                        onChange={(e) => setSurveyTitle(e.target.value)}
                        placeholder="설문 제목"
                    />
                    <input
                        className={styles.post_contents}
                        type="text"
                        value={surveyDescription}
                        onChange={(e) => setSurveyDescription(e.target.value)}
                        placeholder="설문 설명"
                    />
                </div>
                <div>
                    <div>
                        {questions.map((q, index) => (
                            <div className={styles.qwe}>
                                <div className={styles.asd}>
                                    <div key={index} className={styles.quest_box}>
                                        <div className={styles.quest}>
                                            <input
                                                type="text"
                                                value={q.text}
                                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                                placeholder={`설문 ${index + 1}`}
                                            />

                                            <select value={q.type} onChange={(e) => handleTypeChange(index, e.target.value)}>
                                                <option value="multipleChoice">객관식</option>
                                                <option value="shortAnswer">단답식</option>
                                            </select>

                                        </div>
                                        {q.type === 'multipleChoice' && (
                                            <div>
                                                {q.options.map((option, idx) => (
                                                    <div key={idx} className={styles.multipleChoice}>
                                                        <input className={styles.radio} type="radio" />
                                                        <input
                                                            className={styles.text}
                                                            type="text"
                                                            value={option}
                                                            onChange={(e) => handleOptionForQuestionChange(index, idx, e.target.value)}
                                                            placeholder={`옵션 ${idx + 1}`}
                                                        />
                                                        {q.options.length > 2 && (
                                                            <button type="button" onClick={() => handleDeleteOption(index, idx)}>
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <span className={styles.optionButton} type="button" onClick={() => handleAddOption(index)}>
                                                    　옵션 추가　
                                                </span>
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
                                </div>
                                <div className={styles.btn}>
                                    <button className={styles.plus} type="button" onClick={handleAddQuestion}>+</button>
                                    <button className={styles.delete} type="button" onClick={() => handleDeleteQuestion(index)}>x</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className={styles.submit} type="submit" onClick={handleSubmit}>발행</button>
            </div>
        </div>
    );
};

export default SurveyWrite;
