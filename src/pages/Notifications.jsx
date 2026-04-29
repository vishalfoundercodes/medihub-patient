import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import NotificationTabs from '../components/notifications/NotificationTabs';
import NotificationItem from '../components/notifications/NotificationItem';
import NotificationFilterPanel from '../components/notifications/NotificationFilterPanel';
import NotificationNeedHelp from '../components/notifications/NotificationNeedHelp';
import NotificationPagination from '../components/notifications/NotificationPagination';
import { useAuth } from '../context/AuthContext';
import { NOTIFICATIONS } from '../data/notificationsData';

const PER_PAGE = 7;

export default function Notifications() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Counts for tabs and filter panel
  const counts = useMemo(() => ({
    all:          notifications.length,
    Unread:       notifications.filter((n) => !n.read).length,
    Appointments: notifications.filter((n) => n.type === 'Appointments').length,
    Reports:      notifications.filter((n) => n.type === 'Reports').length,
    Offers:       notifications.filter((n) => n.type === 'Offers').length,
    Account:      notifications.filter((n) => n.type === 'Account').length,
  }), [notifications]);

  const tabs = [
    { id: 'all',          label: 'All',          count: counts.all          },
    { id: 'Unread',       label: 'Unread',       count: counts.Unread       },
    { id: 'Appointments', label: 'Appointments', count: counts.Appointments },
    { id: 'Reports',      label: 'Reports',      count: counts.Reports      },
    { id: 'Offers',       label: 'Offers',       count: counts.Offers       },
    { id: 'Account',      label: 'Account',      count: counts.Account      },
  ];

  const filtered = useMemo(() => {
    if (activeTab === 'all') return notifications;
    if (activeTab === 'Unread') return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.type === activeTab);
  }, [activeTab, notifications]);

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

        <div className="flex gap-7 items-start w-full max-w-full overflow-hidden">
          {/* Sidebar */}
          <div
            className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-64 shrink-0`}
          >
            <AccountSidebar
              active="notifications"
              onChange={(id) => {
                setMobileSidebarOpen(false);
                if (id === "account") navigate("/account");
                else if (id === "orders") navigate("/orders");
                else if (id === "labtests") navigate("/my-lab-tests");
                else if (id === "appointments") navigate("/appointments");
                else if (id === "notifications") navigate("/notifications");
              }}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 max-w-full">
            <div className="grid xl:grid-cols-3 gap-6">
              {/* Left — notification list (2/3) */}
              <div className="xl:col-span-2 space-y-5">
                {/* Header */}
                <div>
                  <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">
                    Notifications
                  </h1>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Stay updated with your account activity and important alerts
                  </p>
                </div>

                {/* Tabs */}
                <NotificationTabs
                  tabs={tabs}
                  active={activeTab}
                  onChange={resetPage(setActiveTab)}
                />

                {/* Notification list */}
                <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden divide-y divide-[var(--color-border)]">
                  {paginated.length > 0 ? (
                    paginated.map((n) => (
                      <NotificationItem
                        key={n.id}
                        notification={n}
                        onRead={handleRead}
                      />
                    ))
                  ) : (
                    <div className="p-16 text-center">
                      <p className="text-4xl mb-3">🔔</p>
                      <h3 className="font-bold text-[var(--color-text-dark)] mb-1">
                        No notifications
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        You're all caught up!
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {filtered.length > PER_PAGE && (
                  <NotificationPagination
                    current={page}
                    total={filtered.length}
                    perPage={PER_PAGE}
                    onChange={setPage}
                  />
                )}
              </div>

              {/* Right sidebar (1/3) */}
              <div className="space-y-5">
                <NotificationFilterPanel
                  active={activeTab}
                  counts={counts}
                  onChange={resetPage(setActiveTab)}
                  onMarkAllRead={handleMarkAllRead}
                />
                <NotificationNeedHelp />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
