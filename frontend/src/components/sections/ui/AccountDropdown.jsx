import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Ban, Star, LogOut, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../../../context/UserContext";
import axiosPrivate from "../../../api/axiosPrivate";

export default function AccountDropdown() {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();


  const handleLogout = async () => {
    try {
      await axiosPrivate.post("/api/logout");
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) return null;

  return (
    <div className="absolute right-0 top-full mt-3 w-56 bg-white border rounded-md shadow-md p-4 z-10">
      <ul className="text-sm space-y-2">
        {user ? (
          <>
            <li>
              <Link to="/account/profile" className="flex items-center gap-2 hover:text-red-500">
                <Package size={16} /> Manage My Account
              </Link>
            </li>
            <li>
              <Link to="/account/orders" className="flex items-center gap-2 hover:text-red-500">
                <Package size={16} /> My Orders
              </Link>
            </li>
            <li>
              <Link to="/account/cancellations" className="flex items-center gap-2 hover:text-red-500">
                <Ban size={16} /> My Cancellations
              </Link>
            </li>
            <li>
              <Link to="/account/reviews" className="flex items-center gap-2 hover:text-red-500">
                <Star size={16} /> My Reviews
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center gap-2 text-left w-full hover:text-red-500">
                <LogOut size={16} /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-gray-100 rounded"
              >
                <LogIn size={18} /> Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                <UserPlus size={18} /> Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
