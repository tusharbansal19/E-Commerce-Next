'use client'
import { useState } from 'react'
import { Search, ShoppingCart, User, Menu, X, MapPin } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Pages', href: '#' },
    { name: 'Shop', href: '#' },
    { name: 'Vendor', href: '#' },
    { name: 'Elements', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' }
  ]

  return (
    <>
      {/* Top Banner */}
      <div className="bg-purple-600 text-white text-center py-2 px-4">
        <p className="text-sm">
          FREE delivery & 40% Discount for next 3 orders! Place your 1st order in
          <span className="ml-2 bg-white text-purple-600 px-2 py-1 rounded text-xs font-semibold">
            Until tomorrow
          </span>
        </p>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600 script-font">Freshly</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find Your Products..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-400 hover:bg-orange-500 text-white p-1.5 rounded">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Location */}
              <div className="hidden lg:flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Weekly Discount</span>
              </div>

              {/* Hotline */}
              <div className="hidden lg:flex items-center text-sm">
                <div className="text-right">
                  <div className="text-xs text-gray-500">Online Hotline</div>
                  <div className="font-semibold text-purple-600">(555) 345-678</div>
                </div>
              </div>

              {/* User Account */}
              <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <User className="h-6 w-6" />
              </button>

              {/* Shopping Cart */}
              <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-purple-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find Your Products..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-400 hover:bg-orange-500 text-white p-1.5 rounded">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
} 