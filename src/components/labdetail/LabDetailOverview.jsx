import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Calendar, FlaskConical, Pill, Zap } from 'lucide-react';

const stepIcons = [Calendar, FlaskConical, Pill, Zap];

export default function LabDetailOverview({ test }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="space-y-6">
      {/* About */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
        <h3 className="font-bold text-[var(--color-text-dark)] mb-3">About This Test</h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">{test.description}</p>
        <div className="flex flex-wrap gap-2">
          {test.featureBadges.map((b) => (
            <span key={b} className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-section)] border border-[var(--color-border)] px-3 py-1.5 rounded-full">
              ✓ {b}
            </span>
          ))}
        </div>
      </div>

      {/* Tests Included */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
        <h3 className="font-bold text-[var(--color-text-dark)] mb-5">Tests Included</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {test.testCategories.map((cat) => (
            <div key={cat.name}>
              <h4 className="font-bold text-sm text-[var(--color-text-dark)] mb-2">
                {cat.name} <span className="text-[var(--color-text-secondary)] font-normal">({cat.count})</span>
              </h4>
              <ul className="space-y-1">
                {cat.tests.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
                    <Check className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
                {cat.more > 0 && (
                  <li className="text-xs font-semibold text-[var(--color-primary)] mt-1">+ {cat.more} more</li>
                )}
              </ul>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full border border-[var(--color-border)] hover:border-[var(--color-primary)] text-sm font-semibold text-[var(--color-text-dark)] py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-blue-50">
          View All {test.includes} Tests ▾
        </button>
      </div>

      {/* How it Works */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
        <h3 className="font-bold text-[var(--color-text-dark)] mb-6">How it Works</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {test.howItWorks.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={step.step} className="flex flex-col items-center text-center relative">
                {i < test.howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-full h-0.5 border-t-2 border-dashed border-[var(--color-border)]" />
                )}
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-3 relative z-10">
                  <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <p className="text-sm font-bold text-[var(--color-text-dark)] mb-1">{step.title}</p>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Similar tests */}
      {/* <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
        <h3 className="font-bold text-[var(--color-text-dark)] mb-5">You may also like</h3>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {test.similarTests.map((t) => (
            <div key={t.id} className="shrink-0 w-44 border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <img src={t.image} alt={t.name} className="w-full h-24 object-cover" />
              <div className="p-3">
                <p className="text-xs font-bold text-[var(--color-text-dark)] mb-1 leading-snug">{t.name}</p>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm font-bold text-[var(--color-text-dark)]">₹{t.price}</span>
                  <span className="text-xs text-[var(--color-text-secondary)] line-through">₹{t.original}</span>
                </div>
                <span className="text-[10px] font-bold text-[var(--color-success)] bg-[var(--color-success-bg)] px-2 py-0.5 rounded-full">
                  {t.discount}% OFF
                </span>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
