import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { Address, PaymentMethod } from '../types';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    user?.addresses.find(addr => addr.isDefault) || null
  );
  
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    user?.paymentMethods.find(pm => pm.isDefault) || null
  );

  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect to cart if it's empty
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login', { state: { from: '/checkout' } });
    return null;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedPayment) {
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      clearCart();
      navigate('/account/orders');
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Elegance</title>
        <meta name="description" content="Complete your purchase securely." />
      </Helmet>

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping & Payment */}
            <div className="space-y-8">
              {/* Shipping Address */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  {user.addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAddress?.id === address.id
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{address.name}</p>
                          <p className="text-gray-600">{address.line1}</p>
                          {address.line2 && <p className="text-gray-600">{address.line2}</p>}
                          <p className="text-gray-600">
                            {address.city}, {address.state} {address.postalCode}
                          </p>
                          <p className="text-gray-600">{address.country}</p>
                          <p className="text-gray-600">{address.phone}</p>
                        </div>
                        {address.isDefault && (
                          <span className="text-sm text-yellow-600 font-medium">Default</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  {user.paymentMethods.map((payment) => (
                    <div
                      key={payment.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment?.id === payment.id
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">
                            {payment.cardType} ending in {payment.lastFour}
                          </p>
                          <p className="text-gray-600">
                            Expires {payment.expiryMonth}/{payment.expiryYear}
                          </p>
                        </div>
                        {payment.isDefault && (
                          <span className="text-sm text-yellow-600 font-medium">Default</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <p className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={handlePlaceOrder}
                  disabled={!selectedAddress || !selectedPayment || isProcessing}
                  isLoading={isProcessing}
                  size="lg"
                  fullWidth
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;