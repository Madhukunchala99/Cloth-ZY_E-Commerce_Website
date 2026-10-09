import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-6">Stay updated with our latest collections and exclusive offers.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium rounded-md transition duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">ELEGANCE</h4>
            <p className="text-gray-300 mb-6">
              Elegance is a premium fashion brand focused on quality, style, and sustainability. We bring you the latest trends with a timeless touch.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/men" className="text-gray-300 hover:text-white transition duration-200">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link to="/shop/women" className="text-gray-300 hover:text-white transition duration-200">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link to="/shop/kids" className="text-gray-300 hover:text-white transition duration-200">
                  Kids' Collection
                </Link>
              </li>
              <li>
                <Link to="/shop?new=true" className="text-gray-300 hover:text-white transition duration-200">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?sale=true" className="text-gray-300 hover:text-white transition duration-200">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Pages */}
          <div>
            <h4 className="text-xl font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 flex-shrink-0 mt-1 text-gray-400" />
                <span className="text-gray-300">
                  123 Fashion Avenue, Style District<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-gray-400" />
                <a href="tel:+12125551234" className="text-gray-300 hover:text-white transition duration-200">
                  (212) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-gray-400" />
                <a href="mailto:info@elegance.com" className="text-gray-300 hover:text-white transition duration-200">
                  info@elegance.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Elegance. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <img src="https://i.imgur.com/5VmBvTT.png" alt="Payment Methods" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;