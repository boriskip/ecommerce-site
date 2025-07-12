
import { useState } from 'react';
import axiosPrivate from '../../../../api/axiosPrivate';

export default function AddNewArrivalModal({ onClose, onProductAdded }) {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        if (image instanceof File) {
            formData.append('image', image);
            console.log(image);
        }

        try {
            const response = await axiosPrivate.post('/api/admin/new-arrivals', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Добавлен new0arrivals:', response.data);

            onProductAdded(response.data);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Добавить товар</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input
                    type="text"
                    placeholder="Название"
                    className="w-full mb-3 p-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Subtitle"
                    className="w-full mb-3 p-2 border rounded"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    className="w-full mb-4"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
                <div className="flex justify-between">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
                        Отмена
                    </button>
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                        Добавить
                    </button>
                </div>
            </form>
        </div>
    );
}