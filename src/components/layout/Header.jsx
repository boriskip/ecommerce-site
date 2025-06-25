import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/logo/logo1.svg';
import AccountDropdown from '../sections/ui/AccountDropdown';
import { Menu, X, Heart, ShoppingCart, User } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Лого */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>


        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-md text-sm"
          />
        </div>

        {/* Навигация (десктоп) */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="block hover:text-red-500">Home</Link>
          <Link to="/contact" className="block hover:text-red-500">Contact</Link>
          <Link to="/about" className="block hover:text-red-500">About</Link >
          <Link to="/singup" className="block hover:text-red-500">Sing Up</Link>
        </nav>



        {/* Иконка бургер (мобилка) */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex items-center gap-4 ml-4">

          {/* Wishlist */}
          <Link to="/wishlist" className="relative group" aria-label="Wishlist">
            <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative group" aria-label="Cart">
            <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
          </Link>

          {/* User */}
          <div className="relative group" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative"
              aria-label="User"
            >
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                3
              </span>
            </button>

            {isOpen && <AccountDropdown />}
          </div>
        </div>

      </div>



      {/* Выпадающее меню (мобилка) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2 shadow-md">
          <Link to="/" className="block hover:text-red-500">Home</Link>
          <Link to="/contact" className="block hover:text-red-500">Contact</Link>
          <Link to="/about" className="block hover:text-red-500">About</Link >
          <Link to="/singup" className="block hover:text-red-500">Sing Up</Link>
        </div>
      )}

    </header>
  );
}
