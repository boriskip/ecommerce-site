import { useState } from 'react';
import logo from '../../../public/logo/logo1.svg';
import { Menu, X, Heart, ShoppingCart } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Лого */}
         <img src={logo} alt="Logo" className="h-10 w-auto" />
   
   
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-md text-sm"
          />
        </div>

        {/* Навигация (десктоп) */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="block hover:text-red-500">Home</a>
          <a href="#" className="block hover:text-red-500">Contact</a>
          <a href="#" className="block hover:text-red-500">About</a>
          <a href="#" className="block hover:text-red-500">Sing Up</a>
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
  <button className="relative group" aria-label="Wishlist">
    <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
  </button>

  <button className="relative group" aria-label="Cart">
    <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
  </button>
</div>
      </div>



      {/* Выпадающее меню (мобилка) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2 shadow-md">
          <a href="#" className="block hover:text-red-500">Home</a>
          <a href="#" className="block hover:text-red-500">Contact</a>
          <a href="#" className="block hover:text-red-500">About</a>
          <a href="#" className="block hover:text-red-500">Sing Up</a>
        </div>
      )}

    </header>
  );
}
