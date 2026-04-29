import { Heart, Home } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export default function LabTestCard({ test, onAdd, isSelected }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { requireAuth } = useAuth();
  const wished = isWishlisted(test.id, 'test');
  const saved = test.original - test.price;

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist({
      id: test.id, name: test.name, category: 'test',
      image: test.image, price: test.price, original: test.original,
      discount: test.discount, includes: test.includes,
    });
  };

  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-lg group
      ${isSelected ? "border-[var(--color-primary)] shadow-md shadow-blue-100" : "border-[var(--color-border)] hover:border-blue-200"}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={test.image}
          alt={test.name}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Discount badge */}
        <span className="absolute top-3 left-3 bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-lg">
          {test.discount}% OFF
        </span>
        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${wished ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[var(--color-text-dark)] mb-1 text-sm leading-snug">
          {test.name}
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          {test.includes}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <div>
            <span className="text-xl font-bold text-[var(--color-text-dark)]">
              ₹{test.price}
            </span>
            <span className="text-sm text-[var(--color-text-secondary)] line-through">
              ₹{test.original}
            </span>
          </div>

          <p className="text-xs font-semibold  text-[var(--color-success)] mb-0">
            You Save ₹{saved}
          </p>
        </div>

        {/* Home collection tag */}
        {test.homeCollection && (
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg w-fit mb-4">
            <Home className="w-3.5 h-3.5" />
            Home Collection
          </div>
        )}

        {/* Book Now */}
        <button
          onClick={() => requireAuth() && onAdd(test)}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all
            ${
              isSelected
                ? "bg-[var(--color-success)] text-white hover:bg-green-600"
                : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
            }`}
        >
          {isSelected ? "✓ Added" : "Book Now"}
        </button>
      </div>
    </div>
  );
}
