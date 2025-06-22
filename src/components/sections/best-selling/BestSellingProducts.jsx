import { useState, useEffect } from "react";
import { Heart, Eye } from "lucide-react";
import BestSellingBanner from './BestSellingBanner';

const products = [
  {
    title: "The north coat",
    image: "/best-seling/coat.png",
    price: 260,
    oldPrice: 360,
    rating: 5,
  },
  {
    title: "Gucci duffle bag",
    image: "/best-seling/gucci-bag.png",
    price: 960,
    oldPrice: 1160,
    rating: 5,
  },
  {
    title: "RGB liquid CPU Cooler",
    image: "/best-seling/rbg-liquid.png",
    price: 160,
    oldPrice: 170,
    rating: 5,
  },
  {
    title: "Small BookSelf",
    image: "/best-seling/book-shelf.png",
    price: 360,
    oldPrice: null,
    rating: 5,
  },
    {
    title: "The north coat",
    image: "/best-seling/coat.png",
    price: 260,
    oldPrice: 360,
    rating: 5,
  },
  {
    title: "Gucci duffle bag",
    image: "/best-seling/gucci-bag.png",
    price: 960,
    oldPrice: 1160,
    rating: 5,
  },
  {
    title: "RGB liquid CPU Cooler",
    image: "/best-seling/rbg-liquid.png",
    price: 160,
    oldPrice: 170,
    rating: 5,
  },
  {
    title: "Small BookSelf",
    image: "/best-seling/book-shelf.png",
    price: 360,
    oldPrice: null,
    rating: 5,
  },
];

export default function BestSellingProducts() {
  const [showAll, setShowAll] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);

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

  const visibleProducts = showAll ? products : products.slice(0, itemsToShow);

    return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-red-500 font-medium mb-1">This Month</p>
          <h2 className="text-2xl font-bold">Best Selling Products</h2>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 text-sm"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {visibleProducts.map((product, index) => (
          <div
            key={index}
            className="border rounded-md p-4 relative group hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto h-32 object-contain mb-4"
            />

            {/* Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
              <button className="bg-white p-1 rounded-full border">
                <Heart size={16} />
              </button>
              <button className="bg-white p-1 rounded-full border">
                <Eye size={16} />
              </button>
            </div>

            <h3 className="text-sm font-semibold mb-2 truncate">
              {product.title}
            </h3>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-red-500 font-bold text-sm">${product.price}</span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through text-sm">
                  ${product.oldPrice}
                </span>
              )}
            </div>
            <div className="text-yellow-400 text-sm">★★★★★ <span className="text-gray-500 text-xs">(65)</span></div>
          </div>
        ))}
      </div>
      <hr className="mt-10 border-gray-300" />
      <BestSellingBanner />
    </section>
    );
}