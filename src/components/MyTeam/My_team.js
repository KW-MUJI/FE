import React, { useEffect, useState } from "react";
import styles from "../../styles/My_team.module.css"; // CSS 파일 임포트
import { teams } from "../mockData"; // mock 데이터 임포트
import { getMyProject } from "../../api/myteamApi";
import { useAuth } from "../../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
const TeamMember = ({ members = [] }) => {
  const handleProfileImage = (member) => {
    if (!member.image) {
      return (
        <div className={styles.svg}>
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
              d="M37.7004 23.2C37.7004 28.0049 33.8052 31.9 29.0004 31.9C24.1955 31.9 20.3004 28.0049 20.3004 23.2C20.3004 18.3951 24.1955 14.5 29.0004 14.5C33.8052 14.5 37.7004 18.3951 37.7004 23.2ZM34.8004 23.2C34.8004 26.4033 32.2036 29 29.0004 29C25.7971 29 23.2004 26.4033 23.2004 23.2C23.2004 19.9967 25.7971 17.4 29.0004 17.4C32.2036 17.4 34.8004 19.9967 34.8004 23.2Z"
              fill="#8B0B02"
            />
            <path
              d="M29.0004 36.25C19.6125 36.25 11.6138 41.8012 8.56689 49.5785C9.30914 50.3155 10.091 51.0127 10.9091 51.6665C13.178 44.5262 20.2956 39.15 29.0004 39.15C37.7051 39.15 44.8227 44.5262 47.0916 51.6665C47.9097 51.0127 48.6916 50.3155 49.4338 49.5785C46.3869 41.8012 38.3882 36.25 29.0004 36.25Z"
              fill="#8B0B02"
            />
          </svg>
        </div>
      );
    } else {
      return (
        <div className={styles.svg}>
          <img
            src={member.image}
            alt=""
            width="58"
            height="58"
            style={{ borderRadius: "50%" }}
          />
        </div>
      );
    }
  };
  return (
    <div className={styles.teamMember}>
      {members.map((member, index) => (
        <div key={index} className={styles.member_item}>
          {handleProfileImage(member)}
          <div className={styles.info}>
            <div className={styles.name}>
              <h>{member.name}</h>
            </div>
            <div className={styles.department_num}>
              {member.stuNum}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="5"
                viewBox="0 0 6 5"
                fill="none"
              >
                <ellipse
                  cx="3.16874"
                  cy="2.49077"
                  rx="2.52762"
                  ry="2.49077"
                  fill="black"
                />
              </svg>
              {member.major}
            </div>
            <div className={styles.email}>{member.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MyTeam = () => {
  const [teamList, setTeamList] = useState([]); // 모든 팀 데이터를 가져옴
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const fetchTeamList = async () => {
    try {
      const response = await getMyProject(accessToken);
      setTeamList(response.data);
    } catch (error) {
      console.error("fetchTeamList 에러", error);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      alert("로그인 상태가 아닙니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
    fetchTeamList();
  }, [accessToken, navigate]);

  const navigateSchedule = () => {
    navigate("/schedule");
  };

  return (
    <div>
      <div className={styles.Myteam_container}>
        <div className={styles.Myteam_header}>
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
          <h>MY 팀플</h>
        </div>
        {teamList.length > 0 ? (
          teamList.map((team, index) => (
            <div key={index} className={styles.oneteam}>
              <div className={styles.teamName}>
                <p>{team.name}</p>
                <button
                  className={styles.schedule_add}
                  onClick={navigateSchedule}
                >
                  일정추가
                </button>
              </div>
              <div className={styles.team_member_list}>
                <p>팀원</p>
                <TeamMember members={team.members} />
              </div>
            </div>
          ))
        ) : (
          <p>참여 중인 팀이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyTeam;
