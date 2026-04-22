import { Search } from "lucide-react";
import heroImg from "../assets/Home/heroImage.png";

export default function Hero() {
  return (
    <section
      className="relative bg-white overflow-hidden"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional dark overlay for better text readability */}
      <div className="absolute inset-0 bg-white/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[var(--color-text-dark)] text-lg mb-2">Hello,</p>
          <h1 className="text-5xl font-bold text-[var(--color-text-dark)] mb-2">
            Take Care of
            <br />
            Your <span className="text-[var(--color-primary)]">Health</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8 flex items-center gap-2">
            We are here to support you
            <br />
            and your family
            <svg
              className="w-5 h-5 text-[var(--color-primary)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
            </svg>
          </p>
          <div className="flex gap-3">
            {/* <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
              <input
                type="text"
                placeholder="Search for tests, medicines, doctor..."
                className="w-full pl-12 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white/80 backdrop-blur-sm"
              />
            </div> */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black z-10" />

              <input
                type="text"
                placeholder="Search for tests, medicines, doctor..."
                className="w-full pl-12 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white/80 backdrop-blur-sm"
              />
            </div>
            <button className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-medium hover:bg-[var(--color-primary-dark)]">
              Search
            </button>
          </div>
        </div>

        {/* Empty right column to maintain grid layout */}
        <div />
      </div>
    </section>
  );
}