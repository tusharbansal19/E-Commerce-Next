import React from 'react';

const CategorySection = () => {
  return (
    <section className="py-8 bg-white">
      {/* TODO: Display categories/tags here */}
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {/* Category tags placeholder */}
          <span className="px-3 py-1 bg-blue-100 rounded">HR</span>
          <span className="px-3 py-1 bg-green-100 rounded">Tech</span>
          <span className="px-3 py-1 bg-yellow-100 rounded">Recruitment</span>
        </div>
      </div>
    </section>
  );
};

export default CategorySection; 