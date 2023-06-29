import axios from "axios";
import { BASE_URL } from "../constants";

// axios 인스턴스화
const axiosApi = (url: string, headers: { [key: string]: string } = {}) => {
  const instance = axios.create({
    baseURL: url,
    ...headers,
  });
  return instance;
};

const axiosJsonApi = (url: string, headers: { [key: string]: string } = {}) => {
  const instance = axiosApi(url, {
    ...headers,
    "Content-Type": "application/json",
  });
  return instance;
};

export const apiInstance = axiosApi(BASE_URL);

export const apiJsonInstance = axiosJsonApi(BASE_URL);
apiJsonInstance.interceptors.response.use((response) => {
  const res = response.data.data;
  return res;
});
