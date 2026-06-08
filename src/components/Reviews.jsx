import { useState, useEffect } from 'react';
import Stars from './Stars';
import { useToast } from '../context/ToastContext';

// Some default reviews to show on every product
const defaultReviews = [
  { id: 1, name: 'Sarah M.', rating: 5, comment: 'Absolutely love this! Exceeded my expectations.', date: '2 weeks ago' },
  { id: 2, name: 'James K.', rating: 4, comment: 'Great quality for the price. Would buy again.', date: '1 month ago' },
  { id: 3, name: 'Priya R.', rating: 5, comment: 'Fast shipping and exactly as described.', date: '1 month ago' },
];

export default function Reviews({ productId }) {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');

  // Load reviews for this product from localStorage (or use defaults)
  useEffect(() => {
    const stored = localStorage.getItem(`reviews-${productId}`);
    if (stored) {
      setReviews(JSON.parse(stored));
    } else {
      setReviews(defaultReviews);
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      showToast('Please fill in both name and comment', 'error');
      return;
    }
    const newReview = {
      id: Date.now(),
      name: formName.trim(),
      rating: formRating,
      comment: formComment.trim(),
      date: 'Just now',
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updated));
    showToast('✓ Review posted!');
    setFormName('');
    setFormComment('');
    setFormRating(5);
    setShowForm(false);
  };

  return (
    <section className="mt-12 border-t pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm font-medium text-gray-900 hover:underline"
        >
          {showForm ? 'Cancel' : 'Write a review'}
        </button>
      </div>

      {/* Review form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex gap-1 text-2xl">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setFormRating(n)}
                  className={n <= formRating ? 'text-yellow-400' : 'text-gray-300'}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your review</label>
            <textarea
              value={formComment}
              onChange={(e) => setFormComment(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Share your thoughts..."
            />
          </div>
          <button
            type="submit"
            className="bg-gray-900 text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Post review
          </button>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900">{review.name}</p>
                <Stars rating={review.rating} />
              </div>
              <p className="text-xs text-gray-500">{review.date}</p>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}