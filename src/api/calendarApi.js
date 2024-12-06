import { apiClient } from "./index.js";

const CALENDAR_URL = {
  baseUrl: process.env.REACT_APP_SERVER,
  endpointUrl: "/calendar",
};

export const fetchCalendar = async (yearMonth) => {
  try {
    const response = await apiClient.get(
      `${CALENDAR_URL.baseUrl}${CALENDAR_URL.endpointUrl}/${yearMonth}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addCalendarEvent = async (accessToken, eventData) => {
  const requestBody = {
    projectId: eventData.projectId,
    title: eventData.title,
    eventDate: eventData.eventDate,
  };

  // console.log("일정 추가 함수 호출됨");
  const response = await apiClient.post(
    `${CALENDAR_URL.endpointUrl}/add`,
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};
export const deleteCalendarEvent = async (accessToken, id) => {
  const response = await apiClient.delete(
    `${CALENDAR_URL.baseUrl}${CALENDAR_URL.endpointUrl}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};
