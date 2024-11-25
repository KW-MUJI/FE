import axios from "axios";

const CALENDAR_URL = "http://15.165.62.195/calendar";

export const fetchCalendar = async (yearMonth) => {
    try {
      const response = await axios.get(`${CALENDAR_URL}/${yearMonth}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // 일정 추가
  export const addCalendarEvent = async (accessToken, eventData) => {
    const requestBody = {
      projectId: eventData.projectId,
      title: eventData.title,
      eventDate: eventData.eventDate
    };
    console.log("일정 추가 함수 호출됨"); 
    const response = await fetch(`${CALENDAR_URL}/add`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });
    return response;
  
  };
  export const deleteCalendarEvent = async (accessToken, id) => {
    const response = await axios.delete(`${CALENDAR_URL}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return response;
  }