import { useEffect, useState } from "react";
import axiosPrivate from "@/api/axiosPrivate";
import { toast } from "react-hot-toast";

function formatStatus(status) {
  switch (status) {
    case "pending": return "🕒 Awaiting payment";
    case "paid": return "✅ Paid";
    case "cancelled": return "❌ Cancelled";
    default: return status;
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString(); // можно заменить на date.toLocaleDateString() при желании
}

export default function MyOrders() {
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   axiosPrivate.get("/api/notifications")
  //     .then((res) => setNotifications(res.data.notifications))
  //     .catch((err) => console.error("Failed to load notifications", err));

  //   axiosPrivate.get("/api/orders")
  //     .then((res) => setOrders(res.data.orders))
  //     .catch((err) => console.error("Failed to load orders", err));
  // }, []);

  const fetchData = () => {
    axiosPrivate.get("/api/notifications")
      .then((res) => setNotifications(res.data.notifications))
      .catch((err) => console.error("Failed to load notifications", err));

    axiosPrivate.get("/api/orders")
      .then((res) => setOrders(res.data.orders))
      .catch((err) => console.error("Failed to load orders", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePayOrder = async (orderId) => {
    try {
      const res = await axiosPrivate.post('/api/stripe/checkout/order', {
        order_id: orderId
      });
      window.location.href = res.data.url;
    } catch (err) {
      toast.error("❌ Failed to pay order");
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {/* Список уведомлений */}
      <div className="mb-6">
        <h3 className="font-medium text-lg mb-2">Notifications</h3>
        {notifications.length === 0 && <p className="text-gray-500">No notifications.</p>}
        <ul className="space-y-2">
          {notifications.map((n, i) => (
            <li key={i} className="text-sm text-gray-800 border p-2 rounded bg-gray-50">
              {n.message}
            </li>
          ))}
        </ul>
      </div>

      {/* Список заказов */}
      <div>
        <h3 className="font-medium text-lg mb-2">Order History</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500">You have no orders yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="border p-4 rounded bg-white shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">Status: {order.status}</p>
                    <p className="text-sm text-gray-600">

                    </p>
                    <div className="text-sm text-gray-600 space-y-1 mt-2">
                      {Array.isArray(order.status_history) && order.status_history.length > 0 && (
                        <div className="space-y-1">
                          {order.status_history.map((entry, idx) => (
                            <div key={idx}>
                              {formatStatus(entry.status)} — {formatDate(entry.timestamp)}
                            </div>
                          ))}
                        </div>
                      )}
                      <div>Date: {new Date(order.created_at).toLocaleDateString()}</div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Total: ${Number(order.total_price).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment: {order.payment_method}
                    </p>
                    {/* Если заказ ожидает оплаты и способ оплаты — наличные */}
                    {order.status === 'pending' && order.payment_method === 'cash' && (
                      <button
                        onClick={() => handlePayOrder(order.id)}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded text-sm"
                      >
                        Pay Now
                      </button>
                    )}
                    {order.status === 'pending' && (
                      <button
                        onClick={async () => {
                          try {
                            await axiosPrivate.patch(`/api/orders/${order.id}/cancel`);
                            toast.success("❌ Order cancelled");
                            fetchData(); // обновление
                          } catch (err) {
                            console.error("Cancel error:", err.response?.data || err.message);
                            toast.error("⚠️ Could not cancel order");
                          }
                        }}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded text-sm ml-2"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>

                </div>

                {/* Товары в заказе */}
                <div className="mt-3">
                  <p className="font-medium">Items:</p>

                  <ul className="text-sm list-disc list-inside text-gray-700">
                    {/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
                    {Array.isArray(order.order_items) &&
                      order.order_items.map((item) => (
                        <li key={item.id}>
                          {item.product?.title || "Product"} — {item.quantity} x
                          <span className="text-red-500 font-bold ml-1">${item.price}</span>
                          {Number(item.price) < Number(item.product.price) && (
                            <span className="text-gray-500 text-sm line-through ml-2">${item.product.price}</span>
                          )}
                          <img
                            src={`/${item.product.image}`}
                            alt={item.product?.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                        </li>
                      ))}
                  </ul>

                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
