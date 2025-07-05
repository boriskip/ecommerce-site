// frontend/src/components/AddressFormModal.jsx
import React, { useState } from "react";


export default function AddressFormModal({ onClose, onSave }) {
    const [form, setForm] = useState({
        street: "",
        city: "",
        postal_code: "",
        country: "",
        is_default: false,
    });

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add New Address</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="street" onChange={handleChange} value={form.street} placeholder="Street" className="w-full border p-2 rounded" />
                    <input name="city" onChange={handleChange} value={form.city} placeholder="City" className="w-full border p-2 rounded" />
                    <input name="postal_code" onChange={handleChange} value={form.postal_code} placeholder="Postal Code" className="w-full border p-2 rounded" />
                    <input name="country" onChange={handleChange} value={form.country} placeholder="Country" className="w-full border p-2 rounded" />
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="is_default" checked={form.is_default} onChange={handleChange} />
                        <span>Set as default</span>
                    </label>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}