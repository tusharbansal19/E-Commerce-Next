// components/TrendingProducts.js
'use client'
import { useState } from 'react'
import { TrendingUp, Star, ShoppingCart } from 'lucide-react'

export default function TrendingProducts() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Vegetables', 'Fruits', 'Beverages', 'Dairy', 'Snacks']

  const trendingProducts = [
    {
      id: 1,
      name: 'Fresh Organic Watermelon',
      category: 'Fruits',
      price: 5.99,
      originalPrice: 7.99,
      rating: 4.8,
      reviews: 234,
      image: '/api/placeholder/200/200',
      trending: true,
      discount: 25,
      stock: 'In Stock'
    },
    {
      id: 2,
      name: 'Aptamil Gold+ Infant Formula',
      category: 'Beverages',
      price: 45.99,
      originalPrice: 52.99,
      rating: 4.9,
      reviews: 156,
      image: '/api/placeholder/200/200',
      trending: true,
      discount: 15,
      stock: 'In Stock'
    },
    {
      id: 3,
      name: 'Organic Green Lettuce',
      category: 'Vegetables',
      price: 3.99,
      originalPrice: 4.99,
      rating: 4.6,
      reviews: 89,
      image: '/api/placeholder/200/200',
      trending: true,
      discount: 20,
      stock: 'In Stock'
    },
    {
      id: 4,
      name: 'Premium Honey',
      category: 'Snacks',
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.7,
      reviews: 67,
      image: '/api/placeholder/200/200',
      trending: true,
      discount: 18,
      stock: 'Low Stock'
    },
    {
      id: 5,
      name: 'Organic Milk 2L',
      category: 'Dairy',
      price: 4.49,
      originalPrice: 5.49,
      rating: 4.5,
      reviews: 145,
      image: '/api/placeholder/200/200',
      trending: true,
      discount: 18,
      stock: 'In Stock'
    },
    {
      id: 6,
      name: 'Fresh Romaine Lettuce',
      category: 'Vegetables',
      price: 2.99,
      originalPrice: 3.99,
      rating: 4.4,
      reviews: 78,
      image: '/api/placeholder/200/200',
      trending: true,
      discount: 25,
      stock: 'In Stock'
    },
    {
      id: 7,
      name: 'Whole Grain Bread',
      category: 'Snacks',
      price: 3.49,
      originalPrice: 4.49,
      rating: 4.6,
      reviews: 234,
      image: '/api/placeholder/200/200',
      trending: true,
      discount: 22,
      stock: 'In Stock'
    },
    {
      id: 8,
      name: 'Organic Spinach',
      category: 'Vegetables',
      price: 2.99,
      originalPrice: 3.99,
      rating: 4.8,
      reviews: 167,
      image: '/api/placeholder/200/200',
      trending: true,
      discount: 25,
      stock: 'In Stock'
    },
    {
      id: 9,
      name: 'Greek Yogurt',
      category: 'Dairy',
      price: 5.99,
      originalPrice: 7.49,
      rating: 4.7,
      reviews: 123,
      image: '/api/placeholder/200/200',
      trending: true,
      discount: 20,
      stock: 'In Stock'
    },
    {
      id: 10,
      name: 'Almond Milk 1L',
      category: 'Beverages',
      price: 4.99,
      originalPrice: 6.99,
      rating: 4.5,
      reviews: 98,
      image: '/api/placeholder/200/200',
      trending: true,
      discount: 28,
      stock: 'In Stock'
    }
  ]

  const filteredProducts = selectedCategory === 'All' 
    ? trendingProducts 
    : trendingProducts.filter(product => product.category === selectedCategory)

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Trending Products</h2>
              <p className="text-gray-600">Most popular items this week</p>
            </div>
          </div>
          <button className="text-purple-600 hover:text-purple-700 font-semibold">
            View All →
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.slice(0, 10).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                
                {/* Trending Badge */}
                {product.trending && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Hot
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      -{product.discount}%
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 mb-1 text-sm line-clamp-2">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-900 text-sm">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium ${
                    product.stock === 'In Stock' 
                      ? 'text-green-600' 
                      : 'text-orange-600'
                  }`}>
                    {product.stock}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-purple-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-1">
                  <ShoppingCart className="h-3 w-3" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-8">
          <button className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </section>
  )
}