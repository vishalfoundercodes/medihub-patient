import { ArrowLeft, Copy, ShoppingCart, ClipboardCheck, Home, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const featureIcons = { 'Accurate Reports': ClipboardCheck, 'Home Sample Collection': Home, 'Fast & Reliable Results': Zap };

export default function LabDetailHero({ test }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Back */}
      <button
        onClick={() => navigate('/my-lab-tests')}
        className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Lab Tests
      </button>

      {/* Title row */}
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">{test.name}</h1>
        {test.badge && (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
            {test.badge}
          </span>
        )}
      </div>

      {/* Order ID */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
        <span>Order ID: <span className="font-semibold text-[var(--color-text-dark)]">#{test.orderId}</span></span>
        <button className="text-[var(--color-primary)] hover:opacity-70">
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image + Price card */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative">
            <img src={test.image} alt={test.name} className="w-full h-64 object-cover" />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-[var(--color-border)] rounded-xl px-3 py-1.5 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--color-primary)]" />
              <div>
                <p className="text-xs font-bold text-[var(--color-text-dark)]">NABL Accredited Labs</p>
                <p className="text-[10px] text-[var(--color-text-secondary)]">Trusted & Accurate Results</p>
              </div>
            </div>
          </div>

          {/* Price + actions */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {/* Price row */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-[var(--color-text-dark)]">₹{test.price}</span>
                <span className="text-base text-[var(--color-text-secondary)] line-through">₹{test.original}</span>
                <span className="text-sm font-bold text-[var(--color-success)] bg-[var(--color-success-bg)] px-2.5 py-0.5 rounded-full">
                  {test.discount}% OFF
                </span>
              </div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">Includes {test.includes}</p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {test.features.map((f) => {
                  const Icon = featureIcons[f] || ClipboardCheck;
                  return (
                    <div key={f} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                      <Icon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                      {f}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold py-3 rounded-xl transition-all">
                Book Again
              </button>
              <button className="w-full border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text-dark)] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-blue-50">
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
