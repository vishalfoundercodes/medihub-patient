import { useState, useEffect } from 'react';
import { Search, FlaskConical, Stethoscope, Pill } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/Home/heroImage.png';
import labHero from '../assets/Home/labHero.png';
import doctorHero from '../assets/Home/doctorHero.png';

const slides = [
  { image: heroImg },
  { image: labHero },
  { image: doctorHero },
];

const searchTabs = [
  { id: 'lab',      label: 'Lab Tests',  icon: FlaskConical,  placeholder: 'Search for lab tests, packages...', to: '/lab-tests'  },
  { id: 'doctors',  label: 'Doctors',    icon: Stethoscope,   placeholder: 'Search doctors, specialization...', to: '/doctors'    },
  { id: 'medicine', label: 'Medicines',  icon: Pill,          placeholder: 'Search medicines, health products...', to: '/medicines' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('lab');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 400);
  };

  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [current]);

  const tab = searchTabs.find((t) => t.id === activeTab);

  const handleSearch = () => {
    navigate(tab.to);
  };

  return (
    <div className="w-full">
      {/* ── Slider ── */}
      <section className="relative w-full overflow-hidden h-[45vh] md:h-[65vh] max-h-[620px]">
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt=""
              className="w-full h-full object-fill object-center"
              draggable={false}
            />
          </div>
        ))}

      </section>

      {/* ── Search bar — always visible, outside slider ── */}
      <div className="bg-white border-b border-[var(--color-border)] shadow-sm -mt-24 mb-4">
        <div
          style={{
            maxWidth: 'var(--width-container)',
            paddingLeft: 'var(--padding-container)',
            paddingRight: 'var(--padding-container)',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          className="py-4"
        >
          {/* Category tabs */}

          {/* Search input */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={tab.placeholder}
                className="w-full pl-11 pr-4 py-3 bg-[var(--color-bg-section)] rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white transition-all"
              />
            </div>
            {/* <button
              onClick={handleSearch}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all shadow-md shadow-blue-100 whitespace-nowrap"
            >
              Search
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
