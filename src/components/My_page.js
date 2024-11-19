import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from '../styles/MyPage.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
const MyPage = () => {
    const style = {
        backgroundColor: '#EEF2F6',
    };
    const navigate = useNavigate();
    const goTocheckPw = () => {
        navigate("/checkPw");
    }
    const [myTeams, setMyTeams] = useState([]);
    const [myRecruitTeams, setMyRecruitTeams] = useState([]);
    const [mySurveys, setMySurveys] = useState([]);
    const [myPortfolios, setMyPortfolios] = useState([]);
    const [myAppliedTeams, setMyAppliedTeams] = useState([]);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [emptydata, setEmptydata] = useState(['', '', '']);
    const token = localStorage.getItem('accessToken');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://15.165.62.195/mypage`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = response.data.data;

                setMyTeams(data.projects || []);
                setMyRecruitTeams(data.createdProjects || []);
                setMySurveys(data.surveys || []);
                setMyPortfolios(data.resumes || []);
                setMyAppliedTeams(data.applicationProjects || []);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddPortfolio = async (selectedFile) => {
        if (!selectedFile) {
            alert('파일을 선택해 주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', selectedFile);

        try {
            const response = await axios.post(`http://15.165.62.195/mypage/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.code === 200) {
                alert('포트폴리오가 성공적으로 추가되었습니다.');
                setMyPortfolios(prev => [...prev, { id: response.data.data.id, name: selectedFile.name, createdAt: new Date().toISOString() }]);
                setFile(null);
                window.location.reload();
            }
             else {
                alert('포트폴리오 추가에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error adding portfolio:', error);
            alert('포트폴리오 추가 중 오류가 발생했습니다.');
        }
    };

    const handleDeletePortfolio = async (id, index) => {
    
        try {
            const response = await axios.delete(`http://15.165.62.195/mypage/deleteResume/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            if (response.data.code === 200) {
                alert(response.data.data); // "홍길동의 포트폴리오 삭제" 메시지
                setMyPortfolios(prev => prev.filter((_, i) => i !== index)); // UI에서 포트폴리오 삭제
            } else {
                alert('포트폴리오 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error deleting portfolio:', error);
            alert('포트폴리오 삭제 중 오류가 발생했습니다.');
        }
    };
        

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            handleAddPortfolio(selectedFile); // 파일을 선택하면 포트폴리오 추가 함수 호출
        }
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const formatLastModified = (date) => {
        return date.replace(/-/g, '.');
    };

    return (
        <div style={style}>
            <div className={styles.main_container}>
                <div className={styles.first_container}>
                    <div className={styles.info}>
                        <h1 onClick={goTocheckPw}>김참빛<span>님 &gt;</span></h1>
                        <div className={styles.my}>
                            <p>MY 팀플</p>
                            <p>MY 모집 팀플</p>
                            <p>MY 설문</p>
                        </div>
                        <button className={styles.logout}>로그아웃</button>
                    </div>
                </div>
                <div className={styles.second_container}>
                    <div className={styles.my_container}>
                        <div className={styles.team_section}>
                            <h3>MY 팀플</h3>
                            {myTeams.length > 0 ? (
                                myTeams.map((item, index) => (
                                    <div key={index} className={styles.team}>
                                        <span className={styles.dot}></span>
                                        {item.name}
                                    </div>
                                ))
                            ) : (
                                <div className={styles.team}>
                                    <span className={styles.dot}></span>
                                    팀플이 없습니다.
                                </div>
                            )}
                        </div>
                        <div className={styles.team_section}>
                            <h3>MY 모집 팀플</h3>
                            {myRecruitTeams.length > 0 ? (
                                myRecruitTeams.map((item, index) => (
                                    <div key={index} className={styles.team}>
                                        <span className={styles.dot}></span>
                                        {item.name}
                                        <span className={styles.dday}>{item.isOnGoing ? '진행 중' : '마감'}</span>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.team}>
                                    <span className={styles.dot}></span>
                                    모집 팀플이 없습니다.
                                </div>
                            )}
                        </div>
                        <div className={styles.team_section}>
                            <h3>MY 설문</h3>
                            {mySurveys.length > 0 ? (
                                mySurveys.map((item, index) => (
                                    <div key={index} className={styles.team}>
                                        <span className={styles.dot}></span>
                                        {item.title}
                                        <span className={styles.dday}>{item.isOngoing ? '진행 중' : '마감'}</span>
                                    </div>
                                ))
                            ) : (
                                <div>설문이 없습니다.</div>
                            )}
                        </div>
                    </div>
                    <div className={styles.portfolio}>
                        <div className={styles.portfolio_header}>
                            <h3>MY 포트폴리오</h3>
                            <button onClick={openFileDialog} className={styles.add_button}>
                                추가
                            </button>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className={styles.index}>
                            <p className={styles.first}>제목</p>
                            <p className={styles.second}>이력서 관리</p>
                            <p className={styles.third}>최종 수정일</p>
                        </div>
                        <div className={styles.portfolio_list}>
                            {myPortfolios.map((item, index) => (
                                <div key={index} className={styles.portfolio_item}>
                                    <span className={styles.title}>{item.name}</span>
                                    <button className={styles.delete_button} onClick={() => handleDeletePortfolio(item.resumeId, index)}>삭제</button>
                                    <span className={styles.last_modified}> {formatLastModified(item.createdAt)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.my_team}>
                        <h3>지원한 팀플</h3>
                        <div className={styles.index}>
                            <p className={styles.first}>제목</p>
                            <p className={styles.second}>　지원자 수</p>
                            <p className={styles.third}>마감일　　</p>
                        </div>
                        <div className={styles.portfolio_list}>
                            {myAppliedTeams.map((item, index) => (
                                <div key={index} className={styles.portfolio_item}>
                                    <span className={styles.title}>{item.name}</span>
                                    <span className={styles.num}>{item.applicantsNum}명</span>
                                    <span className={styles.last_modified}> {formatLastModified(item.deadlineAt)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
