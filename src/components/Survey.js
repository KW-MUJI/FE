import React, { useState } from 'react';
import styles from '../styles/Survey.module.css';
import { Link, useNavigate } from 'react-router-dom';

// 회원가입 컴포넌트
const Survey = () => {
    const onChangeForm = (e) => {
        const { value } = e.target;

    };

    return (
        <div>
            <div className={styles.survey_container}>
                <div className={styles.top_container}>
                    <p> 설문조사 </p>
                    <Link to="/survey_write">글쓰기</Link>
                </div>
                <div>
                    <input className={styles.search}
                        type="text"
                        name="search"
                        placeholder="검색할 내용을 입력하세요"
                        onChange={onChangeForm}
                    />
                </div>
                <div className="post_container">
                    게시물
                </div>
            </div>
        </div>
    );
};

export default Survey;