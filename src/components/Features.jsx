import { TestTube, Pill, Users, ShieldCheck, MessageCircle } from 'lucide-react';
import Container from './Container';
import { useNavigate } from 'react-router-dom';

export default function Features() {
  const navigate=useNavigate()
  const features = [
    {
      icon: TestTube,
      title: 'Accurate Lab Tests',
      desc: 'Reliable & accurate test reports',
      bg: 'bg-blue-100',
      iconColor: 'text-[var(--color-primary)]'
    },
    {
      icon: Pill,
      title: 'Genuine Medicines',
      desc: '100% genuine medicines',
      bg: 'bg-teal-100',
      iconColor: 'text-teal-500'
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      desc: 'Experienced & qualified doctors',
      bg: 'bg-purple-100',
      iconColor: 'text-purple-500'
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Secure',
      desc: 'Your data is safe with us',
      bg: 'bg-blue-100',
      iconColor: 'text-[var(--color-primary)]'
    }
  ];

  return (
    <section className="bg-white py-6">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8 items-center">
          {features.map((feature, i) => (
            <div key={i} className="lg:col-span-1 text-start items-center">
              <div className="grid grid-cols-2 items-start">
                <div
                  className={`${feature.bg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-dark)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Need Help — spans 2 columns */}
          <div className="lg:col-span-2 bg-[var(--color-bg-section)] rounded-xl p-1 md:p-6 flex items-center justify-between gap-4">
            <div className="grid grid-cols-2 items-center gap-5">
              {/* <div className="bg-white p-3 rounded-full shrink-0">
                <MessageCircle className="w-6 h-6 text-[var(--color-primary)]" />
              </div> */}
              <div>
                <h3 className="font-bold text-[var(--color-text-dark)] mb-1">
                  Need Help?
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Our support team is ready to assist you.
                </p>
                <button
                  className="bg-[var(--color-primary)] cursor-pointer text-white mt-2 px-3 whitespace-nowrap py-1 rounded-lg font-medium hover:bg-[var(--color-primary-dark)] flex items-center gap-2 shrink-0"
                  onClick={() => navigate("/help-support")}
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Support
                </button>
              </div>
              <div className="p-3 rounded-full items-center justify-end mx-auto">
                <MessageCircle className="w-18 h-18 text-[var(--color-primary)]" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
