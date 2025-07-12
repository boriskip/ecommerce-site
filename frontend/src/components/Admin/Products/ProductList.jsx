// components/Admin/Products/ProductList.jsx
import { useState, useEffect } from 'react';
import axiosPrivate from '@/api/axiosPrivate';
import ProductCard from '../../cards/ProductCard';
import AddProductModal from '../modals/Products/AddProductModal';
import EditProductModal from '../modals/Products/EditProductModal';


export default function ProductList() {
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
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Товары</h2>
                <button onClick={() => setShowAddModal(true)} className="bg-green-600 text-white px-4 py-2 rounded">
                    Добавить товар
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {visibleProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        oldPrice={product.old_price}
                        image={product.image_url || product.image} // если image_url есть
                        onEdit={() => setEditingProduct(product)}
                        onDelete={() => handleDelete(product.id)}
                        isAdmin={true}
                    />
                ))}
            </div>

            {products.length > 6 && (
                <div className="text-center mt-4">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {showAll ? 'Show Less' : 'Show All'}
                    </button>
                </div>
            )}

            {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} onProductAdded={fetchProducts} />}
            {editingProduct && <EditProductModal product={editingProduct} onClose={() => setEditingProduct(null)} onUpdated={fetchProducts} />}
        </div>
    );
}