import { FileImage, Download, Star } from 'lucide-react';

export default function ApptAboutSection({ appt }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 space-y-5">
      <h3 className="font-bold text-[var(--color-text-dark)]">About Your Appointment</h3>

      {/* Patient info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-[var(--color-border)] pb-4">
        <div>
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Patient Name</p>
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">{appt.patient_name || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Age / Gender</p>
          <p className="text-sm font-semibold text-[var(--color-text-dark)] capitalize">{appt.age} yrs / {appt.gender}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Mobile</p>
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">{appt.patient_mobile || '—'}</p>
        </div>
      </div>

      {/* Reason */}
      <div>
        <p className="text-sm font-bold text-[var(--color-text-dark)] mb-1">Reason for Visit</p>
        <p className="text-sm text-[var(--color-text-secondary)]">{appt.reason || 'Not specified'}</p>
      </div>

      {/* Clinic note */}
      {appt.clinic_note && (
        <div>
          <p className="text-sm font-bold text-[var(--color-text-dark)] mb-1">Doctor's Note</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{appt.clinic_note}</p>
        </div>
      )}

      {/* Uploaded Reports */}
      {appt.reports?.length > 0 && (
        <div>
          <p className="text-sm font-bold text-[var(--color-text-dark)] mb-2">Uploaded Reports</p>
          <div className="flex flex-wrap gap-3">
            {appt.reports.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 border border-[var(--color-border)] hover:border-[var(--color-primary)] px-3 py-2 rounded-xl text-xs font-medium text-[var(--color-text-dark)] hover:bg-blue-50 transition-all">
                <FileImage className="w-4 h-4 text-[var(--color-primary)]" />
                Report {i + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Prescription */}
      {appt.prescription?.file_url && (
        <div>
          <p className="text-sm font-bold text-[var(--color-text-dark)] mb-2">Prescription</p>
          <a href={appt.prescription.file_url} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 border border-purple-300 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
            <Download className="w-4 h-4" /> Download Prescription
          </a>
        </div>
      )}

      {/* Review */}
      {appt.review && (
        <div className="bg-[var(--color-bg-section)] rounded-xl p-4">
          <p className="text-sm font-bold text-[var(--color-text-dark)] mb-2">Your Review</p>
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < appt.review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
            ))}
            <span className="text-sm font-semibold text-[var(--color-text-dark)] ml-1">{appt.review.rating}/5</span>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">{appt.review.review}</p>
        </div>
      )}
    </div>
  );
}
