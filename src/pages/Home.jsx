import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import QuickActions from '../components/QuickActions';
import HighlightBanner from '../components/HighlightBanner';
import Features from '../components/Features';
import PopularLabTests from '../components/PopularLabTests';
import TopDoctors from '../components/TopDoctors';
import Stats from '../components/Stats';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-[var(--color-bg-main)]">
      <Navbar />
      <Hero />
      <div className="-mt-8 relative z-50">
        <QuickActions />
      </div>

      <HighlightBanner />
      <Features />
      <div className="max-w-7xl mx-auto px-3 py-2 grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[var(--color-text-dark)]">
              Popular Lab Tests
            </h2>
            <a
              href="#"
              className="text-[var(--color-primary)] font-medium hover:underline"
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              {
                name: "Full Body Checkup",
                price: 999,
                original: 1499,
                discount: 20,
                img: "data:image/jpeg;base64,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",
              },
              {
                name: "Diabetes Profile",
                price: 699,
                original: 999,
                discount: 15,
                img: "https://www.aksharimaging.com/blog/wp-content/uploads/2024/06/Blood-Tests-for-Diabetes.jpg",
              },
              {
                name: "Thyroid Profile",
                price: 649,
                original: 899,
                discount: 15,
                img: "https://www.zenhospital.in/wp-content/uploads/2022/02/Thyroid-Symptoms.jpg",
              },
              {
                name: "Lipid Profile",
                price: 799,
                original: 1199,
                discount: 20,
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAgl-natWlJw83-5TRMwNAwoVFkwKNc-4bEQ&s",
              },
            ].map((test, i) => (
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <img
                  src={test.img}
                  alt={test.name}
                  className="w-full h-28 object-cover"
                />

                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="font-bold text-sm text-[var(--color-text-dark)] mb-2">
                    {test.name}
                  </h3>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-[var(--color-text-dark)]">
                        ₹{test.price}
                      </span>
                      <span className="text-xs text-[var(--color-text-secondary)] line-through">
                        ₹{test.original}
                      </span>
                    </div>

                    <div className="bg-[var(--color-success-bg)] text-[var(--color-success)] text-xs font-medium px-2 py-0.5 rounded inline-block">
                      {test.discount}% OFF
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[var(--color-text-dark)]">
              Top Doctors
            </h2>
            <a
              href="#"
              className="text-[var(--color-primary)] font-medium hover:underline"
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              {
                name: "Dr. Rajesh Kumar",
                specialty: "General Physician",
                rating: 4.8,
                img: "https://www.myhealthhospitals.com/images/doctors/dr-srujith.jpg",
              },
              {
                name: "Dr. Priya Sharma",
                specialty: "Gynecologist",
                rating: 4.7,
                img: "https://nixhealthcare.org/admin/doctor-images/4-1.webp",
              },
              {
                name: "Dr. Amit Verma",
                specialty: "Dermatologist",
                rating: 4.6,
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaUBo1TJO_peT5qAZauI0Q0NiaGy6lsq4sPw&s",
              },
              {
                name: "Dr. Neha Singh",
                specialty: "Pediatrician",
                rating: 4.8,
                img: "https://content.jdmagicbox.com/v2/comp/ajmer/x5/9999px145.x145.230727131013.x5x5/catalogue/dr-sweta-kothari-panchsheel-nagar-ajmer-general-physician-doctors-uo09kujica-250.jpg",
              },
            ].map((doctor, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={doctor.img}
                  alt={doctor.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="font-bold text-sm text-[var(--color-text-dark)] mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                    {doctor.specialty}
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium text-[var(--color-text-dark)]">
                      {doctor.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Stats />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}
