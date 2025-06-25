import React from "react";

export default function Checkout() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
      {/* Левая часть — форма */}
      <div>
        {/* Хлебные крошки */}
        <nav className="text-sm text-gray-500 mb-6">
          Account / My Account / Product / View Cart / <span className="text-black">CheckOut</span>
        </nav>

        <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

        <form className="space-y-4">
          <input className="w-full border rounded px-4 py-2" placeholder="First Name*" required />
          <input className="w-full border rounded px-4 py-2" placeholder="Company Name" />
          <input className="w-full border rounded px-4 py-2" placeholder="Street Address*" required />
          <input className="w-full border rounded px-4 py-2" placeholder="Apartment, floor, etc. (optional)" />
          <input className="w-full border rounded px-4 py-2" placeholder="Town/City*" required />
          <input className="w-full border rounded px-4 py-2" placeholder="Phone Number*" required />
          <input className="w-full border rounded px-4 py-2" placeholder="Email Address*" required />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked />
            Save this information for faster check-out next time
          </label>
        </form>
      </div>

      {/* Правая часть — итоги */}
      <div className="bg-white rounded p-6 shadow-md space-y-6">
        {/* Список товаров */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>LCD Monitor</span>
            <span>$650</span>
          </div>
          <div className="flex justify-between">
            <span>HI Gamepad</span>
            <span>$1100</span>
          </div>
        </div>

        <hr />

        {/* Итого */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>$1750</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-base">
            <span>Total:</span>
            <span>$1750</span>
          </div>
        </div>

        {/* Способ оплаты */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" />
            Bank
            <img src="/checkout/payment-methods.png" alt="cards" className="h-5 ml-2" />
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" defaultChecked />
            Cash on delivery
          </label>
        </div>

        {/* Купон */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border px-4 py-2 rounded w-full"
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Apply 
          </button>
        </div>

        {/* Кнопка */}
        <button className="bg-red-500 w-full text-white py-2 rounded hover:bg-red-600 mt-4">
          Place Order
        </button>
      </div>
    </section>
  );
}
