import { Calendar, Clock, MapPin, FileText, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UpcomingAppointmentCard({ appointment }) {
  const navigate = useNavigate();
  if (!appointment) return null;

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-4">Upcoming Appointment</h3>

      {/* Doctor info */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--color-border)]">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-[var(--color-bg-section)] shrink-0 border-2 border-[var(--color-border)]">
          <img src={appointment.image} alt={appointment.name} className="w-full h-full object-cover object-top" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <p className="font-bold text-sm text-[var(--color-text-dark)]">{appointment.name}</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[var(--color-primary)] border border-blue-100">
              Upcoming
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">{appointment.specialty}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{appointment.experience}</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-dark)]">{appointment.date}</p>
            {appointment.dateNote && (
              <p className="text-xs text-[var(--color-primary)] font-medium">({appointment.dateNote})</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">{appointment.time}</p>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-dark)]">{appointment.hospital}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{appointment.address}</p>
          </div>
        </div>

        {appointment.consultationType && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">{appointment.consultationType}</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="space-y-2.5">
        <button
          onClick={() => navigate(`/appointment/${appointment.id}`)}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all">
          <FileText className="w-4 h-4" /> View Appointment Details
        </button>
        <button className="w-full border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text-dark)] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all hover:bg-blue-50">
          <RefreshCw className="w-4 h-4" /> Reschedule Appointment
        </button>
      </div>
    </div>
  );
}
