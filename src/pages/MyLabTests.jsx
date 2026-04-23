import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import { useAuth } from '../context/AuthContext';
import { MY_LAB_TESTS } from '../data/labTestDetailData';
import { FlaskConical, ChevronRight } from 'lucide-react';

const statusStyle = {
  Completed: 'bg-blue-50 text-[var(--color-primary)]',
  'Report Ready': 'bg-green-50 text-[var(--color-success)]',
  Processing: 'bg-orange-50 text-orange-500',
};

export default function MyLabTests() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { setShowLogin(true); navigate('/'); }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">
        <div className="flex gap-7 items-start">
          <div className="hidden lg:block w-64 shrink-0">
            <AccountSidebar active="labtests" onChange={() => {}} />
          </div>
          <div className="flex-1 min-w-0 space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">My Lab Tests</h1>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">View and manage your booked lab tests</p>
            </div>
            <div className="space-y-4">
              {MY_LAB_TESTS.map((test) => (
                <div
                  key={test.id}
                  onClick={() => navigate(`/lab-test/${test.id}`)}
                  className="bg-white rounded-2xl border border-[var(--color-border)] hover:border-blue-200 hover:shadow-md transition-all p-5 cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                      <FlaskConical className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[var(--color-text-dark)]">{test.name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">Order #{test.orderId} • {test.date}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">Includes {test.includes}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-[var(--color-text-dark)] mb-1">₹{test.price}</p>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[test.status] || 'bg-gray-100 text-gray-600'}`}>
                        {test.status}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--color-text-secondary)] shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
