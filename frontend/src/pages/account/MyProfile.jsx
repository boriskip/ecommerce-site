// frontend/src/pages/account/MyProfile.jsx
import React, { useEffect, useState } from "react";
import axiosPrivate from "@/api/axiosPrivate";
import toast from "react-hot-toast";

export default function MyProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    axiosPrivate.get("/api/user")
      .then(res => setForm(res.data))
      .catch(() => toast.error("Profile loading error"));
  }, []);

  const handleProfileChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = e => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleProfileSave = async e => {
    e.preventDefault();
    try {
      await axiosPrivate.put("/api/profile", form);
      toast.success("Profile updated");
    } catch (err) {
      toast.error('Profile update error.');
      console.error(err);
    }
  };

  const handlePasswordSave = async e => {
    e.preventDefault();
    try {
      await axiosPrivate.put("/api/profile/password", {
        current_password: passwordForm.current_password,
        new_password: passwordForm.password,
        new_password_confirmation: passwordForm.password_confirmation,
      });
      toast.success("Password's been updated");
      setPasswordForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      toast.error("Password update error");
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-red-500 mb-6">Edit Your Profile</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleProfileSave}>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" className="mt-1 w-full border px-3 py-2 rounded" value={form.name} onChange={handleProfileChange} />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input name="email" className="mt-1 w-full border px-3 py-2 rounded" value={form.email} onChange={handleProfileChange} />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium">Address</label>
          <input name="address" className="mt-1 w-full border px-3 py-2 rounded" value={form.address} onChange={handleProfileChange} />
        </div>
        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Save Changes</button>
        </div>
      </form>

      <form className="mt-8" onSubmit={handlePasswordSave}>
        <h3 className="text-sm font-semibold mb-2">Change Password</h3>
        <input name="current_password" type="password" placeholder="Current Password" className="w-full mb-2 border px-3 py-2 rounded" value={passwordForm.current_password} onChange={handlePasswordChange} />
        <input name="password" type="password" placeholder="New Password" className="w-full mb-2 border px-3 py-2 rounded" value={passwordForm.password} onChange={handlePasswordChange} />
        <input name="password_confirmation" type="password" placeholder="Confirm New Password" className="w-full border px-3 py-2 rounded" value={passwordForm.password_confirmation} onChange={handlePasswordChange} />
        <div className="flex justify-end mt-4">
          <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Change Password</button>
        </div>
      </form>
    </div>
  );
}
