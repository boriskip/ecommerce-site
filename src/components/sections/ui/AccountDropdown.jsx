import React, { useState, useRef, useEffect } from "react";
import { User, Package, Ban, Star, LogOut } from "lucide-react";

export default function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Закрывать меню при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    return (
        <div className="relative" ref={dropdownRef}>
<button
onClick={() => setIsOpen(!isOpen)}
className="relative"
aria-label="User">
        <User className="w-5 h-5 text-gray-600 hover:text-red-500" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
</button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-md p-4 z-10">
          <ul className="text-sm space-y-2">
            <li><a href="/account" className="flex items-center gap-2 hover:text-red-500"><User size={16}/> Manage My Account</a></li>
            <li><a href="/orders" className="flex items-center gap-2 hover:text-red-500"><Package size={16}/> My Orders</a></li>
            <li><a href="/cancellations" className="flex items-center gap-2 hover:text-red-500"><Ban size={16}/> My Cancellations</a></li>
            <li><a href="/reviews" className="flex items-center gap-2 hover:text-red-500"><Star size={16}/> My Reviews</a></li>
            <li><button className="flex items-center gap-2 text-left w-full hover:text-red-500"><LogOut size={16}/> Logout</button></li>
          </ul>
        </div>

  )}
</div>

 ) 
}