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
export const selectTeamMember = async (accessToken, participantId) => {
  const url = `/myteam/select`;
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await apiClient.patch(
      url,
      { id: participantId },
      { headers }
    );

    if (response.data.code === 200) {
      console.log("팀원 선택 성공 :", response.data.data);
      return response.data.data;
    } else {
      console.error("팀원 선택 실패 오류 코드 :", response.data.code);
    }
  } catch (error) {
    console.error("selectTeamMember API 에러:", error);
    if (error.response) {
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("요청이 전송되었지만 응답이 없음:", error.request);
    } else {
      console.error("요청 설정 중 에러 발생:", error.message);
    }
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
    const formData = new FormData();

    // FormData에 데이터 추가
    formData.append("id", projectId); // 프로젝트 ID
    formData.append("name", updateData.name); // 이름
    formData.append("description", updateData.description); // 설명
    formData.append("image", updateData.image);
    formData.append("deleteImage", JSON.stringify(false));
    // formData.append("deleteImage", JSON.stringify(updateData.deleteImage));

    // FormData 확인
    console.log("FormData values with getAll:");
    console.log("id:", formData.getAll("id"));
    console.log("name:", formData.getAll("name"));
    console.log("description:", formData.getAll("description"));
    console.log("image:", formData.getAll("image"));
    console.log("deleteImage:", formData.getAll("deleteImage"));

    const response = await apiClient.patch(
      `/myteam/update`, // 엔드포인트
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // 헤더 설정
          Authorization: `Bearer ${accessToken}`, // 인증 헤더
        },
      }
    );

    console.log("updateProject 확인:", response.data);

    return response.data;
  } catch (error) {
    console.error("[ERROR] Update Project:", error.response || error.message);
    throw error;
  }
};
