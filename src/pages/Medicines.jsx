import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MedicineHero from '../components/medicines/MedicineHero';
import MedicineCategoryTabs from '../components/medicines/MedicineCategoryTabs';
import MedicineFilters from '../components/medicines/MedicineFilters';
import MedicineGrid from '../components/medicines/MedicineGrid';
import MedicineTrustBar from '../components/medicines/MedicineTrustBar';
import { medicines } from '../data/medicinesData';
import Container from '../components/Container';
import { useCart } from '../context/CartContext';

const defaultFilters = {
  categories: ['All Categories'],
  discounts: [],
  brandSearch: '',
  maxPrice: 5000,
  sortBy: 'Popularity',
};

export default function Medicines() {
  const [activeTab, setActiveTab] = useState('All Categories');
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, cartCount, cartTotal } = useCart();

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === 'category') {
        if (value === 'All Categories') return { ...prev, categories: ['All Categories'] };
        const already = prev.categories.includes(value);
        const updated = already
          ? prev.categories.filter((c) => c !== value)
          : [...prev.categories.filter((c) => c !== 'All Categories'), value];
        return { ...prev, categories: updated.length ? updated : ['All Categories'] };
      }
      if (type === 'discount') {
        const already = prev.discounts.includes(value);
        return { ...prev, discounts: already ? prev.discounts.filter((d) => d !== value) : [...prev.discounts, value] };
      }
      return { ...prev, [type]: value };
    });
  };

  const handleAdd = (medicine) => addToCart(medicine);

  const handleRemove = (id) => removeFromCart(id);

  const filtered = useMemo(() => {
    let result = [...medicines];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.brand.toLowerCase().includes(q)
      );
    }

    // Tab
    if (activeTab !== 'All Categories') {
      result = result.filter((m) => m.category === activeTab);
    }

    // Category filter
    if (!filters.categories.includes('All Categories')) {
      result = result.filter((m) => filters.categories.includes(m.category));
    }

    // Price
    result = result.filter((m) => m.price <= filters.maxPrice);

    // Discount
    if (filters.discounts.length > 0) {
      const min = Math.min(...filters.discounts.map((d) => parseInt(d)));
      result = result.filter((m) => m.discount >= min);
    }

    // Brand search
    if (filters.brandSearch.trim()) {
      const b = filters.brandSearch.toLowerCase();
      result = result.filter((m) => m.brand.toLowerCase().includes(b));
    }

    // Sort
    if (filters.sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    else if (filters.sortBy === 'Discount') result.sort((a, b) => b.discount - a.discount);

    return result;
  }, [searchQuery, activeTab, filters]);

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
      <MedicineCategoryTabs active={activeTab} onChange={setActiveTab} />

      <Container className="py-8">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-5 lg:hidden">
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">
            <span className="text-[var(--color-primary)]">{filtered.length}</span> Results
          </p>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 border border-[var(--color-border)] px-4 py-2 rounded-xl text-sm font-medium text-[var(--color-text-dark)] hover:border-[var(--color-primary)] transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-7">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <MedicineFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={() => setFilters(defaultFilters)}
            />
          </aside>

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            <MedicineGrid
              medicines={filtered}
              total={filtered.length}
              sortBy={filters.sortBy}
              onSortChange={(v) => handleFilterChange('sortBy', v)}
              onAdd={handleAdd}
              onRemove={handleRemove}
              cart={cart}
            />
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
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </button>
            </div>
            <MedicineFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={() => { setFilters(defaultFilters); setMobileFilterOpen(false); }}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
