import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import QuickActions from '../components/QuickActions';
import HighlightBanner from '../components/HighlightBanner';
import Features from '../components/Features';
import Stats from '../components/Stats';
import Footer from '../components/Footer';
import Container from '../components/Container';
import api, { apis } from '../utlities/api';

export default function Home() {
  const navigate = useNavigate();
  const [labTests, setLabTests] = useState([]);
  const [labLoading, setLabLoading] = useState(true);
  const [labError, setLabError] = useState('');
  const [topDoctors, setTopDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        const res = await api.get(apis.labTest, { params: { page: 1, limit: 4 } });
        if (res.data.success) setLabTests(res.data.data.tests);
        else setLabError(res.data.message || 'Failed to load tests.');
      } catch (err) {
        setLabError(err.response?.data?.message || 'Network error.');
      } finally {
        setLabLoading(false);
      }
    };
    fetchLabTests();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get(apis.doctors, { params: { page: 1, limit: 4, sort_by: 'rating' } });
        if (res.data.success) setTopDoctors(res.data.data.doctors);
      } catch {} finally { setDoctorsLoading(false); }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="bg-[var(--color-bg-main)]">
      <Navbar />
      <Hero />
      <div className="-mt-8 relative z-10">
        <QuickActions />
      </div>
      <HighlightBanner />
      <Features />

      <Container className="py-2 grid lg:grid-cols-2 gap-8">
        {/* Popular Lab Tests */}
        <div className="bg-blue-100 p-3 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text-dark)]">
              Popular Lab Tests
            </h2>
            <button
              className="text-[var(--color-primary)] cursor-pointer font-medium hover:underline"
              onClick={() => navigate("/lab-tests")}
            >
              View All
            </button>
          </div>
          {labLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
            </div>
          ) : labError ? (
            <p className="text-sm text-red-500 text-center py-6">{labError}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {labTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col cursor-pointer"
                  onClick={() => navigate(`/lab-test/${test.id}`)}
                >
                  <img
                    src={test.image_url}
                    alt={test.name}
                    className="w-full h-28 object-cover"
                  />
                  <div className="p-3 flex flex-col flex-grow">
                    <h3 className="font-bold text-sm text-[var(--color-text-dark)] mb-1 leading-snug">
                      {test.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                      {test.report_time}
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-[var(--color-text-dark)]">
                          ₹{Math.round(test.discounted_price)}
                        </span>
                        <span className="text-xs text-[var(--color-text-secondary)] line-through">
                          ₹{Math.round(test.price)}
                        </span>
                      </div>
                      <div className="bg-green-50 text-green-600 text-xs font-medium px-2 py-0.5 rounded inline-block">
                        {Math.round(test.discount_percent)}% OFF
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Doctors */}
        <div className="bg-blue-100 p-3 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text-dark)]">
              Top Doctors
            </h2>
            <button
              className="text-[var(--color-primary)] cursor-pointer font-medium hover:underline"
              onClick={() => navigate("/doctors")}
            >
              View All
            </button>
          </div>
          {doctorsLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {topDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-xl overflow-hidden text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/book-appointment/${doctor.id}`)}
                >
                  <img
                    src={doctor.profile_img || doctor.image}
                    alt={doctor.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-[var(--color-text-dark)] mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                      {doctor.specialization || doctor.specialty}
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-medium text-[var(--color-text-dark)]">
                        {doctor.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      <Stats />
      <Footer />
    </div>
  );
}
