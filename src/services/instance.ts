import axios from "axios";

// axios 인스턴스화
const axiosApi = (url: string, headers: { [key: string]: string } = {}) => {
  const instance = axios.create({
    baseURL: url,
    headers: { ...headers, "Content-Type": "application/json" },
  });
  return instance;
};

export const apiInstance = axiosApi(import.meta.env.VITE_BACKEND_URL);
apiInstance.interceptors.response.use((response) => {
  const res = response.data.data;
  return res;
});
