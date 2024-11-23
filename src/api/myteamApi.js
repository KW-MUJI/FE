import apiClient from "./index";

export const postPortfolio = async (accessToken, resumeId, projectId) => {
  const url = "/team/apply";
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const body = {
    resumeId,
    projectId,
  };
  try {
    const response = await apiClient.post(url, body, { headers });
    if (response.data.code === 200) {
      console.log("포트폴리오 선택 성공 :", response.data.data);
      return response.data.data;
    } else {
      console.error("포트폴리오 선택 실패 오류 코드 :", response.data.code);
    }
    return response.data;
  } catch (error) {
    console.error("postProtfolio API 에러:", error.response || error.message);
    throw error;
  }
};

//내가 참여한 팀플 확인
export const getMyProject = async (accessToken) => {
  const url = "/myteam/participation";
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await apiClient.get(url, { headers });
    if (response.data.code === 200) {
      console.log("내가 참여한 팀플 불러오기 성공 :", response.data.data);
      return response.data.data;
    } else {
      console.error(
        "내가 참여한 팀플 불러오기 실패 오류 코드 :",
        response.data.code
      );
    }
    return response.data;
  } catch (error) {
    console.error("getMyProject API 에러:", error.response || error.message);
    throw error;
  }
};

//내가 모집하는 팀플 지원자 확인
export const getMyProjectApplicant = async (accessToken) => {
  const url = "/myteam/applicant";
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await apiClient.get(url, { headers });
    if (response.data.code === 200) {
      console.log("내가 모집하는 팀플 지원자 확인성공 :", response.data);
      return response.data;
    } else {
      console.error(
        "내가 모집하는 팀플 지원자 확인 실패 오류 코드 :",
        response.data.code
      );
    }
    return response.data;
  } catch (error) {
    console.error(
      "getMyProjectApplicant API 에러:",
      error.response || error.message
    );
    throw error;
  }
};
//팀원 선택
export const selectTeamMember = async (participantId) => {
  const url = `/myteam/select`;
  try {
    const response = await apiClient.patch(
      url,
      {},
      {
        params: {
          id: participantId,
        },
      }
    );
    if (response.data.code === 200) {
      console.log("팀원 선택 성공 :", response.data.data);
      return response.data.data;
    } else {
      console.error("팀원 선택 실패 오류 코드 :", response.data.code);
    }
    return response.data;
  } catch (error) {
    console.error(
      "selectTeamMember API 에러:",
      error.response || error.message
    );
    throw error;
  }
};

//팀플 삭제
export const deleteProject = async (accessToken, projectId) => {
  const url = `/myteam/delete/${projectId}`;
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await apiClient.delete(url, { headers });
    if (response.data.code === 200 && response.data.data === true) {
      console.log("팀플 삭제 성공 :", response.data.data);
      return response.data.data;
    } else {
      console.error("팀플 삭제 실패 오류 코드 :", response.data.code);
    }
    return response.data;
  } catch (error) {
    console.error("deleteProject API 에러:", error.response || error.message);
    throw error;
  }
};

// 팀플 수정 클릭 시, 기존 내용 보이기
export const getProjectDetails = async (projectId, accessToken) => {
  try {
    const response = await apiClient.get(`/myteam/update/${projectId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "[ERROR] Get Project Details:",
      error.response || error.message
    );
    throw error;
  }
};

// 팀플 수정
export const updateProject = async (projectId, updateData, accessToken) => {
  try {
    const response = await apiClient.patch(
      `/myteam/update`, // 엔드포인트
      {
        id: projectId,
        name: updateData.name,
        description: updateData.description,
        image: updateData.ProjectImage || "", // 이미지 경로 또는 이름
        deleteImage: updateData.deleteImage, // 이미지 삭제 여부
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 인증 헤더
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("[ERROR] Update Project:", error.response || error.message);
    throw error;
  }
};
