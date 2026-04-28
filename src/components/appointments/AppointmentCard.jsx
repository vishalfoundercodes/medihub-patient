import { Calendar, Clock, MapPin, ChevronRight, Download, Video, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusStyle = {
  pending:   { text: 'text-yellow-600',              bg: 'bg-yellow-50',  border: 'border-yellow-100' },
  upcoming:  { text: 'text-[var(--color-primary)]',  bg: 'bg-blue-50',   border: 'border-blue-100'   },
  completed: { text: 'text-[var(--color-success)]',  bg: 'bg-green-50',  border: 'border-green-100'  },
  cancelled: { text: 'text-orange-500',              bg: 'bg-orange-50', border: 'border-orange-100' },
  rejected:  { text: 'text-red-500',                 bg: 'bg-red-50',    border: 'border-red-100'    },
};

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

export default function AppointmentCard({ appointment: a }) {
  const navigate = useNavigate();
  const st = statusStyle[a.status] || statusStyle.pending;

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] hover:shadow-md transition-all duration-200 p-5">
      <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">

        {/* Doctor image */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--color-bg-section)] shrink-0 border-2 border-[var(--color-border)]">
          <img src={a.doctor_img} alt={a.doctor_name} className="w-full h-full object-cover object-top" />
        </div>

        {/* Doctor info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-bold text-[var(--color-text-dark)]">{a.doctor_name}</span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${st.text} ${st.bg} ${st.border}`}>
              {a.status}
            </span>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">{a.specialization}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
              <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              {formatDate(a.appointment_date)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
              <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              {formatTime(a.slot_start)} - {formatTime(a.slot_end)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
              {a.consultancy_type === 'online'
                ? <Video className="w-3.5 h-3.5 text-teal-500" />
                : <Building2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />}
              {a.consultancy_type === 'online' ? 'Video Consultation' : 'In-Clinic Visit'}
            </span>
            {a.consultancy_type === 'offline' && a.doctor_address && (
              <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                {a.doctor_address}
              </span>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="text-right mb-1">
            <p className="text-xs text-[var(--color-text-secondary)]">Appointment ID</p>
            <p className="text-sm font-bold text-[var(--color-text-dark)]">#{a.id}</p>
          </div>

          {/* Prescription download — completed only */}
          {a.status === 'completed' && a.prescription_url && (
            <a
              href={a.prescription_url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 border border-purple-300 text-purple-600 hover:bg-purple-50 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prescription</span>
            </a>
          )}

          {/* Video call link — online upcoming/pending */}
          {a.video_call_link && (a.status === 'upcoming' || a.status === 'pending') && (
            <a
              href={a.video_call_link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 border border-teal-300 text-teal-600 hover:bg-teal-50 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
            >
              <Video className="w-3.5 h-3.5" />
              Join Call
            </a>
          )}

          <button
            onClick={() => navigate(`/appointment/${a.id}`)}
            className="w-9 h-9 border border-[var(--color-border)] cursor-pointer rounded-xl flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-blue-50 transition-all"
          >
            <ChevronRight className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
        </div>
      </div>
    </div>
  );
}
