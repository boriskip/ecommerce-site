import { useState } from 'react';
import axios from '@/api/axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post('/api/login', {
                email,
                password,
            });
            if (response.status === 200) {
                setUser(response.data.user); // сохраняем юзера
                navigate('/admin/dashboard'); // перенаправление
            }
        } catch (error) {
            console.error('❌ Ошибка входа:', error.response?.data || error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-4">Вход в админ-панель</h2>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className="w-full mb-4 p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Войти
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;