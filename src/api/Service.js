//API 호출 로직
import axios from "axios";
import {
  calendar as mockCalendar,
  calendar_add as mockAddCalendar,
  mockNotices,
  mockEditTeamplayWrite,
} from "../components/mockData.js"; // Mock 데이터

const CALENDAR_URL = "http://15.165.62.195/calendar";

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(
      "/auth/signIn",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // 로그인 성공 시 토큰 저장
    if (response.data.code === 200) {
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return { success: true, accessToken, refreshToken };
    }

    // 실패 시 에러 메시지 반환
    return { success: false, message: "로그인 실패" };
  } catch (error) {
    console.error("로그인 오류:", error);
    return { success: false, message: "서버 오류가 발생했습니다." };
  }
};

export const updateProjectWithMock = async (
  projectId,
  updatedData,
  imageFile
) => {
  try {
    const response = await axios.put(
      `/myteam/update/${projectId}`,
      updatedData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.warn("API 호출 실패, Mock 데이터 반환");
    return mockEditTeamplayWrite; // Mock 데이터 반환
  }
};

export const updateProject = async (
  projectId,
  accessToken,
  updatedData,
  imageFile
) => {
  try {
    const formData = new FormData();
    formData.append("name", updatedData.name);
    formData.append("description", updatedData.description);
    formData.append("id", updatedData.id);
    formData.append("deleteImage", updatedData.deleteImage);

    if (imageFile) {
      formData.append("ProjectImage", imageFile); // 파일 첨부
    }

    const response = await axios.put(`/myteam/update/${projectId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("프로젝트 수정 중 오류:", error);
    throw error;
  } // Mock 데이터 반환
};

// 일정 조회 yyyy-mm
export const fetchCalendar = async (yearMonth) => {
  try {
    const response = await axios.get(`${CALENDAR_URL}/${yearMonth}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.warn("실제 API 호출 실패. Mock 데이터를 사용합니다.");
    console.log("Mock 데이터:", mockCalendar); // Mock 데이터 확인
    return mockCalendar.response; // API 호출이 실패하면 Mock 데이터 반환
  }
};

// 일정 추가
export const addCalendarEvent = async (accessToken, eventData) => {
  const requestBody = {
    projectId: eventData.projectId,
    title: eventData.title,
    eventDate: eventData.eventDate
  };
  console.log(accessToken);
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

export const getNotices = async (
  page = 1,
  searchVal = "",
  srCategoryId = null
) => {
  try {
    const params = { page, searchVal };
    if (srCategoryId != null) params.srCategoryId = srCategoryId;

    const response = await axios.get("/notices", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching notices:", error);

    let filteredNotices = mockNotices.data.notices;

    if (srCategoryId !== null) {
      filteredNotices = filteredNotices.filter(
        (notice) => notice.srCategoryId === srCategoryId
      );
    }

    //검색어 필터링
    if (searchVal) {
      const lowerSearchVal = searchVal.toLowerCase(); // 검색어를 소문자로 변환
      filteredNotices = filteredNotices.filter(
        (notice) => notice.title.toLowerCase().includes(lowerSearchVal) // 제목을 소문자로 변환하여 비교
      );
    }
    // 실패 시 mock 데이터 반환
    return {
      code: 200,
      data: {
        notices: filteredNotices,
        maxPage: mockNotices.data.maxPage,
      },
    };
  }
};
