import React, { useState } from 'react';
import styles from '../styles/Survey.module.css';
import { Link,useNavigate } from 'react-router-dom';

// 회원가입 컴포넌트
const Survey = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [questions, setQuestions] = useState([
        { id: '패션 앱 관련 설문조사', text: '안녕하세요!! 저는 패션쪽 마케팅을 준비하고 있는 3학년입니다.  패션 앱 관련 아이디어를 얻기 위해, 설문조사 부탁드립니다:)' },
        { id: 'asd', text: 'ㅁㄴㅇㅁㄴㅇㄻㅇㄻㅇ' },
        { id: 'ㅁㄴㅇ', text: 'asdfasdfasdf' },
        { id: 'asd', text: 'ㅁㄴㅇㅁㄴㅇㄻㅇㄻㅇ' }
    ]);
    const [filteredQuestions, setFilteredQuestions] = useState(questions);
    const navigate = useNavigate();
    const goToPost = () => {
        navigate("/survey_join");
      }

    const onChangeForm = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const results = questions.filter(question =>
            question.id.includes(searchTerm)
        );
        setFilteredQuestions(results);
    };

    return (
        <div>
            <div className={styles.survey_container}>
                <div className={styles.top_container}>
                    <p> 설문조사 </p>
                    <div className={styles.write}>
                        <Link to="/survey_write">
                            <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.6331H22.5M17.25 2.38308C17.7141 1.91895 18.3436 1.6582 19 1.6582C19.325 1.6582 19.6468 1.72222 19.9471 1.84659C20.2474 1.97097 20.5202 2.15326 20.75 2.38308C20.9798 2.61289 21.1621 2.88572 21.2865 3.18598C21.4109 3.48625 21.4749 3.80807 21.4749 4.13308C21.4749 4.45808 21.4109 4.7799 21.2865 5.08017C21.1621 5.38044 20.9798 5.65326 20.75 5.88308L6.16667 20.4664L1.5 21.6331L2.66667 16.9664L17.25 2.38308Z" stroke="#1E1E1E" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg> 글쓰기
                        </Link>
                    </div>
                </div>
                <div className={styles.search_container}>
                    <input className={styles.search}
                        type="text"
                        name="search"
                        placeholder="검색할 내용을 입력하세요"
                        onChange={onChangeForm}
                    />
                    <svg className={styles.search_icon} onClick={handleSearch} width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.2167 29.25L16.5042 19.275C15.7333 19.9083 14.8469 20.4097 13.8448 20.7792C12.8427 21.1486 11.7764 21.3333 10.6458 21.3333C7.84514 21.3333 5.47483 20.3372 3.5349 18.3448C1.59497 16.3524 0.625 13.9181 0.625 11.0417C0.625 8.16528 1.59497 5.7309 3.5349 3.73854C5.47483 1.74618 7.84514 0.75 10.6458 0.75C13.4465 0.75 15.8168 1.74618 17.7568 3.73854C19.6967 5.7309 20.6667 8.16528 20.6667 11.0417C20.6667 12.2028 20.4868 13.2979 20.1271 14.3271C19.7674 15.3562 19.2792 16.2667 18.6625 17.0583L28.375 27.0333L26.2167 29.25ZM10.6458 18.1667C12.5729 18.1667 14.2109 17.474 15.5599 16.0885C16.9089 14.7031 17.5833 13.0208 17.5833 11.0417C17.5833 9.0625 16.9089 7.38021 15.5599 5.99479C14.2109 4.60938 12.5729 3.91667 10.6458 3.91667C8.71875 3.91667 7.08073 4.60938 5.73177 5.99479C4.38281 7.38021 3.70833 9.0625 3.70833 11.0417C3.70833 13.0208 4.38281 14.7031 5.73177 16.0885C7.08073 17.474 8.71875 18.1667 10.6458 18.1667Z" fill="#B3B3B3" />
                    </svg>
                </div>
                <div onClick={goToPost} className={styles.post_container}>
                    {filteredQuestions.map(question => (
                        <div className={styles.question}>
                            <h2>{question.id}</h2>
                            <p>{question.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Survey;
