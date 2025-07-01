'use client';
import React from 'react';
import { Search } from 'lucide-react';

// SearchBar component
// Props: searchTerm (string), setSearchTerm (function)
// Renders a search input for filtering products by name or keyword

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Search className="w-5 h-5" />
      </span>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for products, brands, categories..."
        className="w-full pl-12 pr-24 py-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-all duration-200"
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full shadow transition-colors"
        type="button"
      >
        Search
      </button>
    </div>
  );
} 