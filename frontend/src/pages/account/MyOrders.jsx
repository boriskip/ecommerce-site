import { useEffect, useState } from "react";
import axiosPrivate from "@/api/axiosPrivate";

export default function MyOrders() {
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosPrivate.get("/api/notifications")
      .then((res) => setNotifications(res.data.notifications))
      .catch((err) => console.error("Failed to load notifications", err));

    axiosPrivate.get("/api/orders")
      .then((res) => setOrders(res.data.orders))
      .catch((err) => console.error("Failed to load orders", err));
  }, []);



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
                      Date: {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total: ${Number(order.total_price).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment: {order.payment_method}
                    </p>

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
                          {item.product?.name || "Product"} — {item.quantity} x ${item.price}
                          <img
                            src={`/storage/${item.product.image}`}
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
