import { ArrowLeft, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusStyle = {
  Upcoming:  'bg-blue-50 text-[var(--color-primary)] border-blue-100',
  Completed: 'bg-green-50 text-[var(--color-success)] border-green-100',
  Cancelled: 'bg-orange-50 text-orange-500 border-orange-100',
};

export default function ApptDetailHero({ id, status, bookedOn }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-2">
      <button
        onClick={() => navigate("/appointments")}
        className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Appointments
      </button>
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">
            Appointment Details
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
              Appointment ID:{" "}
              <span className="text-[var(--color-text-dark)]">#{id}</span>
            </span>
            <button className="text-[var(--color-primary)] hover:opacity-70">
              <Copy className="w-3.5 h-3.5" />
            </button>
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusStyle[status] || statusStyle.Upcoming}`}
            >
              {status}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {/* <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusStyle[status] || statusStyle.Upcoming}`}>
            {status}
          </span> */}
          <span className="text-xs text-[var(--color-text-secondary)]">
            Booked on {bookedOn}
          </span>
        </div>
      </div>
    </div>
  );
}
