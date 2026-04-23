import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Calendar, FlaskConical } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Highlight({ text, query }) {
  if (!query.trim()) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <span className="text-[var(--color-primary)] font-bold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </span>
  );
}

export default function SearchResultCard({ item, query }) {
  const navigate = useNavigate();
  const { addToCart, getQty, removeFromCart } = useCart();
  const qty = item.type === 'medicine' ? getQty(item.id) : 0;

  const handleAction = () => {
    if (item.type === 'test') navigate('/lab-tests');
    else if (item.type === 'doctor') navigate(`/book-appointment/${item.id - 200}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] hover:shadow-md hover:border-blue-200 transition-all duration-200 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden bg-[var(--color-bg-section)]">
        <img src={item.image} alt={item.name} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
        {/* Type badge */}
        <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full
          ${item.type === 'test' ? 'bg-blue-100 text-[var(--color-primary)]'
          : item.type === 'medicine' ? 'bg-teal-100 text-teal-700'
          : 'bg-purple-100 text-purple-700'}`}>
          {item.type === 'test' ? '🧪 Lab Test' : item.type === 'medicine' ? '💊 Medicine' : '👨‍⚕️ Doctor'}
        </span>
        {item.discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {item.discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-sm text-[var(--color-text-dark)] mb-0.5 leading-snug">
          <Highlight text={item.name} query={query} />
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          <Highlight text={item.subtitle} query={query} />
        </p>

        {/* Test / Medicine price */}
        {(item.type === 'test' || item.type === 'medicine') && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-[var(--color-text-dark)]">₹{item.price}</span>
            <span className="text-xs text-[var(--color-text-secondary)] line-through">₹{item.original}</span>
          </div>
        )}

        {/* Doctor fee + rating */}
        {item.type === 'doctor' && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-[var(--color-text-dark)]">{item.rating}</span>
            </div>
            <span className="text-lg font-bold text-[var(--color-text-dark)]">₹{item.fee}</span>
          </div>
        )}

        {/* Action button */}
        {item.type === 'medicine' ? (
          qty > 0 ? (
            <div className="flex items-center justify-between border border-[var(--color-primary)] rounded-xl overflow-hidden">
              <button onClick={() => removeFromCart(item.id)} className="flex-1 py-2 text-[var(--color-primary)] hover:bg-blue-50 text-lg font-bold">−</button>
              <span className="font-bold text-[var(--color-text-dark)] px-3">{qty}</span>
              <button onClick={() => addToCart(item)} className="flex-1 py-2 text-[var(--color-primary)] hover:bg-blue-50 text-lg font-bold">+</button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(item)}
              className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white border border-blue-100 hover:border-[var(--color-primary)] py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          )
        ) : item.type === 'test' ? (
          <button
            onClick={handleAction}
            className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white border border-blue-100 hover:border-[var(--color-primary)] py-2.5 rounded-xl text-sm font-semibold transition-all"
          >
            <FlaskConical className="w-4 h-4" /> Book Now
          </button>
        ) : (
          <button
            onClick={handleAction}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-2.5 rounded-xl text-sm font-semibold transition-all"
          >
            <Calendar className="w-4 h-4" /> Book Appointment
          </button>
        )}
      </div>
    </div>
  );
}
