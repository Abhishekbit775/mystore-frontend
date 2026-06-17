import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          MyStore
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link to="/orders" className="text-gray-700 hover:text-gray-900">My Orders</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-purple-700 hover:text-purple-900 font-medium">Admin</Link>
              )}
              <span className="text-gray-500 hidden sm:inline">Hi, {user.name.split(' ')[0]}</span>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
              <Link to="/signup" className="bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-800">Sign up</Link>
            </>
          )}
          <Link to="/cart" className="text-gray-600 hover:text-gray-900 transition">
            🛒 ({cartCount})
          </Link>
        </nav>
      </div>
    </header>
  );
}