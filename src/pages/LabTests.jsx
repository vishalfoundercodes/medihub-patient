import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LabHero from '../components/lab/LabHero';
import CategoryTabs from '../components/lab/CategoryTabs';
import LabFilters from '../components/lab/LabFilters';
import LabTestGrid from '../components/lab/LabTestGrid';
import LabTrustBar from '../components/lab/LabTrustBar';
import CartBar from '../components/lab/CartBar';
import { labTests } from '../data/labTestsData';

const defaultFilters = {
  categories: ['All Category'],
  maxPrice: 5000,
  discounts: [],
  homeCollection: false,
  sortBy: 'Popularity',
};

export default function LabTests() {
  const [activeTab, setActiveTab] = useState('All Tests');
  const [filters, setFilters] = useState(defaultFilters);
  const [selected, setSelected] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === 'category') {
        if (value === 'All Category') return { ...prev, categories: ['All Category'] };
        const already = prev.categories.includes(value);
        const updated = already
          ? prev.categories.filter((c) => c !== value)
          : [...prev.categories.filter((c) => c !== 'All Category'), value];
        return { ...prev, categories: updated.length ? updated : ['All Category'] };
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
      prev.find((t) => t.id === test.id)
        ? prev.filter((t) => t.id !== test.id)
        : [...prev, test]
    );
  };

  const filtered = useMemo(() => {
    let result = [...labTests];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) =>
        t.name.toLowerCase().includes(q) || t.includes.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      );
    }

    // Tab filter
    if (activeTab !== 'All Tests') {
      result = result.filter((t) => t.category === activeTab);
    }

    // Category filter
    if (!filters.categories.includes('All Category')) {
      result = result.filter((t) => filters.categories.includes(t.category));
    }

    // Price filter
    result = result.filter((t) => t.price <= filters.maxPrice);

    // Discount filter
    if (filters.discounts.length > 0) {
      const minDiscount = Math.min(...filters.discounts.map((d) => parseInt(d)));
      result = result.filter((t) => t.discount >= minDiscount);
    }

    // Home collection
    if (filters.homeCollection) {
      result = result.filter((t) => t.homeCollection);
    }

    // Sort
    if (filters.sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    else if (filters.sortBy === 'Discount') result.sort((a, b) => b.discount - a.discount);

    return result;
  }, [activeTab, filters, searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar activePage="Tests" />
      <LabHero searchQuery={searchQuery} onSearch={setSearchQuery} />
      <CategoryTabs active={activeTab} onChange={setActiveTab} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-5 lg:hidden">
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">
            <span className="text-[var(--color-primary)]">{filtered.length}+</span> Tests & Packages
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
            <LabFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={() => setFilters(defaultFilters)}
            />
          </aside>

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            <LabTestGrid
              tests={filtered}
              total={filtered.length}
              sortBy={filters.sortBy}
              onSortChange={(v) => handleFilterChange('sortBy', v)}
              onAdd={handleAdd}
              selectedIds={selected.map((t) => t.id)}
            />
            <LabTrustBar />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
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
            <LabFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={() => { setFilters(defaultFilters); setMobileFilterOpen(false); }}
            />
          </div>
        </div>
      )}

      {/* Cart bar padding so content isn't hidden behind it */}
      {selected.length > 0 && <div className="h-24" />}

      <Footer />
      <CartBar selected={selected} onClear={() => setSelected([])} />
    </div>
  );
}
