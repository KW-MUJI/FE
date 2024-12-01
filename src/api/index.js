import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  //   timeout: 5000, 벡엔드와 상의, 벡엔드 타임아웃 보다는 짧게
  headers: { "content-type": process.env.REACT_APP_DEFAULT_CONTENT_TYPE },
});

// Request Interceptor: Access Token 추가
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 오류 응답이 401 상태 코드이면
    if (error.response?.status === 401) {
      const originalRequest = error.config;
      //해당 요청이 재시도되지 않았다면 새 토큰을 요청
      if (!originalRequest._retry) {
        // 요청을 재시도하기 위한 플래그를 설정
        originalRequest._retry = true;

        try {
          // Refresh Token을 사용해 Access Token 갱신
          const refreshToken = localStorage.getItem("refreshToken");
          const { data } = await apiClient.post("/auth/newToken", null, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          const newAccessToken = data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          // 갱신된 Access Token으로 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient.request(originalRequest);
        } catch (refreshError) {
          console.error("토큰 갱신 실패. 로그아웃 처리.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
