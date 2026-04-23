import { Star } from 'lucide-react';

const statusStyle = {
  Upcoming:  'bg-blue-50 text-[var(--color-primary)] border-blue-100',
  Completed: 'bg-green-50 text-[var(--color-success)] border-green-100',
  Cancelled: 'bg-orange-50 text-orange-500 border-orange-100',
};

export default function ApptDoctorCard({ doctor, status }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <div className="flex items-start gap-5 flex-wrap sm:flex-nowrap">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-[var(--color-bg-section)] shrink-0 border-2 border-[var(--color-border)]">
          <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2 className="text-lg font-bold text-[var(--color-text-dark)]">{doctor.name}</h2>
            {/* <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusStyle[status] || statusStyle.Upcoming}`}>
              {status}
            </span> */}
          </div>
          <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">{doctor.specialty}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
            {doctor.experience} &nbsp;•&nbsp; {doctor.qualification}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">{doctor.hospital}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-[var(--color-text-dark)]">{doctor.rating}</span>
              <span className="text-xs text-[var(--color-text-secondary)]">({doctor.reviews} reviews)</span>
            </div>
            <div className="h-4 w-px bg-[var(--color-border)]" />
            <span className="text-sm text-[var(--color-text-secondary)]">
              Consultation Fee: <span className="font-bold text-[var(--color-text-dark)]">₹{doctor.fee}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
