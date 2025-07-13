import { Mail } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosPublic from "../../api/axiosPublick";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axiosPublic.get('/api/footer');
        setFooterData(response.data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
        // Fallback к статическим данным
        setFooterData({
          exclusive_title: 'Exclusive',
          exclusive_subscribe_text: 'Subscribe',
          exclusive_offer_text: 'Get 10% off your first order',
          support_title: 'Support',
          support_address: '111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.',
          support_email: 'exclusive@gmail.com',
          support_phone: '+88015-88888-9999',
          account_title: 'Account',
          account_links: [
            { text: 'Manage My Account', url: '/account/profile' },
            { text: 'Login / Register', url: '/login' },
            { text: 'Cart', url: '/cart' },
            { text: 'Wishlist', url: '/wishlist' },
            { text: 'Shop', url: '/' },
          ],
          quick_link_title: 'Quick Link',
          quick_links: [
            { text: 'Privacy Policy', url: '#' },
            { text: 'Terms Of Use', url: '#' },
            { text: 'FAQ', url: '#' },
            { text: 'Contact', url: '/contact' },
          ],
          download_app_title: 'Download App',
          download_app_subtitle: 'Save $3 with App New User Only',
          qr_code_image: '/storage/footer/QrCode.png',
          google_play_image: '/storage/footer/google-app.png',
          app_store_image: '/storage/footer/download-appstore.png',
          social_links: [
            { platform: 'Facebook', url: '#', icon: 'FaFacebook' },
            { platform: 'Twitter', url: '#', icon: 'FaTwitter' },
            { platform: 'Instagram', url: '#', icon: 'FaInstagram' },
            { platform: 'LinkedIn', url: '#', icon: 'FaLinkedin' },
          ],
          copyright_text: '© Copyright Rimel 2022. All right reserved',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) {
    return (
      <footer className="bg-black text-white px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        </div>
      </footer>
    );
  }

  if (!footerData) {
    return null;
  }
  return (
    <footer className="bg-black text-white px-4 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Exclusive */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{footerData.exclusive_title}</h3>
          <p className="text-sm mb-2">{footerData.exclusive_subscribe_text}</p>
          <p className="text-sm mb-4">{footerData.exclusive_offer_text}</p>
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
          <h3 className="text-lg font-semibold mb-2">{footerData.support_title}</h3>
          <p className="text-sm">{footerData.support_address}</p>
          <p className="text-sm mt-2">{footerData.support_email}</p>
          <p className="text-sm mt-2">{footerData.support_phone}</p>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{footerData.account_title}</h3>
          <ul className="text-sm space-y-1">
            {footerData.account_links.map((link, index) => (
              <li key={index}>
                <Link to={link.url} className="hover:text-red-500">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Link */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{footerData.quick_link_title}</h3>
          <ul className="text-sm space-y-1">
            {footerData.quick_links.map((link, index) => (
              <li key={index}>
                {link.url === '#' ? (
                  <span>{link.text}</span>
                ) : (
                  <Link to={link.url} className="hover:text-red-500">
                    {link.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{footerData.download_app_title}</h3>
          <p className="text-sm mb-4">{footerData.download_app_subtitle}</p>
          <div className="flex gap-2 mb-4">
            <img src={footerData.qr_code_image} alt="QR Code" className="w-20 h-16" />
            <div className="space-y-2">
              <img src={footerData.google_play_image} alt="Google Play" className="w-28 h-7" />
              <img src={footerData.app_store_image} alt="App Store" className="w-28 h-7" />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            {footerData.social_links.map((social, index) => {
              const IconComponent = {
                'FaFacebook': FaFacebook,
                'FaTwitter': FaTwitter,
                'FaInstagram': FaInstagram,
                'FaLinkedin': FaLinkedin,
              }[social.icon] || FaFacebook;

              return (
                <a key={index} href={social.url} aria-label={social.platform}>
                  <IconComponent className="w-5 h-5 text-white hover:text-gray-400" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />
      <p className="text-center text-xs text-gray-400">
        {footerData.copyright_text}
      </p>
    </footer>
  );
}
