import React, { useState, useEffect } from "react";
import { fetchCalendar, addCalendarEvent } from "../api/Service.js"; // API 함수 가져오기
import styles from "../styles/Schedule.module.css";
import { teams } from "./mockData"; // 팀 목록 가져오기

const Schedule = () => {
  const [isSelected, setIsSelected] = useState("개인일정"); // (개인일정/ 팀플일정)
  const [selectedTeam, setSelectedTeam] = useState(null); //사용자가 선택한 팀 상태
  const [schedules, setSchedules] = useState({
    projects: {
      projectId: [],
      name: [],
    },
    events: {
      userEvents: [],
      univEvents: [],
      projectEvents: [],
    },
  });
  // 캘린더 데이터 상태, API에서 받아온 일정

  const [teamList, setTeamList] = useState([]); // 팀플 일정에서 선택할 수 있는 팀 목록 상태
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 선택된 날짜 상태. 이 값을 기준으로 캘린더를 렌더링

  //캘린더 데이터 불러오기
  useEffect(() => {
    // API를 호풀하여 선택한 연도와 월에 맞는 캘린더 데이터 가져옴
    const fetchCalendarData = async () => {
      try {
        const yearMonth = `${currentDate.getFullYear()}-${String(
          currentDate.getMonth() + 1
        ).padStart(2, "0")}`;
        const data = await fetchCalendar(yearMonth); // API를 통해 데이터 가져오기 calendar.response
        if (data && data.data) {
          setSchedules(data.data); // 가져온 데이터를 스케줄 상태로 설정
        } else {
          console.error("데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("캘린더 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchCalendarData();
  }, [currentDate]); // currentDate가 변경될 때 마다 호출.

  // 팀플 일정 선택 시 팀 목록 설정 (여기서는 mockData.js에서 팀 목록을 가져옴)
  useEffect(() => {
    if (isSelected === "팀플일정") {
      setTeamList(teams); // 팀플 일정 선택 시 팀 목록 설정
    } else {
      setTeamList([]); // 개인일정 선택 시 팀 목록 초기화
    }
  }, [isSelected]);

  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();
  var dateStr = `${year}-${String(month + 1).padStart(2, "0")}`;

  //각 일정 날짜,시간
  var userEvents = schedules.events.userEvents
    ? schedules.events.userEvents.filter(
        (event) => event.eventDate.substring(0, 7) === dateStr
      )
    : [];
  var univEvents = schedules.events.univEvents
    ? schedules.events.univEvents.filter(
        (event) => event.eventDate.substring(0, 7) === dateStr
      )
    : [];
  var projectEvents = schedules.events.projectEvents
    ? schedules.events.projectEvents.filter(
        (event) => event.eventDate.substring(0, 7) === dateStr
      )
    : [];
  var allSchedules = [...univEvents, ...userEvents, ...projectEvents]; // 모든 일정을 하나의 배열로 합침

  const handleDelete = (eventToDelete) => {
    if (userEvents.includes(eventToDelete)) {
      setSchedules((prevSchedules) => ({
        ...prevSchedules,
        events: {
          ...prevSchedules.events,

          userEvents: prevSchedules.events.userEvents.filter(
            (event) => event !== eventToDelete
          ),
        },
      }));
    }

    // 해당 일정이 projectEvents에 속하는지 확인하고 삭제
    else if (projectEvents.includes(eventToDelete)) {
      setSchedules((prevSchedules) => ({
        ...prevSchedules,
        events: {
          ...prevSchedules.events,
          projectEvents: prevSchedules.events.projectEvents.filter(
            (event) => event !== eventToDelete
          ),
        },
      }));
    }
  };

  // projectId에 맞는 팀 이름을 찾아 반환하는 함수
  const getTeamNameByProjectId = (projectId) => {
    const project = schedules.projects.find(
      (project) => project.projectId === projectId
    ); //
    return project ? project.name : "Unknown team";
  };

  //해당 달 일정
  const mySchedule = () => {
    console.log("userEvents:", userEvents);
    console.log("univEvents:", univEvents);
    console.log("projectEvents:", projectEvents);

    //시간순
    allSchedules.sort((a, b) => {
      return new Date(a.eventDate) - new Date(b.eventDate);
    });

    return (
      <div className={styles.my_schedule_event}>
        {allSchedules.length > 0 ? (
          allSchedules.map((event, index) => {
            // 이벤트 타입에 따른 동적 스타일 클래스 설정
            let eventType = "";
            if (schedules.events.userEvents.includes(event)) {
              eventType = "user";
            } else if (schedules.events.univEvents.includes(event)) {
              eventType = "univ";
            } else if (schedules.events.projectEvents.includes(event)) {
              eventType = "project";
            }

            return (
              <div key={index}>
                {schedules.events.projectEvents.includes(event) ? (
                  <div
                    className={`${styles.schedule_item} ${
                      styles[`${eventType}Event`]
                    }`}
                  >
                    <p className={styles.team_name}>
                      - {getTeamNameByProjectId(event.projectId)}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <div
                  className={`${styles.schedule_item} ${
                    styles[`${eventType}Event`]
                  }`}
                >
                  <p
                    className={`${styles.schedule_date} ${
                      styles[`${eventType}Date`]
                    }`}
                  >
                    {event.eventDate.substring(5, 7)}월{" "}
                    {event.eventDate.substring(8, 10)}일{" "}
                    {event.eventDate.substring(11, 16)}
                  </p>
                  <p
                    className={`${styles.schedule_title} ${
                      styles[`${eventType}Title`]
                    }`}
                  >
                    {event.title}
                  </p>
                  {schedules.events.univEvents.includes(event) ? (
                    ""
                  ) : (
                    <button
                      className={styles.schedule_cancle}
                      onClick={() => handleDelete(event)}
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>해당 달에 일정이 없습니다.</p>
        )}
      </div>
    );
  };

  // 일정추가 기능
  const addSchedule = async (e) => {
    e.preventDefault(); // 폼이 제출될 때 까지 페이지가 리로드 되는 기본 동작 방지

    // 폼의 입력값을 가져오기
    const form = e.target;
    const title = form.elements.title.value;
    const date = form.elements.date.value;
    const time = form.elements.time.value;

    if (isSelected === "팀플일정" && !selectedTeam) {
      alert("팀을 선택해주세요.");
      return;
    }

    const newEvent = {
      usercalendarId: 98766, //현재는 테스트이기 떄문에 유저한명 지정
      projectId: isSelected === "팀플일정" ? selectedTeam.projectId : null, // 팀플일정이면 팀 ID 포함
      title,
      eventDate: `${date} ${time}`,
    };

    console.log("추가할 이벤트:", newEvent); // 콘솔로 새로운 일정 출력

    try {
      const response = await addCalendarEvent(newEvent); //API요청
      if (response.code === 200) {
        if (isSelected === "개인일정") {
          setSchedules({
            ...schedules,
            events: {
              ...schedules.events,
              userEvents: [...schedules.events.userEvents, newEvent], // 새로운 일정 추가
            },
          });
          console.log("개인일정 추가 성공:", response);
        } else {
          //팀플 일정 추가(선택한 팀 ID 포함)
          if (selectedTeam) {
            setSchedules({
              ...schedules,
              events: {
                ...schedules.events,
                projectEvents: [...schedules.events.projectEvents, newEvent],
              },
            });
            console.log("팀플일정 추가 성공");
          }
        }
      } else {
        console.error("일정 추가 실패:", response);
      }
    } catch (error) {
      console.error("일정 추가 중 오류 발생:", error);
    }

    form.reset(); //폼 리셋
  };

  // 달력 렌더링
  const renderCalendarDays = () => {
    if (!schedules || !schedules.events) return null; // schedules가 없을 때 안전하게 처리F

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    //해당 월의 첫째날, 마지막날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const todayStr = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const days = [];

    // 첫째날 요일 앞 빈칸 설정
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(
        <div key={`empty-${i}`} className={styles.emptyCalendar}></div>
      );
    }

    //날짜 표시
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        i
      ).padStart(2, "0")}`;

      // 오늘 날짜와 비교하여 클래스 설정
      const dayClass =
        dateStr === todayStr ? `${styles.day} ${styles.today}` : styles.day;

      // 각 이벤트 목록에서 날짜만 비교
      const userEvents = schedules.events.userEvents
        ? schedules.events.userEvents.filter(
            (event) => event.eventDate.split(" ")[0] === dateStr
          )
        : [];
      const univEvents = schedules.events.univEvents
        ? schedules.events.univEvents.filter(
            (event) => event.eventDate === dateStr
          )
        : [];
      const projectEvents = schedules.events.projectEvents
        ? schedules.events.projectEvents.filter(
            (event) => event.eventDate.split(" ")[0] === dateStr
          )
        : [];

      const allEvents = [...userEvents, ...univEvents, ...projectEvents];

      days.push(
        <div
          key={i}
          className={`${i === 1 ? styles.day_1 : styles.day} ${dayClass}`}
        >
          <span>{i}</span>
          <div className={styles.event}>
            {univEvents
              .filter((event) => event.eventDate.split(" ")[0] === dateStr)
              .map((event, index) => (
                <p key={`${index}-univ`} className={styles.univEvents}>
                  {event.title}
                </p>
              ))}
            {userEvents
              .filter((event) => event.eventDate.split(" ")[0] === dateStr)
              .map((event, index) => (
                <div key={`${index}-user`} className={styles.userEvents}>
                  <p className={styles.userEvents_title}>{event.title}</p>
                  <button
                    className={styles.schedule_cancle}
                    onClick={() => handleDelete(event)}
                  >
                    X
                  </button>
                </div>
              ))}
            {projectEvents
              .filter((event) => event.eventDate.split(" ")[0] === dateStr)
              .map((event, index) => (
                <div key={`${index}-project`} className={styles.projectEvents}>
                  <p className={styles.projectEvents_title}>{event.title}</p>
                  <button
                    className={styles.schedule_cancle}
                    onClick={() => handleDelete(event)}
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
        </div>
      );
    }

    return days;
  };

  // 현재 날짜
  const today = new Date();

  // console.log(today); // 현재 날짜와 시간이 모두 출력됩니다.
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1); // 월은 0부터 시작하므로 +1 필요
  const dd = String(today.getDate());
  const formattedToday = `${yyyy}년 ${mm}월 ${dd}일`;

  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

  // 이전 달로 이동
  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );

  // 다음 달로 이동
  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  //팀 선택
  const handleTeamChange = (e) => {
    const selected = teams.find((team) => team.teamName === e.target.value);
    setSelectedTeam(selected);
    console.log("선택된 팀:", selected); // 팀이 제대로 선택되는지 확인
  };

  const handleClick = (e) => {
    e.target.showPicker(); // 날짜 선택기 강제 오픈
  };

  return (
    <div className={styles.Schedule_container}>
      <h>Schedule</h>
      <div className={styles.main}>
        <div className={styles.schedule}>
          <div className={styles.to_day}>
            <h>TODAY</h>
            <p>{formattedToday}</p>
          </div>
          <div className={styles.my_schedule}>
            <h>내 일정</h>
            {mySchedule()}
          </div>
          <div className={styles.schedule_add}>
            <div className={styles.add_header}>
              <h>일정 추가</h>
              <select
                className={styles.select_input}
                onChange={(e) => setIsSelected(e.target.value)}
              >
                <option value="개인일정">개인일정</option>
                <option value="팀플일정">팀플일정</option>
              </select>
            </div>

            <form onSubmit={addSchedule} className={styles.input_container}>
              {/* 개인일정/팀플일정 선택에 따른 추가 선택 창 */}
              {isSelected === "팀플일정" && (
                <div>
                  <select
                    className={styles.select_team}
                    onChange={handleTeamChange}
                  >
                    <option value="">팀 선택</option>
                    {teamList.map((team) => (
                      <option key={team.teamName} value={team.teamName}>
                        {team.teamName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <input
                className={styles.title_input}
                type="text"
                name="title"
                placeholder="제목"
              />

              <div className={styles.date}>
                <h>날짜</h>
                <input
                  className={styles.date_input}
                  type="date"
                  name="date"
                  onClick={handleClick} // 필드 전체를 클릭했을 때 showPicker() 실행
                />
              </div>

              <div className={styles.time}>
                <h>시간</h>
                <input
                  type="time"
                  name="time"
                  className={styles.time_input}
                  onClick={handleClick}
                />
              </div>
              <button type="submit" className={styles.add_button}>
                추가
              </button>
            </form>
          </div>
        </div>
        <div className={styles.calendar}>
          <div className={styles.calendar_header}>
            <div className={styles.color_info}>
              <label className={styles.school_color}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <circle
                    cx="8.28033"
                    cy="8.28033"
                    r="8.28033"
                    fill="#E8CECC"
                    fill-opacity="0.4"
                  />
                </svg>

                <p>학교 일정</p>
              </label>
              <label className={styles.teamproject_color}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                >
                  <circle
                    cx="8.98101"
                    cy="8.39263"
                    r="8.28033"
                    fill="#EEF2F6"
                  />
                </svg>
                <p>팀플 일정</p>
              </label>
              <laber className={styles.personalProject_color}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <circle
                    cx="8.28033"
                    cy="8.39263"
                    r="8.28033"
                    fill="#EDE1F8"
                  />
                </svg>
                <p>개인 일정</p>
              </laber>
            </div>
            <div className={styles.calendar_button}>
              <button onClick={prevMonth} style={{ fontSize: "24px" }}>
                {" "}
                &lt;
              </button>
              <span>{currentDate.getFullYear()}. </span>
              <span style={{ fontWeight: 600 }}>
                {currentDate.getMonth() + 1}
              </span>
              <button onClick={nextMonth} style={{ fontSize: "24px" }}>
                {" "}
                &gt;
              </button>
            </div>
          </div>

          <div className={styles.calendar_weekdays}>
            {daysOfWeek.map((day, index) => (
              <div key={index} className={styles.weekday}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.calendar_days}>{renderCalendarDays()}</div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
