import { Calendar, Clock, MapPin, FileText, Video, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatTime = (t) => {
  if (!t) return '—';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
};

export default function UpcomingAppointmentCard({ appointment: a }) {
  const navigate = useNavigate();
  if (!a) return null;

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Next Appointment</h3>

      {/* Doctor info */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--color-border)]">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-[var(--color-bg-section)] shrink-0 border-2 border-[var(--color-border)]">
          <img src={a.doctor_img} alt={a.doctor_name} className="w-full h-full object-cover object-top" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-[var(--color-text-dark)] mb-0.5">{a.doctor_name}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{a.specialization}</p>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[var(--color-primary)] border border-blue-100 capitalize inline-block mt-1">
            {a.status}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">{formatDate(a.appointment_date)}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">
            {formatTime(a.slot_start)} - {formatTime(a.slot_end)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
            {a.consultancy_type === 'online'
              ? <Video className="w-4 h-4 text-teal-600" />
              : <Building2 className="w-4 h-4 text-purple-600" />}
          </div>
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">
            {a.consultancy_type === 'online' ? 'Video Consultation' : 'In-Clinic Visit'}
          </p>
        </div>

        {a.consultancy_type === 'offline' && a.doctor_address && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{a.doctor_address}</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="space-y-2.5">
        <button
          onClick={() => navigate(`/appointment/${a.id}`)}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
        >
          <FileText className="w-4 h-4" /> View Details
        </button>
        {a.video_call_link && (
          <a
            href={a.video_call_link}
            target="_blank"
            rel="noreferrer"
            className="w-full border border-teal-300 text-teal-600 hover:bg-teal-50 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
          >
            <Video className="w-4 h-4" /> Join Video Call
          </a>
        )}
      </div>
    </div>
  );
}
