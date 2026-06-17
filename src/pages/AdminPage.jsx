import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const { user, token, loading: authLoading } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !user || user.role !== 'admin') {
      setLoading(false);
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token, user]);

  if (authLoading || loading) {
    return <main className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500">Loading...</main>;
  }

  if (!user) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-3">Please log in</h1>
        <Link to="/login" className="text-blue-600 hover:underline">Log in →</Link>
      </main>
    );
  }

  if (user.role !== 'admin') {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-3">🔒</div>
        <h1 className="text-3xl font-bold mb-3">Admin access only</h1>
        <p className="text-gray-600 mb-4">Your account doesn't have admin privileges.</p>
        <Link to="/" className="text-blue-600 hover:underline">← Back to home</Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      {/* Stats cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">${data?.stats.totalRevenue.toFixed(2) || '0.00'}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{data?.stats.totalOrders || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Avg Order Value</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">${data?.stats.avgOrderValue.toFixed(2) || '0.00'}</p>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <h2 className="text-xl font-bold text-gray-900 p-5 border-b">All Orders</h2>
        {data?.orders?.length === 0 ? (
          <p className="p-12 text-center text-gray-500">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                <tr>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Items</th>
                  <th className="px-5 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data?.orders?.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      {order.user ? (
                        <div>
                          <p className="font-medium">{order.user.name}</p>
                          <p className="text-xs text-gray-500">{order.user.email}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Guest</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-right">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}