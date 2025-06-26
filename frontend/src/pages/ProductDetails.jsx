import React from "react";
import { useParams } from "react-router-dom";
import { } from "lucide-react";

export default function ProductDetails() {
    const { id } = useParams();
    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            {/* Навигация "хлебные крошки" */}
            <nav className="text-sm text-gray-500 mb-6">
                Account / Gaming / <span className="text-black font-medium">Havic HV G-92 Gamepad</span>
            </nav>

            {/* Основной блок товара */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Галерея изображений */}
                <div className="flex gap-4">
                    {/* Маленькие превьюшки */}
                    <div className="flex flex-col gap-4">
                        {/* <img src="..." /> */}
                    </div>

                    {/* Главное изображение */}
                    <div>
                        {/* <img src="..." className="w-[400px] h-[400px] object-contain" /> */}
                    </div>
                </div>

                {/* Инфо о товаре */}
                <div className="flex-1 space-y-4">
                    <h2 className="text-xl font-semibold">Havic HV G-92 Gamepad</h2>
                    <div className="text-sm text-gray-500">
                        ★★★★★ <span>(50 Reviews)</span> <span className="text-green-500 ml-2">In Stock</span>
                    </div>
                    <p className="text-lg font-bold">$192.00</p>
                    <p className="text-sm text-gray-600">
                        PlayStation 5 Controller skin high quality vinyl...
                    </p>

                    {/* Цвета */}
                    <div>
                        <p className="font-medium">Colours:</p>
                        {/* Цветовые кружочки */}
                    </div>

                    {/* Размеры */}
                    <div>
                        <p className="font-medium">Size:</p>
                        {/* Кнопки размеров */}
                    </div>

                    {/* Кол-во и кнопки */}
                    <div className="flex items-center gap-4 mt-4">
                        {/* Счетчик */}
                        {/* <button>-</button> <span>1</span> <button>+</button> */}

                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Buy Now
                        </button>

                        <button className="border px-4 py-2 rounded hover:bg-gray-100">♡</button>
                    </div>

                    {/* Иконки доставки и возврата */}
                    <div className="mt-6 space-y-3 text-sm">
                        <div>🚚 Free Delivery</div>
                        <div>↩ Free 30 Days Return</div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="w-2 h-4 bg-red-500 inline-block rounded-sm" />
                    Related Items
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {/* <ProductCard /> x4 */}
                </div>
            </div>
        </section>
    );
}
