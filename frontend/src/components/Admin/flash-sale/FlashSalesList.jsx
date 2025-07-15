import { useState, useEffect } from 'react';
import axiosPrivate from '../../../api/axiosPrivate';
import AddFlashSaleModal from '../modals/FlashSales/AddFlashSaleModal';
import EditFlashSaleModal from '../modals/FlashSales/EditFlahModal';

export default function FlashSalesList() {
    const [flashSales, setFlashSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [error, setError] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingSale, setEditingSale] = useState(null);

    useEffect(() => {
        fetchFlashSales();
    }, []);

    async function fetchFlashSales() {
        setLoading(true);
        setError('');
        try {
            const res = await axiosPrivate.get('/api/admin/flash-sales');
            setFlashSales(res.data);
            console.log('Получено из API:', res.data);
        } catch (e) {
            setError('Ошибка загрузки списка');
            console.log('Загрузка Flash Sales...');

        } finally {
            setLoading(false);
        }
    }

    function handleAdded(newSale) {
        setFlashSales([newSale, ...flashSales]);
    }

    async function handleDelete(id) {
        if (!window.confirm('Удалить этот Flash Sale?')) return;
        try {
            await axiosPrivate.delete(`/api/admin/flash-sales/${id}`);
            setFlashSales(flashSales.filter(fs => fs.id !== id));
        } catch (e) {
            alert('Ошибка при удалении');
        }
    }

    function openEditModal(fs) {
        setEditingSale(fs);
        setEditModalOpen(true);
    }

    return (
        <div className="bg-white rounded shadow p-4 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Flash Sales</h2>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded"
                    onClick={() => setShowAddModal(true)}
                >
                    + Добавить Flash Sale
                </button>

            </div>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {loading ? (
                <div>Загрузка...</div>
            ) : flashSales.length === 0 ? (
                <div>Нет активных Flash Sales</div>
            ) : (
                <table className="w-full text-sm border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Изображение</th>
                            <th className="p-2 border">Продукт</th>
                            <th className="p-2 border">Цена</th>
                            <th className="p-2 border">Старая цена</th>
                            <th className="p-2 border">Скидка</th>
                            <th className="p-2 border">Рейтинг</th>
                            <th className="p-2 border">Отзывы</th>
                            <th className="p-2 border">Начало</th>
                            <th className="p-2 border">Окончание</th>
                            <th className="p-2 border">Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flashSales.map(fs => (
                            <tr key={fs.id}>
                                <td className="p-2 border">{fs.id}</td>
                                <td className="p-2 border">
                                    {fs.product.image && (
                                        <img
                                            src={`/${fs.product.image}`}
                                            alt=""
                                            style={{ width: 48, height: 48, objectFit: 'cover' }}
                                        />
                                    )}
                                </td>
                                <td className="p-2 border">{fs.product?.title || fs.product_id}</td>
                                <td className="p-2 border">{fs.price}</td>
                                <td className="p-2 border">{fs.old_price}</td>
                                <td className="p-2 border">{fs.discount}%</td>
                                <td className="p-2 border">{fs.rating}</td>
                                <td className="p-2 border">{fs.reviews}</td>

                                <td className="p-2 border">{fs.starts_at?.replace('T', ' ').slice(0, 16)}</td>
                                <td className="p-2 border">{fs.ends_at?.replace('T', ' ').slice(0, 16)}</td>

                                <td className="p-2 border">
                                    <button
                                        onClick={() => openEditModal(fs)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Редактировать
                                    </button>
                                </td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => handleDelete(fs.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {editModalOpen && (
                <EditFlashSaleModal
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onSuccess={fetchFlashSales}
                    flashSale={editingSale}
                />
            )}
            {showAddModal && (
                <AddFlashSaleModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSuccess={fetchFlashSales} // чтобы после добавления обновить список
                />
            )}
        </div>
    );
} 