export default function Stars({ rating, size = 'sm', showNumber = false, reviewCount = null }) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  
    const sizeClass = size === 'lg' ? 'text-lg' : size === 'md' ? 'text-base' : 'text-sm';
  
    return (
      <div className={`flex items-center gap-1 ${sizeClass}`}>
        <span className="text-yellow-400">
          {'★'.repeat(fullStars)}
          {hasHalf && '⯨'}
          <span className="text-gray-300">{'★'.repeat(emptyStars)}</span>
        </span>
        {showNumber && (
          <span className="text-gray-600 text-xs ml-1">
            {rating.toFixed(1)}
            {reviewCount !== null && ` (${reviewCount})`}
          </span>
        )}
      </div>
    );
  }