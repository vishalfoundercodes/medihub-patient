import { FlaskConical, Calendar, FileText, MapPin, CreditCard, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
  {
    icon: FlaskConical,
    title: "My Lab Tests",
    desc: "View all your lab tests",
    route: "/my-lab-tests",
    color: "text-[var(--color-primary)]",
    bg: "bg-blue-50",
  },
  {
    icon: Calendar,
    title: "My Appointments",
    desc: "View upcoming appointments",
    route: "/appointments",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: FileText,
    title: "My Reports",
    desc: "Download your reports",
    route: "/orders",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: MapPin,
    title: "My Addresses",
    desc: "Manage your addresses",
    route: "/my-addresses",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

export default function AccountQuickActions() {
  const navigate=useNavigate()
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-5">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {actions.map(({ icon: Icon, title, desc, color, bg, route }) => (
          <button
            key={title}
            className="flex flex-col justify-between p-2 rounded-2xl border border-[var(--color-border)] hover:border-blue-200 hover:shadow-md transition-all group text-left h-full"
          >
            {/* Top Content */}
            <div className="flex items-start gap-2">
              <div
                className={`${bg} w-11 h-11 rounded-xl flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--color-text-dark)] mb-0.5 whitespace-nowrap">
                  {title}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {desc}
                </p>
              </div>
            </div>

            {/* Bottom Arrow */}
            <div className="flex justify-end mt-0">
              <ArrowRight
                className={`w-5 h-5 ${color} group-hover:translate-x-1 transition-transform cursor-pointer`}
                onClick={() => navigate(`${route}`)}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
