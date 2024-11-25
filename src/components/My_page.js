import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/MyPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";

const MyPage = () => {
  const style = {
    backgroundColor: "#EEF2F6",
  };
  const navigate = useNavigate();
  const goTocheckPw = () => {
    navigate("/checkPw");
  };
  const goToTeam = () => {
    navigate("/my_team");
  };
  const goTosurvey = () => {
    navigate("/My_survey");
  };
  const goToMyTeam = () => {
    navigate("/myteam/applicant");
  };
  const [imgSrc, setImgSrc] = useState(""); // 초기 이미지 경로를 비워둡니다.
  const [myTeams, setMyTeams] = useState([]);
  const [myRecruitTeams, setMyRecruitTeams] = useState([]);
  const [mySurveys, setMySurveys] = useState([]);
  const [myPortfolios, setMyPortfolios] = useState([]);
  const [myAppliedTeams, setMyAppliedTeams] = useState([]);
  const [profile, setProfile] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [emptydata, setEmptydata] = useState(["", "", ""]);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://15.165.62.195/mypage`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data;
        console.log(data);
        setProfile(data.profile);
        setImgSrc(data.profile.userImage);
        setMyTeams(data.projects || []);
        setMyRecruitTeams(data.createdProjects || []);
        setMySurveys(data.surveys || []);
        setMyPortfolios(data.resumes || []);
        setMyAppliedTeams(data.applicationProjects || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddPortfolio = async (selectedFile) => {
    if (!selectedFile) {
      alert("파일을 선택해 주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await axios.post(
        `http://15.165.62.195/mypage/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.code === 200) {
        alert("포트폴리오가 성공적으로 추가되었습니다.");
        setMyPortfolios((prev) => [
          ...prev,
          {
            id: response.data.data.id,
            name: selectedFile.name,
            createdAt: new Date().toISOString(),
          },
        ]);
        setFile(null);
        window.location.reload();
      } else {
        alert("포트폴리오 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error adding portfolio:", error);
      alert("포트폴리오 추가 중 오류가 발생했습니다.");
    }
  };

  const handleDeletePortfolio = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://15.165.62.195/mypage/deleteResume/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code === 200) {
        alert(response.data.data); // "홍길동의 포트폴리오 삭제" 메시지
        setMyPortfolios((prev) => prev.filter((_, i) => i !== index)); // UI에서 포트폴리오 삭제
      } else {
        alert("포트폴리오 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      alert("포트폴리오 삭제 중 오류가 발생했습니다.");
    }
  };
  const handleLogoutClick = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
    navigate("/login");
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
    return date.split(" ")[0].replace(/-/g, ".");
};

  return (
    <div style={style}>
      <div className={styles.main_container}>
        <div className={styles.first_container}>
          <div className={styles.info}>
            {imgSrc ? (
              <img
                src={imgSrc}
                alt="Profile"
                width="110"
                height="110"
                style={{ borderRadius: "50%", margin: "50px 60px" }}
              />
            ) : (
              <svg
                width="110"
                height="110"
                viewBox="0 0 110 110"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ borderRadius: "50%", margin: "50px 60px" }}
              >
                <rect
                  width="110"
                  height="110"
                  rx="55"
                  fill="#7F7F7F"
                  fillOpacity="0.2"
                  style={{ mixBlendMode: "luminosity" }}
                />
                <rect
                  width="110"
                  height="110"
                  rx="55"
                  fill="#3D3D3D"
                  fillOpacity="0.5"
                  style={{ mixBlendMode: "overlay" }}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M71.5002 44C71.5002 53.1127 64.1129 60.5 55.0002 60.5C45.8875 60.5 38.5002 53.1127 38.5002 44C38.5002 34.8873 45.8875 27.5 55.0002 27.5C64.1129 27.5 71.5002 34.8873 71.5002 44ZM66.0002 44C66.0002 50.0751 61.0753 55 55.0002 55C48.9251 55 44.0002 50.0751 44.0002 44C44.0002 37.9249 48.9251 33 55.0002 33C61.0753 33 66.0002 37.9249 66.0002 44Z"
                  fill="#8B0B02"
                />
                <path
                  d="M55.0002 68.75C37.1956 68.75 22.0257 79.2781 16.2471 94.0281C17.6548 95.426 19.1377 96.7482 20.6892 97.9882C24.9923 84.4462 38.4912 74.25 55.0002 74.25C71.5092 74.25 85.0081 84.4462 89.3112 97.9882C90.8627 96.7482 92.3456 95.426 93.7533 94.0282C87.9747 79.2781 72.8048 68.75 55.0002 68.75Z"
                  fill="#8B0B02"
                />
              </svg>
            )}

            <h1 onClick={goTocheckPw}>
              {profile.username}
              <span>님 &gt;</span>
            </h1>
            <div className={styles.my}>
              <p onClick={goToTeam}>MY 팀플</p>
              <p onClick={goToMyTeam}>MY 모집 팀플</p>
              <p onClick={goTosurvey}>MY 설문</p>
            </div>
            <button onClick={handleLogoutClick} className={styles.logout}>
              로그아웃
            </button>
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
                    {item}
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
                    <span className={styles.dday}>
                      {item.isOngoing ? "진행 중" : "마감"}
                    </span>
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
                    <span className={styles.dday}>
                      {item.isOngoing ? "진행 중" : "마감"}
                    </span>
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
                style={{ display: "none" }}
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
                  <button
                    className={styles.delete_button}
                    onClick={() => handleDeletePortfolio(item.resumeId, index)}
                  >
                    삭제
                  </button>
                  <span className={styles.last_modified}>
                    {" "}
                    {formatLastModified(item.createdAt)}
                  </span>
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
                  <span className={styles.last_modified}>
                    {" "}
                    {formatLastModified(item.deadlineAt)}
                  </span>
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
