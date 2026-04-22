import { Star } from 'lucide-react';

export default function TopDoctors() {
  const doctors = [
    { name: 'Dr. Rajesh Kumar', specialty: 'General Physician', rating: 4.8, img: '/api/placeholder/150/150' },
    { name: 'Dr. Priya Sharma', specialty: 'Gynecologist', rating: 4.7, img: '/api/placeholder/150/150' },
    { name: 'Dr. Amit Verma', specialty: 'Dermatologist', rating: 4.6, img: '/api/placeholder/150/150' },
    { name: 'Dr. Neha Singh', specialty: 'Pediatrician', rating: 4.8, img: '/api/placeholder/150/150' }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-text-dark)]">Top Doctors</h2>
          <a href="#" className="text-[var(--color-primary)] font-medium hover:underline">View All</a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, i) => (
            <div key={i} className="bg-[var(--color-bg-section)] rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              <img src={doctor.img} alt={doctor.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="font-bold text-[var(--color-text-dark)] mb-1">{doctor.name}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">{doctor.specialty}</p>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-[var(--color-text-dark)]">{doctor.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
