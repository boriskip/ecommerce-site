import { Heart, Eye, Star, StarOff } from "lucide-react";

export default function FlashProductCard({ product }) {
  if (!product || typeof product !== 'object') {
    return null;
  }
  const {
    title = 'Нет названия',
    price = 0,
    oldPrice = '',
    image = '',
    discount = 0,
    rating = 0,
    reviews = 0,
  } = product;

  return (
    <div className="relative group bg-white border rounded-lg p-4 hover:shadow-md transition-all">
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
        -{discount}%
      </div>

      {/* Icons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
        <button className="bg-white p-1 rounded-full border">
          <Heart size={16} />
        </button>
        <button className="bg-white p-1 rounded-full border">
          <Eye size={16} />
        </button>
      </div>

      <div className="relative">
        {image ? (
          <img
            src={`/${product.image}`}
            alt={title}
            className="w-full h-50 object-cover mb-4"
          />
        ) : (
          <div className="w-full h-50 bg-gray-100 flex items-center justify-center mb-4 text-gray-400">Нет изображения</div>
        )}
        <div className="absolute bottom-0 left-0 w-full bg-black text-white text-sm text-center py-2 opacity-0 group-hover:opacity-100 transition duration-300">
          Add To Cart
        </div>
      </div>
      <h3 className="text-sm font-semibold h-10 overflow-hidden leading-tight line-clamp-2">{title}</h3>
      <div className="text-red-500 font-bold">${price}</div>
      {oldPrice && <div className="text-gray-500 text-sm line-through">${oldPrice}</div>}

      <div className="flex items-center text-xs mt-2 text-yellow-500">
        {[...Array(5)].map((_, i) =>
          i < Math.floor(rating) ? (
            <Star key={i} size={14} className="fill-yellow-500 stroke-yellow-500" />
          ) : (
            <StarOff key={i} size={14} className="stroke-yellow-500" />
          )
        )}
        <span className="text-gray-600 ml-1">({reviews})</span>
      </div>
    </div>
  );
}
