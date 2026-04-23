import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2, PlusCircle, History, Phone, Mail, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import CreateTicketForm from '../components/support/CreateTicketForm';
import TicketHistoryCard from '../components/support/TicketHistoryCard';
import SupportStats from '../components/support/SupportStats';
import { useAuth } from '../context/AuthContext';
import { MOCK_TICKETS } from '../data/supportData';

export default function HelpSupport() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [activeTab, setActiveTab] = useState('create');
  const [successMsg, setSuccessMsg] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) { setShowLogin(true); navigate('/'); }
  }, [user]);

  if (!user) return null;

  const handleCreateTicket = (form) => {
    const newTicket = {
      id: `TKT-00${tickets.length + 1}`,
      name: form.name,
      issue: form.issue,
      description: form.description,
      status: 'Open',
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      updatedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      image: form.image ? URL.createObjectURL(form.image) : null,
      response: null,
    };
    setTickets((prev) => [newTicket, ...prev]);
    setSuccessMsg(`Ticket #${newTicket.id} created successfully! Our team will respond within 24 hours.`);
    setActiveTab('history');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const filterOptions = ['All', 'Open', 'In Progress', 'Resolved'];
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTickets = statusFilter === 'All'
    ? tickets
    : tickets.filter((t) => t.status === statusFilter);

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
          <div
            className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-64 shrink-0`}
          >
            <AccountSidebar
              active="help"
              onChange={(id) => {
                setMobileSidebarOpen(false);
                if (id === "account") navigate("/account");
                else if (id === "orders") navigate("/orders");
                else if (id === "labtests") navigate("/my-lab-tests");
                else if (id === "appointments") navigate("/appointments");
                else if (id === "notifications") navigate("/notifications");
                else if (id === "help") navigate("/help-support");
              }}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">
                Help & Support
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Create a support ticket or check your existing ticket history
              </p>
            </div>

            {/* Success message */}
            {successMsg && (
              <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
                <CheckCircle className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-[var(--color-success)]">
                  {successMsg}
                </p>
              </div>
            )}

            {/* Stats */}
            <SupportStats tickets={tickets} />

            {/* Tab switcher */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab("create")}
                className={`flex items-center gap-2 px-1 md:px-5 py-1.5 md:py-2.5 cursor-pointer rounded-xl text-sm font-semibold border transition-all
                  ${
                    activeTab === "create"
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100"
                      : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  }`}
              >
                <PlusCircle className="w-4 h-4" /> Create Ticket
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-2 px-5 py-2.5 cursor-pointer rounded-xl text-sm  font-semibold border transition-all
                  ${
                    activeTab === "history"
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100"
                      : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  }`}
              >
                <History className="w-4 h-4" /> Ticket History
                {tickets.filter((t) => t.status !== "Resolved").length > 0 && (
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === "history" ? "bg-white text-[var(--color-primary)]" : "bg-[var(--color-primary)] text-white"}`}
                  >
                    {tickets.filter((t) => t.status !== "Resolved").length}
                  </span>
                )}
              </button>
            </div>

            {/* Tab content */}
            {activeTab === "create" ? (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Form */}
                <div className="lg:col-span-2">
                  <CreateTicketForm onSubmit={handleCreateTicket} />
                </div>

                {/* Right info panel */}
                <div className="space-y-5">
                  {/* Contact info */}
                  <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
                    <h3 className="font-bold text-[var(--color-text-dark)] mb-4">
                      Contact Us
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4 text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <p className="text-xs text-[var(--color-text-secondary)]">
                            Call Us
                          </p>
                          <p className="text-sm font-bold text-[var(--color-text-dark)]">
                            1800-123-4567
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-xs text-[var(--color-text-secondary)]">
                            Email Us
                          </p>
                          <p className="text-sm font-bold text-[var(--color-text-dark)]">
                            support@medihub.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                          <MessageCircle className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-[var(--color-text-secondary)]">
                            Live Chat
                          </p>
                          <p className="text-sm font-bold text-[var(--color-text-dark)]">
                            Available 24/7
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Response time */}
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                    <h3 className="font-bold text-[var(--color-text-dark)] mb-3">
                      Response Time
                    </h3>
                    <div className="space-y-2">
                      {[
                        { label: "Critical Issues", time: "2-4 hours" },
                        { label: "General Queries", time: "24 hours" },
                        { label: "Refund Requests", time: "3-5 days" },
                      ].map(({ label, time }) => (
                        <div
                          key={label}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-[var(--color-text-secondary)]">
                            {label}
                          </span>
                          <span className="font-semibold text-[var(--color-primary)]">
                            {time}
                          </span>
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
                    <button
                      key={opt}
                      onClick={() => setStatusFilter(opt)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border cursor-pointer transition-all
                        ${
                          statusFilter === opt
                            ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                            : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                        }`}
                    >
                      {opt}
                      <span className="ml-1.5 text-xs">
                        (
                        {opt === "All"
                          ? tickets.length
                          : tickets.filter((t) => t.status === opt).length}
                        )
                      </span>
                    </button>
                  ))}
                </div>

                {/* Ticket list */}
                {filteredTickets.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-5">
                    {filteredTickets.map((ticket) => (
                      <TicketHistoryCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-[var(--color-border)] p-16 text-center">
                    <p className="text-4xl mb-3">🎫</p>
                    <h3 className="font-bold text-[var(--color-text-dark)] mb-1">
                      No tickets found
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                      {statusFilter === "All"
                        ? "You haven't created any support tickets yet."
                        : `No ${statusFilter} tickets found.`}
                    </p>
                    <button
                      onClick={() => setActiveTab("create")}
                      className="bg-[var(--color-primary)] text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-[var(--color-primary-dark)] transition-all"
                    >
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
