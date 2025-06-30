import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Heart, Eye, Star, StarOff } from "lucide-react";
import ProductCard from '../../cards/ProductCard';
import axios from "axios";

export default function ExploreProductsSection() {
  const [showAll, setShowAll] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(4);
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  useEffect(() => {
    axios.get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке продуктов:", err);
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



      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {(showAll ? products : products.slice(0, itemsToShow)).map((product, index) => (
          <div
            key={index}
            className="border rounded-md p-4 relative group hover:shadow-md transition">
            <div className="relative">
              <img
                src={`/storage/${product.image}`}
                alt={product.title}
                className="mx-auto h-32 ob` mb-4" />

              <div className="absolute bottom-0 left-0 w-full bg-black text-white text-sm text-center py-2 opacity-0 group-hover:opacity-100 transition duration-300">
                Add To Cart
              </div>
            </div>
            {/* Icons */}
            < div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition" >

              <button className="bg-white p-1 rounded-full border"><Heart size={16} /></button>

              <button className="bg-white p-1 rounded-full border"><Eye size={16} /></button>
            </div>

            <h3 className="text-sm font-semibold mb-2 truncate">{product.title}</h3>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-red-500 font-bold text-sm">
                ${product.price}
              </span>
            </div>

            <div className="flex items-center text-xs mt-2 text-yellow-500">
              {[...Array(5)].map((_, i) =>
                i < Math.floor(product.reviews_avg_rating) ? (
                  <Star key={i} size={14} className="fill-yellow-500 stroke-yellow-500" />
                ) : (
                  <StarOff key={i} size={14} className="stroke-yellow-500" />
                )
              )}
              <span className="text-gray-600 ml-1">({product.reviews_count || 0})</span>

            </div>

          </div>
        ))
        }
      </div >
      <div className="text-center mt-10">

        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 text-sm"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>
    </section >
  )
}