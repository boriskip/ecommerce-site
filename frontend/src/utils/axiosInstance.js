// /frontend/src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080", // зависит от .env
    withCredentials: true,
});

export default axiosInstance;