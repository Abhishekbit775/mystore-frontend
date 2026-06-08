import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function SuccessPage() {
  const { cart, removeFromCart } = useCart();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderStatus, setOrderStatus] = useState('saving'); // saving | saved | error

  useEffect(() => {
    // Clear the cart
    cart.forEach(item => removeFromCart(item.id));

    // Save the order to the database
    if (sessionId) {
      fetch('http://localhost:4242/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.order) {
            setOrderStatus('saved');
            console.log('Order saved:', data.order);
          } else {
            setOrderStatus('error');
          }
        })
        .catch(err => {
          console.error(err);
          setOrderStatus('error');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-2 max-w-md mx-auto">
        Thank you for your order. (This is a test purchase — no real charge was made.)
      </p>
      {orderStatus === 'saving' && (
        <p className="text-gray-500 text-sm mb-6">Saving your order...</p>
      )}
      {orderStatus === 'saved' && (
        <p className="text-green-600 text-sm mb-6">✓ Order saved to database</p>
      )}
      {orderStatus === 'error' && (
        <p className="text-red-600 text-sm mb-6">Order could not be saved</p>
      )}
      <Link
        to="/"
        className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Continue shopping
      </Link>
    </main>
  );
}