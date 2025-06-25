import React from "react";

export default function AddressBook() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-red-500 mb-4">Address Book</h2>
      <p className="text-sm text-gray-600 mb-4">You can add or edit your saved addresses here.</p>

      <div className="border p-4 rounded mb-4">
        <p className="font-medium">Default Shipping Address</p>
        <p className="text-sm text-gray-600">123 King St, New York, NY, 10001</p>
      </div>

      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Add New Address</button>
    </div>
  );
}
