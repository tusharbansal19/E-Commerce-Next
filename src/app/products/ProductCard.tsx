'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import type { Product } from './page';

export default function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = React.useState(false);
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col h-full relative group">
      {/* Wishlist Button */}
      <button
        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-purple-50 z-10"
        onClick={() => setWishlisted((w) => !w)}
        aria-label="Add to wishlist"
      >
        <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-300 group-hover:text-purple-500'}`} />
      </button>
      <Link href={`/product/${product.id}`} className="block">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-t-xl"
          width={320}
          height={160}
        />
      </Link>
      <div className="flex-1 flex flex-col p-4">
        <Link href={`/product/${product.id}`} className="font-semibold text-base text-gray-900 hover:text-purple-600 mb-1 line-clamp-2">
          {product.name}
        </Link>
        <div className="text-xs text-gray-500 mb-2 line-clamp-1">{product.brand}</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-green-400' : 'text-gray-300'}`} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating.toFixed(1)})</span>
        </div>
        <button className="mt-auto bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full transition-colors shadow">
          Add to Cart
        </button>
      </div>
    </div>
  );
} 