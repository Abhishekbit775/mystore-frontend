import { useParams, Link } from 'react-router-dom';
import { products } from '../products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ImageGallery from '../components/ImageGallery';
import Stars from '../components/Stars';
import Reviews from '../components/Reviews';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (!product) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-3">🤷</div>
        <p className="text-gray-700 mb-4">Product not found.</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to home</Link>
      </main>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    showToast(`✓ ${product.name} added to cart`);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <ImageGallery images={product.images} alt={product.name} />

        <div>
          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-3 mt-2">
            <Stars rating={product.rating} size="md" />
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="text-2xl text-gray-900 font-bold mt-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          <button
            onClick={handleAdd}
            className="mt-6 w-full md:w-auto px-8 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition font-medium"
          >
            Add to Cart
          </button>

          <div className="mt-6 pt-6 border-t text-sm text-gray-600 space-y-2">
            <p>✓ Free shipping on all orders</p>
            <p>✓ 30-day return policy</p>
            <p>✓ Secure payment with Stripe</p>
          </div>
        </div>
      </div>

      <Reviews productId={product.id} />
    </main>
  );
}