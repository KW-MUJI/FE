import React, { useState } from 'react';
import styles from '../styles/My_team.module.css'; // CSS 파일 임포트

const TeamMember = ({ memberInfos }) => {
    return (
        <div className={styles.teamMember}>
            {memberInfos.map((memberInfo) => (
                <div key={memberInfo.id}
                    className={styles.member_item}
                >
                    <div className={styles.name}>
                        <h1>{memberInfo.name}</h1>
                    </div>

                    <div className={styles.info}>
                        <p>{memberInfo.number}</p>
                        <p>{memberInfo.department}</p>
                        <p>{memberInfo.e_mail}</p>
                    </div>
                </div>
            )
            )
            }


        </div>
    )
}





const MyTeam = () => {
    // 팀원정보
    const [memberInfos, setMemberInfos] = useState([{
        id: "1",
        teamName: "캡스톤",
        name: "노광운",
        number: "21학번",
        department: "소프트웨어학부",
        e_mail: "nokw@kw.ac.kr"
    },
    {
        id: "2",
        teamName: "캡스톤",
        name: "김노원",
        number: "21학번",
        department: "소프트웨어학부",
        e_mail: "nokw@kw.ac.kr"
    },
    {
        id: "3",
        teamName: "캡스톤",
        name: "광무지",
        number: "21학번",
        department: "소프트웨어학부",
        e_mail: "nokw@kw.ac.kr"
    },
    {
        id: "4",
        teamName: "멋쟁이사자",
        name: "노광운",
        number: "21학번",
        department: "소프트웨어학부",
        e_mail: "nokw@kw.ac.kr"
    },
    {
        id: "5",
        teamName: "멋쟁이사자",
        name: "노광운",
        number: "21학번",
        department: "소프트웨어학부",
        e_mail: "nokw@kw.ac.kr"
    },
    {
        id: "6",
        teamName: "멋쟁이사자",
        name: "노광운",
        number: "21학번",
        department: "소프트웨어학부",
        e_mail: "nokw@kw.ac.kr"
    },
    {
        id: "7",
        teamName: "광운극회",
        name: "노광운",
        number: "21학번",
        department: "소프트웨어학부",
        e_mail: "nokw@kw.ac.kr"
    },
    {
        id: "8",
        teamName: "광운극회",
        name: "노광운",
        number: "21학번",
        department: "소프트웨어학부",
        e_mail: "nokw@kw.ac.kr"
    },
    {
        id: "9",
        teamName: "광운극회",
        name: "노광운",
        number: "21학번",
        department: "소프트웨어학부",
        e_mail: "nokw@kw.ac.kr"
    }






    ]
    );



    return (
        <div>
            <div className={styles.Myteam_container}>
                <div className={styles.Myteam_header}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                        <path d="M22 5.5H24.75C25.4793 5.5 26.1788 5.78973 26.6945 6.30546C27.2103 6.82118 27.5 7.52066 27.5 8.25V27.5C27.5 28.2293 27.2103 28.9288 26.6945 29.4445C26.1788 29.9603 25.4793 30.25 24.75 30.25H8.25C7.52065 30.25 6.82118 29.9603 6.30546 29.4445C5.78973 28.9288 5.5 28.2293 5.5 27.5V8.25C5.5 7.52066 5.78973 6.82118 6.30546 6.30546C6.82118 5.78973 7.52065 5.5 8.25 5.5H11M12.375 2.75H20.625C21.3844 2.75 22 3.36561 22 4.125V6.875C22 7.63439 21.3844 8.25 20.625 8.25H12.375C11.6156 8.25 11 7.63439 11 6.875V4.125C11 3.36561 11.6156 2.75 12.375 2.75Z" stroke="#8B0B02" stroke-width="2.91667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h1>MY 팀플</h1>
                </div>
                <div className={styles.oneteam}>
                    <div className={styles.teamName}>
                        캡스톤
                        <div className={styles.team_member_list}>
                        <TeamMember memberInfos={memberInfos}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyTeam;