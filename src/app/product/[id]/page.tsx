'use client'
import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Menu,
  User,
  Search,
  Facebook,
  Twitter,
  Instagram,
  Mail
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

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  availability: string;
  shortDescription: string;
  type: string;
  region: string;
  quality: string;
  delivery: string;
  farm: string;
  calories: string;
  fat: string;
  protein: string;
  carb: string;
  size: string[];
  color: string[];
  weightUnit: string;
  rating: number;
  reviews: number;
  description: string;
  specifications: { label: string; value: string; }[];
  careInstructions: string;
}

const productData: Product = {
  id: 'lemon-1',
  name: 'Fresh Organic Corsican Lemon',
  price: 8.00,
  originalPrice: 10.00,
  image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVtb25zfGVufDB8fDB8fHww',
  availability: 'In Stock',
  shortDescription: 'Introduce an exotic flourish to your kitchen with this printed top, which is adorned with three-quarter sleeves and a round neckline. Adding to the style quotient, this top is elevated with a smooth silhouette and a straight hemline.',
  type: 'Fruits',
  region: 'Corsica',
  quality: 'Premium Grade',
  delivery: '2-3 Days',
  farm: 'Organic Farms, Bhutan, Trivedi, Village',
  calories: '75',
  fat: '0.2g',
  protein: '1.5g',
  carb: '9.3g',
  size: ['S', 'M', 'L'], // Based on the image's "Size" attribute (S, M, L)
  color: ['yellow', 'green', 'orange'], // Based on the image's "Color" attribute (yellow, green, orange dots)
  weightUnit: 'pcs',
  rating: 4.9,
  reviews: 20,
  description: `Introduce an exotic flourish to your kitchen with this printed top, which is adorned with three-quarter sleeves and a round neckline. Adding to the style quotient, this top is elevated with a solid detailed structure. Breeze through the latest collection of various ethnic dresses with Cap sleeve designs to give a flawless desi look. Stay up to date with the latest collection of glamorous gowns and printed tunics made with the perfect touch of modern style.`,
  specifications: [
    { label: 'Type', value: 'Corsican' },
    { label: 'Material', value: 'Fresh' },
    { label: 'Neckline', value: 'Round Neck' },
    { label: 'Sleeve', value: '3/4 Sleeve' },
    { label: 'Pockets', value: 'No' },
    { label: 'Fabric', value: 'Cotton Blend' },
    { label: 'Transparency', value: 'Non-Transparent' },
    { label: 'Model Wears', value: 'Size S, Has Height 5"7`' },
    { label: 'Delivery Time', value: 'Will be deliverable within 5 to 10 days of delivery' },
    { label: 'Product', value: 'Top' },
    { label: 'Country Of Origin', value: 'Germany' },
    { label: 'Net Quantity', value: '1 Unit' },
  ],
  careInstructions: `Hand wash cold, do not bleach, tumble dry low, iron warm if needed.`
};

const relatedProducts = [
  { id: '1', name: 'Dragon Fruit Hybrid', price: 250.00, image: 'https://images.unsplash.com/photo-1596120536733-149ac06dfa9c?w=400&h=400&fit=crop&auto=format', originalPrice: 300.00 },
  { id: '2', name: 'Organic Banana Puree', price: 12.00, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&auto=format', originalPrice: 15.00 },
  { id: '3', name: 'Red Fresh Apple', price: 76.00, image: 'https://images.unsplash.com/photo-1560037300-349f70642875?w=400&h=400&fit=crop&auto=format', originalPrice: 90.00 },
  { id: '4', name: 'Organic Cabbage Fresh', price: 50.00, image: 'https://images.unsplash.com/photo-1627992036125-3b9b4f0b2a0f?w=400&h=400&fit=crop&auto=format', originalPrice: 60.00 },
  { id: '5', name: 'Sunberry Mix Muscat Grapes', price: 240.00, image: 'https://images.unsplash.com/photo-1591142512143-6c0b9683792c?w=400&h=400&fit=crop&auto=format', originalPrice: 280.00 },
];

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'specification', 'reviews'

  // Dummy cart items for the header cart count
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 'temp1', name: 'Placeholder Fruit', price: 5.00, quantity: 2, image: 'https://via.placeholder.com/50', weight: '1kg' },
  ]);

  const handleAddToCart = () => {
    // Logic to add the current product to cart
    console.log(`Added ${quantity} of ${productData.name} to cart.`);
    setCartItems(prev => [...prev, {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      quantity: quantity,
      image: productData.image,
      weight: productData.weightUnit, // Assuming weightUnit can be used here or derive from productData
    }]);
  };

  const handleBuyItNow = () => {
    // Logic for immediate purchase
    console.log(`Buying ${quantity} of ${productData.name} now.`);
  };

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
            <h1 className="text-2xl font-bold text-green-600">VEGICART</h1>
          </div>

          {/* Search Bar (Mobile & Tablet) */}
          <div className="flex-1 md:hidden mx-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-4 pr-10 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation and Search Bar */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
              Catalog
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
              Collection
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
              Blog
            </a>
            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-green-600 transition-colors hidden md:block">
              <User className="h-5 w-5" />
            </button>
            <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:text-green-600">
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
            <h3 className="text-xl font-bold mb-4">VEGICART</h3>
            <p className="text-green-100 text-sm mb-4">
              Your trusted partner for fresh, quality groceries delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-green-200 cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-green-200 cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-green-200 cursor-pointer" />
              <Mail className="h-5 w-5 hover:text-green-200 cursor-pointer" />
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
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <span>support@vegicart.com</span>
              </div>
              <div className="flex items-center">
                <span>123 Fresh Street, City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-500 mt-8 pt-8 text-center text-sm text-green-100">
          <p>&copy; 2024 VEGICART. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="#" className="text-green-600 hover:text-green-800">Home</a>
            </li>
            <li className="flex items-center">
              <a href="#" className="text-green-600 hover:text-green-800">Fresh Organic</a>
            </li>
            <li className="flex items-center">
              <span className="text-gray-700">{productData.name}</span>
            </li>
          </ol>
        </nav>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-sm border">
          {/* Product Image */}
          <div className="flex justify-center items-center p-4">
            <Image
              src={productData.image}
              alt={productData.name}
              className="max-w-full h-auto rounded-lg shadow-md object-cover max-h-[400px]"
              width={320}
              height={400}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{productData.name}</h2>
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < productData.rating ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-gray-600 text-sm ml-2">({productData.reviews} Reviews)</span>
              </div>

              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-4xl font-bold text-green-600">£{productData.price.toFixed(2)}</span>
                {productData.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">£{productData.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <p className="text-green-700 font-medium mb-4">{productData.availability}</p>
              <p className="text-gray-600 mb-6">{productData.shortDescription}</p>

              {/* Product Attributes */}
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700 mb-6">
                <div><span className="font-semibold">Type:</span> {productData.type}</div>
                <div><span className="font-semibold">Region:</span> {productData.region}</div>
                <div><span className="font-semibold">Quality:</span> {productData.quality}</div>
                <div><span className="font-semibold">Delivery:</span> {productData.delivery}</div>
                <div><span className="font-semibold">Farm:</span> {productData.farm}</div>
                {/* Adding more attributes from image/common product details */}
                <div><span className="font-semibold">Calories:</span> {productData.calories}</div>
                <div><span className="font-semibold">Fat:</span> {productData.fat}</div>
                <div><span className="font-semibold">Protein:</span> {productData.protein}</div>
                <div><span className="font-semibold">Carb:</span> {productData.carb}</div>
              </div>

              {/* Size and Color Options */}
              <div className="flex items-center space-x-6 mb-6">
                <div>
                  <span className="font-semibold text-gray-800 mr-2">Size:</span>
                  <div className="inline-flex space-x-2">
                    {productData.size.map(s => (
                      <button key={s} className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-800 mr-2">Color:</span>
                  <div className="inline-flex space-x-2">
                    {productData.color.map(c => (
                      <button key={c} className={`w-6 h-6 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`} style={{ backgroundColor: c }}>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
              <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white rounded transition-colors text-gray-600"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white rounded transition-colors text-gray-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyItNow}
                className="flex-1 sm:flex-none bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
              >
                Buy It Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('description')}
                className={`${activeTab === 'description' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specification')}
                className={`${activeTab === 'specification' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                Specification
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`${activeTab === 'reviews' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                Reviews ({productData.reviews})
              </button>
            </nav>
          </div>

          <div className="mt-6 text-gray-700 prose prose-sm max-w-none">
            {activeTab === 'description' && (
              <div>
                <p className="mb-4">{productData.description}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Experience the zest of freshly picked, organic Corsican lemons.</li>
                  <li>Hand-selected for superior quality and vibrant flavor.</li>
                  <li>Perfect for culinary creations, refreshing beverages, or a healthy snack.</li>
                  <li>Rich in Vitamin C and antioxidants.</li>
                </ul>
                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Storage Instructions:</h3>
                <p className="mb-4">Store in a cool, dry place away from direct sunlight. Refrigeration can extend freshness.</p>
              </div>
            )}

            {activeTab === 'specification' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productData.specifications.map((spec, index) => (
                      <tr key={index}>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                          {spec.label}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                    {/* Add nutritional info directly from productData for clarity */}
                    <tr>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        Calories
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                        {productData.calories}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        Fat
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                        {productData.fat}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        Protein
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                        {productData.protein}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        Carbohydrates
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                        {productData.carb}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h3>
                {productData.reviews === 0 ? (
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                ) : (
                  <div className="space-y-6">
                    {/* Placeholder for reviews */}
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center text-yellow-400 text-sm">
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 text-gray-300" />
                          <span className="ml-2 font-semibold">Excellent!</span>
                        </div>
                      </div>
                      <p className="text-gray-800 font-semibold mb-1">A fantastic lemon!</p>
                      <p className="text-gray-600 text-sm">&quot;These lemons are incredibly fresh and juicy. Perfect for my morning detox water!&quot;</p>
                      <p className="text-xs text-gray-500 mt-2">By Jane Doe on May 20, 2024</p>
                    </div>
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center text-yellow-400 text-sm">
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-2 font-semibold">Simply the best!</span>
                        </div>
                      </div>
                      <p className="text-gray-800 font-semibold mb-1">High quality and great flavor.</p>
                      <p className="text-gray-600 text-sm">&quot;I&#39;m very impressed with the quality of these organic lemons. They add so much flavor to my dishes.&quot;</p>
                      <p className="text-xs text-gray-500 mt-2">By John Smith on April 15, 2024</p>
                    </div>
                    {/* Add a button to write a review */}
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors mt-4">
                      Write a Review
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* You Might Also Like Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {relatedProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border p-4 text-center group">
                <div className="relative mb-4 flex justify-center h-40">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    width={160}
                    height={160}
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {( (product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)}% OFF
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <span className="text-xl font-bold text-green-600">£{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
                  Select Option
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mt-12 bg-green-700 text-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Subscribe To Our Newsletter</h2>
            <p className="text-green-100">Get the latest updates and special offers straight to your inbox!</p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors">
              Subscribe
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;