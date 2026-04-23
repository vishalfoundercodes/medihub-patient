import { Pill, FlaskConical, Calendar, ChevronRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusStyle = {
  Delivered:  { text: 'text-[var(--color-success)]',  bg: 'bg-green-100',  border: 'border-green-100' },
  Completed:  { text: 'text-[var(--color-primary)]',  bg: 'bg-blue-100',   border: 'border-blue-100'  },
  Shipped:    { text: 'text-purple-600',               bg: 'bg-purple-100', border: 'border-purple-100'},
  Processing: { text: 'text-orange-500',               bg: 'bg-orange-100', border: 'border-orange-100'},
  Confirmed:  { text: 'text-teal-600',                 bg: 'bg-teal-100',   border: 'border-teal-100'  },
};

const typeIcon = {
  Medicines:   { icon: Pill,         bg: 'bg-blue-100',   color: 'text-[var(--color-primary)]' },
  'Lab Test':  { icon: FlaskConical, bg: 'bg-red-100',    color: 'text-red-500'                },
  Appointment: { icon: Calendar,     bg: 'bg-purple-100', color: 'text-purple-600'             },
};

const actionLabel = {
  Delivered: 'View Details', Completed: 'View Details',
  Confirmed: 'View Details', Shipped: 'Track Order', Processing: 'Track Order',
};

export default function OrderCard({ order }) {
  const navigate = useNavigate();
  const { icon: Icon, bg: iconBg, color: iconColor } = typeIcon[order.type] || typeIcon['Medicines'];
  const st = statusStyle[order.status] || statusStyle.Delivered;
  const itemLabel = order.type === 'Appointment' ? 'Appointment' : order.type === 'Lab Test' ? 'Test' : 'Item';

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] hover:shadow-md transition-all duration-200 p-5">
      <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">

        {/* Icon */}

    <div className="flex items-center gap-2"> {/* yaha gap control */}
    
    {/* Icon */}
    <div className={`${iconBg} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0`}>
      <Icon className={`w-7 h-7 ${iconColor}`} />
    </div>

    {/* Order info */}
    <div className="min-w-0">
      <div className="flex items-center gap-2 flex-wrap mb-1">
        <span className="font-bold text-[var(--color-text-dark)]">
          Order #{order.id}
        </span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${st.text} ${st.bg} ${st.border}`}>
          {order.status}
        </span>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)]">{order.type}</p>
      <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
        {order.date}
        <span className="mx-1.5">•</span>
        {order.items} {itemLabel}{order.items > 1 ? 's' : ''}
      </p>
    </div>
    </div>

        {/* Amount */}
        <div className="shrink-0 text-left md:text-center min-w-[90px]">
          <p className="text-lg font-bold text-[var(--color-text-dark)]">₹{order.amount.toLocaleString()}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">Total Amount</p>
        </div>

        {/* Delivery info */}
        <div className="shrink-0 min-w-[180px]">
          <p className="text-xs font-semibold text-[var(--color-text-dark)] mb-0.5">{order.deliveryLabel}</p>
          <p className="text-sm font-bold text-[var(--color-text-dark)]">{order.deliveryDate}</p>
          <p className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1 mt-0.5">
            {order.type === 'Appointment'
              ? order.address
              : <><MapPin className="w-3 h-3" />{order.address}</>
            }
          </p>
        </div>

        {/* Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate(`/order/${order.id}`)}
            className="border border-[var(--color-primary)] text-[var(--color-primary)] cursor-pointer hover:bg-blue-100 text-sm font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap">
            {actionLabel[order.status]}
          </button>
          <button
            onClick={() => navigate(`/order/${order.id}`)}
            className="w-9 h-9 border border-[var(--color-border)] cursor-pointer rounded-xl flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-blue-100 transition-all">
            <ChevronRight className="w-4 h-4 text-[var(--color-text-secondary)]" />
          </button>
        </div>
      </div>
    </div>
  );
}
