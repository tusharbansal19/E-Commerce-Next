'use client'
import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  ArrowLeft,
  ShoppingBag,
  Truck,
  Tag,
  Star,
  Menu,
  User,
  Search,
  Trash2
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
  originalPrice?: number;
  rating?: number;
  discount?: string;
}

const GroceryCartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Fresh Oranges Premium Quality',
      price: 11.75,
      quantity: 4,
      image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop&auto=format',
      weight: '500g',
      originalPrice: 15.00,
      rating: 4.8,
      discount: '20% OFF'
    },
    {
      id: '2',
      name: 'Red Onion Fresh',
      price: 8.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop&auto=format',
      weight: '500g',
      rating: 4.5
    },
    {
      id: '3',
      name: 'Fresh Yellow Lemon',
      price: 8.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&auto=format',
      weight: '1kg',
      rating: 4.9
    },
    {
      id: '1',
      name: 'Fresh Oranges Premium Quality',
      price: 11.75,
      quantity: 4,
      image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop&auto=format',
      weight: '500g',
      originalPrice: 15.00,
      rating: 4.8,
      discount: '20% OFF'
    },
    {
      id: '2',
      name: 'Red Onion Fresh',
      price: 8.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop&auto=format',
      weight: '500g',
      rating: 4.5
    },
    {
      id: '3',
      name: 'Fresh Yellow Lemon',
      price: 8.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&auto=format',
      weight: '1kg',
      rating: 4.9
    },
    {
      id: '1',
      name: 'Fresh Oranges Premium Quality',
      price: 11.75,
      quantity: 4,
      image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop&auto=format',
      weight: '500g',
      originalPrice: 15.00,
      rating: 4.8,
      discount: '20% OFF'
    },
    {
      id: '2',
      name: 'Red Onion Fresh',
      price: 8.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop&auto=format',
      weight: '500g',
      rating: 4.5
    },
    {
      id: '3',
      name: 'Fresh Yellow Lemon',
      price: 8.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&auto=format',
      weight: '1kg',
      rating: 4.9
    },
    {
      id: '4',
      name: 'Pomegranate Sweet',
      price: 7.20,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1553575559-d3d85ebaf72e?w=400&h=300&fit=crop&auto=format',
      weight: '500g',
      rating: 4.7
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? 10.00 : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const taxes = subtotal * 0.08;
  const total = subtotal - discount + shipping + taxes;

  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      {/* Top Banner */}
      <div className="bg-green-600 text-white text-center py-2 px-4">
        <p className="text-sm font-medium">
          Free delivery from 
339 (T&amp;C&#39;s apply)
        </p>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-green-600">freshly</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Beverages'].map((item) => (
              <a key={item} href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                {item}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-1.5 rounded">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-green-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-green-600 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">freshly</h3>
            <p className="text-green-100 text-sm mb-4">
              Your trusted partner for fresh, quality groceries delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white cursor-pointer">
                <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-white cursor-pointer">
                <Image src="/twitter.png" alt="Twitter" width={20} height={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-white cursor-pointer">
                <Image src="/instagram.png" alt="Instagram" width={20} height={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-white cursor-pointer">
                <Image src="/email.png" alt="Email" width={20} height={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-green-100">
              <div className="flex items-center">
                <Image src="/phone.png" alt="Phone" width={16} height={16} className="mr-2" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Image src="/email.png" alt="Email" width={16} height={16} className="mr-2" />
                <span>support@freshly.com</span>
              </div>
              <div className="flex items-center">
                <Image src="/location.png" alt="Location" width={16} height={16} className="mr-2" />
                <span>123 Fresh Street, City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-500 mt-8 pt-8 text-center text-sm text-green-100">
          <p>&copy; 2024 Freshly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven&#39;t added any items to your cart yet. Start shopping to fill it up!</p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Start Shopping
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Your Shopping Basket</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ShoppingCart className="h-4 w-4" />
              <span>{cartItems.length} items</span>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm border">
                {/* Cart Items List */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-3 hover:bg-gray-50 transition-colors"> {/* Reduced padding to p-3 */}
                      {/* Mobile Layout */}
                      <div className="flex items-start space-x-3 md:hidden"> {/* Reduced space-x to space-x-3 */}
                        <div className="relative flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-lg object-cover" // Reduced image size to w-14 h-14
                            width={56}
                            height={56}
                          />
                          {item.discount && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full font-bold"> {/* Adjusted padding and position */}
                              {item.discount}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1"> {/* Adjusted margin-bottom */}
                            <div className="flex-1">
                              <h3 className="text-sm font-medium text-gray-800 line-clamp-1"> {/* line-clamp-1 for concise name */}
                                {item.name}
                              </h3>
                              <p className="text-xs text-gray-500">{item.weight}</p> {/* Removed mt-1 */}
                              {item.rating && (
                                <div className="flex items-center mt-0.5"> {/* Reduced margin-top */}
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs text-gray-600 ml-0.5">{item.rating}</span> {/* Reduced margin-left */}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-2"> {/* Added margin-top */}
                            <div className="flex items-center space-x-1"> {/* Reduced space-x */}
                              <span className="text-sm font-bold text-gray-800">${item.price}</span>
                              {item.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">${item.originalPrice}</span>
                              )}
                            </div>

                            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-0.5 text-green-600"> {/* Reduced padding and space-x */}
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-white rounded transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-sm text-green-600 font-medium">{item.quantity}</span> {/* Reduced width */}
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-white rounded transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:flex md:items-center md:space-x-6">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover"
                            width={80}
                            height={80}
                          />
                          {item.discount && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              {item.discount}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <p className="text-sm text-gray-500">{item.weight}</p>
                            {item.rating && (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-800">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1 text-green-600">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-white rounded transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium ">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-white rounded transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-center min-w-0">
                          <span className="text-lg font-bold text-gray-800">
                            {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Section */}
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter a coupon code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
                    >
                      Apply Coupon
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-3 flex items-center text-green-600">
                      <Tag className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Coupon &quot;{appliedCoupon}&quot; applied successfully!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">£{subtotal.toFixed(2)}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Coupon Discount</span>
                          <span>-£{discount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <span className="text-gray-600">Shipping Fees</span>
                        </div>
                        <span className="font-medium">
                          {shipping === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `£${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold">Total</span>
                          <span className="text-xl font-bold text-green-600">£{total.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">incl. VAT</p>
                      </div>
                    </div>

                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors mt-6">
                      Proceed to checkout
                    </button>

                    <button
                      onClick={clearCart}
                      className="w-full text-center text-gray-500 hover:text-red-500 text-sm mt-4 transition-colors"
                    >
                      Clear Shopping Cart
                    </button>
                  </div>
                </div>

                {/* Shipping Progress */}
                <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center mb-3">
                    <Truck className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-medium text-green-800">Free Shipping Progress</h3>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    {subtotal >= 50 ? (
                      "🎉 You qualify for free shipping!"
                    ) : (
                      `Add £${(50 - subtotal).toFixed(2)} more for free shipping`
                    )}
                  </p>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-green-600 mt-1">
                    <span>£0</span>
                    <span>£50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GroceryCartPage;