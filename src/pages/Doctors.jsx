import { useState, useEffect } from 'react';
import { SlidersHorizontal, X, ChevronLeft, ChevronRight, Loader2, Star, Video, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DoctorHero from '../components/doctors/DoctorHero';
import SpecializationTabs from '../components/doctors/SpecializationTabs';
import DoctorFilters from '../components/doctors/DoctorFilters';
import DoctorTrustBar from '../components/doctors/DoctorTrustBar';
import Container from '../components/Container';
import api, { apis } from '../utlities/api';

const defaultFilters = {
  consultancyType: 'all',
  specialization: '',
  experience: '',
  maxFee: 2000,
  availableToday: false,
  sortBy: 'Popularity',
};

const SORT_MAP = {
  'Rating': 'rating',
  'Fee: Low to High': 'fee_low',
  'Fee: High to Low': 'fee_high',
  'Experience': 'experience',
  'Popularity': '',
};

export default function Doctors() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({ total: 0, page: 1, total_pages: 1, has_next: false, has_prev: false });

  // Fetch specializations once
  useEffect(() => {
    const fetchSpecs = async () => {
      try {
        const res = await api.get(apis.doctorSpecializations);
        if (res.data.success) setSpecializations(res.data.data.specializations || []);
      } catch {}
    };
    fetchSpecs();
  }, []);

  useEffect(() => { fetchDoctors(1); }, [filters, activeTab, searchQuery]);

  const fetchDoctors = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: 10 };
      if (searchQuery.trim()) params.search = searchQuery;
      if (filters.maxFee < 2000) params.max_fee = filters.maxFee;
      if (SORT_MAP[filters.sortBy]) params.sort_by = SORT_MAP[filters.sortBy];
      if (filters.availableToday) params.available_today = 1;
      if (filters.experience) params.experience = filters.experience;
      if (filters.consultancyType !== 'all') params.consultancy_type = filters.consultancyType;

      const activeSpec = activeTab !== 'all' ? activeTab : filters.specialization;
      if (activeSpec) params.specialization = activeSpec;

      const res = await api.get(apis.doctors, { params });
      if (res.data.success) {
        setDoctors(res.data.data.doctors);
        setPagination(res.data.data.pagination);
      } else {
        setError(res.data.message || 'Failed to load doctors.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (val) => {
    setActiveTab(val);
    setFilters((prev) => ({ ...prev, specialization: val === 'all' ? '' : val }));
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === 'specialization') {
        setActiveTab(value === '' ? 'all' : value);
        return { ...prev, specialization: value };
      }
      return { ...prev, [type]: value };
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <DoctorHero searchQuery={searchQuery} onSearch={setSearchQuery} />
      <SpecializationTabs
        specializations={specializations}
        active={activeTab}
        onChange={handleTabChange}
      />

      <Container className="py-8">
        <div className="flex items-center justify-between mb-5 lg:hidden">
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">
            <span className="text-[var(--color-primary)]">
              {pagination.total}
            </span>{" "}
            Doctors Available
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
            <DoctorFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={() => {
                setFilters(defaultFilters);
                setActiveTab("all");
              }}
              specializations={specializations}
            />
          </aside>

          <div className="flex-1 min-w-0">
            {/* Sort header */}
            <div className="flex items-center justify-between mb-5">
              <p className="hidden md:block text-sm font-semibold text-[var(--color-text-dark)]">
                <span className="text-[var(--color-primary)]">
                  {pagination.total}
                </span>{" "}
                Doctors Available
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-text-secondary)]">
                  Sort by:
                </span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="border border-[var(--color-border)] rounded-xl pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white cursor-pointer"
                >
                  <option>Popularity</option>
                  <option>Fee: Low to High</option>
                  <option>Fee: High to Low</option>
                  <option>Experience</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center py-24 text-center">
                <p className="text-red-500 text-sm">{error}</p>
                <button
                  onClick={() => fetchDoctors(1)}
                  className="mt-4 text-sm font-semibold text-[var(--color-primary)] hover:underline"
                >
                  Retry
                </button>
              </div>
            ) : doctors.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-5xl mb-4">👨‍⚕️</span>
                <h3 className="font-bold text-[var(--color-text-dark)] mb-2">
                  No doctors found
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-2xl border border-[var(--color-border)] hover:border-blue-200 hover:shadow-lg transition-all duration-200 overflow-hidden group"
                  >
                    <div className="relative bg-gradient-to-b from-blue-50 to-slate-100 overflow-hidden">
                      <img
                        src={doctor.profile_img || doctor.image}
                        alt={doctor.name}
                        className="w-full h-40 object-fill object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="px-4 py-2">
                      <h3 className="font-bold text-[var(--color-text-dark)] mb-0.5">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                        {doctor.specialization || doctor.specialty}
                      </p>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-[var(--color-text-dark)]">
                            {doctor.rating}
                          </span>
                          <span className="text-xs text-[var(--color-text-secondary)]">
                            ({doctor.total_reviews || doctor.reviews}+)
                          </span>
                        </div>
                        <span className="text-[var(--color-text-secondary)] text-xs">
                          •
                        </span>
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          {doctor.experience} Yrs Exp
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className="text-xl font-bold text-[var(--color-text-dark)]">
                          ₹{doctor.fee || doctor.consultation_fee}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          {doctor.consultancy_type === "online" ||
                          doctor.consultationType === "Video Consultation" ? (
                            <Video className="w-3 h-3 text-[var(--color-primary)]" />
                          ) : (
                            <Building2 className="w-3 h-3 text-[var(--color-text-secondary)]" />
                          )}
                          <span className="text-xs text-[var(--color-text-secondary)] capitalize">
                            {doctor.consultancy_type || doctor.consultationType}
                          </span>
                        </div>
                      </div>
                      {(doctor.available_today || doctor.availableToday) && (
                        <div className="inline-flex items-center gap-1.5 bg-green-50 text-[var(--color-success)] text-xs font-semibold px-3 py-1.5 rounded-lg border border-green-100 mb-3">
                          <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full" />{" "}
                          Available Today
                        </div>
                      )}
                      <button
                        onClick={() =>
                          navigate(`/book-appointment/${doctor.id}`)
                        }
                        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-2.5 rounded-xl text-sm font-semibold transition-all"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && pagination.total_pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => fetchDoctors(pagination.page - 1)}
                  disabled={!pagination.has_prev}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from(
                  { length: pagination.total_pages },
                  (_, i) => i + 1,
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => fetchDoctors(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold border transition-all
                      ${p === pagination.page ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]"}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => fetchDoctors(pagination.page + 1)}
                  disabled={!pagination.has_next}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <DoctorTrustBar />
          </div>
        </div>
      </Container>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[var(--color-text-dark)]">
                Filters
              </h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </button>
            </div>
            <DoctorFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={() => {
                setFilters(defaultFilters);
                setActiveTab("all");
                setMobileFilterOpen(false);
              }}
              specializations={specializations}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
