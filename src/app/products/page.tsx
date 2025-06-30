'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import Filters from '@/components/products/Filters';
import SearchBar from '@/components/products/SearchBar';
import Pagination from '@/components/products/Pagination';
import SkeletonLoader from '@/components/products/SkeletonLoader';
import { AnimatePresence, motion } from 'framer-motion';
import { useDebounce } from '@/hooks/useDebounce'; // Custom hook

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  category: { id: string; name: string };
  categoryId: string;
  brand: string;
  rating: number;
  discount: number;
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1')
  );
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll('categories') || []
  );
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseFloat(searchParams.get('minPrice') || '0'),
    parseFloat(searchParams.get('maxPrice') || '99999'),
  ]);
  const [minRating, setMinRating] = useState(
    parseFloat(searchParams.get('minRating') || '0')
  );
  const [inStockOnly, setInStockOnly] = useState(
    searchParams.get('inStockOnly') === 'true'
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'popularity');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('limit', '20'); // 20 products per page

    if (debouncedSearchTerm) params.set('search', debouncedSearchTerm);
    selectedCategories.forEach((cat) => params.append('categories', cat));
    if (selectedBrand) params.set('brand', selectedBrand);
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    params.set('minRating', minRating.toString());
    params.set('inStockOnly', inStockOnly.toString());
    params.set('sortBy', sortBy);

    router.push(`?${params.toString()}`, { scroll: false });

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setTotalProducts(data.totalProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Handle error display
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    debouncedSearchTerm,
    selectedCategories,
    selectedBrand,
    priceRange,
    minRating,
    inStockOnly,
    sortBy,
    router,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Suspense fallback={<SkeletonLoader count={20} />}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sticky Filter Sidebar for larger screens */}
        <div className="lg:w-1/4 sticky top-4 self-start bg-white p-6 rounded-lg shadow-md hidden lg:block">
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

        <div className="flex-1">
          {/* Sticky Search and Sort Bar for all screens */}
          <div className="sticky top-0 bg-white z-10 p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="flex items-center gap-2">
              <label htmlFor="sortBy" className="text-sm font-medium">Sort by:</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="popularity">Popularity</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <details className="dropdown w-full">
              <summary className="m-1 btn w-full bg-blue-500 hover:bg-blue-600 text-white shadow-md rounded-md">
                Filter Products
              </summary>
              <div className="p-4 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full">
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
            </details>
          </div>


          {loading ? (
            <SkeletonLoader count={20} />
          ) : (
            <>
              {products.length === 0 ? (
                <div className="text-center py-10 text-gray-600">
                  No products found matching your criteria.
                </div>
              ) : (
                <motion.div
                  layoutId="product-grid"
                  className="grid gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.05 } },
                  }}
                  style={{
                    gridTemplateColumns:
                      'repeat(auto-fit, minmax(200px, 1fr))', // Default for small screens
                  }}
                  // Responsive grid with Tailwind CSS classes applied via `className`
                  // Tailwind will apply these based on breakpoints
                  // For Framer Motion, we need to ensure direct style is not conflicting
                  // We can remove the inline style and rely solely on Tailwind for grid responsiveness
                  className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                >
                  <AnimatePresence>
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </>
          )}

          {totalProducts > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </Suspense>
  );
}