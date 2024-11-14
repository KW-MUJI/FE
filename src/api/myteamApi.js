import apiClient from "./index";

// 프로젝트 정보 조회
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

// 프로젝트 정보 수정
export const updateProject = async (projectId, updateData, accessToken) => {
  try {
    const formData = new FormData();
    if (updateData.ProjectImage) {
      formData.append("ProjectImage", updateData.ProjectImage);
    }
    formData.append("name", updateData.name);
    formData.append("id", updateData.id);
    formData.append("description", updateData.description);
    formData.append("deleteImage", updateData.deleteImage);

    const response = await apiClient.patch(
      `/myteam/update/${projectId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("[ERROR] Update Project:", error.response || error.message);
    throw error;
  }
};
