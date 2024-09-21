import React, { useState } from 'react';
import styles from '../styles/Survey.module.css';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Survey = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const questions = [
        { id: '패션 앱 관련 설문조사', text: '안녕하세요!! 저는 패션쪽 마케팅을 준비하고 있는 3학년입니다. 패션 앱 관련 아이디어를 얻기 위해, 설문조사 부탁드립니다:)', startDate: '2024-09-21', endDate: '2024-10-10' },
    ];
    const [filteredQuestions, setFilteredQuestions] = useState(questions);
    const navigate = useNavigate();
    const questionsPerPage = 8; // 한 페이지에 보여줄 질문 수
    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage); // 총 페이지 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

    const goToPost = () => {
        navigate("/survey_join");
    };

    const onChangeForm = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const results = questions.filter(question =>
            question.id.includes(searchTerm)
        );
        setFilteredQuestions(results);
        setCurrentPage(1); // 검색 시 첫 페이지로 초기화
    };

    const calculateDday = (endDate) => {
        const today = moment();
        const end = moment(endDate);
        return end.diff(today, 'days');
    };

    const formatPeriod = (startDate, endDate) => {
        const start = moment(startDate).format('YYYY.MM.DD');
        const end = moment(endDate).format('YYYY.MM.DD');
        return `${start} ~ ${end}`;
    };

    const renderPagination = () => {
        const pages = [];
        const maxPagesToShow = 5; // 최대 페이지 번호 표시 수
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <span
                    key={i}
                    className={`${styles.pageNumber} ${currentPage === i ? styles.active : ''}`}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </span>
            );
        }

        return (
            <div className={styles.pagination}>
                <span
                    className={`${styles.arrow} ${currentPage === 1 ? styles.disabled : ''}`}
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 5L16 19L5 12L16 5Z" fill="#1D1B20" />
                    </svg>
                </span>
                {pages}
                <span
                    className={`${styles.arrow} ${currentPage === totalPages ? styles.disabled : ''}`}
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 19V5L19 12L8 19Z" fill="#1D1B20" />
                    </svg>
                </span>
            </div>
        );
    };


    return (
        <div>
            <div className={styles.survey_container}>
                <div className={styles.top_container}>
                    <p> 설문조사 </p>
                    <div className={styles.write}>
                        <Link to="/survey_write"><svg width="50" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.6331H22.5M17.25 2.38308C17.7141 1.91895 18.3436 1.6582 19 1.6582C19.325 1.6582 19.6468 1.72222 19.9471 1.84659C20.2474 1.97097 20.5202 2.15326 20.75 2.38308C20.9798 2.61289 21.1621 2.88572 21.2865 3.18598C21.4109 3.48625 21.4749 3.80807 21.4749 4.13308C21.4749 4.45808 21.4109 4.7799 21.2865 5.08017C21.1621 5.38044 20.9798 5.65326 20.75 5.88308L6.16667 20.4664L1.5 21.6331L2.66667 16.9664L17.25 2.38308Z" stroke="#1E1E1E" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>글쓰기</Link>
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
                        {/* SVG 코드 */}
                    </svg>
                </div>
                <div onClick={goToPost} className={styles.post_container}>
                    {filteredQuestions.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage).map(question => {
                        const dday = calculateDday(question.endDate);
                        return (
                            <div key={question.id} className={styles.question}>
                                <p className={dday >= 0 ? styles.line : styles.deadline}>
                                    {dday >= 0 ? `D-${dday}` : '마감'}
                                </p>
                                <h1>{question.id}</h1>
                                <h2>{question.text}</h2>
                                <h3>{formatPeriod(question.startDate, question.endDate)}</h3>
                            </div>
                        );
                    })}
                </div>
                {renderPagination()}
            </div>
        </div>
    );
};

export default Survey;
