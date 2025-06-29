import React from "react";
import { Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ id, title, price, oldPrice, image, onEdit, isAdmin = false }) {
  return (
    <div className="border rounded-md p-4 relative group">
      <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
        <Eye size={18} />
      </button>

      {/* Фото */}
      <img
        src={`/storage/${image}`}
        alt={title}
        className="w-full h-40 object-contain mb-4"
      />

      {/* Название */}
      <h4 className="text-sm font-semibold mb-1">{title}</h4>

      {/* Цена */}
      <div className="text-sm mb-2">
        <span className="text-red-500 font-bold mr-2">${price}</span>
        {oldPrice && <span className="line-through text-gray-400">${oldPrice}</span>}
      </div>

      {/* Только для пользователей */}
      {!isAdmin && (
        <button className="bg-black text-white py-1.5 w-full flex items-center justify-center gap-2 hover:bg-gray-800">
          <ShoppingCart size={16} /> Add To Cart
        </button>
      )}

      {/* Только для админа */}
      {isAdmin && onEdit && (
        <button
          onClick={onEdit}
          className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          ✏️ Редактировать
        </button>
      )}
    </div>
  );
}