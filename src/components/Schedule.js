import React, { useState, useEffect } from "react";

import styles from '../styles/Schedule.module.css';
import { calendar } from './mockData';

const Schedule = () => {
    const [isSelected, setIsSelected] = useState('개인일정');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    // const [schedules, setSchedules] = useState([
    //     { date: '2024-09-01', time: '18:00', event: '개강' },
    //     { date: '2024-09-13', time: '18:00', event: '캡스톤' },
    //     { date: '2024-09-18', time: '15:00', event: '참빛설계' },
    // ]);

    const [schedules, setSchedules] = useState(calendar.response.data);

    // 현재 날짜
    const today = new Date();
    console.log(today); // 현재 날짜와 시간이 모두 출력됩니다.
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1); // 월은 0부터 시작하므로 +1 필요
    const dd = String(today.getDate());
    const formattedToday = `${yyyy}년 ${mm}월 ${dd}일`;

    const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];


    useEffect(() => {
        console.log(schedules); // 데이터 구조 확인
        console.log(calendar.response.data); // 데이터 구조 확인
    }, [schedules]);


    // 해당 월의 날짜들 계산
    const renderCalendarDays = () => {

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        //해당 월의 첫째날, 마지막날
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const days = [];

        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        // 첫째날 요일 앞 빈칸 설정
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(<div key={`empty-${i}`} className={styles.emptyCalendar}></div>)
        }

        //날짜 표시
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

            // 오늘 날짜와 비교하여 클래스 설정
            const dayClass = dateStr === todayStr ? `${styles.day} ${styles.today}` : styles.day;

            // 각 이벤트 목록에서 날짜만 비교
            const userEvents = schedules.events.userEvents ? schedules.events.userEvents.filter(event => event.eventDate.split(' ')[0] === dateStr) : [];
            const univEvents = schedules.events.univEvents ? schedules.events.univEvents.filter(event => event.eventDate === dateStr) : [];
            const projectEvents = schedules.events.projectEvents ? schedules.events.projectEvents.filter(event => event.eventDate.split(' ')[0] === dateStr) : [];

            const allEvents = [...userEvents, ...univEvents, ...projectEvents];

            days.push(
                <div key={i} className={`${i === 1 ? styles.day_1 : styles.day} ${dayClass}`}>

                    <span>{i}</span>


                    <div className={styles.event}>

                       
                        {univEvents.filter(event => event.eventDate.split(' ')[0] === dateStr)
                            .map((event, index) =>
                                <p key={`${index}-univ`} className={styles.univEvents}>{event.title}</p>
                            )

                        }

                       
                        {userEvents
                            .filter(event => event.eventDate.split(' ')[0] === dateStr)
                            .map((event, index) => (
                                <p key={`${index}-user`} className={styles.userEvents}>{event.title}</p>
                            ))}


                        {projectEvents
                            .filter(event => event.eventDate.split(' ')[0] === dateStr)
                            .map((event, index) => (
                                <p key={`${index}-project`} className={styles.projectEvents}>{event.title}</p>
                            ))}

                    </div>
                </div>
            )
        }

        return days;

    }

    const mySchedule=()=>{

    }

    // 이전 달로 이동
    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // 다음 달로 이동
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };


    const handleChange = (e) => {
        setIsSelected(e.target.value); //개인일정 or 팀플일정
        console.log(e.target.value);
    };

    const handleClick = (e) => {
        e.target.showPicker(); // 날짜 선택기 강제 오픈
    };


    // 일정추가 기능
    const addSchedule = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const date = e.target.value;
        const time = e.target.value;
        if (title && date && time) {
            setSchedules([...schedules, { date, time, event: title, type: isSelected }])
            e.target.reset(); // 폼 리셋
        }
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
                        <h>내 일정</h>{mySchedule}
                        
                    </div>
                    <div className={styles.schedule_add}>
                        <div className={styles.add_header}>
                            <h>일정 추가</h>
                            <select className={styles.select_input} onChange={handleChange}>
                                <option value="개인일정">개인일정</option>
                                <option value="팀플일정">팀플일정</option>
                            </select>
                        </div>

                        <form onSubmit={addSchedule} className={styles.input_container}>

                            <input
                                className={styles.title_input}
                                type='text'
                                name="title"
                                placeholder="제목"
                            />


                            <div className={styles.date}>
                                <h>날짜</h>
                                <input
                                    className={styles.date_input}
                                    type='date'
                                    name="date"
                                    onClick={handleClick} // 필드 전체를 클릭했을 때 showPicker() 실행
                                />
                            </div>

                            <div className={styles.time}>
                                <h>시간</h>
                                <input type="time"
                                    name="name"
                                    className={styles.time_input}
                                    onClick={handleClick}
                                />
                            </div>
                        </form>
                        <button type="submit" className={styles.add_button}>추가</button>



                    </div>
                </div>
                <div className={styles.calendar}>
                    <div className={styles.calendar_header}>
                        <div className={styles.color_info}>
                            <label className={styles.school_color}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                    <circle cx="8.28033" cy="8.28033" r="8.28033" fill="#E8CECC" fill-opacity="0.4" />
                                </svg>

                                <p>학교 일정</p>

                            </label>
                            <label className={styles.teamproject_color}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                                    <circle cx="8.98101" cy="8.39263" r="8.28033" fill="#EEF2F6" />
                                </svg>
                                팀플 일정

                            </label>



                        </div>
                        <div className={styles.calendar_button}>
                            <button onClick={prevMonth} style={{  fontSize: "24px"}}> &lt;</button>
                            <span>{currentDate.getFullYear()}. </span> 
                            <span style={{ fontWeight: 600 }}>{currentDate.getMonth()+1}</span>
                            <button onClick={nextMonth} style={{  fontSize: "24px"}}> &gt;</button>
                        </div>

                    </div>

                    <div className={styles.calendar_weekdays}>
                        {daysOfWeek.map((day, index) => (
                            <div key={index} className={styles.weekday}>{day}</div>
                        ))}
                    </div>

                    <div className={styles.calendar_days}>
                        {renderCalendarDays()}
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Schedule;