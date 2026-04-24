import { useState, useEffect } from 'react';
import { SlidersHorizontal, X, ChevronLeft, ChevronRight, Loader2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MedicineHero from '../components/medicines/MedicineHero';
import MedicineCategoryTabs from '../components/medicines/MedicineCategoryTabs';
import MedicineFilters from '../components/medicines/MedicineFilters';
import MedicineTrustBar from '../components/medicines/MedicineTrustBar';
import Container from '../components/Container';
import api, { apis } from '../utlities/api';

const defaultFilters = {
  categoryId: null,
  discounts: [],
  selectedBrands: [],
  brandSearch: '',
  maxPrice: 5000,
  sortBy: 'Popularity',
};

const SORT_MAP = {
  'Price: Low to High': 'price_low',
  'Price: High to Low': 'price_high',
  'Discount': 'discount',
  'Popularity': '',
};

export default function Medicines() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [cart, setCart] = useState({});

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({ total: 0, page: 1, total_pages: 1, has_next: false, has_prev: false });

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(apis.medicineCategory);
        if (res.data.success) setCategories(res.data.data.categories);
      } catch {}
    };
    const fetchBrands = async () => {
      try {
        const res = await api.get(apis.medicinesBrands);
        if (res.data.success) setBrands(res.data.data.brands);
      } catch {}
    };
    fetchCategories();
    fetchBrands();
  }, []);

  // Fetch medicines on filter/tab/search change
  useEffect(() => {
    fetchMedicines(1);
  }, [filters, activeTab, searchQuery]);

  const fetchMedicines = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: 10 };
      if (searchQuery.trim()) params.search = searchQuery;
      if (filters.maxPrice < 5000) params.max_price = filters.maxPrice;
      if (SORT_MAP[filters.sortBy]) params.sort_by = SORT_MAP[filters.sortBy];
      if (filters.brandSearch.trim()) params.brand = filters.brandSearch;
      if (filters.selectedBrands.length > 0) params.brand = filters.selectedBrands.join(',');
      if (filters.discounts.length > 0) params.min_discount = Math.min(...filters.discounts.map((d) => parseInt(d)));

      const activeCategoryId = activeTab !== 'all' ? activeTab : filters.categoryId;
      if (activeCategoryId) params.category_id = activeCategoryId;

      const res = await api.get(apis.medicines, { params });
      if (res.data.success) {
        setMedicines(res.data.data.medicines);
        setPagination(res.data.data.pagination);
      } else {
        setError(res.data.message || 'Failed to load medicines.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (id) => {
    setActiveTab(id);
    setFilters((prev) => ({ ...prev, categoryId: id === 'all' ? null : id }));
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === 'categoryId') {
        setActiveTab(value === null ? 'all' : value);
        return { ...prev, categoryId: value };
      }
      if (type === 'discount') {
        const already = prev.discounts.includes(value);
        return { ...prev, discounts: already ? prev.discounts.filter((d) => d !== value) : [...prev.discounts, value] };
      }
      if (type === 'brand') {
        const already = prev.selectedBrands.includes(value);
        return { ...prev, selectedBrands: already ? prev.selectedBrands.filter((b) => b !== value) : [...prev.selectedBrands, value] };
      }
      return { ...prev, [type]: value };
    });
  };

  const addToCart = (med) => setCart((prev) => ({ ...prev, [med.id]: (prev[med.id] || 0) + 1 }));
  const removeFromCart = (id) => setCart((prev) => {
    const qty = (prev[id] || 0) - 1;
    if (qty <= 0) { const next = { ...prev }; delete next[id]; return next; }
    return { ...prev, [id]: qty };
  });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const med = medicines.find((m) => m.id === Number(id));
    return sum + (med ? Math.round(med.discounted_price) * qty : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <MedicineHero
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={() => navigate('/medicine-cart', { state: { cart } })}
      />
      <MedicineCategoryTabs categories={categories} active={activeTab} onChange={handleTabChange} />

      <Container className="py-8">
        <div className="flex items-center justify-between mb-5 lg:hidden">
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">
            <span className="text-[var(--color-primary)]">{pagination.total}</span> Results
          </p>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 border border-[var(--color-border)] px-4 py-2 rounded-xl text-sm font-medium hover:border-[var(--color-primary)] transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="flex gap-7">
          <aside className="hidden lg:block w-64 shrink-0">
            <MedicineFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={() => { setFilters(defaultFilters); setActiveTab('all'); }}
              categories={categories}
              brands={brands}
            />
          </aside>

          <div className="flex-1 min-w-0">
            {/* Sort header */}
            <div className="flex items-center justify-between mb-5">
              <p className="hidden md:block text-sm font-semibold text-[var(--color-text-dark)]">
                <span className="text-[var(--color-primary)]">{pagination.total}</span> Results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-text-secondary)]">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="border border-[var(--color-border)] rounded-xl pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white cursor-pointer"
                >
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Discount</option>
                </select>
              </div>
            </div>

            {/* Content */}
            {loading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center py-24 text-center">
                <p className="text-red-500 text-sm">{error}</p>
                <button onClick={() => fetchMedicines(1)} className="mt-4 text-sm font-semibold text-[var(--color-primary)] hover:underline">Retry</button>
              </div>
            ) : medicines.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-5xl mb-4">💊</span>
                <h3 className="font-bold text-[var(--color-text-dark)] mb-2">No medicines found</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {medicines.map((med) => {
                  const qty = cart[med.id] || 0;
                  const saved = Math.round(med.price - med.discounted_price);
                  return (
                    <div key={med.id} className="bg-white rounded-2xl border border-[var(--color-border)] hover:border-blue-200 hover:shadow-lg transition-all duration-200 overflow-hidden">
                      <div className="relative bg-[var(--color-bg-section)] overflow-hidden">
                        <img src={med.image_url} alt={med.name} className="w-full h-32 object-cover" />
                        {med.discount_percent > 0 && (
                          <span className="absolute top-3 left-3 bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                            {Math.round(med.discount_percent)}% OFF
                          </span>
                        )}
                        {med.requires_prescription === 1 && (
                          <span className="absolute top-3 right-3 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-lg">Rx</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-[var(--color-text-dark)] text-sm leading-snug mb-0.5">{med.name}</h3>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-3">{med.brand} • {med.category_name}</p>
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <div>
                            <span className="text-xl font-bold text-[var(--color-text-dark)]">₹{Math.round(med.discounted_price)}</span>
                            {saved > 0 && <span className="text-sm text-[var(--color-text-secondary)] line-through ml-1">₹{Math.round(med.price)}</span>}
                          </div>
                          {saved > 0 && <p className="text-xs font-semibold text-[var(--color-success)]">Save ₹{saved}</p>}
                        </div>
                        {qty > 0 ? (
                          <div className="flex items-center justify-between border border-[var(--color-primary)] rounded-xl overflow-hidden mt-3">
                            <button onClick={() => removeFromCart(med.id)} className="flex-1 py-2.5 flex items-center justify-center text-[var(--color-primary)] hover:bg-blue-50 transition-colors">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-[var(--color-text-dark)] px-4">{qty}</span>
                            <button onClick={() => addToCart(med)} className="flex-1 py-2.5 flex items-center justify-center text-[var(--color-primary)] hover:bg-blue-50 transition-colors">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(med)}
                            className="w-full mt-3 flex items-center justify-center gap-2 bg-blue-50 hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white border border-blue-100 hover:border-[var(--color-primary)] py-2.5 rounded-xl text-sm font-semibold transition-all"
                          >
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && pagination.total_pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => fetchMedicines(pagination.page - 1)}
                  disabled={!pagination.has_prev}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => fetchMedicines(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold border transition-all
                      ${p === pagination.page ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => fetchMedicines(pagination.page + 1)}
                  disabled={!pagination.has_next}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <MedicineTrustBar />
          </div>
        </div>
      </Container>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[var(--color-text-dark)]">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)}><X className="w-5 h-5 text-[var(--color-text-secondary)]" /></button>
            </div>
            <MedicineFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={() => { setFilters(defaultFilters); setActiveTab('all'); setMobileFilterOpen(false); }}
              categories={categories}
              brands={brands}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
