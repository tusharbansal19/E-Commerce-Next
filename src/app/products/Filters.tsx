'use client';
import React from 'react';

interface FiltersProps {
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  selectedBrand: string;
  setSelectedBrand: (v: string) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  minRating: number;
  setMinRating: (v: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  onClose?: () => void;
}

export default function Filters({
  selectedCategories,
  setSelectedCategories,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  inStockOnly,
  setInStockOnly,
  onClose
}: FiltersProps) {
  // TODO: Replace with dynamic data from API
  const categories = [
    { id: 'fruits', name: 'Fruits' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'bakery', name: 'Bakery' },
  ];
  const brands = ['Brand A', 'Brand B', 'Brand C'];

  return (
    <aside className="bg-white rounded-xl shadow p-6 flex flex-col gap-6 w-full lg:w-auto lg:rounded-xl lg:shadow lg:p-6 lg:gap-6 lg:border lg:border-gray-100 lg:sticky lg:top-32 lg:left-0 lg:z-10">
      {/* Mobile Close Button */}
      {onClose && (
        <button onClick={onClose} className="block lg:hidden absolute top-4 right-4 text-gray-500 hover:text-purple-600 text-2xl font-bold z-20">×</button>
      )}
      <div>
        <h3 className="font-bold text-lg text-gray-900 mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors ${selectedCategories.includes(cat.id) ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-purple-50'}`}
              onClick={() => setSelectedCategories(selectedCategories.includes(cat.id) ? selectedCategories.filter((c) => c !== cat.id) : [...selectedCategories, cat.id])}
              type="button"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg text-gray-900 mb-4">Brand</h3>
        <select
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="font-bold text-lg text-gray-900 mb-4">Price Range</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            className="w-20 p-1 border border-gray-200 rounded-lg"
            value={priceRange[0]}
            min={0}
            max={priceRange[1]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <span>-</span>
          <input
            type="number"
            className="w-20 p-1 border border-gray-200 rounded-lg"
            value={priceRange[1]}
            min={priceRange[0]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg text-gray-900 mb-4">Minimum Rating</h3>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full accent-yellow-400"
        />
        <div className="text-xs text-gray-500 mt-1">{minRating} stars & up</div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          id="inStockOnly"
          className="accent-green-500"
        />
        <label htmlFor="inStockOnly" className="text-sm">In Stock Only</label>
      </div>
      <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-full transition-colors shadow">
        Apply Filters
      </button>
    </aside>
  );
} 