import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          MyStore
        </Link>
        <Link to="/cart" className="text-gray-600 hover:text-gray-900 transition">
          🛒 Cart ({cartCount})
        </Link>
      </div>
    </header>
  );
}