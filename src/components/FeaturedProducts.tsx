import React from 'react';

const FeaturedProducts = () => {
  return (
    <section className="py-8 bg-gray-100">
      {/* TODO: Display featured glossary terms here */}
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-4">Featured Terms</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Featured term cards placeholder */}
          <div className="p-4 bg-white rounded shadow">Term 1</div>
          <div className="p-4 bg-white rounded shadow">Term 2</div>
          <div className="p-4 bg-white rounded shadow">Term 3</div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 