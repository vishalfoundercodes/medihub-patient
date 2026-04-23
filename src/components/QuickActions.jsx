import { TestTube, Pill, Calendar, ArrowRight } from "lucide-react";
import Container from "./Container";

export default function QuickActions() {
  const actions = [
    {
      icon: TestTube,
      title: "Blood Test",
      desc: "Book lab tests with accurate results",
      bg: "bg-blue-100",
      iconColor: "text-[var(--color-primary)]",
      btnBg: "bg-[var(--color-primary)]",
    },
    {
      icon: Pill,
      title: "Book Medicine",
      desc: "Order medicines quickly and get delivery",
      bg: "bg-teal-100",
      iconColor: "text-teal-500",
      btnBg: "bg-teal-500",
    },
    {
      icon: Calendar,
      title: "Book Appointment",
      desc: "Consult doctors and book your slot",
      bg: "bg-purple-100",
      iconColor: "text-purple-500",
      btnBg: "bg-purple-500",
    },
  ];

  return (
    <section className=" pt-2 pb-8">
      <Container className="grid md:grid-cols-3 gap-6">
        {actions.map((action, i) => (
          <div
            key={i}
            className="bg-white rounded-xl py-3 px-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-5">
              <div className={`${action.bg} p-4 rounded-full`}>
                <action.icon className={`w-8 h-8 ${action.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[var(--color-text-dark)] mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  {action.desc}
                </p>
                <button
                  className={`${action.btnBg} text-white w-8 h-8 rounded-full flex items-center justify-center hover:opacity-90`}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}