import axios from "axios";
import { API_BASE_URL } from "../config/config";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// ✅ 요청 보낼 때마다 자동으로 JWT 붙이기
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ 401 에러 발생 시 자동 로그아웃 처리
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;