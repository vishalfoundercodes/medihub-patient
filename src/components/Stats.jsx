import { Users, TestTube, Pill, Stethoscope, Headphones } from 'lucide-react';

export default function Stats() {
  const stats = [
    { icon: Users, value: '10L+', label: 'Happy Customers', color: 'text-[var(--color-primary)]' },
    { icon: TestTube, value: '5000+', label: 'Lab Tests', color: 'text-[var(--color-primary)]' },
    { icon: Pill, value: '1000+', label: 'Medicines', color: 'text-[var(--color-primary)]' },
    { icon: Stethoscope, value: '200+', label: 'Expert Doctors', color: 'text-[var(--color-primary)]' },
    { icon: Headphones, value: '24/7', label: 'Customer Support', color: 'text-[var(--color-primary)]' }
  ];

  return (
    <section className=" py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center grid grid-cols-2 items-center">
              <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-3`} />
              <div>
                <h3 className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
