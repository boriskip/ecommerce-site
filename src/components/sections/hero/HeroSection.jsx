// HeroSection.jsx
import { useEffect, useRef, useState } from 'react';
import LeftMenu from './HeroLeftMenu';
import PromoBanner from './PromoBanner';

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

    return (
    <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4">

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4 py-6">
      {/* Mobile: Кнопка показать меню */}
      <div className="md:hidden mb-2">
  
  <div className="relative" ref={menuRef}>
      <button
        onClick={toggleDropdown}
        className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition duration-200 md:hidden"
      >
        {isOpen ? 'Hide Categories' : 'Show Categories'}
      </button>

      </div>

      {/* Mobile: Выпадающее меню поверх */}
      {isOpen && (
        <div className="absolute top-10 left-4 z-10 bg-white shadow-lg border rounded-lg w-64 p-4 md:hidden">
          <LeftMenu />
        </div>
      )}
</div>
      {/* Desktop: обычное меню слева */}
      <div className="hidden md:block md:col-span-3 border-r">
        <LeftMenu />
      </div>

      {/* Баннер */}
      <div className="col-span-1 md:col-span-9">
        <PromoBanner />
      </div>
      </div>
      </div>
    </section>
    );
}