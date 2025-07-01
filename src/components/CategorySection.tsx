// components/CategorySection.js
import { Apple, Coffee, Candy, Fish, Bone } from 'lucide-react'

export default function CategorySection() {
  const categories = [
    {
      id: 1,
      name: 'Vegetables',
      count: '3 Products',
      icon: Apple,
      color: 'bg-green-100 text-green-600',
      hoverColor: 'hover:bg-green-200'
    },
    {
      id: 2,
      name: 'Fresh Fruits',
      count: '5 Products',
      icon: Apple,
      color: 'bg-orange-100 text-orange-600',
      hoverColor: 'hover:bg-orange-200'
    },
    {
      id: 3,
      name: 'Desserts',
      count: '3 Products',
      icon: Candy,
      color: 'bg-pink-100 text-pink-600',
      hoverColor: 'hover:bg-pink-200'
    },
    {
      id: 4,
      name: 'Drinks & Juice',
      count: '2 Products',
      icon: Coffee,
      color: 'bg-blue-100 text-blue-600',
      hoverColor: 'hover:bg-blue-200'
    },
    {
      id: 5,
      name: 'Fish & Meats',
      count: '4 Products',
      icon: Fish,
      color: 'bg-red-100 text-red-600',
      hoverColor: 'hover:bg-red-200'
    },
    {
      id: 6,
      name: 'Pets & Animals',
      count: '3 Products',
      icon: Bone,
      color: 'bg-purple-100 text-purple-600',
      hoverColor: 'hover:bg-purple-200'
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover fresh, quality products across all your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.id}
                className={`group cursor-pointer p-6 rounded-2xl border-2 border-gray-100 ${category.hoverColor} transition-all duration-300 hover:shadow-lg hover:border-gray-200 text-center`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}