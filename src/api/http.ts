import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/AuthStore";

const BASE_URL = "http://localhost:8888";
const DEFAULT_TIMEOUT = 1000;

const createClient = (config?: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
      Authorization: getToken(),
    },
    withCredentials: true,
    ...config,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // 로그인 만료 처리
      if (error.response.status === 401) {
        console.log("에엡");
        removeToken();
        window.location.href = "/login";
        return;
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export const httpClient = createClient();
