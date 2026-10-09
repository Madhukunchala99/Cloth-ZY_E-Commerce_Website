import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { categories } from '../../data/products';
import { cn } from '../../lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  // Toggle dropdown menu
  const toggleDropdown = (category: string) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ELEGANCE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            
            {/* Shop dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900"
                onClick={() => toggleDropdown('shop')}
              >
                Shop <ChevronDown size={16} className="ml-1" />
              </button>
              <div 
                className={cn(
                  "absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-300 transform origin-top",
                  activeDropdown === 'shop' ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                )}
              >
                <Link 
                  to="/shop"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setActiveDropdown(null)}
                >
                  All Products
                </Link>
                {Object.keys(categories).map((category) => (
                  <Link 
                    key={category}
                    to={`/shop/${category}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link to="/shop?new=true" className="text-gray-700 hover:text-gray-900">New Arrivals</Link>
            <Link to="/shop?sale=true" className="text-gray-700 hover:text-gray-900">Sale</Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
          </nav>

          {/* Search, cart, and user icons */}
          <div className="flex items-center space-x-4">
            {/* Search form */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-8 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <button 
                type="submit" 
                className="absolute right-2 text-gray-500 hover:text-gray-700"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-700 hover:text-gray-900">
              <Heart size={20} />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="text-gray-700 hover:text-gray-900 relative">
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User account */}
            <Link to={user ? "/account" : "/login"} className="text-gray-700 hover:text-gray-900">
              <User size={20} />
            </Link>

            {/* Mobile menu toggle */}
            <button 
              className="md:hidden text-gray-700 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={cn(
            "md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-16 px-4 pb-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mb-6 flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-8 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <button 
                type="submit" 
                className="absolute right-2 text-gray-500 hover:text-gray-700"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Mobile nav links */}
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-800 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Categories */}
              <div className="py-2 border-b border-gray-100">
                <button 
                  className="flex items-center justify-between w-full text-left text-gray-800"
                  onClick={() => toggleDropdown('mobile-shop')}
                >
                  Shop
                  <ChevronDown 
                    size={16} 
                    className={cn(
                      "transform transition-transform", 
                      activeDropdown === 'mobile-shop' ? "rotate-180" : ""
                    )} 
                  />
                </button>
                
                {activeDropdown === 'mobile-shop' && (
                  <div className="mt-2 ml-4 flex flex-col space-y-2">
                    <Link 
                      to="/shop" 
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      All Products
                    </Link>
                    {Object.keys(categories).map((category) => (
                      <Link 
                        key={category}
                        to={`/shop/${category}`} 
                        className="text-gray-600 hover:text-gray-900 capitalize"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link 
                to="/shop?new=true" 
                className="text-gray-800 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              
              <Link 
                to="/shop?sale=true" 
                className="text-gray-800 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sale
              </Link>
              
              <Link 
                to="/about" 
                className="text-gray-800 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              
              <Link 
                to="/contact" 
                className="text-gray-800 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              <Link 
                to={user ? "/account" : "/login"} 
                className="text-gray-800 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {user ? "My Account" : "Login / Register"}
              </Link>
              
              <Link 
                to="/wishlist" 
                className="text-gray-800 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              
              <Link 
                to="/cart" 
                className="text-gray-800 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shopping Cart {cartItems.length > 0 && `(${cartItems.length})`}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;