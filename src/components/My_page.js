import React, { useState } from 'react';
import styles from '../styles/MyPage.module.css';

// 회원가입 컴포넌트
const MyPage = () => {
    const style = {
        backgroundColor: '#EEF2F6',
    };

    // 각 섹션에 대한 예시 데이터
    const myTeams = [
        '팀플 1',
        '팀플 2',
        '팀플 3',
        '팀플 4',
    ];

    const myRecruitTeams = [
        { name: '모집 팀플 1', end_date: '2024-10-10' },
        { name: '모집 팀플 2', end_date: '2024-10-05' },
        { name: '모집 팀플 3', end_date: '2024-10-15' },
        { name: '모집 팀플 4', end_date: '2024-10-01' },
    ];

    const mySurveys = [
        { name: '설문 1', end_date: '2024-10-12' },
        { name: '설문 2', end_date: '2024-10-06' },
        { name: '설문 3', end_date: '2024-10-20' },
        { name: '설문 4', end_date: '2024-09-30' },
    ];

    const [myPortfolios, setMyPortfolios] = useState([
        { name: '포트폴리오 1', lastModified: '2024-10-01' },
        { name: '포트폴리오 2', lastModified: '2024-09-28' },
        { name: '포트폴리오 3', lastModified: '2024-10-05' },
    ]);
    const [myAppliedTeams, setMyAppliedTeams] = useState([
        { name: '지원팀플 1', applicant_count: '3명', lastModified: '2024-10-01' },
        { name: '지원팀플 2', applicant_count: '2명', lastModified: '2024-09-28' },
        { name: '지원팀플 3', applicant_count: '4명', lastModified: '2024-10-05' },
    ]);
    // 오늘 날짜 구하기
    const today = new Date();

    // D-Day 계산
    const getDdayMessage = (endDate) => {
        const end = new Date(endDate);
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 날짜 차이 계산

        if (diffDays > 0) {
            return `D-${diffDays}`; // D-Day 표시
        } else if (diffDays === 0) {
            return 'D-Day'; // 오늘이 마감일
        } else {
            return '마감'; // 마감된 경우
        }
    };

    const handleAddPortfolio = () => {
        // 포트폴리오 추가 로직을 구현하세요.
        alert('포트폴리오 추가 기능은 아직 구현되지 않았습니다.');
    };

    const handleDeletePortfolio = (index) => {
        setMyPortfolios(prev => prev.filter((_, i) => i !== index));
    };

    // 최종 수정일 형식 변경 함수
    const formatLastModified = (date) => {
        return date.replace(/-/g, '.'); // '-'를 '.'로 변경
    };

    return (
        <div style={style}>
            <div className={styles.main_container}>
                <div className={styles.first_container}>
                    <div className={styles.info}>
                        <svg width="139" height="139" viewBox="0 0 139 139" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="139" height="139" rx="69.5" fill="#7F7F7F" fillOpacity="0.2" style={{ mixBlendMode: 'luminosity' }} />
                            <rect width="139" height="139" rx="69.5" fill="#3D3D3D" fillOpacity="0.5" style={{ mixBlendMode: 'overlay' }} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M90.3511 55.6C90.3511 67.1151 81.0162 76.45 69.5011 76.45C57.986 76.45 48.6511 67.1151 48.6511 55.6C48.6511 44.0849 57.986 34.75 69.5011 34.75C81.0162 34.75 90.3511 44.0849 90.3511 55.6ZM83.4011 55.6C83.4011 63.2768 77.1779 69.5 69.5011 69.5C61.8243 69.5 55.6011 63.2768 55.6011 55.6C55.6011 47.9232 61.8243 41.7 69.5011 41.7C77.1779 41.7 83.4011 47.9232 83.4011 55.6Z" fill="#8B0B02" />
                            <path d="M69.5011 86.875C47.0026 86.875 27.8333 100.179 20.5312 118.817C22.3101 120.584 24.184 122.255 26.1445 123.821C31.582 106.709 48.6397 93.825 69.5011 93.825C90.3625 93.825 107.42 106.709 112.858 123.821C114.818 122.255 116.692 120.584 118.471 118.817C111.169 100.179 91.9996 86.875 69.5011 86.875Z" fill="#8B0B02" />
                        </svg>

                        <p>김참빛님 &gt;</p>
                        <p>MY 팀플</p>
                        <p>MY 모집 팀플</p>
                        <p>MY 설문</p>
                        <button>로그아웃</button>
                    </div>
                </div>
                <div className={styles.second_container}>
                    <div className={styles.my_container}>
                        <div className={styles.team_section}>
                            <h3>MY 팀플</h3>
                            {myTeams.map((item, index) => (
                                <div key={index} className={styles.team}>
                                    <span className={styles.dot}></span>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className={styles.team_section}>
                            <h3>MY 모집 팀플</h3>
                            {myRecruitTeams.map((item, index) => (
                                <div key={index} className={styles.team}>
                                    <span className={styles.dot}></span>
                                    {item.name}
                                    <span className={styles.dday}>{getDdayMessage(item.end_date)}</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.team_section}>
                            <h3>MY 설문</h3>
                            {mySurveys.map((item, index) => (
                                <div key={index} className={styles.team}>
                                    <span className={styles.dot}></span>
                                    {item.name}
                                    <span className={styles.dday}>{getDdayMessage(item.end_date)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.portfolio}>
                        <div className={styles.portfolio_header}>
                            <h3>MY 포트폴리오</h3>
                            <button onClick={handleAddPortfolio} className={styles.add_button}>추가</button>
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
                                    <button className={styles.delete_button} onClick={() => handleDeletePortfolio(index)}>삭제</button>
                                    <span className={styles.last_modified}> {formatLastModified(item.lastModified)}</span>
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
                                    <span className={styles.num}>{item.applicant_count}</span>
                                    <span className={styles.last_modified}> {formatLastModified(item.lastModified)}</span>
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
