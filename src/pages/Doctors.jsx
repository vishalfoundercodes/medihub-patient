import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DoctorHero from '../components/doctors/DoctorHero';
import SpecializationTabs from '../components/doctors/SpecializationTabs';
import DoctorFilters from '../components/doctors/DoctorFilters';
import DoctorGrid from '../components/doctors/DoctorGrid';
import DoctorTrustBar from '../components/doctors/DoctorTrustBar';
import { doctors } from '../data/doctorsData';
import Container from '../components/Container';

const defaultFilters = {
  consultationTypes: ['All'],
  specializations: ['All Specializations'],
  experience: [],
  maxFee: 2000,
  availableToday: false,
  sortBy: 'Popularity',
};

export default function Doctors() {
  const [activeTab, setActiveTab] = useState('All Specializations');
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === 'consultationType') {
        if (value === 'All') return { ...prev, consultationTypes: ['All'] };
        const already = prev.consultationTypes.includes(value);
        const updated = already
          ? prev.consultationTypes.filter((c) => c !== value)
          : [...prev.consultationTypes.filter((c) => c !== 'All'), value];
        return { ...prev, consultationTypes: updated.length ? updated : ['All'] };
      }
      if (type === 'specialization') {
        if (value === 'All Specializations') return { ...prev, specializations: ['All Specializations'] };
        const already = prev.specializations.includes(value);
        const updated = already
          ? prev.specializations.filter((s) => s !== value)
          : [...prev.specializations.filter((s) => s !== 'All Specializations'), value];
        return { ...prev, specializations: updated.length ? updated : ['All Specializations'] };
      }
      if (type === 'experience') {
        const already = prev.experience.includes(value);
        return { ...prev, experience: already ? prev.experience.filter((e) => e !== value) : [...prev.experience, value] };
      }
      return { ...prev, [type]: value };
    });
  };

  const filtered = useMemo(() => {
    let result = [...doctors];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q)
      );
    }

    // Tab
    if (activeTab !== 'All Specializations') {
      result = result.filter((d) => d.specialty === activeTab);
    }

    // Specialization filter
    if (!filters.specializations.includes('All Specializations')) {
      result = result.filter((d) => filters.specializations.includes(d.specialty));
    }

    // Consultation type
    if (!filters.consultationTypes.includes('All')) {
      result = result.filter((d) => filters.consultationTypes.includes(d.consultationType));
    }

    // Experience
    if (filters.experience.length > 0) {
      result = result.filter((d) => {
        return filters.experience.some((range) => {
          if (range === '0-5 Years') return d.experience <= 5;
          if (range === '5-10 Years') return d.experience > 5 && d.experience <= 10;
          if (range === '10-20 Years') return d.experience > 10 && d.experience <= 20;
          if (range === '20+ Years') return d.experience > 20;
          return false;
        });
      });
    }

    // Fee
    result = result.filter((d) => d.fee <= filters.maxFee);

    // Availability
    if (filters.availableToday) {
      result = result.filter((d) => d.availableToday);
    }

    // Sort
    if (filters.sortBy === 'Fee: Low to High') result.sort((a, b) => a.fee - b.fee);
    else if (filters.sortBy === 'Fee: High to Low') result.sort((a, b) => b.fee - a.fee);
    else if (filters.sortBy === 'Experience') result.sort((a, b) => b.experience - a.experience);
    else if (filters.sortBy === 'Rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchQuery, activeTab, filters]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <DoctorHero searchQuery={searchQuery} onSearch={setSearchQuery} />
      <SpecializationTabs active={activeTab} onChange={setActiveTab} />

      <Container className="py-8">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-5 lg:hidden">
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">
            <span className="text-[var(--color-primary)]">{filtered.length}+</span> Doctors Available
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
            <DoctorFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={() => setFilters(defaultFilters)}
            />
          </aside>

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            <DoctorGrid
              doctors={filtered}
              total={filtered.length}
              sortBy={filters.sortBy}
              onSortChange={(v) => handleFilterChange('sortBy', v)}
            />
            <DoctorTrustBar />
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
            <DoctorFilters
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
