import { Link } from 'react-router-dom';
import Stars from './Stars';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
    >
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-700">
          {product.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
        <Stars rating={product.rating} showNumber reviewCount={product.reviewCount} />
        <p className="text-gray-600 mt-1 font-medium">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}