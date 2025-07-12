import React from "react";
// import { Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import axiosPrivate from '@/api/axiosPrivate';
import toast from 'react-hot-toast';
// import useCart from '../../hooks/useCart';


export default function NewArrivalsCardCard({ id, title, subtitle, image, onEdit, onDelete, isAdmin = false }) {


    return (
        <div className="border rounded-md p-4 relative group">


            {/* Фото */}
            {image ? (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-contain mb-4"
                />
            ) : (
                <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-400 mb-4">
                    No image
                </div>
            )}

            {/* Название */}
            <h4 className="text-sm font-semibold mb-1">{title}</h4>


            {/* Только для админа */}
            {isAdmin && (
                <div className="flex flex-col gap-2 mt-2">
                    <button
                        onClick={onEdit}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                        ✏️ Редактировать
                    </button>

                    <button
                        onClick={onDelete}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                        🗑️ Удалить
                    </button>
                </div>
            )}
        </div>
    );
}