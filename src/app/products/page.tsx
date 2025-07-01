'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X, ChevronDown, Star, Heart, ShoppingCart, Grid, List, User, Menu } from 'lucide-react';
import SearchBar from './SearchBar';
import Filters from './Filters';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories, fetchBrands } from '../../store/productsSlice';
import type { AppDispatch } from '../../store';
import Pagination from './Pagination';
import Footer from '../../components/Footer';

// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  category: {
    id: string;
    name: string;
  };
  categoryId: string;
  tags: { id: string; name: string }[];
  brand: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
];

// Concise header for products page
interface ProductsHeaderProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onFilterClick: () => void;
  showFilterButton: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  cartCount?: number;
}

function ProductsHeader({
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  onFilterClick,
  showFilterButton,
  searchTerm,
  setSearchTerm,
  cartCount = 0,
}: ProductsHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 60) {
            setShowHeader(false);
          } else {
            setShowHeader(true);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!mobileNavOpen) return;
    const handleClick = (e: MouseEvent) => {
      const menu = document.getElementById('mobile-nav-dropdown');
      if (menu && !menu.contains(e.target as Node)) {
        setMobileNavOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileNavOpen]);

  return (
    <header
      className={`sticky top-0 z-30 bg-white border-b shadow-sm flex items-center gap-2 px-2 sm:px-4 h-16 min-h-0 relative transition-transform duration-300 ease-in-out ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ willChange: 'transform' }}
    >
      {/* Logo */}
      <a href="/" className="text-lg font-bold text-green-600 mr-2">freshly</a>
      {/* Navigation */}
      <nav className="hidden md:flex gap-3 text-sm font-medium text-gray-700 mr-2">
        <a href="/products" className="hover:text-green-600">Products</a>
        <a href="/categories" className="hover:text-green-600">Categories</a>
        <a href="/deals" className="hover:text-green-600">Deals</a>
        <a href="/about" className="hover:text-green-600">About</a>
        <a href="/wishlist" className="hover:text-green-600">Wishlist</a>
        <a href="/contact" className="hover:text-green-600">Contact</a>
      </nav>
      {/* Hamburger for mobile */}
      <button className="md:hidden p-2 text-gray-500 hover:text-green-600" onClick={() => setMobileNavOpen((v) => !v)} aria-label="Open navigation menu">
        <Menu className="w-5 h-5" />
      </button>
      {/* Mobile Dropdown Menu (opens from top, covers width, animated) */}
      {mobileNavOpen && (
        <div id="mobile-nav-dropdown" className="absolute left-0 top-full w-full bg-white border-b shadow-lg flex flex-col md:hidden animate-dropdown z-40 origin-top animate-[dropdownOpen_0.2s_ease]">
          <a href="/products" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600" onClick={() => setMobileNavOpen(false)}>Products</a>
          <a href="/categories" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600" onClick={() => setMobileNavOpen(false)}>Categories</a>
          <a href="/deals" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600" onClick={() => setMobileNavOpen(false)}>Deals</a>
          <a href="/about" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600" onClick={() => setMobileNavOpen(false)}>About</a>
          <a href="/wishlist" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600" onClick={() => setMobileNavOpen(false)}>Wishlist</a>
          <a href="/contact" className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600" onClick={() => setMobileNavOpen(false)}>Contact</a>
          {/* Sort Dropdown (mobile only) */}
          <div className="px-4 py-2">
            <label htmlFor="mobile-sort" className="block text-xs font-semibold text-gray-500 mb-1">Sort By</label>
            <select
              id="mobile-sort"
              value={sortBy}
              onChange={e => { setSortBy(e.target.value); setMobileNavOpen(false); }}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 text-sm font-medium"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          {/* Filter Button (mobile only, in dropdown) */}
          <button
            onClick={() => { setMobileNavOpen(false); onFilterClick(); }}
            className="flex items-center space-x-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold shadow text-sm mt-2 mx-4"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          {/* Icons (mobile only, in dropdown) */}
          <div className="flex items-center justify-around mt-4 mb-2">
            <a href="/wishlist" className="p-2 text-gray-500 hover:text-green-600"><Heart className="w-5 h-5" /></a>
            <a href="/cart" className="relative p-2 text-gray-500 hover:text-green-600">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>}
            </a>
            <a href="/login" className="p-2 text-gray-500 hover:text-green-600"><User className="w-5 h-5" /></a>
          </div>
        </div>
      )}
      {/* Search */}
      <div className="flex-1 max-w-xs relative mx-2">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full pl-3 pr-8 py-1.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"><Search className="w-4 h-4" /></button>
      </div>
      {/* View Mode Toggle */}
      <div className="hidden sm:flex items-center space-x-1 bg-gray-100 rounded-lg p-1 mr-2">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-1 rounded ${viewMode === 'grid' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-200 text-gray-500'}`}
          aria-label="Grid view"
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-1 rounded ${viewMode === 'list' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-200 text-gray-500'}`}
          aria-label="List view"
        >
          <List className="w-4 h-4" />
        </button>
      </div>
      {/* Sort Dropdown (desktop only) */}
      <div className="relative mr-2 hidden md:block">
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1 pr-7 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 text-sm font-medium"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
      {/* Filter Button (desktop only) */}
      {showFilterButton && (
        <button
          onClick={onFilterClick}
          className="hidden lg:flex items-center space-x-1 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors font-semibold shadow text-sm"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      )}
      {/* Icons (desktop only) */}
      <div className="hidden md:flex items-center gap-2">
        <a href="/wishlist" className="p-2 text-gray-500 hover:text-green-600"><Heart className="w-5 h-5" /></a>
        <a href="/cart" className="relative p-2 text-gray-500 hover:text-green-600">
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>}
        </a>
        <a href="/login" className="p-2 text-gray-500 hover:text-green-600"><User className="w-5 h-5" /></a>
      </div>
    </header>
  );
}

// Main Products Page Component
export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const productsPerPage = 20;

  const dispatch = useDispatch<AppDispatch>();
  const { products, categories, brands, loading } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product: any) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category.name);
      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      const matchesStock = !inStockOnly || product.stock > 0;
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock;
    });

    // Sort products
    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategories, selectedBrand, priceRange, minRating, inStockOnly, sortBy]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ProductsHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onFilterClick={() => setIsSidebarOpen(true)}
        showFilterButton={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={2}
      />
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 overflow-y-auto">
        <div className="w-full px-0 sm:px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 items-start">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <Filters
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  minRating={minRating}
                  setMinRating={setMinRating}
                  inStockOnly={inStockOnly}
                  setInStockOnly={setInStockOnly}
                />
              </div>
            </div>
            {/* Mobile Sidebar (slide in from left, fixed to left, undimmed) */}
            {isSidebarOpen && (
              <div className="fixed inset-0 z-50 flex lg:hidden" style={{ pointerEvents: 'none' }}>
                <div
                  className="bg-white w-80 max-w-full h-full p-0 relative overflow-y-auto rounded-r-lg shadow-xl fixed left-0 top-0 bottom-0 transition-transform duration-300"
                  style={{ pointerEvents: 'auto', transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}
                  onClick={e => e.stopPropagation()}
                >
                  <Filters
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    inStockOnly={inStockOnly}
                    setInStockOnly={setInStockOnly}
                    onClose={() => setIsSidebarOpen(false)}
                  />
                  <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded font-semibold shadow hover:bg-purple-700" onClick={() => setIsSidebarOpen(false)}>Close</button>
                </div>
              </div>
            )}
            {/* Main Product Content */}
            <section className="flex-1 w-full">
              {loading ? (
                <div className="text-center py-12 text-purple-600 font-semibold text-lg">Loading products...</div>
              ) : (
                <div className={`grid w-full gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}>
                  {paginatedProducts.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </section>
          </div>
        </div>
      </main>
      <Footer />
      {/* Mobile Filter Button (fixed bottom left) */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors font-semibold lg:hidden"
      >
        <Filter className="w-5 h-5" />
        <span>Filters</span>
      </button>
    </div>
    
  );
}