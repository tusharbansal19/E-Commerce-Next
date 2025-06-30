// components/PromoBanner.js
export default function PromoBanner() {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full transform translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full transform -translate-x-24 translate-y-24"></div>
            </div>
  
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1 mb-6 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  In store or online your health & safety is our top priority
                </h2>
                <p className="text-lg opacity-90 mb-6 max-w-2xl">
                  The only supermarket that makes your life easier, makes you enjoy the experience and provides you with the highest quality products.
                </p>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
              
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold mb-2">50</div>
                      <div className="text-xl">% OFF</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }