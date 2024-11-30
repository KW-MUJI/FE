import React, { useState, useEffect } from 'react';
import styles from '../styles/Survey_write.module.css';
import { useNavigate } from "react-router-dom";
import { surveyCreate } from '../api/surveyApi';
import { useAuth } from '../contexts/AuthContext';
const SurveyWrite = () => {
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyDescription, setSurveyDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentType, setCurrentType] = useState('multipleChoice');
    const [options, setOptions] = useState(['', '']); // 기본 2개의 옵션
    const [selectDate, setSelectDate] = useState(null); //날짜
    const navigate = useNavigate();
    const {accessToken} = useAuth();
    useEffect(() => {
      if (!accessToken) {
        alert("로그인 상태가 아닙니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    }, [accessToken, navigate]);
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
        if (questions.length > 1)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 유효성 검사
        if (!surveyTitle.trim()) {
            alert('설문 제목을 입력해 주세요.');
            return;
        }
        if (!surveyDescription.trim()) {
            alert('설문 설명을 입력해 주세요.');
            return;
        }
        if (!selectDate) {
            alert('마감일을 설정해 주세요.');
            return;
        }
        if (questions.length === 0) {
            alert('질문을 추가해 주세요.');
            return;
        }
        for (const question of questions) {
            if (!question.text.trim()) {
                alert('모든 질문에 내용을 입력해 주세요.');
                return;
            }
            if (question.type === 'multipleChoice') {
                if (question.options.length < 2) {
                    alert(`질문 "${question.text}"은(는) 최소 2개의 옵션을 가져야 합니다.`);
                    return;
                }
                for (const option of question.options) {
                    if (!option.trim()) {
                        alert(`질문 "${question.text}"의 모든 옵션에 내용을 입력해 주세요.`);
                        return;
                    }
                }
            }
        }
    
        const formattedQuestions = questions.map(q => {
            if (q.type === 'shortAnswer') {
                return {
                    questionText: q.text,
                    questionType: 'TEXT'
                };
            } else if (q.type === 'multipleChoice') {
                return {
                    questionText: q.text,
                    questionType: 'CHOICE',
                    choices: q.options.map(option => ({ choiceText: option })).filter(option => option.choiceText.trim()) // 빈 옵션 제외
                };
            }
            return null;
        }).filter(q => q !== null); // null 제외
    
        const surveyData = {
            title: surveyTitle,
            description: surveyDescription,
            questions: formattedQuestions,
            endDate: selectDate ? selectDate.toISOString().split('T')[0] : null // yyyy-MM-dd 형식으로 변환
        };
    
        console.log('서버로 전송할 데이터:', surveyData);
        try {
            const response = await surveyCreate(accessToken, surveyData);
    
            if (response.ok) {
                alert('설문이 성공적으로 등록되었습니다.');
                navigate(`/survey`);
            } else {
                alert('설문 등록 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('서버 요청 중 오류:', error);
            alert('서버 요청 중 오류가 발생했습니다.');
        }
    };
    
    

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        console.log("선택된 마감일:", selectedDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 오늘의 시간 부분을 초기화

        if (selectedDate < today) {
            alert(`마감일은 오늘 이후로 설정해야 합니다.`);
            setSelectDate(null); // 잘못된 날짜일 경우 상태 초기화
            return;
        }

        setSelectDate(selectedDate); // 상태 값 업데이트
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
                                                    {/* 옵션이 2개 이상일 때만 삭제 버튼 표시 */}
                                                    {q.options.length > 2 && idx > 1 && (
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
                                                    placeholder="답변을 입력해주세요"
                                                    disabled
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.btn}>
                                    <svg className={styles.plus} width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleAddQuestion}>
                                        <path d="M17 10.3333V23.6667M10.3333 17H23.6667M5.33333 2H28.6667C30.5076 2 32 3.49238 32 5.33333V28.6667C32 30.5076 30.5076 32 28.6667 32H5.33333C3.49238 32 2 30.5076 2 28.6667V5.33333C2 3.49238 3.49238 2 5.33333 2Z" stroke="#B3B3B3" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <svg className={styles.delete} width="30" height="30" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleDeleteQuestion(index)}>
                                        <path d="M2 8.99967H5.33333M5.33333 8.99967H32M5.33333 8.99967V32.333C5.33333 33.2171 5.68452 34.0649 6.30964 34.69C6.93477 35.3152 7.78261 35.6663 8.66667 35.6663H25.3333C26.2174 35.6663 27.0652 35.3152 27.6904 34.69C28.3155 34.0649 28.6667 33.2171 28.6667 32.333V8.99967M10.3333 8.99967V5.66634C10.3333 4.78229 10.6845 3.93444 11.3096 3.30932C11.9348 2.6842 12.7826 2.33301 13.6667 2.33301H20.3333C21.2174 2.33301 22.0652 2.6842 22.6904 3.30932C23.3155 3.93444 23.6667 4.78229 23.6667 5.66634V8.99967M13.6667 17.333V27.333M20.3333 17.333V27.333" stroke="#B3B3B3" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.group}>
                    <div className={styles.date_group}>
                        <label htmlFor="date-select" className={styles.date_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none" className={styles.date_icon}>
                                <path d="M20 2.5V7.5M10 2.5V7.5M3.75 12.5H26.25M6.25 5H23.75C25.1307 5 26.25 6.11929 26.25 7.5V25C26.25 26.3807 25.1307 27.5 23.75 27.5H6.25C4.86929 27.5 3.75 26.3807 3.75 25V7.5C3.75 6.11929 4.86929 5 6.25 5Z"
                                    stroke="#1E1E1E"
                                    strokeWidth="2.4375"  // 수정된 부분
                                    strokeLinecap="round"  // 수정된 부분
                                    strokeLinejoin="round"  // 수정된 부분
                                />
                            </svg>
                            마감일 설정
                        </label>
                        <input
                            type="date"
                            id="date-select"
                            // style={{ opacity: 0, position: 'absolute'}} // 입력 필드를 숨김
                            onChange={handleDateChange}
                        />
                    </div>
                    <button className={styles.submit} type="submit" onClick={handleSubmit}>발행</button>
                </div>
            </div>
        </div>
    );
};

export default SurveyWrite;
