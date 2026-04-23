import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search, X, Clock, TrendingUp, FlaskConical, Pill,
  Stethoscope, LayoutGrid, ArrowRight, Trash2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import SearchResultCard from '../components/SearchResultCard';
import {
  SEARCH_DATA, POPULAR_SEARCHES,
  getRecentSearches, saveRecentSearch, clearRecentSearches
} from '../data/searchData';

const TABS = [
  { id: 'all',      label: 'All',       icon: LayoutGrid,   count: null },
  { id: 'test',     label: 'Lab Tests', icon: FlaskConical, count: null },
  { id: 'medicine', label: 'Medicines', icon: Pill,         count: null },
  { id: 'doctor',   label: 'Doctors',   icon: Stethoscope,  count: null },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState(searchParams.get('type') || 'all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());
  const [hasSearched, setHasSearched] = useState(!!searchParams.get('q'));

  // Focus input on mount
  useEffect(() => {
    if (!searchParams.get('q')) inputRef.current?.focus();
  }, []);

  // Sync URL params
  useEffect(() => {
    setSearchParams({ q: query, type: activeTab }, { replace: true });
  }, [query, activeTab]);

  // Suggestions — top 5 matches while typing
  const suggestions = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    return SEARCH_DATA
      .filter((item) => item.name.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  // Main filtered results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SEARCH_DATA.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
      const matchesTab = activeTab === 'all' || item.type === activeTab;
      return matchesQuery && matchesTab;
    });
  }, [query, activeTab]);

  const counts = useMemo(() => ({
    all:      SEARCH_DATA.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()) || i.subtitle.toLowerCase().includes(query.toLowerCase())).length,
    test:     SEARCH_DATA.filter((i) => i.type === 'test' && (i.name.toLowerCase().includes(query.toLowerCase()) || i.subtitle.toLowerCase().includes(query.toLowerCase()))).length,
    medicine: SEARCH_DATA.filter((i) => i.type === 'medicine' && (i.name.toLowerCase().includes(query.toLowerCase()) || i.subtitle.toLowerCase().includes(query.toLowerCase()))).length,
    doctor:   SEARCH_DATA.filter((i) => i.type === 'doctor' && (i.name.toLowerCase().includes(query.toLowerCase()) || i.subtitle.toLowerCase().includes(query.toLowerCase()))).length,
  }), [query]);

  const handleSearch = (q) => {
    const val = q ?? query;
    if (!val.trim()) return;
    saveRecentSearch(val.trim());
    setRecentSearches(getRecentSearches());
    setQuery(val.trim());
    setHasSearched(true);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setHasSearched(false);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const typeIcon = { test: '🧪', medicine: '💊', doctor: '👨⚕️' };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />

      {/* Sticky search bar */}
      <div className="bg-white border-b border-[var(--color-border)] sticky top-[65px] z-40">
        <Container className="py-4">
          <div className="relative">
            <div className="flex items-center gap-3 bg-[var(--color-bg-section)] border border-[var(--color-border)] rounded-2xl px-4 py-3 focus-within:border-[var(--color-primary)] focus-within:bg-white focus-within:shadow-lg transition-all">
              <Search className="w-5 h-5 text-[var(--color-text-secondary)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); setHasSearched(false); }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); if (e.key === 'Escape') setShowSuggestions(false); }}
                placeholder="Search for tests, medicines, doctors..."
                className="flex-1 bg-transparent text-sm text-[var(--color-text-dark)] placeholder:text-[var(--color-text-secondary)] focus:outline-none"
                autoComplete="off"
              />
              {query && (
                <button onClick={handleClear} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-dark)] shrink-0">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => handleSearch()}
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all shrink-0"
              >
                Search
              </button>
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && query.length >= 2 && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[var(--color-border)] shadow-xl z-50 overflow-hidden">
                {suggestions.map((item) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSearch(item.name)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-bg-section)] transition-colors text-left"
                  >
                    <img src={item.image} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-text-dark)] truncate">{item.name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)] truncate">{item.subtitle}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0
                      ${item.type === 'test' ? 'bg-blue-100 text-[var(--color-primary)]'
                      : item.type === 'medicine' ? 'bg-teal-100 text-teal-700'
                      : 'bg-purple-100 text-purple-700'}`}>
                      {typeIcon[item.type]}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div className="fixed inset-0 z-30" onClick={() => setShowSuggestions(false)} />
      )}

      <Container className="py-6">

        {/* ── Empty state: Recent + Popular ── */}
        {!hasSearched && !query && (
          <div className="max-w-2xl mx-auto space-y-8">

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[var(--color-text-dark)] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--color-text-secondary)]" /> Recent Searches
                  </h3>
                  <button onClick={handleClearRecent} className="flex items-center gap-1 text-xs text-red-500 hover:underline">
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((q) => (
                    <button
                      key={q}
                      onClick={() => { setQuery(q); handleSearch(q); }}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] rounded-full text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
                    >
                      <Clock className="w-3 h-3" /> {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <h3 className="font-bold text-[var(--color-text-dark)] flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" /> Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setQuery(q); handleSearch(q); }}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] rounded-full text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
                  >
                    <TrendingUp className="w-3 h-3 text-[var(--color-primary)]" /> {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Browse categories */}
            <div>
              <h3 className="font-bold text-[var(--color-text-dark)] mb-3">Browse by Category</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Lab Tests', icon: FlaskConical, color: 'text-[var(--color-primary)]', bg: 'bg-blue-50', to: '/lab-tests' },
                  { label: 'Medicines', icon: Pill, color: 'text-teal-600', bg: 'bg-teal-50', to: '/medicines' },
                  { label: 'Doctors', icon: Stethoscope, color: 'text-purple-600', bg: 'bg-purple-50', to: '/doctors' },
                ].map(({ label, icon: Icon, color, bg, to }) => (
                  <button
                    key={label}
                    onClick={() => navigate(to)}
                    className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md transition-all"
                  >
                    <div className={`${bg} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                    <span className="text-sm font-semibold text-[var(--color-text-dark)]">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {(hasSearched || query) && (
          <div>
            {/* Filter tabs */}
            <div className="flex items-center gap-2 flex-wrap mb-5">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all
                    ${activeTab === id
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100'
                      : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {query && (
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center
                      ${activeTab === id ? 'bg-white/20 text-white' : 'bg-gray-100 text-[var(--color-text-secondary)]'}`}>
                      {counts[id]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Results count */}
            {query && (
              <p className="text-sm text-[var(--color-text-secondary)] mb-5">
                {results.length > 0
                  ? <><span className="font-semibold text-[var(--color-text-dark)]">{results.length}</span> results for "<span className="font-semibold text-[var(--color-primary)]">{query}</span>"</>
                  : <>No results for "<span className="font-semibold text-[var(--color-primary)]">{query}</span>"</>
                }
              </p>
            )}

            {/* Results grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {results.map((item) => (
                  <SearchResultCard key={`${item.type}-${item.id}`} item={item} query={query} />
                ))}
              </div>
            ) : query ? (
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-16 text-center max-w-lg mx-auto">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="font-bold text-[var(--color-text-dark)] mb-2">No results found</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-5">
                  Try different keywords or browse by category
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {POPULAR_SEARCHES.slice(0, 4).map((q) => (
                    <button
                      key={q}
                      onClick={() => { setQuery(q); handleSearch(q); }}
                      className="px-4 py-2 bg-blue-50 text-[var(--color-primary)] rounded-full text-sm font-medium hover:bg-[var(--color-primary)] hover:text-white transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}
