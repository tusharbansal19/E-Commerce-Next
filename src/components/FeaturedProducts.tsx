// components/FeaturedProducts.js
'use client'
import { useState } from 'react'
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react'

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('All')
  const [favorites, setFavorites] = useState(new Set())

  const tabs = ['All', 'Desserts', 'Vegetables', 'Beverages']

  const products = [
    {
      id: 1,
      name: 'Russet Idaho Potatoes Fresh Premium Fruit Loose',
      category: 'Vegetables',
      price: 35.00,
      originalPrice: 40.00,
      rating: 4.5,
      reviews: 95,
      image: '/api/placeholder/250/200',
      discount: 15,
      isNew: false,
      inStock: true
    },
    {
      id: 2,
      name: 'Aptamil Gold+ ProNutra Infant Sage 1 Infant',
      category: 'Beverages',
      price: 210.00,
      originalPrice: 250.00,
      rating: 4.8,
      reviews: 128,
      image: '/api/placeholder/250/200',
      discount: 20,
      isNew: true,
      inStock: true
    },
    {
      id: 3,
      name: 'Onion Food Market Organic Yellow Onion',
      category: 'Vegetables',
      price: 15.00,
      originalPrice: 18.00,
      rating: 4.2,
      reviews: 67,
      image: '/api/placeholder/250/200',
      discount: 10,
      isNew: false,
      inStock: true
    },
    {
      id: 4,
      name: 'Onion Food Market Monster hearts Onion',
      category: 'Vegetables',
      price: 19.00,
      originalPrice: 25.00,
      rating: 4.6,
      reviews: 89,
      image: '/api/placeholder/250/200',
      discount: 25,
      isNew: false,
      inStock: false
    },
    {
      id: 5,
      name: 'Red Rock Deli Lime & Coconut Crackers',
      category: 'Desserts',
      price: 134.00,
      originalPrice: 150.00,
      rating: 4.3,
      reviews: 45,
      image: '/api/placeholder/250/200',
      discount: 12,
      isNew: false,
      inStock: true
    }
  ]

  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(product => product.category === activeTab)

  const toggleFavorite = (productId:string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
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
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.discount && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      -{product.discount}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      NEW
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      OUT OF STOCK
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleFavorite(product.id.toString())}
                    className={`p-2 rounded-full transition-colors ${
                      favorites.has(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-white text-gray-600 rounded-full hover:bg-purple-500 hover:text-white transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
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
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!product.inStock}
                  className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                    product.inStock
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? (
                    <div className="flex items-center justify-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </div>
                  ) : (
                    'Out of Stock'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}