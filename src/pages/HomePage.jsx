import { useState, useMemo } from 'react';
import { products } from '../products';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import SearchAndFilter from '../components/SearchAndFilter';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Filter products based on search + category
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <>
      <Hero />
      <main id="products" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
          <p className="text-sm text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <SearchAndFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}