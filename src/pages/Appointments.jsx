import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import AppointmentSearch from '../components/appointments/AppointmentSearch';
import AppointmentFilters from '../components/appointments/AppointmentFilters';
import AppointmentCard from '../components/appointments/AppointmentCard';
import AppointmentPagination from '../components/appointments/AppointmentPagination';
import AppointmentHelpBar from '../components/appointments/AppointmentHelpBar';
import UpcomingAppointmentCard from '../components/appointments/UpcomingAppointmentCard';
import AppointmentQuickActions from '../components/appointments/AppointmentQuickActions';
import { useAuth } from '../context/AuthContext';
import { APPOINTMENTS } from '../data/appointmentsData';

const PER_PAGE = 5;

export default function Appointments() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) { setShowLogin(true); navigate('/'); }
  }, [user]);

  if (!user) return null;

  // Next upcoming appointment for right sidebar
  const nextUpcoming = APPOINTMENTS.find((a) => a.status === 'Upcoming' && a.hospital);

  const filtered = useMemo(() => {
    let result = [...APPOINTMENTS];
    if (activeTab !== 'all') result = result.filter((a) => a.status === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((a) =>
        a.name.toLowerCase().includes(q) ||
        a.specialty.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, search]);

  const resetPage = (fn) => (...args) => { fn(...args); setPage(1); };
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="lg:hidden mb-4 flex items-center gap-2 border border-[var(--color-border)] px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-dark)] bg-white hover:border-[var(--color-primary)] transition-all"
        >
          ☰ Account Menu
        </button>

        <div className="flex gap-7 items-start">

          {/* Sidebar */}
          <div className={`${mobileSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <AccountSidebar
              active="appointments"
              onChange={(id) => {
                setMobileSidebarOpen(false);
                if (id === 'account') navigate('/account');
                else if (id === 'orders') navigate('/orders');
                else if (id === 'labtests') navigate('/my-lab-tests');
                else if (id === 'appointments') navigate('/appointments');
              }}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="grid xl:grid-cols-3 gap-6">

              {/* Left — appointments list (2/3) */}
              <div className="xl:col-span-2 space-y-5">

                {/* Header + Search */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">My Appointments</h1>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      View and manage all your doctor appointments
                    </p>
                  </div>
                  <AppointmentSearch value={search} onChange={resetPage(setSearch)} />
                </div>

                {/* Filters */}
                <AppointmentFilters active={activeTab} onChange={resetPage(setActiveTab)} />

                {/* Cards */}
                {paginated.length > 0 ? (
                  <div className="space-y-4">
                    {paginated.map((appt) => (
                      <AppointmentCard key={appt.id} appointment={appt} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-[var(--color-border)] p-16 text-center">
                    <p className="text-4xl mb-3">📅</p>
                    <h3 className="font-bold text-[var(--color-text-dark)] mb-1">No appointments found</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Try adjusting your search or filter</p>
                  </div>
                )}

                {/* Pagination */}
                {filtered.length > PER_PAGE && (
                  <AppointmentPagination
                    current={page}
                    total={filtered.length}
                    perPage={PER_PAGE}
                    onChange={setPage}
                  />
                )}

                {/* Help bar */}
                <AppointmentHelpBar />
              </div>

              {/* Right sidebar (1/3) */}
              <div className="space-y-5">
                <UpcomingAppointmentCard appointment={nextUpcoming} />
                <AppointmentQuickActions />
              </div>

            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
