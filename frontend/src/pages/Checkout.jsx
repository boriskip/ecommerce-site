import { useEffect, useState } from "react";
import axiosPrivate from "../api/axiosPrivate";
import useCart from "../hooks/useCart";
import toast from 'react-hot-toast';



export default function Checkout() {
  const { cartItems } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");




  useEffect(() => {
    axiosPrivate.get("/api/addresses").then(res => setAddresses(res.data));
    axiosPrivate.get("/api/payment-methods").then(res => setCards(res.data));
  }, []);

  // const handlePlaceOrder = async () => {
  //   try {
  //     const res = await axiosPrivate.post("/api/orders", {
  //       address_id: selectedAddressId,
  //       payment_method: paymentMethod === "card" ? "card" : "cash",
  //       card_id: selectedCardId, // можно передавать, если надо
  //       items: cartItems.map(item => ({
  //         product_id: item.product.id,
  //         quantity: item.quantity,
  //       })),
  //     });

  //     toast.success("Order placed!");
  //   } catch (err) {
  //     toast.error("Failed to place order");
  //     console.error(err);
  //   }
  // };
  const handlePlaceOrder = async () => {
    // Проверки
    if (!selectedAddressId) {
      toast.error("Please select an address.");
      return;
    }

    if (paymentMethod === "card" && !selectedCardId) {
      toast.error("Please select a card.");
      return;
    }

    const payload = {
      address_id: selectedAddressId,
      payment_method: paymentMethod,
      ...(paymentMethod === "card" && { card_id: selectedCardId }), // 👈 добавим только если карта
      items: cartItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    console.log("📦 Payload to send:", payload);

    try {
      const response = await axiosPrivate.post("/api/orders", payload);
      toast.success("Order placed!");
    } catch (error) {
      console.error("❌ Order failed:", error.response?.data || error.message);
      toast.error("Order failed");
    }
  };

  const handleStripeCheckout = async () => {
    if (!selectedAddressId) {
      toast.error("Please select an address.");
      return;
    }

    if (paymentMethod === "card" && !selectedCardId) {
      toast.error("Please select a card.");
      return;
    }

    const payload = {
      address_id: selectedAddressId,
      payment_method: "card", // stripe = всегда карта
      card_id: selectedCardId,
      items: cartItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    console.log("🧾 Payload to Stripe Checkout:", payload);

    try {
      const res = await axiosPrivate.post('/api/stripe/checkout', payload);
      window.location.href = res.data.url;
    } catch (err) {
      console.error("❌ Stripe error:", err.response?.data || err.message);
      toast.error("Stripe checkout failed");
    }
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
      {/* Левая часть */}
      <div>
        <nav className="text-sm text-gray-500 mb-6">
          Account / My Account / Product / View Cart / <span className="text-black">Checkout</span>
        </nav>

        <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

        {/* Выбор адреса */}
        <select
          value={selectedAddressId || ""}
          onChange={(e) => setSelectedAddressId(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="">Choose address</option>
          {addresses.map(addr => (
            <option key={addr.id} value={addr.id}>
              {addr.street}, {addr.city}
            </option>
          ))}
        </select>

        {/* Выбор карты */}
        {paymentMethod === "card" && (
          <select onChange={(e) => setSelectedCardId(e.target.value)} className="border p-2 w-full mb-4">
            <option>Choose card</option>
            {cards.map(card => (
              <option key={card.id} value={card.id}>
                {card.card_brand} **** {card.card_last4}
              </option>
            ))}
          </select>
        )}

        {/* Способ оплаты */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Pay with card
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on delivery
          </label>
        </div>

        {/* Чекбокс */}
        <label className="flex items-center gap-2 text-sm mt-4">
          <input type="checkbox" defaultChecked />
          Save this information for faster checkout next time
        </label>
      </div>

      {/* Правая часть — итоги */}
      <div className="bg-white rounded p-6 shadow-md space-y-6">
        <h3 className="text-lg font-semibold">Your Order</h3>

        {/* Список товаров */}
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center gap-4">
              <img
                src={`/storage/${item.product.image}`}
                alt={item.product.title}
                className="h-16 w-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.product.title}</p>
                <p className="text-sm text-gray-500">x{item.quantity}</p>
              </div>
              <span className="font-semibold">${item.product.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <hr />

        {/* Итоги */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-base">
            <span>Total:</span>
            <span>${total}</span>
          </div>
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
        <button
          onClick={paymentMethod === "card" ? handleStripeCheckout : handlePlaceOrder}
          type="button"
          className="bg-red-500 w-full text-white py-2 rounded hover:bg-red-600 mt-4"
        >
          Place Order
        </button>
      </div>
    </section>
  );
}
