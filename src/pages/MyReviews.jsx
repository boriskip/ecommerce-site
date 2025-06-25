import React from "react";

const mockReviews = [
  {
    product: "Wireless Headphones",
    image: "/images/products/headphones.png",
    rating: 4,
    comment: "Great sound quality, but a bit tight on the ears.",
    date: "2025-06-15",
  },
  {
    product: "Gaming Mouse",
    image: "/images/products/mouse.png",
    rating: 5,
    comment: "Super responsive and ergonomic design!",
    date: "2025-06-12",
  },
];

export default function MyReviews() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">My Reviews</h2>
      <div className="space-y-6">
        {mockReviews.map((review, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 border p-4 rounded shadow-sm"
          >
            <img
              src={review.image}
              alt={review.product}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{review.product}</h3>
              <p className="text-yellow-500">
                {"★".repeat(review.rating)}{" "}
                {"☆".repeat(5 - review.rating)}
              </p>
              <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">{review.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
