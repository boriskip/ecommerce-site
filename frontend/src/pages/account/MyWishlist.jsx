import React from 'react';
import { useAuth } from "@/context/AuthContext";


export default function MyOrders() {
  const { user } = useAuth();
  console.log("🔐 Текущий пользователь:", user?.id, user?.name);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>
      {/* Содержимое заказов */}
    </div>
  );
}
