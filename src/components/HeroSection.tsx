'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "100% Farm Fresh Food",
      subtitle: "Fresh Organic",
      description: "Food For All",
      price: "$59.00",
      bgColor: "from-purple-500 to-pink-500",
      image: "/api/placeholder/300/300",
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "Creamy Fruits baby Jem",
      subtitle: "Only Today",
      description: "Special Offer",
      price: "$12.99",
      bgColor: "from-blue-500 to-cyan-500",
      image: "/api/placeholder/300/300",
      cta: "Shop Now"
    },
    {
      id: 3,
      title: "New Baby Diaper",
      subtitle: "Baby Care",
      description: "Premium Quality",
      price: "$25.99",
      bgColor: "from-green-500 to-emerald-500",
      image: "/api/placeholder/300/300",
      cta: "Shop Now"
    }
  ]

  const promoCards = [
    {
      id: 1,
      title: "Creamy Fruits baby Jem",
      subtitle: "Only Today",
      price: "$12.99",
      bgColor: "from-blue-400 to-blue-600",
      image: "/api/placeholder/200/150"
    },
    {
      id: 2,
      title: "Organic Fruits",
      subtitle: "100% Organic",
      price: "$14.99",
      bgColor: "from-yellow-400 to-orange-500",
      image: "/api/placeholder/200/150"
    },
    {
      id: 3,
      title: "Kids Car Toys",
      subtitle: "2023 Collection",
      price: "$5.99",
      bgColor: "from-purple-400 to-pink-500",
      image: "/api/placeholder/200/150"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Hero Slider */}
          <div className="lg:col-span-2">
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`min-w-full h-full bg-gradient-to-r ${slide.bgColor} flex items-center justify-between p-8 text-white`}
                  >
                    <div className="flex-1">
                      <h3 className="text-sm font-medium mb-2">{slide.subtitle}</h3>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-xl mb-4">{slide.description}</p>
                      <div className="text-3xl font-bold mb-6">{slide.price}</div>
                      <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        {slide.cta}
                      </button>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-40 h-40 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Promo Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {promoCards.map((card) => (
              <div
                key={card.id}
                className={`bg-gradient-to-r ${card.bgColor} rounded-2xl p-6 text-white h-32 lg:h-28 flex items-center justify-between hover:scale-105 transition-transform cursor-pointer`}
              >
                <div>
                  <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                  <p className="text-sm opacity-90 mb-2">{card.subtitle}</p>
                  <span className="text-xl font-bold">{card.price}</span>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/30 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 