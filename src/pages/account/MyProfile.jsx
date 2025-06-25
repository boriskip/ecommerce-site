import React from "react";

export default function MyProfile() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-red-500 mb-6">Edit Your Profile</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input className="mt-1 w-full border px-3 py-2 rounded" defaultValue="Md" />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input className="mt-1 w-full border px-3 py-2 rounded" defaultValue="Rimel" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="mt-1 w-full border px-3 py-2 rounded" defaultValue="rimel111@gmail.com" />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input className="mt-1 w-full border px-3 py-2 rounded" defaultValue="Kingston, 5236, United State" />
        </div>

        <div className="col-span-2 mt-4">
          <h3 className="text-sm font-semibold mb-2">Password Changes</h3>
          <input className="w-full mb-2 border px-3 py-2 rounded" placeholder="Current Password" />
          <input className="w-full mb-2 border px-3 py-2 rounded" placeholder="New Password" />
          <input className="w-full border px-3 py-2 rounded" placeholder="Confirm New Password" />
        </div>

        <div className="col-span-2 flex justify-end gap-4 mt-6">
          <button className="px-4 py-2 border rounded">Cancel</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
