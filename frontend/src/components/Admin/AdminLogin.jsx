import React, { useState } from 'react';
import axios from '../../api/axios';


const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post('/login', {
                email,
                password,
            });
            console.log('Успешно вошли как админ:', response.data);
            // Навигация или setAuth, если используешь контекст авторизации
        } catch (error) {
            console.error('Ошибка логина:', error.response?.data || error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-semibold mb-4">Вход в админ-панель</h2>
            <form onSubmit={login}>
                <input
                    type="email"
                    placeholder="Email"
                    className="block w-full border px-4 py-2 mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className="block w-full border px-4 py-2 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Войти
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
