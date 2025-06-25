import { Mail } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-4 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Exclusive */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Exclusive</h3>
          <p className="text-sm mb-2">Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <form className="flex border rounded overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black text-white text-sm px-3 py-2 flex-grow focus:outline-none"
            />
            <button type="submit" className="bg-white text-black p-2">
              <Mail size={16} />
            </button>
          </form>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <p className="text-sm">111 Bijoy sarani, Dhaka,</p>
          <p className="text-sm">DH 1515, Bangladesh.</p>
          <p className="text-sm mt-2">exclusive@gmail.com</p>
          <p className="text-sm mt-2">+88015-88888-9999</p>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Account</h3>
          <ul className="text-sm space-y-1">
            <li>
              <Link to="/account/profile" className="flex items-center gap-2 hover:text-red-500">
                Manage My Account
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-red-500">
                Login / Register
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-red-500">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-red-500">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-red-500">
                Shop
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Link */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Link</h3>
          <ul className="text-sm space-y-1">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>
              <Link to="/contact" className="hover:text-red-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Download App</h3>
          <p className="text-sm mb-4">Save $3 with App New User Only</p>
          <div className="flex gap-2 mb-4">
            <img src="public/footer/Qr Code.png" alt="QR Code" className="w-20 h-16" />
            <div className="space-y-2">
              <img src="public/footer/google-app.png" alt="Google Play" className="w-28 h-7" />
              <img src="public/footer/appstore.png" alt="App Store" className="w-28 h-7" />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook">
              <FaFacebook className="w-5 h-5 text-white hover:text-gray-400" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="w-5 h-5 text-white hover:text-gray-400" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram className="w-5 h-5 text-white hover:text-gray-400" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin className="w-5 h-5 text-white hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />
      <p className="text-center text-xs text-gray-400">
        © Copyright Rimel 2022. All right reserved
      </p>
    </footer>
  );
}
