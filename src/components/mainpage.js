import React, { useState } from "react";
import styles from "../styles/mainpage.module.css";
import Calendar from "./Calendar";
import { useNavigate } from "react-router-dom";

// 회원가입 컴포넌트
const MainPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = (link) => {
    navigate(link);
  };
  const data = [
    {
      notices: {
        // 5개 카테고리 (전체, 일반(0), 학사(1), 학생(2), 등록/장학(4))
        all: [
          // 전체 6개만
          {
            title: "[채용공고] [산학협력단] 직원 채용 공고",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47949&tpage=1&searchKey=1&searchVal=&srCategoryId=0",
            updatedDate: "2024-10-07",
          },
          {
            title: "2024학년도 2학기 중간고사 일정 및 시행 지침 안내",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47890&tpage=1&searchKey=1&searchVal=&srCategoryId=1",
            updatedDate: "2024-10-02",
          },
          {
            title:
              "[졸업준비위원회] 2024학년도 2학기 마지막 졸업앨범 촬영 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47816&tpage=1&searchKey=1&searchVal=&srCategoryId=2", // 공지사항 링크
            updatedDate: "2024-09-24", // 수정일
          },
          {
            title: "2025년도 대산농촌재단 장학생 선발 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47944&tpage=1&searchKey=1&searchVal=&srCategoryId=4", // 공지사항 링크
            updatedDate: "2024-10-07", // 수정일
          },
          {
            title: "2025년도 대산농촌재단 장학생 선발 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47944&tpage=1&searchKey=1&searchVal=&srCategoryId=4", // 공지사항 링크
            updatedDate: "2024-10-07", // 수정일
          },
          {
            title: "2025년도 대산농촌재단 장학생 선발 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47944&tpage=1&searchKey=1&searchVal=&srCategoryId=4", // 공지사항 링크
            updatedDate: "2024-10-07", // 수정일
          },
        ],
        general: [
          // 일반 6개만
          {
            title: "[채용공고] [산학협력단] 직원 채용 공고",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47949&tpage=1&searchKey=1&searchVal=&srCategoryId=0",
            updatedDate: "2024-10-07",
          },
          {
            title: "[채용공고] [산학협력단] 직원 채용 공고",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47949&tpage=1&searchKey=1&searchVal=&srCategoryId=0",
            updatedDate: "2024-10-07",
          },
          {
            title: "[채용공고] [산학협력단] 직원 채용 공고",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47949&tpage=1&searchKey=1&searchVal=&srCategoryId=0",
            updatedDate: "2024-10-07",
          },
          {
            title: "[채용공고] [산학협력단] 직원 채용 공고",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47949&tpage=1&searchKey=1&searchVal=&srCategoryId=0",
            updatedDate: "2024-10-07",
          },
          {
            title: "[채용공고] [산학협력단] 직원 채용 공고",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47949&tpage=1&searchKey=1&searchVal=&srCategoryId=0",
            updatedDate: "2024-10-07",
          },
          {
            title: "[채용공고] [산학협력단] 직원 채용 공고",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47949&tpage=1&searchKey=1&searchVal=&srCategoryId=0",
            updatedDate: "2024-10-07",
          },
        ],
        academic: [
          // 학사 6개만
          {
            title: "2024학년도 2학기 중간고사 일정 및 시행 지침 안내",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47890&tpage=1&searchKey=1&searchVal=&srCategoryId=1",
            updatedDate: "2024-10-02",
          },
          {
            title: "2024학년도 2학기 중간고사 일정 및 시행 지침 안내",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47890&tpage=1&searchKey=1&searchVal=&srCategoryId=1",
            updatedDate: "2024-10-02",
          },
          {
            title: "2024학년도 2학기 중간고사 일정 및 시행 지침 안내",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47890&tpage=1&searchKey=1&searchVal=&srCategoryId=1",
            updatedDate: "2024-10-02",
          },
          {
            title: "2024학년도 2학기 중간고사 일정 및 시행 지침 안내",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47890&tpage=1&searchKey=1&searchVal=&srCategoryId=1",
            updatedDate: "2024-10-02",
          },
          {
            title: "2024학년도 2학기 중간고사 일정 및 시행 지침 안내",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47890&tpage=1&searchKey=1&searchVal=&srCategoryId=1",
            updatedDate: "2024-10-02",
          },
          {
            title: "2024학년도 2학기 중간고사 일정 및 시행 지침 안내",
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47890&tpage=1&searchKey=1&searchVal=&srCategoryId=1",
            updatedDate: "2024-10-02",
          },
        ],
        student: [
          // 학생 6개만
          {
            title:
              "[졸업준비위원회] 2024학년도 2학기 마지막 졸업앨범 촬영 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47816&tpage=1&searchKey=1&searchVal=&srCategoryId=2", // 공지사항 링크
            updatedDate: "2024-09-24", // 수정일
          },
          {
            title:
              "[졸업준비위원회] 2024학년도 2학기 마지막 졸업앨범 촬영 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47816&tpage=1&searchKey=1&searchVal=&srCategoryId=2", // 공지사항 링크
            updatedDate: "2024-09-24", // 수정일
          },
          {
            title:
              "[졸업준비위원회] 2024학년도 2학기 마지막 졸업앨범 촬영 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47816&tpage=1&searchKey=1&searchVal=&srCategoryId=2", // 공지사항 링크
            updatedDate: "2024-09-24", // 수정일
          },
          {
            title:
              "[졸업준비위원회] 2024학년도 2학기 마지막 졸업앨범 촬영 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47816&tpage=1&searchKey=1&searchVal=&srCategoryId=2", // 공지사항 링크
            updatedDate: "2024-09-24", // 수정일
          },
          {
            title:
              "[졸업준비위원회] 2024학년도 2학기 마지막 졸업앨범 촬영 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47816&tpage=1&searchKey=1&searchVal=&srCategoryId=2", // 공지사항 링크
            updatedDate: "2024-09-24", // 수정일
          },
          {
            title:
              "[졸업준비위원회] 2024학년도 2학기 마지막 졸업앨범 촬영 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47816&tpage=1&searchKey=1&searchVal=&srCategoryId=2", // 공지사항 링크
            updatedDate: "2024-09-24", // 수정일
          },
        ],
        scholarship: [
          // 등록/장학 6개만
          {
            title: "2025년도 대산농촌재단 장학생 선발 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47944&tpage=1&searchKey=1&searchVal=&srCategoryId=4", // 공지사항 링크
            updatedDate: "2024-10-07", // 수정일
          },
          {
            title: "2025년도 대산농촌재단 장학생 선발 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47944&tpage=1&searchKey=1&searchVal=&srCategoryId=4", // 공지사항 링크
            updatedDate: "2024-10-07", // 수정일
          },
          {
            title: "2025년도 대산농촌재단 장학생 선발 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47944&tpage=1&searchKey=1&searchVal=&srCategoryId=4", // 공지사항 링크
            updatedDate: "2024-10-07", // 수정일
          },
          {
            title: "2025년도 대산농촌재단 장학생 선발 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47944&tpage=1&searchKey=1&searchVal=&srCategoryId=4", // 공지사항 링크
            updatedDate: "2024-10-07", // 수정일
          },
          {
            title: "2025년도 대산농촌재단 장학생 선발 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47944&tpage=1&searchKey=1&searchVal=&srCategoryId=4", // 공지사항 링크
            updatedDate: "2024-10-07", // 수정일
          },
          {
            title: "2025년도 대산농촌재단 장학생 선발 안내", // 공지사항 제목
            link: "https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=47944&tpage=1&searchKey=1&searchVal=&srCategoryId=4", // 공지사항 링크
            updatedDate: "2024-10-07", // 수정일
          },
        ],
      },
      events: {
        // yearMonth 에 해당하는 일정
        univEvents: [
          // 대학 일정
          {
            univcalendarId: 1,
            title: "개강",
            eventDate: "2024-09-13",
          },
        ],
        userEvents: [
          // 개인 일정
          {
            usercalendarId: 1,
            title: "캡스톤",
            eventDate: "2024-09-13 18:00:00",
          },
        ],
        projectEvents: [
          // 팀플 일정
          {
            usercalendarId: 1,
            projectId: 2,
            title: "캡스톤",
            eventDate: "2024-09-13 18:00:00",
          },
        ],
      },
    },
  ];
  const myRecruitTeams = [
    { name: "모집 팀플 1", end_date: "2024-10-10" },
    { name: "모집 팀플 2", end_date: "2024-10-05" },
    { name: "모집 팀플 3", end_date: "2024-10-15" },
    { name: "모집 팀플 4", end_date: "2024-10-01" },
  ];
  const mySurveys = [
    { name: "설문 1", end_date: "2024-10-12" },
    { name: "설문 2", end_date: "2024-10-06" },
    { name: "설문 3", end_date: "2024-10-20" },
    { name: "설문 4", end_date: "2024-09-30" },
  ];
  const [selectedType, setSelectedType] = useState("전체");

  const getNotices = () => {
    switch (selectedType) {
      case "전체":
        return data[0].notices.all;
      case "일반":
        return data[0].notices.general;
      case "학사":
        return data[0].notices.academic;
      case "학생":
        return data[0].notices.student;
      case "장학":
        return data[0].notices.scholarship;
      default:
        return [];
    }
  };

  const formatLastModified = (date) => {
    return date.replace(/-/g, ".");
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.first_container}>
        <div className={styles.noti}>
          <div className={styles.notice_top}>
            <button onClick={() => handleButtonClick("/notice")}>Notice</button>
          </div>
          {/* <button
            className={styles.plusButton}
            onClick={() => handleButtonClick("/survey")}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="#1D1B20" />
            </svg>
          </button> */}
          <nav className={styles.navigation}>
            {["전체", "일반", "학사", "학생", "장학"].map((type) => (
              <button
                key={type}
                className={selectedType === type ? styles.active : ""}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </nav>
          <div className={styles.notice_list}>
            {getNotices().map((notice, index) => (
              <div key={index} className={styles.notice_item}>
                <a
                  href={notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.notice_link}
                >
                  <span className={styles.notice_title}>{notice.title}</span>
                  <span className={styles.notice_date}>
                    {formatLastModified(notice.updatedDate)}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.calender}>
          <Calendar />
        </div>
      </div>
      <div className={styles.second_container}>
        <div className={styles.teams}>
          <div className={styles.title}>
            <h3>팀플모집</h3>
            <button
              className={styles.plusButton}
              onClick={() => handleButtonClick("/recruit_main")}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="#1D1B20" />
              </svg>
            </button>
          </div>
          <div className={styles.box}>
            {myRecruitTeams.map((item, index) => (
              <div key={index} className={styles.team}>
                <span className={styles.dot}></span>
                {item.name}
                <span className={styles.dday}>
                  {formatLastModified(item.end_date)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.survey}>
          <div className={styles.title}>
            <h3>설문조사</h3>
            <button
              className={styles.plusButton}
              onClick={() => handleButtonClick("/survey")}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="#1D1B20" />
              </svg>
            </button>
          </div>
          <div className={styles.box}>
            {myRecruitTeams.map((item, index) => (
              <div key={index} className={styles.team}>
                <span className={styles.dot}></span>
                {item.name}
                <span className={styles.dday}>
                  {formatLastModified(item.end_date)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.my_page}>
          <div className={styles.myBox}>
            <h3>마이페이지</h3>
            <svg
              width="30"
              height="30"
              viewBox="0 0 23 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33333 2.25H20.875M7.33333 8.5H20.875M7.33333 14.75H20.875M2.125 2.25H2.13542M2.125 8.5H2.13542M2.125 14.75H2.13542"
                stroke="#1E1E1E"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className={styles.buttons}>
            <button className={styles.first_btn}>
              MY 모집 팀플
              <br />
              지원자 확인
            </button>
            <button className={styles.second_btn}>
              MY 설문
              <br />
              결과보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
