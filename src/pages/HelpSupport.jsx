import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, PlusCircle, History, Phone, Mail, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import CreateTicketForm from '../components/support/CreateTicketForm';
import TicketHistoryCard from '../components/support/TicketHistoryCard';
import { useAuth } from '../context/AuthContext';
import api, { apis } from '../utlities/api';

const filterOptions = ['All', 'pending', 'resolved', 'rejected'];
const filterLabel = { All: 'All', pending: 'Pending', resolved: 'Resolved', rejected: 'Rejected' };

export default function HelpSupport() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [statusFilter, setStatusFilter] = useState('All');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const fetchTickets = async () => {
    setTicketsLoading(true);
    try {
      const res = await api.get(apis.getSupportTickets);
      if (res.data.success) setTickets(res.data.data.tickets);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
    } finally {
      setTicketsLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleSuccess = (msg) => {
    showToast(msg);
    setActiveTab('history');
    fetchTickets();
  };

  const filteredTickets = statusFilter === 'All'
    ? tickets
    : tickets.filter((t) => t.status === statusFilter);

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-white border border-green-200 shadow-xl rounded-2xl px-5 py-3.5">
          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">{toast}</p>
        </div>
      )}

      <Container className="py-8">
        <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="lg:hidden mb-4 flex items-center gap-2 border border-[var(--color-border)] px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-dark)] bg-white hover:border-[var(--color-primary)] transition-all">
          ☰ Account Menu
        </button>

        <div className="flex gap-7 items-start">
          <div className={`${mobileSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <AccountSidebar active="help" onChange={(id) => {
              setMobileSidebarOpen(false);
              if (id === 'account') navigate('/account');
              else if (id === 'orders') navigate('/orders');
              else if (id === 'labtests') navigate('/my-lab-tests');
              else if (id === 'appointments') navigate('/appointments');
              else if (id === 'notifications') navigate('/notifications');
              else if (id === 'help') navigate('/help-support');
            }} />
          </div>

          <div className="flex-1 min-w-0 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">Help & Support</h1>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">Create a support ticket or check your existing ticket history</p>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-3">
              <button onClick={() => setActiveTab('create')}
                className={`flex items-center gap-2 px-5 py-2.5 cursor-pointer rounded-xl text-sm font-semibold border transition-all
                  ${activeTab === 'create' ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100' : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}>
                <PlusCircle className="w-4 h-4" /> Create Ticket
              </button>
              <button onClick={() => { setActiveTab('history'); fetchTickets(); }}
                className={`flex items-center gap-2 px-5 py-2.5 cursor-pointer rounded-xl text-sm font-semibold border transition-all
                  ${activeTab === 'history' ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100' : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}>
                <History className="w-4 h-4" /> Ticket History
                {tickets.filter((t) => t.status === 'pending').length > 0 && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === 'history' ? 'bg-white text-[var(--color-primary)]' : 'bg-[var(--color-primary)] text-white'}`}>
                    {tickets.filter((t) => t.status === 'pending').length}
                  </span>
                )}
              </button>
            </div>

            {activeTab === 'create' ? (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <CreateTicketForm onSuccess={handleSuccess} />
                </div>
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
                    <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Contact Us</h3>
                    <div className="space-y-3">
                      {[
                        { icon: Phone, bg: 'bg-blue-50', color: 'text-[var(--color-primary)]', label: 'Call Us', value: '1800-123-4567' },
                        { icon: Mail, bg: 'bg-teal-50', color: 'text-teal-600', label: 'Email Us', value: 'support@medihub.com' },
                        { icon: MessageCircle, bg: 'bg-purple-50', color: 'text-purple-600', label: 'Live Chat', value: 'Available 24/7' },
                      ].map(({ icon: Icon, bg, color, label, value }) => (
                        <div key={label} className="flex items-center gap-3">
                          <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                            <Icon className={`w-4 h-4 ${color}`} />
                          </div>
                          <div>
                            <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
                            <p className="text-sm font-bold text-[var(--color-text-dark)]">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                    <h3 className="font-bold text-[var(--color-text-dark)] mb-3">Response Time</h3>
                    <div className="space-y-2">
                      {[{ label: 'Critical Issues', time: '2-4 hours' }, { label: 'General Queries', time: '24 hours' }, { label: 'Refund Requests', time: '3-5 days' }].map(({ label, time }) => (
                        <div key={label} className="flex justify-between text-sm">
                          <span className="text-[var(--color-text-secondary)]">{label}</span>
                          <span className="font-semibold text-[var(--color-primary)]">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Filter bar */}
                <div className="flex items-center gap-2 flex-wrap">
                  {filterOptions.map((opt) => (
                    <button key={opt} onClick={() => setStatusFilter(opt)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border cursor-pointer transition-all
                        ${statusFilter === opt ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}>
                      {filterLabel[opt]}
                      <span className="ml-1.5 text-xs">
                        ({opt === 'All' ? tickets.length : tickets.filter((t) => t.status === opt).length})
                      </span>
                    </button>
                  ))}
                </div>

                {ticketsLoading ? (
                  <div className="flex justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
                  </div>
                ) : filteredTickets.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-5">
                    {filteredTickets.map((ticket) => (
                      <TicketHistoryCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-[var(--color-border)] p-16 text-center">
                    <p className="text-4xl mb-3">🎫</p>
                    <h3 className="font-bold text-[var(--color-text-dark)] mb-1">No tickets found</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                      {statusFilter === 'All' ? "You haven't created any support tickets yet." : `No ${filterLabel[statusFilter]} tickets found.`}
                    </p>
                    <button onClick={() => setActiveTab('create')}
                      className="bg-[var(--color-primary)] text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-[var(--color-primary-dark)] transition-all">
                      Create Your First Ticket
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
