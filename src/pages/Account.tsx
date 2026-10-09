import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Package, 
  Heart, 
  User, 
  MapPin, 
  CreditCard, 
  LogOut,
  Settings
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

// Account sub-pages
const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {isEditing ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <p className="mt-1">{user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1">{user?.email}</p>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Orders = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {/* Sample order - replace with actual order data */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">Order #12345</p>
              <p className="text-sm text-gray-500">Placed on March 15, 2025</p>
              <p className="text-sm text-gray-500">2 items • $159.98</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                Delivered
              </span>
            </div>
            <Button variant="outline" size="sm">
              View Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Addresses = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shipping Addresses</h2>
        <Button>Add New Address</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {user?.addresses.map((address) => (
          <div 
            key={address.id} 
            className="bg-white rounded-lg shadow-sm p-6 relative"
          >
            {address.isDefault && (
              <span className="absolute top-4 right-4 text-sm text-yellow-600 font-medium">
                Default
              </span>
            )}
            <h3 className="font-medium mb-2">{address.name}</h3>
            <p className="text-gray-600">{address.line1}</p>
            {address.line2 && <p className="text-gray-600">{address.line2}</p>}
            <p className="text-gray-600">
              {address.city}, {address.state} {address.postalCode}
            </p>
            <p className="text-gray-600">{address.country}</p>
            <p className="text-gray-600 mt-2">{address.phone}</p>
            <div className="mt-4 flex space-x-3">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="outline" size="sm">Delete</Button>
              {!address.isDefault && (
                <Button variant="outline" size="sm">Set as Default</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PaymentMethods = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <Button>Add New Card</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {user?.paymentMethods.map((payment) => (
          <div 
            key={payment.id} 
            className="bg-white rounded-lg shadow-sm p-6 relative"
          >
            {payment.isDefault && (
              <span className="absolute top-4 right-4 text-sm text-yellow-600 font-medium">
                Default
              </span>
            )}
            <h3 className="font-medium mb-2">
              {payment.cardType} ending in {payment.lastFour}
            </h3>
            <p className="text-gray-600">
              Expires {payment.expiryMonth}/{payment.expiryYear}
            </p>
            <div className="mt-4 flex space-x-3">
              {!payment.isDefault && (
                <Button variant="outline" size="sm">Set as Default</Button>
              )}
              <Button variant="outline" size="sm">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Account = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Orders', href: '/account/orders', icon: Package },
    { name: 'Profile', href: '/account', icon: User },
    { name: 'Addresses', href: '/account/addresses', icon: MapPin },
    { name: 'Payment Methods', href: '/account/payment', icon: CreditCard },
    { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
    { name: 'Settings', href: '/account/settings', icon: Settings },
  ];

  return (
    <>
      <Helmet>
        <title>My Account | Elegance</title>
        <meta name="description" content="Manage your account settings and view your orders." />
      </Helmet>

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                      >
                        <Icon size={20} className="mr-3" />
                        {item.name}
                      </Link>
                    );
                  })}
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 w-full"
                  >
                    <LogOut size={20} className="mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Routes>
                <Route index element={<Profile />} />
                <Route path="orders" element={<Orders />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="payment" element={<PaymentMethods />} />
                <Route path="wishlist" element={<div>Wishlist</div>} />
                <Route path="settings" element={<div>Settings</div>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;