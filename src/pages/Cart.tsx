import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Trash2, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import Button from '../components/ui/Button';
import { formatPrice } from '../lib/utils';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim() === '') {
      setCouponError('Please enter a coupon code');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart | Elegance</title>
          <meta name="description" content="View and manage items in your shopping cart." />
        </Helmet>

        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Button as={Link} to="/shop" size="lg">
                Start Shopping
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart | Elegance</title>
        <meta name="description" content="View and manage items in your shopping cart." />
      </Helmet>

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="hidden sm:grid grid-cols-6 bg-gray-50 p-4 text-sm font-medium text-gray-500">
                  <div className="col-span-3">Product</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-center">Price</div>
                  <div className="text-right">Total</div>
                </div>

                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="border-t border-gray-200 first:border-t-0">
                    <div className="grid sm:grid-cols-6 gap-4 p-4 items-center">
                      <div className="sm:col-span-3 grid grid-cols-4 gap-4 items-center">
                        {/* Product Image */}
                        <div className="col-span-1">
                          <div className="aspect-square w-full bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        </div>
                        
                        {/* Product Details */}
                        <div className="col-span-3">
                          <h3 className="text-sm font-medium text-gray-900 mb-1">
                            <Link to={`/product/${item.product.id}`}>
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500 mb-1">
                            Size: {item.size} | Color: {item.color}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="flex items-center text-xs text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={14} className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex justify-center">
                        <div className="flex h-8 w-24 border border-gray-300 rounded-md">
                          <button
                            className="w-8 flex items-center justify-center text-gray-600 hover:text-gray-900"
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <div className="flex-1 flex items-center justify-center font-medium text-sm">
                            {item.quantity}
                          </div>
                          <button
                            className="w-8 flex items-center justify-center text-gray-600 hover:text-gray-900"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-center text-sm">
                        {formatPrice(item.product.price)}
                      </div>

                      {/* Total */}
                      <div className="text-right font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-between items-center gap-4">
                <Button as={Link} to="/shop" variant="outline">
                  Continue Shopping
                </Button>

                <form onSubmit={handleCouponSubmit} className="flex">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                  <Button 
                    type="submit" 
                    variant="secondary"
                    className="rounded-l-none"
                  >
                    Apply
                  </Button>
                </form>
              </div>
              {couponError && (
                <p className="text-red-500 text-sm mt-2">{couponError}</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
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

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/checkout')}
                  size="lg"
                  fullWidth
                >
                  Proceed to Checkout
                </Button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Secure checkout powered by Stripe. By proceeding, you agree to our <Link to="/terms" className="underline">Terms of Service</Link>.
                </p>
                
                <div className="flex justify-center space-x-4 mt-6">
                  <img src="https://i.imgur.com/5VmBvTT.png" alt="Payment Methods" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;