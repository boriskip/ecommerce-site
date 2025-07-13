// components/Admin/NewArrivals/NewArrivalsList.jsx
import { useState, useEffect } from 'react';
import axiosPrivate from '@/api/axiosPrivate';
import NewArrivalsCard from '../../cards/NewArrivalsCard';
import AddNewArrivalModal from '../modals/NewArrivals/AddNewArrivalModal';
import EditNewArrivalModal from '../modals/NewArrivals/EditNewArrivalModal';
import BenefitBarAdmin from './BenefitBarAdmin';
import AddBenefitModal from '../modals/Benefits/AddBenefitModal';
import EditBenefitModal from '../modals/Benefits/EditBenefitModal';

export default function NewArrivalsList() {
    const [newArrivals, setNewArrivals] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [editingNewArrivals, setEditingNewArrivals] = useState(null);
    const [editingBenefit, setEditingBenefit] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddBenefitModal, setShowAddBenefitModal] = useState(false);

    const fetchNewArrivals = () => {
        axiosPrivate.get("/api/admin/new-arrivals")
            .then((res) => {
                setNewArrivals(res.data);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке New Arrivals:", err);
            });
    };

    const fetchBenefits = () => {
        axiosPrivate.get("/api/admin/benefits")
            .then((res) => {
                setBenefits(res.data);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке Benefits:", err);
            });
    };

    // Загружаем данные при первом рендере
    useEffect(() => {
        fetchNewArrivals();
        fetchBenefits();
    }, []);

    const handleDeleteNewArrival = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить New Arrival?");
        if (!confirmDelete) return;

        try {
            await axiosPrivate.delete(`/api/admin/new-arrivals/${id}`);
            setNewArrivals((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении New Arrival:", error);
            alert("Не удалось удалить New Arrival.");
        }
    };

    const handleDeleteBenefit = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить Benefit?");
        if (!confirmDelete) return;

        try {
            await axiosPrivate.delete(`/api/admin/benefits/${id}`);
            setBenefits((prev) => prev.filter((b) => b.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении Benefit:", error);
            alert("Не удалось удалить Benefit.");
        }
    };

    const visibleNewArrivals = showAll ? newArrivals : newArrivals.slice(0, 6);

    return (
        <div>
            {/* New Arrivals Section */}
            <div className="mb-8">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">New Arrivals</h2>
                    <button onClick={() => setShowAddModal(true)} className="bg-green-600 text-white px-4 py-2 rounded">
                        Add New Arrival
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {visibleNewArrivals.map(item => (
                        <NewArrivalsCard
                            key={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            image={item.image_url}
                            onEdit={() => setEditingNewArrivals(item)}
                            onDelete={() => handleDeleteNewArrival(item.id)}
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
            </div>

            {/* Benefits Section */}
            <div className="mb-8">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">Benefits Bar</h2>
                    <button onClick={() => setShowAddBenefitModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
                        Add Benefit
                    </button>
                </div>

                <BenefitBarAdmin
                    benefits={benefits}
                    onEdit={(benefit) => setEditingBenefit(benefit)}
                    onDelete={handleDeleteBenefit}
                />
            </div>

            {/* Modals */}
            {showAddModal && <AddNewArrivalModal onClose={() => setShowAddModal(false)} onProductAdded={fetchNewArrivals} />}
            {editingNewArrivals && <EditNewArrivalModal item={editingNewArrivals} onClose={() => setEditingNewArrivals(null)} onUpdated={fetchNewArrivals} />}

            {showAddBenefitModal && <AddBenefitModal onClose={() => setShowAddBenefitModal(false)} onBenefitAdded={fetchBenefits} />}
            {editingBenefit && <EditBenefitModal benefit={editingBenefit} onClose={() => setEditingBenefit(null)} onUpdated={fetchBenefits} />}
        </div>
    );
}