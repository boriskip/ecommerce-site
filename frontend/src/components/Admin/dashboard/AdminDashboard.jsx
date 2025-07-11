import { useState, useEffect } from 'react';
// import { Plus } from "lucide-react";
import axiosPrivate from '../../../api/axiosPrivate';
import ProductCard from '@/components/cards/ProductCard';
import EditProductModal from '@/components/Admin/modals/EditProductModal';
import AddProductModal from '../modals/AddProductModal';


export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchProducts = () => {
        axiosPrivate.get("/api/admin/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке продуктов:", err);
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
            await axiosPrivate.delete(`/api/admin/products/${id}`);
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении товара:", error);
            alert("Не удалось удалить товар.");
        }
    };

    const visibleProducts = showAll ? products : products.slice(0, 6);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>
            <p className="text-gray-700">Добро пожаловать в административную панель.</p>

            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Добавить товар
                </button>
            </div>

            <h2 className='text-2xl font-bold mb-4 text-red-500'>Best Selling Products</h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {visibleProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        oldPrice={product.old_price}
                        image={product.image}
                        onEdit={() => setEditingProduct(product)}
                        onDelete={() => handleDelete(product.id)}
                        isAdmin={true}
                    />
                ))}
            </div>

            {/* Кнопка переключения */}
            {products.length > 6 && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {showAll ? 'Show Less' : 'Show All'}
                    </button>
                </div>
            )}
            {showAddModal && (
                <AddProductModal
                    onClose={() => setShowAddModal(false)}
                    onProductAdded={(newProduct) => {
                        setProducts(prev => [...prev, newProduct]);
                        setShowAddModal(false);
                    }}
                />
            )}
            {/* Модальное окно редактирования */}
            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onUpdated={fetchProducts}
                />
            )}
        </div>
    );
}
