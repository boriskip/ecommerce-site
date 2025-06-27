import { useState } from 'react';
import axios from '@/api/axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('password');

    const login = async (e) => {
        e.preventDefault();

        try {
            await axios.get('/sanctum/csrf-cookie');

            const response = await axios.post('/api/login', {
                email,
                password,
            });
            console.log('✅ Вход успешен:', response.data);
        } catch (error) {
            console.error('❌ Ошибка входа:', error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={login}>
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
            <button type="submit">Войти</button>
        </form>
    );
};

export default AdminLogin;