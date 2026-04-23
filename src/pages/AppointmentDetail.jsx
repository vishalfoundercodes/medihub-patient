import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import ApptDetailHero from '../components/appointmentdetail/ApptDetailHero';
import ApptDoctorCard from '../components/appointmentdetail/ApptDoctorCard';
import ApptInfoGrid from '../components/appointmentdetail/ApptInfoGrid';
import ApptAboutSection from '../components/appointmentdetail/ApptAboutSection';
import ApptInstructions from '../components/appointmentdetail/ApptInstructions';
import ApptActionButtons from '../components/appointmentdetail/ApptActionButtons';
import ApptTimeline from '../components/appointmentdetail/ApptTimeline';
import ApptSummary from '../components/appointmentdetail/ApptSummary';
import ApptHospitalCard from '../components/appointmentdetail/ApptHospitalCard';
import ApptNeedHelp from '../components/appointmentdetail/ApptNeedHelp';
import { useAuth } from '../context/AuthContext';
import { APPOINTMENT_DETAIL } from '../data/appointmentsData';

export default function AppointmentDetail() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { setShowLogin(true); navigate('/'); }
  }, [user]);

  if (!user) return null;

  const appt = APPOINTMENT_DETAIL;

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
                <ApptDetailHero id={appt.id} status={appt.status} bookedOn={appt.bookedOn} />
                <ApptDoctorCard doctor={appt.doctor} status={appt.status} />
                <ApptInfoGrid appointment={appt.appointment} />
                <ApptAboutSection about={appt.about} />
                <ApptInstructions instructions={appt.instructions} />
                <ApptActionButtons />
                <ApptTimeline timeline={appt.timeline} similarDoctors={appt.similarDoctors} />
              </div>

              {/* Right — 1/3 */}
              <div className="space-y-5">
                <ApptSummary payment={appt.payment} />
                <ApptHospitalCard hospital={appt.hospitalAddress} />
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
