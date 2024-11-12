import React, { useState } from "react";
import styles from "../../styles/My_recruit_team.module.css"; // CSS 파일 임포트
import { recruit_teams } from "../mockData"; // mock 데이터 임포트
import { Link } from "react-router-dom";

// 이름 마스킹 함수
const maskName = (name) => {
  if (name.length <= 1) {
    return name; // 이름이 한 글자라면 그대로 반환
  }
  return name[0] + "*".repeat(name.length - 1); // 첫 글자 이후는 *로 처리
};

const Applicant = ({
  members,
  handleselect,
  selectApplicant = [],
  startTeamproject,
  teamID,
}) => {
  return (
    <div className={styles.applicant}>
      {members.map((member) => (
        <div key={member.id} className={styles.applicant_item}>
          <div className={styles.applicant_profile}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="58"
              height="58"
              viewBox="0 0 58 58"
              fill="none"
            >
              <rect
                width="58"
                height="58"
                rx="29"
                fill="#7F7F7F"
                fillOpacity="0.2"
                style={{ mixBlendMode: "luminosity" }}
              />
              <rect
                width="58"
                height="58"
                rx="29"
                fill="#3D3D3D"
                fillOpacity="0.5"
                style={{ mixBlendMode: "overlay" }}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M37.6999 23.2C37.6999 28.0049 33.8047 31.9 28.9999 31.9C24.195 31.9 20.2999 28.0049 20.2999 23.2C20.2999 18.3951 24.195 14.5 28.9999 14.5C33.8047 14.5 37.6999 18.3951 37.6999 23.2ZM34.7999 23.2C34.7999 26.4033 32.2031 29 28.9999 29C25.7966 29 23.1999 26.4033 23.1999 23.2C23.1999 19.9967 25.7966 17.4 28.9999 17.4C32.2031 17.4 34.7999 19.9967 34.7999 23.2Z"
                fill="#8B0B02"
              />
              <path
                d="M28.9999 36.25C19.612 36.25 11.6133 41.8012 8.56641 49.5785C9.30865 50.3155 10.0906 51.0127 10.9086 51.6665C13.1775 44.5262 20.2951 39.15 28.9999 39.15C37.7046 39.15 44.8222 44.5262 47.0911 51.6665C47.9092 51.0127 48.6911 50.3155 49.4333 49.5785C46.3864 41.8012 38.3877 36.25 28.9999 36.25Z"
                fill="#8B0B02"
              />
            </svg>
            <div className={styles.applicant_info}>
              <div className={styles.applicant_name}>
                {maskName(member.name)}
              </div>

              <div className={styles.applicant_department_Num}>
                {member.stuNum}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                >
                  <ellipse
                    cx="3.16825"
                    cy="2.82281"
                    rx="2.52763"
                    ry="2.49077"
                    fill="black"
                  />
                </svg>
                {member.department}
              </div>
            </div>
          </div>
          <div className={styles.applicant_option}>
            <button
              id={styles.portfolio}
              onClick={() =>
                window.open(`/my_team_applicant/${member.id}`, "_blank")
              }
              disabled={startTeamproject.includes(teamID)}
            >
              {" "}
              포트폴리오
            </button>

            <button
              id={
                selectApplicant.includes(member.id)
                  ? styles.nonselect
                  : styles.select
              }
              onClick={() => handleselect(member.id)}
              disabled={startTeamproject.includes(teamID)}
            >
              {selectApplicant.includes(member.id) ? "선택 취소" : "팀원 선택"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const MyRecruitTeam = () => {
  const [teamList, setTeamList] = useState(recruit_teams);
  const [selectApplicant, setSelectApplicant] = useState({});
  const [startTeamproject, setStartTeamProject] = useState([]);

  const handleselect = (teamID, memberID) => {
    setSelectApplicant((prev) => {
      const selectedTeam = prev[teamID] || []; // 팀별 선택된 지원자 배열

      if (selectedTeam.includes(memberID)) {
        return {
          ...prev,
          [teamID]: selectedTeam.filter((id) => id !== memberID),
        }; // 이미 선택된 경우 제거
      } else {
        return {
          ...prev,
          [teamID]: [...selectedTeam, memberID], // 선택되지 않은 경우 추가
        };
      }
    });
    console.log(`${selectApplicant}`, "선택됨");
  };

  // 팀플시작
  const handleStart = (teamID) => {
    setStartTeamProject((prev) => [...prev, teamID]);
    console.log(`${teamID} 팀플 시작됨`);
  };

  // 팀 삭제 함수
  const handleDelete = (teamID) => {
    setTeamList((prevTeamList) =>
      prevTeamList.filter((team) => team.id !== teamID)
    );
    console.log(`${teamID} 팀 삭제됨`);
  };

  return (
    <div className={styles.My_recruit_team}>
      <div className={styles.page_header}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
        >
          <path
            d="M22 5.5H24.75C25.4793 5.5 26.1788 5.78973 26.6945 6.30546C27.2103 6.82118 27.5 7.52066 27.5 8.25V27.5C27.5 28.2293 27.2103 28.9288 26.6945 29.4445C26.1788 29.9603 25.4793 30.25 24.75 30.25H8.25C7.52065 30.25 6.82118 29.9603 6.30546 29.4445C5.78973 28.9288 5.5 28.2293 5.5 27.5V8.25C5.5 7.52066 5.78973 6.82118 6.30546 6.30546C6.82118 5.78973 7.52065 5.5 8.25 5.5H11M12.375 2.75H20.625C21.3844 2.75 22 3.36561 22 4.125V6.875C22 7.63439 21.3844 8.25 20.625 8.25H12.375C11.6156 8.25 11 7.63439 11 6.875V4.125C11 3.36561 11.6156 2.75 12.375 2.75Z"
            stroke="#8B0B02"
            stroke-width="2.91667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        MY 모집 팀플
      </div>

      {teamList.map((team, index) => (
        <div key={index} className={styles.team_list}>
          <div className={styles.team_header}>
            <h> {team.teamtitle}</h>
            <div className={styles.list_option}>
              {!startTeamproject.includes(team.id) && (
                <button
                  className={styles.edit}
                  onClick={() =>
                    window.open(`/recruit_write/${team.id}`, "_blank")
                  }
                >
                  수정
                </button>
              )}

              <button
                onClick={() => {
                  handleStart(team.id);
                }}
                disabled={
                  !selectApplicant[team.id] ||
                  selectApplicant[team.id].length === 0
                }
                className={
                  startTeamproject.includes(team.id)
                    ? styles.disabledStart
                    : styles.start
                }
              >
                {startTeamproject.includes(team.id) ? "모집 마감" : "팀플시작"}
              </button>

              {!startTeamproject.includes(team.id) && (
                <button
                  className={styles.cancel}
                  onClick={() => handleDelete(team.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M5 10.0002H8.33333M8.33333 10.0002H35M8.33333 10.0002V33.3335C8.33333 34.2176 8.68452 35.0654 9.30964 35.6905C9.93477 36.3156 10.7826 36.6668 11.6667 36.6668H28.3333C29.2174 36.6668 30.0652 36.3156 30.6904 35.6905C31.3155 35.0654 31.6667 34.2176 31.6667 33.3335V10.0002M13.3333 10.0002V6.66683C13.3333 5.78277 13.6845 4.93493 14.3096 4.30981C14.9348 3.68469 15.7826 3.3335 16.6667 3.3335H23.3333C24.2174 3.3335 25.0652 3.68469 25.6904 4.30981C26.3155 4.93493 26.6667 5.78277 26.6667 6.66683V10.0002M16.6667 18.3335V28.3335M23.3333 18.3335V28.3335"
                      stroke="#8B0B02"
                      stroke-width="3.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className={styles.team_main}>
            <div className={styles.applicant_number}>
              <p>지원자 {team.members.length}</p>
              <p>| 선택한 팀원 {selectApplicant[team.id]?.length || 0}</p>
            </div>

            <div className={styles.applicant_list}>
              <Applicant
                members={team.members}
                handleselect={(memberID) => handleselect(team.id, memberID)}
                selectApplicant={selectApplicant[team.id]}
                startTeamproject={startTeamproject}
                teamID={team.id}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRecruitTeam;