export default function PopularLabTests() {
  const tests = [
    { name: 'Full Body Checkup', price: 999, original: 1499, discount: 20, img: '/api/placeholder/200/150' },
    { name: 'Diabetes Profile', price: 699, original: 999, discount: 15, img: '/api/placeholder/200/150' },
    { name: 'Thyroid Profile', price: 649, original: 899, discount: 15, img: '/api/placeholder/200/150' },
    { name: 'Lipid Profile', price: 799, original: 1199, discount: 20, img: '/api/placeholder/200/150' }
  ];

  return (
    <section className="bg-[var(--color-bg-main)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-text-dark)]">Popular Lab Tests</h2>
          <a href="#" className="text-[var(--color-primary)] font-medium hover:underline">View All</a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tests.map((test, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={test.img} alt={test.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-[var(--color-text-dark)] mb-3">{test.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-[var(--color-text-dark)]">₹{test.price}</span>
                  <span className="text-sm text-[var(--color-text-secondary)] line-through">₹{test.original}</span>
                </div>
                <div className="bg-[var(--color-success-bg)] text-[var(--color-success)] text-xs font-medium px-2 py-1 rounded inline-block">
                  {test.discount}% OFF
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
