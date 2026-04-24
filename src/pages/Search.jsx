import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search, X, Clock, TrendingUp, FlaskConical, Pill,
  Stethoscope, LayoutGrid, ArrowRight, Trash2, Loader2, Star
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import api, { apis } from '../utlities/api';

const TABS = [
  { id: 'all',      label: 'All',       icon: LayoutGrid   },
  { id: 'test',     label: 'Lab Tests', icon: FlaskConical },
  { id: 'medicine', label: 'Medicines', icon: Pill         },
  { id: 'doctor',   label: 'Doctors',   icon: Stethoscope  },
];

const POPULAR_SEARCHES = ['CBC Test', 'Paracetamol', 'Thyroid Test', 'Vitamin D', 'General Physician', 'Diabetes Test'];

const getRecentSearches = () => { try { return JSON.parse(localStorage.getItem('recentSearches') || '[]'); } catch { return []; } };
const saveRecentSearch = (q) => { const prev = getRecentSearches().filter((s) => s !== q); localStorage.setItem('recentSearches', JSON.stringify([q, ...prev].slice(0, 8))); };
const clearRecentSearches = () => localStorage.removeItem('recentSearches');

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState(searchParams.get('type') || 'all');
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());

  const [results, setResults] = useState({ tests: [], medicines: [], doctors: [] });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!searchParams.get('q')) inputRef.current?.focus();
    else fetchResults(searchParams.get('q'));
  }, []);

  useEffect(() => {
    setSearchParams({ q: query, type: activeTab }, { replace: true });
  }, [query, activeTab]);

  const fetchResults = async (q) => {
    if (!q?.trim()) return;
    setLoading(true);
    setHasSearched(true);
    try {
      const [testsRes, medsRes, docsRes] = await Promise.allSettled([
        api.get(apis.labTest, { params: { search: q, limit: 20 } }),
        api.get(apis.medicines, { params: { search: q, limit: 20 } }),
        api.get(apis.doctors, { params: { search: q, limit: 20 } }),
      ]);
      const lq = q.toLowerCase();
      const filterByName = (arr) => (arr || []).filter((i) => i.name?.toLowerCase().includes(lq));
      setResults({
        tests:     filterByName(testsRes.status === 'fulfilled' && testsRes.value.data.success ? testsRes.value.data.data.tests : []),
        medicines: filterByName(medsRes.status === 'fulfilled' && medsRes.value.data.success ? medsRes.value.data.data.medicines : []),
        doctors:   filterByName(docsRes.status === 'fulfilled' && docsRes.value.data.success ? docsRes.value.data.data.doctors : []),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (q) => {
    const val = (q ?? query).trim();
    if (!val) return;
    saveRecentSearch(val);
    setRecentSearches(getRecentSearches());
    setQuery(val);
    fetchResults(val);
    inputRef.current?.blur();
  };

  const handleClear = () => { setQuery(''); setHasSearched(false); setResults({ tests: [], medicines: [], doctors: [] }); inputRef.current?.focus(); };
  const handleClearRecent = () => { clearRecentSearches(); setRecentSearches([]); };

  // Filtered results based on active tab
  const allItems = [
    ...results.tests.map((t) => ({ ...t, _type: 'test' })),
    ...results.medicines.map((m) => ({ ...m, _type: 'medicine' })),
    ...results.doctors.map((d) => ({ ...d, _type: 'doctor' })),
  ];
  const filtered = activeTab === 'all' ? allItems
    : activeTab === 'test' ? results.tests.map((t) => ({ ...t, _type: 'test' }))
    : activeTab === 'medicine' ? results.medicines.map((m) => ({ ...m, _type: 'medicine' }))
    : results.doctors.map((d) => ({ ...d, _type: 'doctor' }));

  const counts = { all: allItems.length, test: results.tests.length, medicine: results.medicines.length, doctor: results.doctors.length };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />

      {/* Sticky search bar */}
      <div className="bg-white border-b border-[var(--color-border)] sticky top-[65px] z-40">
        <Container className="py-4">
          <div className="flex items-center gap-3 bg-[var(--color-bg-section)] border border-[var(--color-border)] rounded-2xl px-4 py-3 focus-within:border-[var(--color-primary)] focus-within:bg-white focus-within:shadow-lg transition-all">
            <Search className="w-5 h-5 text-[var(--color-text-secondary)] shrink-0" />
            <input
              ref={inputRef}
              type="text" value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
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
        </Container>
      </div>

      <Container className="py-6">

        {/* Empty state */}
        {!hasSearched && !loading && (
          <div className="max-w-2xl mx-auto space-y-8">
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
                    <button key={q} onClick={() => { setQuery(q); handleSearch(q); }}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] rounded-full text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all">
                      <Clock className="w-3 h-3" /> {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-bold text-[var(--color-text-dark)] flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" /> Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((q) => (
                  <button key={q} onClick={() => { setQuery(q); handleSearch(q); }}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] rounded-full text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all">
                    <TrendingUp className="w-3 h-3 text-[var(--color-primary)]" /> {q}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[var(--color-text-dark)] mb-3">Browse by Category</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Lab Tests', icon: FlaskConical, color: 'text-[var(--color-primary)]', bg: 'bg-blue-50', to: '/lab-tests' },
                  { label: 'Medicines', icon: Pill, color: 'text-teal-600', bg: 'bg-teal-50', to: '/medicines' },
                  { label: 'Doctors', icon: Stethoscope, color: 'text-purple-600', bg: 'bg-purple-50', to: '/doctors' },
                ].map(({ label, icon: Icon, color, bg, to }) => (
                  <button key={label} onClick={() => navigate(to)}
                    className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md transition-all">
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

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
          </div>
        )}

        {/* Results */}
        {hasSearched && !loading && (
          <div>
            {/* Tabs */}
            <div className="flex items-center gap-2 flex-wrap mb-5">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all
                    ${activeTab === id ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100' : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}>
                  <Icon className="w-4 h-4" />
                  {label}
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center
                    ${activeTab === id ? 'bg-white/20 text-white' : 'bg-gray-100 text-[var(--color-text-secondary)]'}`}>
                    {counts[id]}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] mb-5">
              {filtered.length > 0
                ? <><span className="font-semibold text-[var(--color-text-dark)]">{filtered.length}</span> results for "<span className="font-semibold text-[var(--color-primary)]">{query}</span>"</>
                : <>No results for "<span className="font-semibold text-[var(--color-primary)]">{query}</span>"</>
              }
            </p>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((item) => (
                  <ResultCard key={`${item._type}-${item.id}`} item={item} navigate={navigate} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-16 text-center max-w-lg mx-auto">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="font-bold text-[var(--color-text-dark)] mb-2">No results found</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-5">Try different keywords or browse by category</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {POPULAR_SEARCHES.slice(0, 4).map((q) => (
                    <button key={q} onClick={() => { setQuery(q); handleSearch(q); }}
                      className="px-4 py-2 bg-blue-50 text-[var(--color-primary)] rounded-full text-sm font-medium hover:bg-[var(--color-primary)] hover:text-white transition-all">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}

function ResultCard({ item, navigate }) {
  if (item._type === 'test') {
    return (
      <div onClick={() => navigate(`/lab-test/${item.id}`)} className="bg-white rounded-2xl border border-[var(--color-border)] hover:shadow-md transition-all cursor-pointer overflow-hidden">
        <img src={item.image_url} alt={item.name} className="w-full h-32 object-cover" />
        <div className="p-4">
          <span className="text-[10px] font-bold text-[var(--color-primary)] bg-blue-50 px-2 py-0.5 rounded-full">Lab Test</span>
          <h3 className="font-bold text-sm text-[var(--color-text-dark)] mt-2 mb-1 leading-snug">{item.name}</h3>
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">{item.report_time}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[var(--color-text-dark)]">₹{Math.round(item.discounted_price)}</span>
            <span className="text-xs text-[var(--color-text-secondary)] line-through">₹{Math.round(item.price)}</span>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{Math.round(item.discount_percent)}% OFF</span>
          </div>
        </div>
      </div>
    );
  }

  if (item._type === 'medicine') {
    return (
      <div onClick={() => navigate('/medicines')} className="bg-white rounded-2xl border border-[var(--color-border)] hover:shadow-md transition-all cursor-pointer overflow-hidden">
        <img src={item.image_url} alt={item.name} className="w-full h-32 object-cover" />
        <div className="p-4">
          <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">Medicine</span>
          <h3 className="font-bold text-sm text-[var(--color-text-dark)] mt-2 mb-0.5 leading-snug">{item.name}</h3>
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">{item.brand}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[var(--color-text-dark)]">₹{Math.round(item.discounted_price)}</span>
            {item.discount_percent > 0 && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{Math.round(item.discount_percent)}% OFF</span>}
          </div>
        </div>
      </div>
    );
  }

  if (item._type === 'doctor') {
    return (
      <div onClick={() => navigate(`/book-appointment/${item.id}`)} className="bg-white rounded-2xl border border-[var(--color-border)] hover:shadow-md transition-all cursor-pointer overflow-hidden">
        <img src={item.image_url || item.image} alt={item.name} className="w-full h-32 object-cover object-top" />
        <div className="p-4">
          <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Doctor</span>
          <h3 className="font-bold text-sm text-[var(--color-text-dark)] mt-2 mb-0.5">{item.name}</h3>
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">{item.specialization || item.specialty}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-[var(--color-text-dark)]">{item.rating}</span>
            <span className="text-xs text-[var(--color-text-secondary)] ml-1">₹{item.fee || item.consultation_fee}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
