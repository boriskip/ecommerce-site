import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccountDropdown from '../sections/ui/AccountDropdown';
import { Menu, X, Heart, ShoppingCart, User } from 'lucide-react';
import useCart from '../../hooks/useCart';
import useNotifications from '@/hooks/useNotifications';
import axiosPublic from '../../api/axiosPublick';

export default function Header() {
  const { cartQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { count } = useNotifications();
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axiosPublic.get('/api/header');
        setHeaderData(response.data);
      } catch (error) {
        console.error('Error fetching header data:', error);
        // Fallback к статическим данным
        setHeaderData({
          logo_image: '/storage/header/logo1.svg',
          logo_alt: 'Logo',
          search_placeholder: 'Search products...',
          navigation_links: [
            { text: 'Home', url: '/', enabled: true },
            { text: 'Contact', url: '/contact', enabled: true },
            { text: 'About', url: '/about', enabled: true },
            { text: 'Sign Up', url: '/signup', enabled: true },
          ],
          header_icons: [
            {
              type: 'wishlist',
              icon: 'Heart',
              url: '/wishlist',
              enabled: true,
              show_badge: true,
              badge_count: 2
            },
            {
              type: 'cart',
              icon: 'ShoppingCart',
              url: '/cart',
              enabled: true,
              show_badge: true,
              badge_count: 0
            },
            {
              type: 'user',
              icon: 'User',
              url: '#',
              enabled: true,
              show_badge: true,
              badge_count: 0
            }
          ],
          mobile_menu_enabled: true,
          background_color: 'bg-white',
          text_color: 'text-gray-600',
          hover_color: 'hover:text-red-500',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getIconComponent = (iconName) => {
    const icons = {
      'Heart': Heart,
      'ShoppingCart': ShoppingCart,
      'User': User,
      'Menu': Menu,
      'X': X,
    };
    return icons[iconName] || Heart;
  };

  const getIconBadgeCount = (iconType) => {
    if (iconType === 'cart') return cartQuantity;
    if (iconType === 'user') return count;
    return 0;
  };

  if (loading) {
    return (
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="animate-pulse">
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-300 rounded"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  if (!headerData) {
    return null;
  }

  return (
    <header className={`${headerData.background_color} shadow-md sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Лого */}
        <Link to="/">
          <img src={headerData.logo_image} alt={headerData.logo_alt} className="h-10 w-auto" />
        </Link>

        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder={headerData.search_placeholder}
            className="w-full px-4 py-2 border rounded-md text-sm"
          />
        </div>

        {/* Навигация (десктоп) */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {headerData.navigation_links
            .filter(link => link.enabled)
            .map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className={`block ${headerData.hover_color}`}
              >
                {link.text}
              </Link>
            ))}
        </nav>



        {/* Иконка бургер (мобилка) */}
        {headerData.mobile_menu_enabled && (
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        <div className="flex items-center gap-4 ml-4">
          {headerData.header_icons
            .filter(icon => icon.enabled)
            .map((icon, index) => {
              const IconComponent = getIconComponent(icon.icon);
              const badgeCount = getIconBadgeCount(icon.type);

              if (icon.type === 'user') {
                return (
                  <div key={index} className="relative flex items-center" ref={dropdownRef}>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="relative flex items-center"
                      aria-label={icon.type}
                    >
                      <IconComponent className={`w-5 h-5 ${headerData.text_color} ${headerData.hover_color}`} />
                      {icon.show_badge && badgeCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {badgeCount}
                        </span>
                      )}
                    </button>
                    {isOpen && <AccountDropdown />}
                  </div>
                );
              }

              return (
                <Link key={index} to={icon.url} className="relative flex items-center" aria-label={icon.type}>
                  <IconComponent className={`w-5 h-5 ${headerData.text_color} ${headerData.hover_color}`} />
                  {icon.show_badge && badgeCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {badgeCount}
                    </span>
                  )}
                </Link>
              );
            })}
        </div>


      </div>



      {/* Выпадающее меню (мобилка) */}
      {isMobileMenuOpen && headerData.mobile_menu_enabled && (
        <div className={`md:hidden ${headerData.background_color} border-t px-4 py-4 space-y-2 shadow-md`}>
          {headerData.navigation_links
            .filter(link => link.enabled)
            .map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className={`block ${headerData.hover_color}`}
              >
                {link.text}
              </Link>
            ))}
        </div>
      )}

    </header>
  );
}
