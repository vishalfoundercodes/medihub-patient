import { useState, useEffect } from 'react';
import { SlidersHorizontal, X, ChevronLeft, ChevronRight, Loader2, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LabHero from '../components/lab/LabHero';
import CategoryTabs from '../components/lab/CategoryTabs';
import LabFilters from '../components/lab/LabFilters';
import LabTrustBar from '../components/lab/LabTrustBar';
import CartBar from '../components/lab/CartBar';
import Container from '../components/Container';
import api, { apis } from '../utlities/api';

const defaultFilters = {
  categoryId: null,
  maxPrice: 5000,
  discounts: [],
  homeCollection: false,
  sortBy: 'Popularity',
};

const SORT_MAP = {
  'Price: Low to High': 'price_low',
  'Price: High to Low': 'price_high',
  'Discount': 'discount',
  'Popularity': '',
};

export default function LabTests() {
  const [filters, setFilters] = useState(defaultFilters);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or category id (number)
  const [selected, setSelected] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [categories, setCategories] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({ total: 0, page: 1, total_pages: 1, has_next: false, has_prev: false });

  // Fetch categories once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(apis.labCategory);
        if (res.data.success) setCategories(res.data.data.categories);
      } catch {}
    };
    fetchCategories();
  }, []);

  // Fetch tests whenever filters, tab or search changes
  useEffect(() => {
    fetchTests(1);
  }, [filters, activeTab, searchQuery]);

  const fetchTests = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: 10 };
      if (searchQuery.trim()) params.search = searchQuery;
      if (filters.homeCollection) params.home_collection = 1;
      if (filters.maxPrice < 5000) params.max_price = filters.maxPrice;
      if (SORT_MAP[filters.sortBy]) params.sort_by = SORT_MAP[filters.sortBy];

      // Tab takes priority over sidebar category filter
      const activeCategoryId = activeTab !== 'all' ? activeTab : filters.categoryId;
      if (activeCategoryId) params.category_id = activeCategoryId;

      if (filters.discounts.length > 0) {
        params.min_discount = Math.min(...filters.discounts.map((d) => parseInt(d)));
      }

      const res = await api.get(apis.labTest, { params });
      if (res.data.success) {
        setTests(res.data.data.tests);
        setPagination(res.data.data.pagination);
      } else {
        setError(res.data.message || 'Failed to load tests.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (id) => {
    setActiveTab(id);
    // Sync sidebar category filter too
    setFilters((prev) => ({ ...prev, categoryId: id === 'all' ? null : id }));
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === 'categoryId') {
        // Sync tab with sidebar
        setActiveTab(value === null ? 'all' : value);
        return { ...prev, categoryId: value };
      }
      if (type === 'discount') {
        const already = prev.discounts.includes(value);
        return { ...prev, discounts: already ? prev.discounts.filter((d) => d !== value) : [...prev.discounts, value] };
      }
      return { ...prev, [type]: value };
    });
  };

  const handleAdd = (test) => {
    setSelected((prev) =>
      prev.find((t) => t.id === test.id) ? prev.filter((t) => t.id !== test.id) : [...prev, test]
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar activePage="Tests" />
      <LabHero searchQuery={searchQuery} onSearch={setSearchQuery} />
      <CategoryTabs categories={categories} active={activeTab} onChange={handleTabChange} />

      <Container className="py-8">
        <div className="flex items-center justify-between mb-5 lg:hidden">
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">
            <span className="text-[var(--color-primary)]">{pagination.total}</span> Tests & Packages
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
            <LabFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={() => { setFilters(defaultFilters); setActiveTab('all'); }}
              categories={categories}
            />
          </aside>

          <div className="flex-1 min-w-0">
            {/* Sort header */}
            <div className="flex items-center justify-between mb-5">
              <p className="hidden md:block text-sm font-semibold text-[var(--color-text-dark)]">
                <span className="text-[var(--color-primary)]">{pagination.total}</span> Tests & Packages
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
                <button onClick={() => fetchTests(1)} className="mt-4 text-sm font-semibold text-[var(--color-primary)] hover:underline">Retry</button>
              </div>
            ) : tests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-5xl mb-4">🔬</span>
                <h3 className="font-bold text-[var(--color-text-dark)] mb-2">No tests found</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
                {tests.map((test) => {
                  const isSelected = !!selected.find((t) => t.id === test.id);
                  return (
                    <div
                      key={test.id}
                      className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-lg
                        ${isSelected ? 'border-[var(--color-primary)] shadow-md shadow-blue-100' : 'border-[var(--color-border)] hover:border-blue-200'}`}
                    >
                      <div className="relative overflow-hidden">
                        <img src={test.image_url} alt={test.name} className="w-full h-32 object-cover" />
                        <span className="absolute top-3 left-3 bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                          {Math.round(test.discount_percent)}% OFF
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-[var(--color-text-dark)] mb-1 text-sm leading-snug">{test.name}</h3>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-2">{test.report_time}</p>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div>
                            <span className="text-xl font-bold text-[var(--color-text-dark)]">₹{Math.round(test.discounted_price)}</span>
                            <span className="text-sm text-[var(--color-text-secondary)] line-through ml-1">₹{Math.round(test.price)}</span>
                          </div>
                          <p className="text-xs font-semibold text-[var(--color-success)]">Save ₹{Math.round(test.price - test.discounted_price)}</p>
                        </div>
                        {test.home_collection === 1 && (
                          <div className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg w-fit mb-3">
                            <Home className="w-3.5 h-3.5" /> Home Collection
                          </div>
                        )}
                        <button
                          onClick={() => handleAdd(test)}
                          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all
                            ${isSelected ? 'bg-[var(--color-success)] text-white hover:bg-green-600' : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]'}`}
                        >
                          {isSelected ? '✓ Added' : 'Book Now'}
                        </button>
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
                  onClick={() => fetchTests(pagination.page - 1)}
                  disabled={!pagination.has_prev}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => fetchTests(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold border transition-all
                      ${p === pagination.page ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => fetchTests(pagination.page + 1)}
                  disabled={!pagination.has_next}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <LabTrustBar />
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
            <LabFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={() => { setFilters(defaultFilters); setActiveTab('all'); setMobileFilterOpen(false); }}
              categories={categories}
            />
          </div>
        </div>
      )}

      <Footer />
      <CartBar selected={selected} onClear={() => setSelected([])} />
    </div>
  );
}
