import React from "react";

export default function PaymentOptions() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-red-500 mb-4">My Payment Options</h2>
      <p className="text-sm text-gray-600 mb-4">Manage your saved cards or add a new one.</p>

      <div className="border p-4 rounded mb-4">
        <p className="font-medium">Visa ending in 1234</p>
        <p className="text-sm text-gray-600">Expires 05/27</p>
      </div>

      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Add New Payment Method</button>
    </div>
  );
}
