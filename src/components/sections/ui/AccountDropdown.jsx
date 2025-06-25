import React from "react";
import { Link } from "react-router-dom";
import { Package, Ban, Star, LogOut } from "lucide-react";

export default function AccountDropdown() {
  return (
    <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-md p-4 z-10">
      <ul className="text-sm space-y-2">
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
          <button className="flex items-center gap-2 text-left w-full hover:text-red-500">
            <LogOut size={16} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
