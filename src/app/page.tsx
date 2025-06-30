// app/page.js
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import CategorySection from '@/components/CategorySection'
import FeaturedProducts from '@/components/FeaturedProducts'
import TopSellers from '@/components/TopSellers'
import TrendingProducts from '@/components/TrendingProducts'
import PromoBanner from '@/components/PromoBanner'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <PromoBanner />
      <TopSellers />
      <TrendingProducts />
      <Footer />
    </main>
  )
}