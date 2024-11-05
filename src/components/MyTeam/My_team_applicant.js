import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../styles/My_team_applicant.module.css'; // CSS 파일 임포트
import { recruit_teams } from './mockData';  // mock 데이터 임포트



const maskName = (name) => {
    if (name.length <= 1) {
        return name;  // 이름이 한 글자라면 그대로 반환
    }
    return name[0] + '*'.repeat(name.length - 1);  // 첫 글자 이후는 *로 처리
};

const MyTeamApplicant = () => {

    const { id } = useParams(); // URL에서 지원자의 ID 가져옴
    const [teamList, setTeamList] = useState(recruit_teams); // 모든 팀 데이터를 가져옴

    const applicant = recruit_teams
        .flatMap(team => team.members)
        .find(member => member.id === parseInt(id)); // 해당 ID에 맞는 지원자 찾기
    const team = recruit_teams
        .find(team => team.members.some(member => member.id === parseInt(id))); // 팀 찾기

    if (!applicant) {
        return <div>지원자를 찾을 수 없습니다.</div>; // 잘못된 ID 처리
    }

    

    return (
        <div className={styles.MyTeamApplicant_container}>
            <div className={styles.container_head}>
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                    <path d="M22 5.5H24.75C25.4793 5.5 26.1788 5.78973 26.6945 6.30546C27.2103 6.82118 27.5 7.52066 27.5 8.25V27.5C27.5 28.2293 27.2103 28.9288 26.6945 29.4445C26.1788 29.9603 25.4793 30.25 24.75 30.25H8.25C7.52065 30.25 6.82118 29.9603 6.30546 29.4445C5.78973 28.9288 5.5 28.2293 5.5 27.5V8.25C5.5 7.52066 5.78973 6.82118 6.30546 6.30546C6.82118 5.78973 7.52065 5.5 8.25 5.5H11M12.375 2.75H20.625C21.3844 2.75 22 3.36561 22 4.125V6.875C22 7.63439 21.3844 8.25 20.625 8.25H12.375C11.6156 8.25 11 7.63439 11 6.875V4.125C11 3.36561 11.6156 2.75 12.375 2.75Z" stroke="#8B0B02" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <h>My 모집 팀플 지원자</h>
            </div>

            <div className={styles.applicant_container}>

                <div className={styles.team_title}>
                    {team?.teamtitle}
                </div>

                <div className={styles.main}>

                    <div className={styles.applicant_info}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
                            <rect
                                width="81"
                                height="80.7362"
                                rx="40.3681"
                                fill="#7F7F7F"
                                fillOpacity="0.2"
                                style={{ mixBlendMode: 'luminosity' }}
                            />
                            <rect
                                width="81"
                                height="80.7362"
                                rx="40.3681"
                                fill="#3D3D3D"
                                fillOpacity="0.5"
                                style={{ mixBlendMode: 'overlay' }}
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M52.6502 32.2945C52.6502 38.9829 47.2105 44.4049 40.5002 44.4049C33.79 44.4049 28.3502 38.9829 28.3502 32.2945C28.3502 25.6061 33.79 20.1841 40.5002 20.1841C47.2105 20.1841 52.6502 25.6061 52.6502 32.2945ZM48.6002 32.2945C48.6002 36.7534 44.9738 40.3681 40.5002 40.3681C36.0267 40.3681 32.4002 36.7534 32.4002 32.2945C32.4002 27.8356 36.0267 24.2209 40.5002 24.2209C44.9738 24.2209 48.6002 27.8356 48.6002 32.2945Z"
                                fill="#8B0B02"
                            />
                            <path
                                d="M40.5003 50.4601C27.3896 50.4601 16.219 58.1874 11.9639 69.0134C13.0005 70.0394 14.0924 71.0098 15.2349 71.9199C18.4035 61.9806 28.3436 54.4969 40.5003 54.4969C52.6569 54.4969 62.597 61.9806 65.7656 71.92C66.9081 71.0099 68.0001 70.0394 69.0366 69.0134C64.7815 58.1874 53.6109 50.4601 40.5003 50.4601Z"
                                fill="#8B0B02"
                            />
                        </svg>

                        <div className={styles.name}>
                            {maskName(applicant.name)}
                        </div>

                        <div className={styles.info}>
                            {applicant.stuNum}
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                <ellipse cx="2.69762" cy="2.82281" rx="2.50817" ry="2.49077" fill="black" />
                            </svg>
                            {applicant.department}
                        </div>

                    </div>

                    <div className={styles.portfolio}>
                        <iframe
                            src={applicant.resumePath} // 백엔드에서 제공받은 PDF 파일 URL
                            width="100%"
                            height="600px"
                            title="PDF Viewer"
                        >
                            This browser does not support PDFs. Please download the PDF to view it:
                            <a href={applicant.resumePath}>Download PDF</a>.
                        </iframe>
                    </div>
                </div>

            </div>

        </div>
    )
};

export default MyTeamApplicant