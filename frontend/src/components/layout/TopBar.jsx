import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

export default function TopBar() {
  return (
    <div className="bg-black text-white text-sm px-4 py-3">
      <div className='max-w-screen-xl mx-auto flex justify-between items-center'>
        <p>
          Sign up and get 20% off to your first order.{' '}
          <Link to="/signup" className="underline font-medium hover:text-gray-300">
            Sign Up Now
          </Link>
        </p>

        <LanguageSwitcher />
      </div>
    </div>
  );
}
