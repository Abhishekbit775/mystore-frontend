export default function Hero() {
    return (
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm mb-4">
              New collection · 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Curated goods.
              <br />
              <span className="text-gray-300">Honest pricing.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Thoughtfully designed everyday essentials. Free shipping on every order.
            </p>
            <a href="#products" className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              Shop the collection →
            </a>
          </div>
        </div>
      </section>
    );
  }