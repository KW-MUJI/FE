import React, { useState, useEffect } from 'react';
import styles from '../styles/Survey.module.css';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext.js";
import { fetchSurveyList } from '../api/surveyApi.js';
const Survey = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [surveys, setSurveys] = useState([]);
    const [filteredSurveys, setFilteredSurveys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const questionsPerPage = 8;
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const goToPost = (surveyId) => {
        navigate(`/survey_join/${surveyId}`);
    };

    const onChangeForm = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredData = surveys.filter(survey =>
            survey.title.toLowerCase().includes(lowercasedFilter) ||
            survey.description.toLowerCase().includes(lowercasedFilter)
        );
        setFilteredSurveys(filteredData);
        setCurrentPage(1);
        setTotalPages(Math.ceil(filteredData.length / questionsPerPage));
    };

    const fetchSurveys = async () => {
        try {
            const response = await fetchSurveyList(accessToken);
            const { currentPage, totalPages, surveys } = response;

            setCurrentPage(currentPage);
            setTotalPages(totalPages);
            setSurveys(surveys);
            setFilteredSurveys(surveys); // 데이터를 받아온 후 바로 필터링된 설문 데이터 설정
            setCurrentPage(1);
        } catch (error) {
            console.error('Error fetching surveys, using mock data:', error);

        }
    };

    useEffect(() => {
        fetchSurveys(); // 컴포넌트가 마운트될 때 데이터 요청
    }, []);

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
        const maxPagesToShow = 5;
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
                        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.6331H22.5M17.25 2.38308C17.7141 1.91895 18.3436 1.6582 19 1.6582C19.325 1.6582 19.6468 1.72222 19.9471 1.84659C20.2474 1.97097 20.5202 2.15326 20.75 2.38308C20.9798 2.61289 21.1621 2.88572 21.2865 3.18598C21.4109 3.48625 21.4749 3.80807 21.4749 4.13308C21.4749 4.45808 21.4109 4.7799 21.2865 5.08017C21.1621 5.38044 20.9798 5.65326 20.75 5.88308L6.16667 20.4664L1.5 21.6331L2.66667 16.9664L17.25 2.38308Z" stroke="#1E1E1E" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <Link to="/survey_write"> 글쓰기</Link>
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
                        <path d="M30.2376 33.25L20.533 23.275C19.7628 23.9083 18.8771 24.4097 17.8758 24.7792C16.8745 25.1486 15.8091 25.3333 14.6794 25.3333C11.881 25.3333 9.51263 24.3372 7.57428 22.3448C5.63592 20.3524 4.66675 17.9181 4.66675 15.0417C4.66675 12.1653 5.63592 9.7309 7.57428 7.73854C9.51263 5.74618 11.881 4.75 14.6794 4.75C17.4778 4.75 19.8462 5.74618 21.7846 7.73854C23.7229 9.7309 24.6921 12.1653 24.6921 15.0417C24.6921 16.2028 24.5124 17.2979 24.153 18.3271C23.7935 19.3562 23.3057 20.2667 22.6896 21.0583L32.3942 31.0333L30.2376 33.25ZM14.6794 22.1667C16.6049 22.1667 18.2416 21.474 19.5895 20.0885C20.9374 18.7031 21.6113 17.0208 21.6113 15.0417C21.6113 13.0625 20.9374 11.3802 19.5895 9.99479C18.2416 8.60938 16.6049 7.91667 14.6794 7.91667C12.7539 7.91667 11.1172 8.60938 9.76936 9.99479C8.4215 11.3802 7.74757 13.0625 7.74757 15.0417C7.74757 17.0208 8.4215 18.7031 9.76936 20.0885C11.1172 21.474 12.7539 22.1667 14.6794 22.1667Z" fill="#B3B3B3" />
                    </svg>
                </div>
                <div className={styles.post_container}>
                    {filteredSurveys.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage).map(survey => {
                        const dday = calculateDday(survey.endDate);
                        return (
                            <div key={survey.surveyId} className={styles.question} onClick={() => goToPost(survey.surveyId)}>
                                <p className={dday >= 0 ? styles.line : styles.deadline}>
                                    {dday >= 0 ? dday == 0 ? 'D-Day' :`D-${dday}` : '마감'}
                                </p>
                                <h1>{survey.title}</h1>
                                <h2>{survey.description}</h2>
                                <h3>{formatPeriod(survey.createdAt, survey.endDate)}</h3>
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
