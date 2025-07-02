import { useState } from 'react';
import axiosPrivate from '../../../api/axiosPrivate';

export default function AddProductModal({ onClose, onProductAdded }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('old_price', oldPrice);
        formData.append('image', image); // это файл, не строка

        try {
            const response = await axiosPrivate.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Добавлен продукт:', response.data);

            onProductAdded(response.data); // обновляем родительский компонент
            onClose();
        } catch (err) {
            setError('Ошибка при добавлении товара');
            console.error(err);
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
                    type="number"
                    placeholder="Цена"
                    className="w-full mb-3 p-2 border rounded"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Старая цена"
                    className="w-full mb-3 p-2 border rounded"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
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