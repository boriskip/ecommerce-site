import React from 'react'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Логотип */}
        <div className="text-2xl font-bold text-gray-900">SHOP.CO</div>

        {/* Меню */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-black">Home</a>
          <a href="#" className="text-gray-700 hover:text-black">Contact</a>
          <a href="#" className="text-gray-700 hover:text-black">About</a>
          <a href="#" className="text-gray-700 hover:text-black">Sing Up</a>
        </nav>

        {/* Иконки */}
        <div className="flex items-center space-x-4">
          {/* <button aria-label="Search">
            🔍
          </button> */}
          <input
  type="text"
  placeholder="Was looking you For?"
  className="hidden md:block px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 text-sm w-64"
/>
          <button aria-label="Cart">
            🛒
          </button>
          <button aria-label="Profile">
            👤
          </button>
        </div>
      </div>
    </header>
  );
}
