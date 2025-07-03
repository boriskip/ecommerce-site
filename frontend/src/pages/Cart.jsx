// import { Link } from "lucide-react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdImageSearch } from "react-icons/md";
import axiosPrivate from '../api/axiosPrivate';
import toast from 'react-hot-toast';
import useCart from '../hooks/useCart';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { fetchCartQuantity } = useCart();

  useEffect(() => {
    axiosPrivate.get('/api/cart')
      .then((res) => {
        const data = res.data;

        // Проверка, массив ли это
        if (!Array.isArray(data)) {
          console.warn('⚠️ An array was expected, but received:', data);

          // Дополнительно проверим, может это Blade или HTML
          if (typeof data === 'string' && data.includes('<!DOCTYPE html')) {
            console.error('❌ HTML received, possibly redirect to login');
          }
          return;
        }
        console.log('🛒 Cart:', data);
        setCartItems(data);
      })
      .catch((err) => {
        console.error('❌ Error loading:', err);
        if (err.response) {
          console.log('📄 Response from server:', err.response.data);
        }
        setCartItems([]);
      });
  }, []);

  const handleRemove = (id) => {
    axiosPrivate.delete(`/api/cart/${id}`)
      .then(() => {
        setCartItems(prev => prev.filter(item => item.id !== id));
        fetchCartQuantity();
        toast.success('Item removed from cart');
      })
      .catch(err => {
        console.error('Error deleting item:', err);
        toast.error('Failed to delete item');
      });
  };

  const handleQuantityChange = (id, quantity) => {
    axiosPrivate.put(`/api/cart/${id}`, { quantity: parseInt(quantity) })
      .then((res) => {
        toast.success("Quantity updated");
        fetchCartQuantity();
        // Обновляем локально корзину
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: parseInt(quantity) } : item
          )
        );
      })
      .catch((err) => {
        toast.error("Failed to update quantity");
        console.error(err);
      });
  };

  const clearCart = async () => {
    try {
      await axiosPrivate.delete('/api/cart/clear');
      setCartItems([]); // очистить локально
      fetchCartQuantity();
      toast.success("The shopping cart has been emptied.");
    } catch (error) {
      toast.error("Error while emptying the cart");
      console.error(error);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

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
                    onClick={() => handleRemove(item.id)}
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
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
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
        <Link to='/'>
          <button className="border px-4 py-2 rounded hover:bg-gray-100">
            Return To Shop
          </button>
        </Link>
        <button
          onClick={clearCart}
          className="border px-4 py-2 rounded hover:bg-gray-100">
          Clear cart
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
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mb-4">
            Total: €{totalPrice.toFixed(2)}
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