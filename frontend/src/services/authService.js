// frontend/src/services/authService.js
import axios from '@/utils/axiosInstance'; // withCredentials: true

export async function registerUser(data) {
    try {
        await axios.get('/sanctum/csrf-cookie'); // получаем CSRF cookie
        const response = await axios.post('/api/register', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}
