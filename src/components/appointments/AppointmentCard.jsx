import { Calendar, Clock, MapPin, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusStyle = {
  Upcoming:  { text: 'text-[var(--color-primary)]',  bg: 'bg-blue-50',   border: 'border-blue-100',   btn: 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-blue-50' },
  Completed: { text: 'text-[var(--color-success)]',  bg: 'bg-green-50',  border: 'border-green-100',  btn: 'border-[var(--color-success)] text-[var(--color-success)] hover:bg-green-50' },
  Cancelled: { text: 'text-orange-500',               bg: 'bg-orange-50', border: 'border-orange-100', btn: 'border-orange-400 text-orange-500 hover:bg-orange-50' },
};

export default function AppointmentCard({ appointment }) {
  const navigate = useNavigate();
  const st = statusStyle[appointment.status] || statusStyle.Upcoming;

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] hover:shadow-md transition-all duration-200 p-5">
      <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
        {/* Doctor image */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--color-bg-section)] shrink-0 border-2 border-[var(--color-border)]">
          <img
            src={appointment.image}
            alt={appointment.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Doctor info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-bold text-[var(--color-text-dark)]">
              {appointment.name}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${st.text} ${st.bg} ${st.border}`}
            >
              {appointment.status}
            </span>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            {appointment.specialty} • {appointment.experience}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
              <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              {appointment.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
              <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              {appointment.time}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              {appointment.clinic}
            </span>
          </div>
        </div>

        {/* Appointment ID + action */}
        <div className="flex items-end gap-3 shrink-0">
          <div className="flex md:flex-col gap-2">
            <div className="text-left">
              <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">
                Appointment ID
              </p>
              <p className="text-sm font-bold text-[var(--color-text-dark)]">
                #{appointment.id}
              </p>
            </div>
            <button
              onClick={() => navigate(`/appointment/${appointment.id}`)}
              className={`border text-sm font-semibold px-3 py-1 rounded-xl transition-all whitespace-nowrap ${st.btn}`}
            >
              View Details
            </button>
          </div>

          <button className="w-9 h-9 border border-[var(--color-border)] rounded-xl flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-blue-50 transition-all">
            <ChevronRight className="w-6 h-6 text-[var(--color-text-secondary)]" />
          </button>
        </div>
      </div>
    </div>
  );
}
