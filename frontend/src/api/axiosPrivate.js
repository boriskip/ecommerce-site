// /frontend/src/utils/axiosPrivate.js
import axios from "axios";

const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080", // зависит от .env
    withCredentials: true,
});
console.log("🌍 API BASE:", import.meta.env.VITE_API_BASE_URL);

export default axiosPrivate;