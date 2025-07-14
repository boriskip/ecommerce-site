import { useState, useEffect } from 'react';
import axiosPrivate from '../../../../api/axiosPrivate';

export default function AddFlashSaleModal({ isOpen, onClose, onSuccess }) {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        product_id: '',
        price: '',
        old_price: '',
        discount: '',
        rating: '',
        reviews: '',
        starts_at: '',
        ends_at: '',
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [discount, setDiscount] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axiosPrivate.get('/api/admin/products?per_page=1000').then((res) => {
            setProducts(res.data.data || res.data);
        });
    }, []);

    useEffect(() => {
        if (form.product_id) {
            const prod = products.find((p) => p.id === Number(form.product_id));
            setSelectedProduct(prod);
            setForm((f) => ({ ...f, old_price: prod ? prod.price : '' }));
        } else {
            setSelectedProduct(null);
            setForm((f) => ({ ...f, old_price: '' }));
        }
    }, [form.product_id, products]);

    useEffect(() => {
        // Автоматически рассчитываем новую цену при изменении скидки или товара
        if (selectedProduct && discount) {
            const oldPrice = Number(selectedProduct.price);
            const newPrice = (oldPrice - (oldPrice * discount / 100)).toFixed(2);
            setForm((f) => ({ ...f, price: newPrice, discount }));
        } else {
            setForm((f) => ({ ...f, price: '', discount }));
        }
    }, [selectedProduct, discount]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'product_id') {
            setForm((f) => ({ ...f, product_id: value }));
        } else if (name === 'discount') {
            setDiscount(value);
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axiosPrivate.post('/api/admin/flash-sales', form);
            onSuccess && onSuccess();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при добавлении');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <h2 className="text-2xl font-bold mb-4">Добавить Flash Sale</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}

                {/* Выбор товара */}
                <label className="block mb-1 font-medium">Товар:</label>
                <select
                    name="product_id"
                    value={form.product_id}
                    onChange={handleChange}
                    required
                    className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                >
                    <option value="">Выберите товар</option>
                    {products.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.title}
                        </option>
                    ))}
                </select>

                {/* Старая цена */}
                <label className="block mb-1 font-medium">Старая цена:</label>
                <input
                    name="old_price"
                    value={form.old_price}
                    disabled
                    className="w-full mb-3 px-3 py-2 border rounded bg-gray-100 text-gray-700"
                    placeholder="Старая цена"
                />

                {/* Скидка */}
                <label className="block mb-1 font-medium">Скидка, %:</label>
                <input
                    name="discount"
                    value={discount}
                    onChange={handleChange}
                    required
                    type="number"
                    min="0"
                    max="100"
                    className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                    placeholder="Скидка, %"
                />

                {/* Новая цена */}
                <label className="block mb-1 font-medium">Новая цена:</label>
                <input
                    name="price"
                    value={form.price}
                    disabled
                    className="w-full mb-3 px-3 py-2 border rounded bg-gray-100 text-gray-700"
                    placeholder="Новая цена"
                />

                {/* Остальные поля */}
                <input
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    placeholder="Рейтинг"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    required
                    className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                />
                <input
                    name="reviews"
                    value={form.reviews}
                    onChange={handleChange}
                    placeholder="Отзывы"
                    type="number"
                    required
                    className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                />
                <input
                    name="starts_at"
                    value={form.starts_at}
                    onChange={handleChange}
                    placeholder="Начало"
                    type="datetime-local"
                    required
                    className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                />
                <input
                    name="ends_at"
                    value={form.ends_at}
                    onChange={handleChange}
                    placeholder="Окончание"
                    type="datetime-local"
                    required
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                />

                <div className="flex justify-end gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        Добавить
                    </button>
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
}
