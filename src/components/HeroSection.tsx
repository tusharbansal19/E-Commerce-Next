import React from 'react';

const HeroSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-300">
      {/* TODO: Add hero content, search bar, and call-to-action */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to the Glossary Web App</h2>
        <p className="text-lg text-gray-700 mb-6">Browse, search, and contribute to a modern glossary of HR and technical terms.</p>
        {/* Search bar placeholder */}
        <input type="text" placeholder="Search terms..." className="px-4 py-2 rounded shadow w-full max-w-md mx-auto" />
      </div>
    </section>
  );
};

export default HeroSection; 