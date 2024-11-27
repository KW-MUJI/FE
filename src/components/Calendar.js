import React, { useState } from 'react';
import styles from '../styles/calendar.module.css'; // 캘린더 스타일 추가

const Calendar = ({ events }) => { // events를 props로 받음
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tooltip, setTooltip] = useState({ visible: false, title: '', x: 0, y: 0 });

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
        alert(`선택한 날짜: ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`);
    };

    const handleMouseEnter = (dayEvents, event) => {
        if (dayEvents.length > 0) {
            setTooltip({ visible: true, title: dayEvents.map(event => event.title).join(', '), x: event.clientX, y: event.clientY });
        }
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    const days = getDaysArray(currentDate.getMonth(), currentDate.getFullYear());

    const prevMonthDays = getDaysArray(currentDate.getMonth() - 1, currentDate.getFullYear());
    const nextMonthDays = getDaysArray(currentDate.getMonth() + 1, currentDate.getFullYear());

    const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const emptyDays = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

    const goToPreviousMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() - 1);
            return newDate;
        });
    };

    const goToNextMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + 1);
            return newDate;
        });
    };

    const daysInNextMonth = 7 - ((emptyDays + days.length) % 7);

    const getEventsForDate = (dateString) => {
        
        const dayEvents = [];
        const univEvents = (events.univEvents || []).filter(event => event.eventDate === dateString);
        const userEvents = (events.userEvents || []).filter(event => event.eventDate.startsWith(dateString));
        const projectEvents = (events.projectEvents || []).filter(event => event.eventDate.startsWith(dateString));

        dayEvents.push(...univEvents.map(event => ({ title: event.title, type: 'univ' })));
        dayEvents.push(...userEvents.map(event => ({ title: event.title, type: 'user' })));
        dayEvents.push(...projectEvents.map(event => ({ title: event.title, type: 'project' })));

        return dayEvents;
    };

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <h4>
                    <button onClick={goToPreviousMonth}>{'<'}</button>
                    {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                    <button onClick={goToNextMonth}>{'>'}</button>
                </h4>
            </div>
            <div className={styles.contents}>
                <div className={styles.weekDays}>
                    {weekDays.map((day, index) => (
                        <div key={index} className={styles.weekDay}>{day}</div>
                    ))}
                </div>
                <div className={styles.days}>
                    {Array(emptyDays).fill(null).map((_, index) => {
                        const prevDay = prevMonthDays[prevMonthDays.length - emptyDays + index];
                        const currentDayString = `${currentDate.getFullYear()}-${String(currentDate.getMonth()).padStart(2, '0')}-${String(prevDay).padStart(2, '0')}`;
                        const dayEvents = getEventsForDate(currentDayString);
                        const backgroundColor = dayEvents.length > 0 
                            ? (dayEvents[0].type === 'univ' ? '#E8CECC66' : '#EEF2F6') 
                            : 'transparent';

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
                    {days.map(day => {
                        const currentDayString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const dayEvents = getEventsForDate(currentDayString);
                        const backgroundColor = dayEvents.length > 0 
                            ? (dayEvents[0].type === 'univ' ? '#E8CECC66' : '#EEF2F6') 
                            : 'transparent';

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
                        const currentDayString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 2).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`;
                        const dayEvents = getEventsForDate(currentDayString);
                        const backgroundColor = dayEvents.length > 0 
                            ? (dayEvents[0].type === 'univ' ? '#E8CECC66' : '#EEF2F6') 
                            : 'transparent';

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
                <div className={styles.ex}>
                    <span className={styles.schoolDot} style={{ background: '#E8CECC66', margin: '0 3.87px 0 7.4px' }}></span>
                    <span>대학 일정</span>
                    <span className={styles.teamDot} style={{ background: '#EEF2F6', margin: '0 3.87px 0 18px' }}></span>
                    <span>팀플 일정</span>
                </div>
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
    );
};

export default Calendar;
