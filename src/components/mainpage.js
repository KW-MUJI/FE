import React, { useState, useEffect } from "react";
import styles from "../styles/mainpage.module.css";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api/mainpageApi"; // API 호출 함수 import
import { useAuth } from "../contexts/AuthContext.js";
import { formatDate } from "../utils/dateUtil.js";
const MainPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken"); // 토큰 가져오기

  const [data, setData] = useState(null); // 서버에서 가져온 데이터 상태 관리
  const [selectedType, setSelectedType] = useState("전체");
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // 현재 월 상태 추가

  const [tooltip, setTooltip] = useState({
    visible: false,
    title: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        const yearMonth = `${currentMonth.getFullYear()}-${String(
          currentMonth.getMonth() + 1
        ).padStart(2, "0")}`;

        // console.log(yearMonth);
        const result = await fetchData(token, yearMonth); // 현재 월에 맞는 데이터 요청
        setData(result); // 가져온 데이터 설정

        // console.log(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchDataFromServer(); // 컴포넌트 마운트 시 또는 currentMonth가 변경될 때 데이터 요청
  }, [currentMonth, token]); // currentMonth와 token이 변경될 때마다 실행

  const handleButtonClick = (link) => {
    navigate(link);
  };

  const getNotices = () => {
    if (!data) return []; // 데이터가 없으면 빈 배열 반환
    switch (selectedType) {
      case "전체":
        return data.notices.all;
      case "일반":
        return data.notices.general;
      case "학사":
        return data.notices.academic;
      case "학생":
        return data.notices.student;
      case "장학":
        return data.notices.scholarship;
      default:
        return [];
    }
  };
  const today = new Date();
  const formattedToday = formatDate(today);

  const calculateDDay = (targetDate) => {
    // targetDate를 Date 객체로 변환
    const target = new Date(targetDate);
    const today = new Date(formattedToday);

    // 날짜 차이를 일 단위로 계산
    const diffTime = target - today; // 밀리초 차이
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환

    if (diffDays === 0) {
      return "D-day";
    } else if (diffDays < 0) {
      return false;
    } else {
      return `D-${diffDays}`;
    }
  };

  const formatLastModified = (date) => {
    return date.replace(/-/g, ".");
  };

  const handleMonthChange = (newDate) => {
    setCurrentMonth(newDate); // 새로운 날짜로 상태 변경
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDaysArray = (month, year) => {
    const days = [];
    for (let i = 1; i <= daysInMonth(month, year); i++) {
      days.push(i);
    }
    return days;
  };

  const handleDateClick = (day) => {
    if (!token) return;
    navigate(
      `/schedule/${currentMonth.getFullYear()}-${String(
        currentMonth.getMonth() + 1
      ).padStart(2, "0")}`
    );
  };

  const handleMouseEnter = (dayEvents, event) => {
    if (dayEvents.length > 0) {
      setTooltip({
        visible: true,
        title: dayEvents.map((event) => event.title).join(", "),
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const getEventsForDate = (dateString) => {
    if (!data || !data.events) return []; // data가 null이거나 events가 없으면 빈 배열 반환

    const dayEvents = [];

    const univEvents = (data.events.univEvents || []).filter(
      (event) => event.eventDate === dateString
    );
    const userEvents = (data.events.userEvents || []).filter((event) =>
      event.eventDate.startsWith(dateString)
    );
    const projectEvents = (data.events.projectEvents || []).filter((event) =>
      event.eventDate.startsWith(dateString)
    );

    dayEvents.push(
      ...univEvents.map((event) => ({ title: event.title, type: "univ" }))
    );
    dayEvents.push(
      ...userEvents.map((event) => ({ title: event.title, type: "user" }))
    );
    dayEvents.push(
      ...projectEvents.map((event) => ({ title: event.title, type: "project" }))
    );

    return dayEvents;
  };

  const days = getDaysArray(
    currentMonth.getMonth(),
    currentMonth.getFullYear()
  );
  const prevMonthDays = getDaysArray(
    currentMonth.getMonth() - 1,
    currentMonth.getFullYear()
  );
  const nextMonthDays = getDaysArray(
    currentMonth.getMonth() + 1,
    currentMonth.getFullYear()
  );

  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  const emptyDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const daysInNextMonth = 7 - ((emptyDays + days.length) % 7);

  return (
    <div className={styles.main_container}>
      <div className={styles.first_container}>
        <div className={styles.noti}>
          <div className={styles.notice_top}>
            <button onClick={() => handleButtonClick("/notice")}>Notice</button>
          </div>
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
          <div className={styles.header}>
            <h4>
              <button
                onClick={() =>
                  handleMonthChange(
                    new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
                  )
                }
              >
                {"<"}
              </button>
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              <button
                onClick={() =>
                  handleMonthChange(
                    new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
                  )
                }
              >
                {">"}
              </button>
            </h4>
          </div>
          <div className={styles.contents}>
            <div className={styles.weekDays}>
              {weekDays.map((day, index) => (
                <div key={index} className={styles.weekDay}>
                  {day}
                </div>
              ))}
            </div>
            <div className={styles.days}>
              {Array(emptyDays)
                .fill(null)
                .map((_, index) => {
                  const prevDay =
                    prevMonthDays[prevMonthDays.length - emptyDays + index];
                  const currentDayString = `${currentMonth.getFullYear()}-${String(
                    currentMonth.getMonth()
                  ).padStart(2, "0")}-${String(prevDay).padStart(2, "0")}`;
                  const dayEvents = getEventsForDate(currentDayString);
                  const backgroundColor =
                    dayEvents.length > 0
                      ? dayEvents[0].type === "univ"
                        ? "#E8CECC66"
                        : dayEvents[0].type === "user"
                        ? "#EDE1F8"
                        : "#EEF2F6"
                      : "transparent";

                  return (
                    <div
                      key={index}
                      className={styles.another_day}
                      onMouseEnter={(e) => handleMouseEnter(dayEvents, e)}
                      onMouseLeave={handleMouseLeave}
                      style={{ backgroundColor }}
                    >
                      {prevDay}
                    </div>
                  );
                })}
              {days.map((day) => {
                const currentDayString = `${currentMonth.getFullYear()}-${String(
                  currentMonth.getMonth() + 1
                ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayEvents = getEventsForDate(currentDayString);
                const backgroundColor =
                  dayEvents.length > 0
                    ? dayEvents[0].type === "univ"
                      ? "#E8CECC66" // 대학 일정 색상
                      : dayEvents[0].type === "user"
                      ? "#EDE1F8" // 개인 일정 색상
                      : "#EEF2F6" // 팀플 일정 색상
                    : "transparent";

                return (
                  <div
                    key={day}
                    className={styles.day}
                    onClick={() => handleDateClick(day)}
                    onMouseEnter={(e) => handleMouseEnter(dayEvents, e)}
                    onMouseLeave={handleMouseLeave}
                    style={{ backgroundColor }}
                  >
                    {day}
                  </div>
                );
              })}
              {Array.from({ length: daysInNextMonth }).map((_, index) => {
                const nextDay = nextMonthDays[index];

                const currentDayString = `${currentMonth.getFullYear()}-${String(
                  currentMonth.getMonth() + 2
                ).padStart(2, "0")}-${String(nextDay).padStart(2, "0")}`;
                const dayEvents = getEventsForDate(currentDayString);
                const backgroundColor =
                  dayEvents.length > 0
                    ? dayEvents[0].type === "univ"
                      ? "#E8CECC66" // 대학 일정 색상
                      : dayEvents[0].type === "user"
                      ? "#EDE1F8" // 개인 일정 색상
                      : "#EEF2F6" // 팀플 일정 색상
                    : "transparent";

                return (
                  <div
                    key={index}
                    className={styles.another_day}
                    onMouseEnter={(e) => handleMouseEnter(dayEvents, e)}
                    onMouseLeave={handleMouseLeave}
                    style={{ backgroundColor }}
                  >
                    {nextDay}
                  </div>
                );
              })}
            </div>
            {tooltip.visible && (
              <div
                className={styles.tooltip}
                style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}
              >
                {tooltip.title}
              </div>
            )}
          </div>
          <div className={styles.ex}>
            <span
              className={styles.schoolDot}
              style={{ background: "#E8CECC66", margin: "0 3.87px 0 7.4px" }}
            ></span>
            <span>대학 일정</span>
            <span
              className={styles.projectDot}
              style={{ background: "#EEF2F6", margin: "0 3.87px 0 18px" }}
            ></span>
            <span>팀플 일정</span>
            <span
              className={styles.teamDot}
              style={{ background: "#EDE1F8", margin: "0 3.87px 0 18px" }}
            ></span>
            <span>개인 일정</span>
          </div>
        </div>
      </div>
      <div className={styles.second_container}>
        <div className={styles.teams}>
          <div className={styles.title}>
            <h3>팀플모집</h3>
            <button
              className={styles.plusButton}
              onClick={() => handleButtonClick("/team")}
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
            {data &&
              data.projects.map((item, index) => (
                <div key={index} className={styles.team}>
                  <span className={styles.dot}></span>
                  <span className={styles.text}>{item.name}</span>
                  <span className={styles.dday}>
                    {item.isOngoing === false
                      ? "마감"
                      : calculateDDay(item.deadlineAt)}
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
            {data &&
              data.surveys.map((survey, index) => (
                <div key={index} className={styles.team}>
                  <span className={styles.dot}></span>
                  <span className={styles.text}>{survey.title}</span>
                  <span className={styles.dday}>
                    {survey.isOngoing === false
                      ? "마감"
                      : calculateDDay(survey.endDate)}
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
              onClick={() => handleButtonClick("/my_page")}
            >
              <path
                d="M7.33333 2.25H20.875M7.33333 8.5H20.875M7.33333 14.75H20.875M2.125 2.25H2.13542M2.125 8.5H2.13542M2.125 14.75H2.13542"
                stroke="#1E1E1E"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.first_btn}
              onClick={() => handleButtonClick("/myteam/applicant")}
            >
              MY 모집 팀플
              <br />
              지원자 확인
            </button>
            <button
              className={styles.second_btn}
              onClick={() => handleButtonClick("/My_survey")}
            >
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
