import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, FlaskConical, Pill, Stethoscope, LayoutGrid,
  Star, ShoppingCart, Calendar, CheckCircle, Plus, Minus, Loader2, Trash2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import { useCart } from '../context/CartContext';
import api, { apis } from '../utlities/api';

const TABS = [
  { id: 'all',      label: 'All',       icon: LayoutGrid  },
  { id: 'test',     label: 'Tests',     icon: FlaskConical },
  { id: 'medicine', label: 'Medicines', icon: Pill         },
  { id: 'doctor',   label: 'Doctors',   icon: Stethoscope  },
];

const categoryConfig = {
  test:     { bg: 'bg-blue-50',   color: 'text-[var(--color-primary)]', icon: FlaskConical, label: 'Lab Test'  },
  medicine: { bg: 'bg-teal-50',   color: 'text-teal-600',               icon: Pill,         label: 'Medicine'  },
  doctor:   { bg: 'bg-purple-50', color: 'text-purple-600',             icon: Stethoscope,  label: 'Doctor'    },
};

function WishlistCard({ item, onRemove, removing, cart, onAddToCart, onRemoveFromCart }) {
  const navigate = useNavigate();
  const cfg = categoryConfig[item.type] || categoryConfig.test;
  const Icon = cfg.icon;
  const medQty = item.type === 'medicine' ? (cart.medicines[item.item_id] || 0) : 0;
  const testAdded = item.type === 'test' ? !!cart.tests.find((t) => t.id === item.item_id) : false;

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="relative overflow-hidden bg-[var(--color-bg-section)]">
        <img src={item.image_url} alt={item.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
        <span className={`absolute top-3 left-3 flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${cfg.bg} ${cfg.color}`}>
          <Icon className="w-3 h-3" /> {cfg.label}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          disabled={removing === item.id}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-all"
        >
          {removing === item.id
            ? <Loader2 className="w-4 h-4 animate-spin text-red-400" />
            : <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          }
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-[var(--color-text-dark)] mb-1 leading-snug">{item.name}</h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-[var(--color-text-dark)]">₹{Math.round(item.price)}</span>
          {item.discount_percent > 0 && (
            <span className="text-xs font-bold text-[var(--color-success)] bg-green-50 px-2 py-0.5 rounded-full">
              {Math.round(item.discount_percent)}% OFF
            </span>
          )}
        </div>

        {item.type === 'doctor' && (
          <button
            onClick={() => navigate(`/book-appointment/${item.item_id}`)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white transition-all"
          >
            <Calendar className="w-4 h-4" /> Book Appointment
          </button>
        )}

        {item.type === 'test' && (
          testAdded ? (
            <button
              onClick={() => onRemoveFromCart('test', item)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-[var(--color-success)] hover:bg-green-600 text-white transition-all"
            >
              <CheckCircle className="w-4 h-4" /> Added
            </button>
          ) : (
            <button
              onClick={() => onAddToCart('test', item)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-blue-50 hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white border border-blue-100 hover:border-[var(--color-primary)] transition-all"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          )
        )}

        {item.type === 'medicine' && (
          medQty > 0 ? (
            <div className="flex items-center justify-between border border-[var(--color-primary)] rounded-xl overflow-hidden">
              <button onClick={() => onRemoveFromCart('medicine', item)} className="flex-1 py-2.5 flex items-center justify-center text-[var(--color-primary)] hover:bg-blue-50">
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-[var(--color-text-dark)] px-4">{medQty}</span>
              <button onClick={() => onAddToCart('medicine', item)} className="flex-1 py-2.5 flex items-center justify-center text-[var(--color-primary)] hover:bg-blue-50">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart('medicine', item)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-blue-50 hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white border border-blue-100 hover:border-[var(--color-primary)] transition-all"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default function Wishlist() {
  const { cart, addToCart, removeFromCart, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removing, setRemoving] = useState(null);
  const [testCart, setTestCart] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(apis.wishlist);
        if (res.data.success) setItems(res.data.data.wishlist);
        else setError(res.data.message || 'Failed to load wishlist.');
      } catch (err) {
        setError(err.response?.data?.message || 'Network error.');
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (wishlistId) => {
    setRemoving(wishlistId);
    try {
      await api.delete(`${apis.wishlist}/${wishlistId}`);
      setItems((prev) => prev.filter((i) => i.id !== wishlistId));
    } catch (err) {
      // silently fail — item stays in list
    } finally {
      setRemoving(null);
    }
  };

  const handleAddToCart = (type, item) => {
    if (type === 'test') setTestCart((p) => p.find((t) => t.id === item.item_id) ? p : [...p, { ...item, id: item.item_id }]);
    else addToCart({ ...item, id: item.item_id });
  };

  const handleRemoveFromCart = (type, item) => {
    if (type === 'test') setTestCart((p) => p.filter((t) => t.id !== item.item_id));
    else removeFromCart(item.item_id);
  };

  const cartTestCount = testCart.length;
  const cartMedCount = cartCount;
  const totalCartItems = cartTestCount + cartMedCount;

  const handleProceed = () => {
    if (cartTestCount > 0 && cartMedCount === 0) navigate('/lab-checkout', { state: { selected: testCart } });
    else if (cartMedCount > 0 && cartTestCount === 0) navigate('/medicine-cart', { state: { cart } });
    else navigate('/medicines');
  };

  const filtered = activeTab === 'all' ? items : items.filter((i) => i.type === activeTab);
  const counts = {
    all:      items.length,
    test:     items.filter((i) => i.type === 'test').length,
    medicine: items.filter((i) => i.type === 'medicine').length,
    doctor:   items.filter((i) => i.type === 'doctor').length,
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">

        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-dark)] flex items-center gap-2">
              <Heart className="w-6 h-6 fill-red-500 text-red-500" /> My Wishlist
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">{items.length} saved item{items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all
                ${activeTab === id
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100'
                  : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center
                ${activeTab === id ? 'bg-white/20 text-white' : 'bg-gray-100 text-[var(--color-text-secondary)]'}`}>
                {counts[id]}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={handleRemove}
                removing={removing}
                cart={{ tests: testCart, medicines: cart }}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-20 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-300" />
            </div>
            <h3 className="font-bold text-[var(--color-text-dark)] mb-2">
              {activeTab === 'all' ? 'Your wishlist is empty' : `No ${activeTab}s in wishlist`}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-5">Save your favourite tests, medicines and doctors here</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={() => navigate('/lab-tests')} className="flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-[var(--color-primary-dark)] transition-all">
                <FlaskConical className="w-4 h-4" /> Browse Tests
              </button>
              <button onClick={() => navigate('/doctors')} className="flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text-dark)] font-semibold px-5 py-2.5 rounded-xl text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all">
                <Stethoscope className="w-4 h-4" /> Browse Doctors
              </button>
            </div>
          </div>
        )}

        {totalCartItems > 0 && <div className="h-24" />}
      </Container>

      {/* Sticky cart bar */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--color-border)] shadow-2xl">
          <Container className="py-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[var(--color-primary)] text-white text-xs font-bold rounded-full flex items-center justify-center">{totalCartItems}</span>
              </div>
              <div>
                <p className="font-bold text-sm text-[var(--color-text-dark)]">
                  {cartTestCount > 0 && `${cartTestCount} Test${cartTestCount > 1 ? 's' : ''}`}
                  {cartTestCount > 0 && cartMedCount > 0 && ' + '}
                  {cartMedCount > 0 && `${cartMedCount} Medicine${cartMedCount > 1 ? 's' : ''}`}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">{cartMedCount > 0 ? `₹${cartTotal.toLocaleString()} total` : 'Added from wishlist'}</p>
              </div>
            </div>
            <button
              onClick={handleProceed}
              className="w-full sm:w-auto bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200"
            >
              Proceed to Checkout <CheckCircle className="w-5 h-5" />
            </button>
          </Container>
        </div>
      )}

      <Footer />
    </div>
  );
}
