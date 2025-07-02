// import { Link } from "lucide-react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdImageSearch } from "react-icons/md";
import axiosPrivate from '../api/axiosPrivate';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axiosPrivate.get('/api/cart')
      .then((res) => {
        if (!Array.isArray(res.data)) {
          console.warn('⚠️ Неверный формат данных:', res.data);
          return;
        }

        console.log('🟢 Корзина:', res.data);
        setCartItems(res.data);
      })
      .catch((err) => {
        console.error('🔴 Ошибка загрузки корзины:', err);
        setCartItems([]);
      });
  }, []);

  // // Добавление товара в корзину
  // const addToCart = async (productId) => {
  //   try {
  //     const response = await axiosPrivate.post('/api/cart', { productId });
  //     setCartItems(response.data);
  //   } catch (error) {
  //     console.error('Cart adding error:', error);
  //   }
  // };

  // // Удаление товара из корзины
  // const removeFromCart = async (productId) => {
  //   try {
  //     const response = await axiosPrivate.delete(`/api/cart/${productId}`);
  //     setCartItems(response.data);
  //   } catch (error) {
  //     console.error('Error wen deliting cart:', error);
  //   }
  // };


  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Хлебные крошки */}
      <nav className="text-sm text-gray-500 mb-8">
        <span className="text-black">Home</span> / <span>Cart</span>
      </nav>

      {/* Таблица */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-sm text-gray-500">
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="bg-white shadow rounded">
                <td className="flex items-center gap-4 p-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xl"
                  >
                    ✕
                  </button>
                  <img
                    src={`/storage/${item.product.image}`}
                    alt={item.product.title}
                    className="w-16 h-16 object-contain"
                  />
                  <span>{item.product.title}</span>
                </td>
                <td>${item.product.price}</td>
                <td>
                  <select
                    className="border rounded p-1"
                    value={item.quantity}
                    onChange={(e) => updateCartItem(item.id, e.target.value)}
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td>${(item.product.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Кнопки действий */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
        <button className="border px-4 py-2 rounded hover:bg-gray-100">
          Return To Shop
        </button>
        <button className="border px-4 py-2 rounded hover:bg-gray-100">
          Update Cart
        </button>
      </div>

      {/* Купон и итог */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Купон */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border px-4 py-2 rounded w-60"
          />
          <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
            Apply Coupon
          </button>
        </div>

        {/* Итог */}
        <div className="border rounded p-6 w-full max-w-sm shadow">
          <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>$1750</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total:</span>
            <span>$1750</span>
          </div>
          <Link to="/checkout"
            className="block bg-red-500 text-white w-full py-2 rounded text-center hover:bg-red-600">
            Proceed to Checkout

          </Link>
        </div>
      </div>
    </section>
  );
}