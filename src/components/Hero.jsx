import { useState, useEffect } from 'react';
import { Search, FlaskConical, Stethoscope, Pill, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api, { apis } from '../utlities/api';

const searchTabs = [
  { id: 'lab',      label: 'Lab Tests',  icon: FlaskConical,  placeholder: 'Search for lab tests, packages...',     to: '/lab-tests'  },
  { id: 'doctors',  label: 'Doctors',    icon: Stethoscope,   placeholder: 'Search doctors, specialization...',     to: '/doctors'    },
  { id: 'medicine', label: 'Medicines',  icon: Pill,          placeholder: 'Search medicines, health products...', to: '/medicines'  },
];

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [sliderError, setSliderError] = useState('');
  const [sliderLoading, setSliderLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('lab');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchSliders = async () => {
      setSliderLoading(true);
      setSliderError('');
      try {
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const res = await api.get(apis.slider, config);
        if (res.data.success) {
          setSlides(res.data.data.sliders);
        } else {
          setSliderError(res.data.message || 'Failed to load sliders.');
        }
      } catch (err) {
        setSliderError(err.response?.data?.message || 'Network error. Could not load banners.');
      } finally {
        setSliderLoading(false);
      }
    };
    fetchSliders();
  }, [token]);

  const goTo = (index) => {
    if (animating || slides.length === 0) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 400);
  };

  const next = () => goTo((current + 1) % (slides.length || 1));

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [current, slides.length]);

  const tab = searchTabs.find((t) => t.id === activeTab);

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(query)}&type=${activeTab}`);
  };

  return (
    <div className="w-full">
      {/* Slider */}
      <section className="relative w-full overflow-hidden h-[45vh] md:h-[65vh] max-h-[620px] bg-[var(--color-bg-section)]">

        {sliderLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-gray-200" />
          </div>
        )}

        {!sliderLoading && sliderError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-red-50">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-sm font-medium text-red-500">{sliderError}</p>
          </div>
        )}

        {!sliderLoading && !sliderError && slides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <a href={s.redirect_url} target="_blank" rel="noreferrer">
              <img
                src={s.image_url} alt={s.title}
                className="w-full h-full object-fill object-center"
                draggable={false}
              />
            </a>
          </div>
        ))}

        {!sliderLoading && !sliderError && slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i} onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${i === current ? 'bg-white w-5' : 'bg-white/50 w-2'}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Search bar */}
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
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <input
                type="text" value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => navigate(`/search?q=${encodeURIComponent(query)}&type=${activeTab}`)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={tab.placeholder}
                className="w-1/2 pl-11 pr-4 py-3 bg-[var(--color-bg-section)] rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
