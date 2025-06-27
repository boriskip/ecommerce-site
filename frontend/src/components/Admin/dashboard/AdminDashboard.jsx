// src/components/Admin/dashboard/AdminDashboard.jsx

import React from 'react';

export default function AdminDashboard() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>
            <p className="text-gray-700">Добро пожаловать в административную панель.</p>

            {/* Примеры контента */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded shadow">📦 Заказы: 123</div>
                <div className="p-4 border rounded shadow">👥 Пользователи: 45</div>
                <div className="p-4 border rounded shadow">🛒 Продукты: 76</div>
            </div>
        </div>
    );
}
