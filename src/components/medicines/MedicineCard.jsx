import { useState } from 'react';
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react';

export default function MedicineCard({ medicine, onAdd, onRemove, qty }) {
  const [wished, setWished] = useState(false);
  const saved = medicine.original - medicine.price;

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] hover:border-blue-200 hover:shadow-lg transition-all duration-200 overflow-hidden group">
      {/* Image */}
      <div className="relative bg-[var(--color-bg-section)] overflow-hidden">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-lg">
          {medicine.discount}% OFF
        </span>
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${wished ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[var(--color-text-dark)] text-sm leading-snug mb-1">
          {medicine.name}
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          {medicine.strip}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <div>
            <span className="text-xl font-bold text-[var(--color-text-dark)]">
              ₹{medicine.price}
            </span>
            <span className="text-sm text-[var(--color-text-secondary)] line-through">
              ₹{medicine.original}
            </span>
          </div>

          <p className="text-xs font-semibold text-[var(--color-success)] mb-0">
            You Save ₹{saved}
          </p>
        </div>

        {/* Add to Cart / Qty control */}
        {qty > 0 ? (
          <div className="flex items-center justify-between border border-[var(--color-primary)] rounded-xl overflow-hidden">
            <button
              onClick={() => onRemove(medicine.id)}
              className="flex-1 py-2.5 flex items-center justify-center text-[var(--color-primary)] hover:bg-blue-50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-[var(--color-text-dark)] px-4">
              {qty}
            </span>
            <button
              onClick={() => onAdd(medicine)}
              className="flex-1 py-2.5 flex items-center justify-center text-[var(--color-primary)] hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(medicine)}
            className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white border border-blue-100 hover:border-[var(--color-primary)] py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
