import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function OrdersPage() {
  const { user, token, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/orders/mine`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (authLoading || loading) {
    return <main className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500">Loading...</main>;
  }

  if (!user) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Please log in</h1>
        <p className="text-gray-600 mb-6">You need an account to view your orders.</p>
        <Link to="/login" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800">
          Log in
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-5xl mb-3">📦</div>
          <p className="text-gray-700 mb-4">You haven't placed any orders yet.</p>
          <Link to="/" className="text-blue-600 hover:underline">Start shopping →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="text-xs text-gray-700 font-mono">{order._id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="border-t pt-3 space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.name} × {item.quantity}</span>
                    <span className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}