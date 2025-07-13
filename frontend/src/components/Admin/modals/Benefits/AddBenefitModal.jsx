import { useState } from 'react';
import axiosPrivate from '../../../../api/axiosPrivate';

export default function AddBenefitModal({ onClose, onBenefitAdded }) {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [icon, setIcon] = useState('Truck');
    const [error, setError] = useState('');

    const iconOptions = [
        { value: 'Truck', label: 'Truck (Delivery)' },
        { value: 'Headphones', label: 'Headphones (Support)' },
        { value: 'RotateCcw', label: 'RotateCcw (Guarantee)' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axiosPrivate.post('/api/admin/benefits', {
                title,
                subtitle,
                icon,
            });

            console.log('Добавлен benefit:', response.data);
            onBenefitAdded();
            onClose();
        } catch (err) {
            if (err.response) {
                console.error('🔥 RESPONSE ERROR:', err.response.status);
                console.error('🔥 RESPONSE DATA:', err.response.data);
                setError(`Ошибка: ${err.response.status} — ${JSON.stringify(err.response.data)}`);
            } else {
                console.error('🔥 ERROR:', err.message);
                setError(err.message);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Добавить Benefit</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}

                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Название</label>
                    <input
                        type="text"
                        placeholder="FREE AND FAST DELIVERY"
                        className="w-full p-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Описание</label>
                    <input
                        type="text"
                        placeholder="Free delivery for all orders over $140"
                        className="w-full p-2 border rounded"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Иконка</label>
                    <select
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        {iconOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Добавить
                    </button>
                </div>
            </form>
        </div>
    );
} 