import { useEffect, useState } from "react";
import axiosPrivate from "@/api/axiosPrivate";

export default function MyOrders() {
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    axiosPrivate.get("/api/notifications")
      .then((res) => setNotifications(res.data.notifications))
      .catch((err) => console.error("Failed to load notifications", err));
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

      {/* Здесь будет список заказов */}
    </div>
  );
}
