// components/Admin/NewArrivals/NewArrivalsList.jsx
import { useState, useEffect } from 'react';
import axiosPrivate from '@/api/axiosPrivate';
import NewArrivalsCard from '../../cards/NewArrivalsCard';
import AddNewArrivalModal from '../modals/NewArrivals/AddNewArrivalModal';
import EditNewArrivalModal from '../modals/NewArrivals/EditNewArrivalModal';
import BenefitBarAdmin from './BenefitBarAdmin';



export default function NewArrivalsList() {
    const [newArrivals, setNewArrivals] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [editingNewArrivals, setEditingNewArrivals] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchProducts = () => {
        axiosPrivate.get("/api/admin/new-arrivals")
            .then((res) => {
                setNewArrivals(res.data);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке New Arrivals:", err);
            });
    };

    // Загружаем продукты при первом рендере
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить товар?");
        if (!confirmDelete) return;

        try {
            await axiosPrivate.delete(`/api/admin/new-arrivals/${id}`);
            setNewArrivals((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении товара:", error);
            alert("Не удалось удалить товар.");
        }
    };

    const visibleProducts = showAll ? newArrivals : newArrivals.slice(0, 6);

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Neww Arrivals</h2>
                <button onClick={() => setShowAddModal(true)} className="bg-green-600 text-white px-4 py-2 rounded">
                    Add New Arivals
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {visibleProducts.map(item => (
                    <NewArrivalsCard
                        key={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                        image={item.image_url}
                        onEdit={() => setEditingNewArrivals(item)}
                        onDelete={() => handleDelete(item.id)}
                        isAdmin={true}
                    />
                ))}

            </div>
            {newArrivals.length > 6 && (
                <div className="text-center mt-4">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {showAll ? 'Show Less' : 'Show All'}
                    </button>
                </div>
            )}

            {showAddModal && <AddNewArrivalModal onClose={() => setShowAddModal(false)} onProductAdded={fetchProducts} />}

            {editingNewArrivals && <EditNewArrivalModal item={editingNewArrivals} onClose={() => setEditingNewArrivals(null)} onUpdated={fetchProducts} />}

            <BenefitBarAdmin />

        </div>
    );
}