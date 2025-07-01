'use client'
import { useState, useEffect } from 'react'
import { Search, ShoppingCart, User, Menu, X, MapPin, Phone, Heart, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function EnhancedHeader() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navItems = [
    { name: 'Home', href: '/', hasDropdown: false },
    { name: 'products', href: '/products', hasDropdown: true },
    { name: 'Categories', href: '/categories', hasDropdown: true },
    { name: 'Deals', href: '/deals', hasDropdown: false },
    { name: 'About Us', href: '/about', hasDropdown: false },
    { name: 'wishlist', href: '/wishlist', hasDropdown: false },
    { name: 'Contact', href: '/contact', hasDropdown: false }
  ]

  const dropdownItems: Record<string, { name: string; href: string }[]> = {
    'products': [
      { name: 'All Products', href: '/products' },
      { name: 'Categories', href: '/products' },
      { name: 'New Arrivals', href: '/products' },
      { name: 'Best Sellers', href: '/products' },
      { name: 'Sale', href: '/products' }
    ],
    'Categories': [
      { name: 'Fruits & Veggies', href: '/categories/fruits-veggies' },
      { name: 'Dairy', href: '/categories/dairy' },
      { name: 'Snacks', href: '/categories/snacks' },
      { name: 'Beverages', href: '/categories/beverages' },
      { name: 'Bakery', href: '/categories/bakery' }
    ]
  }

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsScrolled(currentScrollY > 10)
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        isMenuOpen &&
        target &&
        !target.closest('.mobile-menu') &&
        !target.closest('.menu-button')
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const handleNavClick = (itemName: string) => {
    if (activeDropdown === itemName) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(itemName)
    }
  }

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white text-center py-3 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <p className="text-sm font-medium relative z-10">
          🎉 FREE delivery & 40% Discount for next 3 orders! Place your 1st order in
          <span className="ml-2 bg-white text-purple-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-bounce">
            Until tomorrow
          </span>
        </p>
      </div>

      {/* Main Header */}
      <header 
        className={`bg-white/95 backdrop-blur-lg shadow-lg sticky top-0 z-50 transition-all duration-500 ease-in-out ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'shadow-xl border-b border-purple-100' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center group cursor-pointer">
              <div className="relative">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                  Freshly
                </h1>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 relative">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => handleNavClick(item.name)}
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-purple-50 hover:text-purple-600 ${
                      activeDropdown === item.name ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                      {dropdownItems[item.name]?.map((dropItem) => (
                        <Link key={dropItem.name} href={dropItem.href} className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200">
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
              <div className="relative w-full group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find Your Products..."
                  className="w-full pl-4 pr-14 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 group-hover:border-purple-300 bg-gray-50/50 focus:bg-white"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white p-2.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2">
              {/* Location & Hotline */}
              <div className="hidden xl:flex items-center space-x-6 mr-4">
                <div className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors cursor-pointer">
                  <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="font-medium">Weekly Discount</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-orange-500" />
                  <div>
                    <div className="text-xs text-gray-500">Online Hotline</div>
                    <div className="font-semibold text-purple-600">(555) 345-678</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 relative group">
                  <Heart className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    3
                  </div>
                </button>

                <button className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300">
                  <User className="h-5 w-5" />
                </button>

                <button onClick={() => router.push('/cart')} className="relative p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 group">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">
                    2
                  </span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden menu-button p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find Your Products..."
                className="w-full pl-4 pr-14 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50/50 focus:bg-white"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white p-2.5 rounded-xl transition-all duration-300 shadow-lg">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden mobile-menu transform transition-transform duration-500 ease-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Freshly
            </h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-white rounded-xl transition-all duration-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <div key={item.name}>
                  <Link href={item.href} className="flex items-center justify-between w-full px-4 py-4 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 group" style={{ animationDelay: `${index * 50}ms` }}>
                    <span>{item.name}</span>
                    {item.hasDropdown && <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-purple-600" />}
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Contact Info */}
            <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl">
              <h3 className="font-semibold text-gray-800 mb-3">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-3 text-orange-500" />
                  <span>(555) 345-678</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-3 text-purple-500" />
                  <span>Weekly Discount Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-center space-x-4">
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
                Sign In
              </button>
              <button className="p-3 text-gray-600 hover:text-purple-600 hover:bg-white rounded-xl transition-all duration-300">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Content for Scrolling */}
     
    </>
  )
}