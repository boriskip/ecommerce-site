import React from "react";
import WishlistCard from "../components/cards/WishlistCard";
import ProductCard from "../components/cards/ProductCard"

const wishlistItems = [
  {
    title: "Gucci duffle bag",
    price: 960,
    oldPrice: 1160,
    image: "public/wishlist/gucci-bag.png",
  },
  {
    title: "RGB liquid CPU Cooler",
    price: 1960,
    image: "public/wishlist/rbg-liquid.png",
  },
    {
    title: "GP11 Shoot USB Gamepad",
    price: 550,
    image: "public/wishlist/gamepad.png",
  },
    {
    title: "Quilted Satin Jacket",
    price: 750,
    image: "public/wishlist/jacke.png",
  },
  
];

const wishlistProduct = [
  {
    title: "ASUS FHD Gaming Loptop",
    price: 960,
    oldPrice: 960,
    image: "public/for-you/notebook.png",
  },
  {
    title: "IPS LCD Gaming Monitor",
    price: 550,
    image: "public/for-you/ips-lcd1.png",
  },
    {
    title: "HAVIT HV-G92 Gamepad",
    price: 550,
    image: "public/for-you/havit1.png",
  },
    {
    title: "AK_900 Wired Keyboard",
    price: 200,
    image: "public/for-you/ak-9001.png",
  },
  
];

export default function Wishlist() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Заголовок и кнопка */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Wishlist (4)</h2>
        <button className="border px-4 py-2 rounded hover:bg-gray-100">
          Move All To Bag
        </button>
      </div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {wishlistItems.map((item, index) => (
    <WishlistCard
      key={index}
      title={item.title}
      price={item.price}
      oldPrice={item.oldPrice}
      image={item.image}
    />
  ))}
</div>


      {/* Just For You */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="w-2 h-4 bg-red-500 inline-block rounded-sm" />
            Just For You
          </h3>
          <button className="border px-4 py-1 text-sm hover:bg-gray-100">See All</button>
        </div>

        {/* Сетка рекомендованных товаров */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {wishlistProduct.map((item, index) => (
    < ProductCard
      key={index}
      title={item.title}
      price={item.price}
      oldPrice={item.oldPrice}
      image={item.image}
    />
  ))}
        </div>
      </div>
    </section>
  );
}
