import { useState } from "react";
import useAddresses from "@/hooks/useAddresses";
import AddressFormModal from "./AddressFormModal";

export default function AddressBook() {
  const { addresses, loading, deleteAddress, addAddress, updateAddress } = useAddresses();
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  if (loading) return <p>Loading...</p>
  const handleSave = (data) => {
    if (editingAddress) {
      updateAddress(editingAddress.id, data);
    } else {
      addAddress(data);
    }
    setShowModal(false);
    setEditingAddress(null);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-red-500 mb-4">Address Book</h2>
      <p className="text-sm text-gray-600 mb-4">You can add or edit your saved addresses here.</p>

      {addresses.map(address => (
        <div key={address.id} className="border p-4 rounded mb-4">
          <p className="font-medium">{address.is_default ? 'Default Shipping Address' : 'Address'}</p>
          <p className="text-sm text-gray-600">
            {address.street}, {address.city}, {address.postal_code}, {address.country}
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => deleteAddress(address.id)}
              className="text-sm text-red-500 hover:underline">
              Delete
            </button>
            <button
              onClick={() => {
                setEditingAddress(address);
                setShowModal(true);
              }}
              className="text-sm text-blue-500 hover:underline">
              Edit
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          setEditingAddress(null);
          setShowModal(true);
        }}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Add New Address
      </button>

      {showModal && (
        <AddressFormModal
          onClose={() => {
            setShowModal(false);
            setEditingAddress(null);
          }}
          onSave={handleSave}
          initialData={editingAddress}
        />
      )}
    </div>
  );
}
