import { Video, CalendarPlus } from 'lucide-react';

export default function ApptActionButtons({ status, videoLink }) {
  const showJoin = videoLink && (status === 'upcoming' || status === 'pending');

  if (!showJoin) return null;

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <div className="flex flex-wrap gap-3">
        {showJoin && (
          <a
            href={videoLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all shadow-md"
          >
            <Video className="w-4 h-4" /> Join Video Call
          </a>
        )}
        <button className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all shadow-md shadow-blue-100">
          <CalendarPlus className="w-4 h-4" /> Add to Calendar
        </button>
      </div>
    </div>
  );
}
