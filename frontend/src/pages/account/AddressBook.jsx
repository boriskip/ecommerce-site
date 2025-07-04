import React from "react";
import useAddresses from "@/hooks/useAddresses";

export default function AddressBook() {
  const { addresses, loading, deleteAddress } = useAddresses();

  if (loading) return <p>Loading...</p>

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-red-500 mb-4">Address Book</h2>
      <p className="text-sm text-gray-600 mb-4">You can add or edit your saved addresses here.</p>

      {addresses.map(address => (
        <div key={address.id} className="barder p-4 rounded mb-4">
          <p className="font-medium">{address.is_default ? 'Default Shipping Address' : 'Address'}</p>
          <p className="text-sm text-gray-600">
            {address.street}, {address.city}, {address.postal_code}, {address.country}
          </p>
          <button
            onClick={() => deleteAddress(address.id)}
            className="text-sm text-red-500 hover:underline my-2">
            Delete
          </button>
        </div>
      ))}
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Add New Address</button>
    </div>
  );
}
