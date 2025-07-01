'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X, ChevronDown, Star, Heart, ShoppingCart, Grid, List } from 'lucide-react';
import SearchBar from './SearchBar';
import Filters from './Filters';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories, fetchBrands } from '../../store/productsSlice';
import type { AppDispatch } from '../../store';

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
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 ">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-extrabold text-purple-700 tracking-tight">Products</h1>
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-purple-100 shadow-sm text-purple-700' : 'hover:bg-gray-200 text-gray-500'}`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-purple-100 shadow-sm text-purple-700' : 'hover:bg-gray-200 text-gray-500'}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 font-medium"
                >
                  {sortOptions.map((option: SortOption) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold shadow"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
          {/* Search Bar */}
          <div className="my-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedCategories.map(category => (
              <span
                key={category}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700 font-semibold"
              >
                {category}
                <button
                  onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                  className="ml-2 hover:text-purple-900"
                  aria-label={`Remove ${category}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedBrand && (
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-semibold"
              >
                {selectedBrand}
                <button
                  onClick={() => setSelectedBrand('')}
                  className="ml-2 hover:text-green-900"
                  aria-label="Remove brand"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
          {/* Results Count */}
          <div className="text-sm text-gray-600 mt-2 font-medium">
            Showing <span className="text-green-600 font-bold">{paginatedProducts.length}</span> of <span className="text-purple-700 font-bold">{filteredProducts.length}</span> products
          </div>
        </div>
      </div>
      <div className=" w-full  px-4 py-8">
        <div className="flex gap-8 items-start">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-32">
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
          {/* Mobile Sidebar */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <div className="bg-white w-80 h-full p-4" onClick={e => e.stopPropagation()}>
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
                <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded font-semibold shadow hover:bg-purple-700" onClick={() => setIsSidebarOpen(false)}>Close</button>
              </div>
            </div>
          )}
          {/* Main Content */}
          <div className="flex-1 w-full ">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-green-600 tracking-tight">All Products</h2>
            </div>
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
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg border font-semibold ${
                      currentPage === page
                        ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}