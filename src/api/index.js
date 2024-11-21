import axios from "axios";

const apiClient = axios.create({

  baseURL: "http://15.165.62.195",

  //   timeout: 5000, 벡엔드와 상의, 벡엔드 타임아웃 보다는 짧게

  headers: { "content-type": "application/json" },
});

export default apiClient;