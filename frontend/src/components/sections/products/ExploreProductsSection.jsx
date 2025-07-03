import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Heart, Eye, Star, StarOff } from "lucide-react";
import ProductCard from '../../cards/ProductCard';
import axiosPublic from "../../../api/axiosPublick";

export default function ExploreProductsSection() {
  const [showAll, setShowAll] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [products, setProducts] = useState([]);

  // Обновление количества отображаемых карточек при изменении ширины экрана
  useEffect(() => {
    const updateItemsToShow = () => {
      setItemsToShow(window.innerWidth < 768 ? 2 : 4);
    };
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  // Получение продуктов
  useEffect(() => {
    axiosPublic.get("/api/products/public")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке продуктов:", err);
      });
  }, []);

  useEffect(() => {
    axiosPublic.get('/api/products/public')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Ошибка при загрузке продуктов:', err);
      });
  }, []);


  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-red-500 font-semibold text-sm">Our Products</p>
          <h2 className="text-2xl font-bold">Explore Our Products</h2>
        </div>
        <div className="flex gap-2">
          <button className="bg-white p-2 rounded-full border hover:bg-gray-100">
            <ArrowLeft size={18} />
          </button>
          <button className="bg-white p-2 rounded-full border hover:bg-gray-100">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Сетка продуктов */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {(showAll ? products : products.slice(0, itemsToShow)).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            oldPrice={product.old_price}
            image={product.image}
            rating={parseFloat(product.reviews_avg_rating)}
            reviewsCount={product.reviews_count}
          />
        ))}
      </div>

      {/* Кнопка View All */}
      <div className="text-center mt-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 text-sm"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>
    </section>
  )
}