import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import ApptDetailHero from '../components/appointmentdetail/ApptDetailHero';
import ApptDoctorCard from '../components/appointmentdetail/ApptDoctorCard';
import ApptInfoGrid from '../components/appointmentdetail/ApptInfoGrid';
import ApptAboutSection from '../components/appointmentdetail/ApptAboutSection';
import ApptActionButtons from '../components/appointmentdetail/ApptActionButtons';
import ApptTimeline from '../components/appointmentdetail/ApptTimeline';
import ApptSummary from '../components/appointmentdetail/ApptSummary';
import ApptHospitalCard from '../components/appointmentdetail/ApptHospitalCard';
import ApptNeedHelp from '../components/appointmentdetail/ApptNeedHelp';
import { useAuth } from '../context/AuthContext';
import api, { apis } from '../utlities/api';
import { Loader2 } from 'lucide-react';

export default function AppointmentDetail() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [appt, setAppt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setShowLogin(true); navigate('/'); return; }
    const fetch = async () => {
      try {
        const res = await api.get(`${apis.appointmentDetail}/${id}`);
        if (res.data.success) setAppt(res.data.data);
      } catch (err) {
        console.error('Failed to fetch appointment detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user, id]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20 text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)] mx-auto" />
        </Container>
        <Footer />
      </div>
    );
  }

  if (!appt) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20 text-center">
          <p className="text-5xl mb-4">📅</p>
          <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-4">Appointment not found</h2>
          <button onClick={() => navigate('/appointments')} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold">Back to Appointments</button>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">
        <div className="flex gap-7 items-start">

          {/* Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <AccountSidebar
              active="appointments"
              onChange={(id) => {
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

              {/* Left — 2/3 */}
              <div className="xl:col-span-2 space-y-5">
                <ApptDetailHero id={appt.id} status={appt.status} bookedOn={appt.created_at} />
                <ApptDoctorCard appt={appt} />
                <ApptInfoGrid appt={appt} />
                <ApptAboutSection appt={appt} />
                <ApptActionButtons status={appt.status} videoLink={appt.video_call_link} />
                <ApptTimeline status={appt.status} createdAt={appt.created_at} />
              </div>

              {/* Right — 1/3 */}
              <div className="space-y-5">
                <ApptSummary appt={appt} />
                {appt.consultancy_type === 'offline' && <ApptHospitalCard address={appt.doctor_address} />}
                <ApptNeedHelp />
              </div>

            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
