import React, { useEffect, useState } from "react";
import axiosPrivate from "@/api/axiosPrivate";
import toast from "react-hot-toast";

export default function PaymentOptions() {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    card_last4: "",
    card_brand: "",
    expires: "",
  });

  // Получение сохранённых карт
  useEffect(() => {
    axiosPrivate.get("/api/payment-methods")
      .then(res => setCards(res.data))
      .catch(() => toast.error("Error loading card"));
  }, []);

  const handleChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const handleAddCard = async () => {
    try {
      const res = await axiosPrivate.post("/api/payment-methods", newCard);
      setCards([...cards, res.data]);
      setNewCard({ card_last4: "", card_brand: "", expires: "" });
      toast.success("card added");
    } catch (err) {
      toast.error("Error adding card");
      console.error(err);
    }
  };


  const handleRemove = async (id) => {
    try {
      await axiosPrivate.delete(`/api/payment-methods/${id}`);
      setCards(cards.filter(card => card.id !== id));
      toast.success("Card delite");
    } catch (err) {
      toast.error("Error delited card");
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-red-500 mb-4">My Payment Options</h2>
      <p className="text-sm text-gray-600 mb-4">Manage your saved cards or add a new one.</p>

      {/* Список карт */}
      {cards.map(card => (
        <div key={card.id} className="border p-4 rounded mb-4 flex justify-between items-center">
          <div>
            <p className="font-medium">{card.card_brand} ending in {card.card_last4}</p>
            <p className="text-sm text-gray-600">Expires {card.expires}</p>
          </div>
          <button
            onClick={() => handleRemove(card.id)}
            className="text-sm text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Форма добавления карты */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Add New Card</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="card_brand"
            value={newCard.card_brand}
            onChange={handleChange}
            placeholder="Brand (e.g. Visa)"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="card_last4"
            value={newCard.card_last4}
            onChange={handleChange}
            placeholder="Last 4 digits"
            maxLength={4}
            className="border rounded p-2"
          />
          <input
            type="text"
            name="expires"
            value={newCard.expires}
            onChange={handleChange}
            placeholder="MM/YY"
            className="border rounded p-2"
          />
        </div>

        <button
          onClick={handleAddCard}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Add New Payment Method
        </button>
      </div>
    </div>
  );
}
