import { useState } from 'react';
import { CheckCircle, Clock, Circle, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ApptTimeline({ timeline, similarDoctors }) {
  const [scrollIdx, setScrollIdx] = useState(0);
  const visible = similarDoctors.slice(scrollIdx, scrollIdx + 3);

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <div className="grid md:grid-cols-2 gap-8">

        {/* Timeline */}
        <div>
          <h3 className="font-bold text-[var(--color-text-dark)] mb-5">Appointment Timeline</h3>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                {/* Icon + line */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10
                    ${item.done ? 'bg-[var(--color-success)]' : item.active ? 'bg-white border-2 border-[var(--color-primary)]' : 'bg-white border-2 border-[var(--color-border)]'}`}
                  >
                    {item.done
                      ? <CheckCircle className="w-5 h-5 text-white" />
                      : item.active
                        ? <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                        : <Circle className="w-4 h-4 text-[var(--color-border)]" />
                    }
                  </div>
                  {i < timeline.length - 1 && (
                    <div className={`w-0.5 h-8 ${item.done ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`} />
                  )}
                </div>
                {/* Content */}
                <div className="pb-6">
                  <p className={`text-sm font-semibold ${item.done || item.active ? 'text-[var(--color-text-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar doctors */}
        {/* <div>
          <h3 className="font-bold text-[var(--color-text-dark)] mb-5">You may also like</h3>
          <div className="relative">
            <div className="flex gap-3 overflow-hidden">
              {visible.map((doc, i) => (
                <div key={i} className="flex-1 min-w-0 border border-[var(--color-border)] rounded-xl p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <img src={doc.image} alt={doc.name} className="w-full h-20 object-cover object-top rounded-lg mb-2" />
                  <p className="text-xs font-bold text-[var(--color-text-dark)] leading-snug mb-0.5">{doc.name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-1">{doc.specialty}</p>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-[var(--color-text-dark)]">{doc.rating}</span>
                  </div>
                  <p className="text-sm font-bold text-[var(--color-text-dark)]">₹{doc.fee}</p>
                </div>
              ))}
            </div>
            {scrollIdx > 0 && (
              <button onClick={() => setScrollIdx(scrollIdx - 1)} className="absolute -left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-white border border-[var(--color-border)] rounded-full flex items-center justify-center shadow-sm hover:border-[var(--color-primary)]">
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {scrollIdx + 3 < similarDoctors.length && (
              <button onClick={() => setScrollIdx(scrollIdx + 1)} className="absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-white border border-[var(--color-border)] rounded-full flex items-center justify-center shadow-sm hover:border-[var(--color-primary)]">
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}
