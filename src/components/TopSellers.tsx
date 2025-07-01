// TopSellers component placeholder// components/TopSellers.js
import { Star, Award } from 'lucide-react'

export default function TopSellers() {
  const topSellers = [
    {
      id: 1,
      name: 'Eleanor Pena',
      avatar: '/api/placeholder/60/60',
      rating: 4.9,
      totalSales: 2847,
      badge: 'Top Seller',
      speciality: 'Organic Vegetables'
    },
    {
      id: 2,
      name: 'Dianne Russell',
      avatar: '/api/placeholder/60/60',
      rating: 4.8,
      totalSales: 2156,
      badge: 'Featured',
      speciality: 'Fresh Fruits'
    },
    {
      id: 3,
      name: 'Michel Richard',
      avatar: '/api/placeholder/60/60',
      rating: 4.7,
      totalSales: 1943,
      badge: 'Premium',
      speciality: 'Dairy Products'
    },
    {
      id: 4,
      name: 'Marvin McKinney',
      avatar: '/api/placeholder/60/60',
      rating: 4.9,
      totalSales: 2634,
      badge: 'Top Rated',
      speciality: 'Meat & Seafood'
    }
  ]

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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Seller Users</h2>
            <p className="text-gray-600">Meet our most trusted and experienced sellers</p>
          </div>
          <button className="text-purple-600 hover:text-purple-700 font-semibold">
            View All Sellers →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topSellers.map((seller, index) => (
            <div
              key={seller.id}
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg hover:border-purple-200 transition-all duration-300 group"
            >
              {/* Rank Badge */}
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full overflow-hidden group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
                </div>
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full p-1.5">
                    <Award className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Seller Info */}
              <h3 className="font-bold text-gray-900 mb-1">{seller.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{seller.speciality}</p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                <div className="flex">
                  {renderStars(seller.rating)}
                </div>
                <span className="text-sm font-semibold text-gray-700 ml-1">
                  {seller.rating}
                </span>
              </div>

              {/* Stats */}
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-semibold text-purple-600">{seller.totalSales.toLocaleString()}</span> total sales
              </div>

              {/* Badge */}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                seller.badge === 'Top Seller' 
                  ? 'bg-yellow-100 text-yellow-800'
                  : seller.badge === 'Featured'
                  ? 'bg-blue-100 text-blue-800'
                  : seller.badge === 'Premium'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {seller.badge}
              </span>

              {/* Contact Button */}
              <button className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                View Store
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}