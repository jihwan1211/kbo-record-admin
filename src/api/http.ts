import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../store/AuthStore";

const BASE_URL = "http://localhost:8888";
const DEFAULT_TIMEOUT = 1000;

const createClient = (config?: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
      Authorization: getToken() ? getToken() : "",
    },
    withCredentials: true,
    ...config,
  });

  return instance;
};

export const httpClient = createClient();
