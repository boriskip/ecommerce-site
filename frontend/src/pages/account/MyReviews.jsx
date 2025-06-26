import React from "react";
import { Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        product: "HAVIT HV-G92 Gamepad",
        image: "/reviews/loptop.png", // исправлено
        rating: 4,
        review: "Хорошее качество, отзывчивые кнопки, отлично подходит для гейминга.",
        date: "2025-06-20",
    },
    {
        id: 2,
        product: "AK-900 Wired Keyboard",
        image: "/reviews/phone.png", // исправлено
        rating: 5,
        review: "Очень доволен клавиатурой! Подсветка супер!",
        date: "2025-06-18",
    },
];

export default function MyReviews() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold mb-6">My Reviews</h2>

            {reviews.map((item) => (
                <div key={item.id} className="border rounded p-4 mb-4 shadow-sm flex gap-4">
                    <img
                        src={item.image}
                        alt={item.product}
                        className="w-24 h-24 object-cover rounded"
                    />

                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">{item.product}</h3>
                            <span className="text-xs text-gray-500">{item.date}</span>
                        </div>

                        <div className="flex items-center text-yellow-500 text-sm mb-2">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    size={16}
                                    fill={index < item.rating ? "#facc15" : "none"}
                                    stroke="#facc15"
                                />
                            ))}
                        </div>

                        <p className="text-gray-700 text-sm">{item.review}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
