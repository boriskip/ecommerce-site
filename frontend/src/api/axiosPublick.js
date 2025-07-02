import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    withCredentials: false,
});
console.log("🌍 API BASE:", import.meta.env.VITE_API_BASE_URL);

export default axiosPublic;

