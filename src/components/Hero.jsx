import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImg from '../assets/Home/heroImage.png';
import labHero from "../assets/Home/labHero.png";
import doctorHero from "../assets/Home/doctorHero.png";

const slides = [
  {
    image: heroImg,
    tag: "Trusted Healthcare Partner",
    heading: ["Take Care of", "Your"],
    highlight: "Health",
    sub: "We are here to support you and your family with accurate tests, genuine medicines & expert doctors.",
    overlay: "from-white/95 via-white/70 to-transparent",
  },
  {
    image: labHero,
    tag: "5000+ Lab Tests Available",
    heading: ["Book Your", "Lab"],
    highlight: "Tests",
    sub: "Get accurate reports from certified labs. Home sample collection available at your convenience.",
    overlay: "from-blue-950/80 via-blue-900/50 to-transparent",
    // light: true,
  },
  {
    image: doctorHero,
    tag: "200+ Expert Doctors",
    heading: ["Consult the", "Best"],
    highlight: "Doctors",
    sub: "Book instant appointments with top-rated specialists. Online & in-clinic consultations available.",
    overlay: "from-slate-950/85 via-slate-800/50 to-transparent",
    // light: true,
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => next(), 4500);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];
  const isLight = slide.light;

  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'clamp(120px, 40vh, 620px)' }}>

      {/* Background images — all stacked, only current visible */}
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

      {/* Gradient overlay */}
      {/* <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay} transition-all duration-700`} /> */}

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <div
          className="max-w-xl transition-all duration-500"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(12px)' : 'translateY(0)' }}
        >
          {/* Tag */}
     

          {/* Heading */}
          {/* <h3>Hello,</h3>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 ${isLight ? 'text-white' : 'text-[var(--color-text-dark)]'}`}>
            {slide.heading[0]}<br />
            {slide.heading[1]}{' '}
            <span className={isLight ? 'text-blue-300' : 'text-[var(--color-primary)]'}>
              {slide.highlight}
            </span>
          </h1> */}

          {/* Subtext */}
          {/* <p className={`text-sm md:text-base leading-relaxed mb-8 max-w-md ${isLight ? 'text-white/80' : 'text-[var(--color-text-secondary)]'}`}>
            {slide.sub}
          </p> */}

          {/* Search bar */}
          {/* <div className="flex gap-3 max-w-lg">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                placeholder="Search for tests, medicines, doctor..."
                className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] shadow-lg"
              />
            </div>
            <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-200 whitespace-nowrap">
              Search
            </button>
          </div> */}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-7 h-2.5 bg-[var(--color-primary)]'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
