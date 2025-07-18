import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosPublic from '../api/axiosPublick';
import Header from '../components/layout/Header';
import ProductCard from '../components/cards/ProductCard';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        setLoading(true);
        setError(null);
        if (query) {
            axiosPublic.get(`/api/products/public?search=${encodeURIComponent(query)}`)
                .then(res => setProducts(res.data))
                .catch(err => setError(err.response?.data?.message || "Ошибка поиска"))
                .finally(() => setLoading(false));
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [query]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Search results for "{query}"</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.length === 0 ? (
                    <div className="col-span-4 text-gray-500">No products found.</div>
                ) : (
                    products.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))
                )}
            </div>
        </section>
    );
}