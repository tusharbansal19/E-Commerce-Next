'use client'
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  ArrowLeft, 
  ShoppingBag,
  Info,
  Truck,
  Tag,
  CreditCard,
  Star,
  Shield,
  Clock
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
  originalPrice?: number;
  rating?: number;
}

const GroceryCartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Fresh Oranges',
      price: 11.75,
      quantity: 4,
      image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop&auto=format',
      weight: '500 g',
      originalPrice: 15.00,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Red Onion',
      price: 8.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop&auto=format',
      weight: '500 g',
      rating: 4.5
    },
    {
      id: '3',
      name: 'Fresh Yellow Lemon',
      price: 8.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&auto=format',
      weight: '1 kg',
      rating: 4.9
    },
    {
      id: '4',
      name: 'Pomegranate',
      price: 7.20,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1553575559-d3d85ebaf72e?w=400&h=300&fit=crop&auto=format',
      weight: '500 g',
      rating: 4.7
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setAppliedCoupon('SAVE10');
      setCouponCode('');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? 10.00 : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const taxes = subtotal * 0.08;
  const total = subtotal - discount + shipping + taxes;

  const navigateToProduct = (productId: string) => {
    // In a real app, this would use Next.js router
    console.log(`Navigate to /product/${productId}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="relative min-h-screen bg-white text-black overflow-hidden">
        {/* Enhanced Animated Gradient Background */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <svg width="100%" height="100%" className="absolute inset-0 w-full h-full animate-pulse" style={{ opacity: 0.13 }}>
            <defs>
              <radialGradient id="cartBgGradient" cx="50%" cy="40%" r="80%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
              </radialGradient>
              <linearGradient id="cartBgWave" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.09" />
              </linearGradient>
            </defs>
            <ellipse cx="60%" cy="30%" rx="600" ry="300" fill="url(#cartBgGradient)" />
            <ellipse cx="20%" cy="80%" rx="400" ry="180" fill="#22c55e" opacity="0.12" />
            <ellipse cx="80%" cy="70%" rx="300" ry="120" fill="#16a34a" opacity="0.09" />
            <ellipse cx="50%" cy="90%" rx="700" ry="120" fill="url(#cartBgWave)" />
            <path d="M0,400 Q300,350 600,400 T1200,400 V600 H0 Z" fill="#4ade80" opacity="0.07" />
            <circle cx="90%" cy="10%" r="120" fill="#bbf7d0" opacity="0.10" />
            <circle cx="10%" cy="20%" r="80" fill="#22d3ee" opacity="0.06" />
          </svg>
        </div>
        {/* Main Content */}
        <div className="relative z-10">
          {/* Header */}
          <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14 sm:h-16">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button className="p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                  </button>
                  <h1 className="text-lg sm:text-xl font-bold text-black">Shopping Cart</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-green-500 to-purple-600 p-1.5 rounded-lg">
                    <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600">0 items</span>
                </div>
              </div>
            </div>
          </header>

          {/* Empty Cart State */}
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] px-4">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-gradient bg-gradient-to-r from-green-500 to-purple-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">Your cart is empty</h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">Looks like you haven't added any items to your cart yet. Start shopping to fill it up!</p>
              <button className="bg-gradient-to-r from-green-500 to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:from-green-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      {/* Enhanced Animated Gradient Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <svg width="100%" height="100%" className="absolute inset-0 w-full h-full animate-pulse" style={{ opacity: 0.13 }}>
          <defs>
            <radialGradient id="cartBgGradient2" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
            </radialGradient>
            <linearGradient id="cartBgWave2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.09" />
            </linearGradient>
          </defs>
          <ellipse cx="60%" cy="30%" rx="600" ry="300" fill="url(#cartBgGradient2)" />
          <ellipse cx="20%" cy="80%" rx="400" ry="180" fill="#22c55e" opacity="0.12" />
          <ellipse cx="80%" cy="70%" rx="300" ry="120" fill="#16a34a" opacity="0.09" />
          <ellipse cx="50%" cy="90%" rx="700" ry="120" fill="url(#cartBgWave2)" />
          <path d="M0,400 Q300,350 600,400 T1200,400 V600 H0 Z" fill="#4ade80" opacity="0.07" />
          <circle cx="90%" cy="10%" r="120" fill="#bbf7d0" opacity="0.10" />
          <circle cx="10%" cy="20%" r="80" fill="#22d3ee" opacity="0.06" />
        </svg>
      </div>
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button className="p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                </button>
                <h1 className="text-lg sm:text-xl font-bold text-black">Shopping Cart</h1>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-green-500 to-purple-600 p-1.5 rounded-lg">
                  <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-600">{cartItems.length} items</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-black">Cart Items</h2>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-xs sm:text-sm text-gray-600 font-medium">Secure Shopping</span>
                    </div>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100 max-h-80 sm:max-h-96 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="p-3 sm:p-6 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow border border-gray-100"
                          />
                          {item.originalPrice && (
                            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-bold text-xs">
                              SALE
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-sm sm:text-lg font-bold text-black group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                                {item.name}
                              </h3>
                              <div className="flex items-center space-x-2 mt-0.5 sm:mt-1">
                                <p className="text-xs sm:text-sm text-gray-500 font-medium">{item.weight}</p>
                                {item.rating && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-gray-600 font-medium">{item.rating}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                                <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                                  ${item.price}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-xs sm:text-sm text-gray-400 line-through font-medium">${item.originalPrice}</span>
                                )}
                              </div>
                            </div>
                            
                            <button
                              onClick={() => navigateToProduct(item.id)}
                              className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-purple-600 rounded-lg transition-all ml-2"
                              title="View product details"
                            >
                              <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3 sm:mt-4">
                            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-100 rounded-xl p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 sm:p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-purple-600"
                              >
                                <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                              </button>
                              <span className="w-6 sm:w-8 text-center font-bold text-black text-sm sm:text-base">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 sm:p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-purple-600"
                              >
                                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                              </button>
                            </div>

                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <span className="text-base sm:text-lg font-bold text-black">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-red-500 rounded-lg transition-all"
                              >
                                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Section */}
                <div className="p-4 sm:p-6 border-t border-gray-100 bg-gradient-to-r from-green-50 to-purple-50">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black font-medium text-sm sm:text-base"
                      />
                    </div>
                    <button
                      onClick={applyCoupon}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-purple-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-purple-700 transition-all whitespace-nowrap text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Apply Coupon
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 sm:mt-3 flex items-center space-x-2 text-green-600">
                      <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm font-bold">Coupon "{appliedCoupon}" applied successfully!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cart Summary Section */}
            <div className="lg:col-span-4 mt-6 lg:mt-0">
              <div className="sticky top-20 sm:top-24">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-purple-50">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg sm:text-xl font-bold text-black">Order Summary</h2>
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium text-sm sm:text-base">Subtotal ({cartItems.length} items)</span>
                      <span className="font-bold text-black text-sm sm:text-base">${subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 font-medium text-sm sm:text-base">Coupon Discount</span>
                        <span className="font-bold text-green-600 text-sm sm:text-base">-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">Shipping</span>
                      </div>
                      <span className="font-bold text-black text-sm sm:text-base">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium text-sm sm:text-base">Taxes</span>
                      <span className="font-bold text-black text-sm sm:text-base">${taxes.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg sm:text-xl font-bold text-black">Total</span>
                        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-green-500 to-purple-600 text-white py-3 sm:py-4 rounded-xl font-bold hover:from-green-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base">
                      <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Proceed to Checkout</span>
                    </button>

                    <div className="text-center">
                      <button className="text-gray-600 hover:text-red-500 font-medium text-xs sm:text-sm transition-colors">
                        Clear Shopping Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 sm:mt-6 bg-gradient-to-br from-green-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-gray-100">
                  <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                    <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    <h3 className="font-bold text-black text-sm sm:text-base">Free Shipping Progress</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 font-medium">
                    {subtotal >= 50 ? (
                      "🎉 Congratulations! You qualify for free shipping!"
                    ) : (
                      `Add $${Math.max(0, 50 - subtotal).toFixed(2)} more to qualify for free shipping!`
                    )}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-purple-600 h-2 sm:h-2.5 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1 font-medium">
                    <span>$0</span>
                    <span>$50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryCartPage;