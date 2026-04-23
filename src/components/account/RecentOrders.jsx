import { ShoppingBag, FlaskConical } from 'lucide-react';
import { MOCK_ORDERS } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const statusStyle = {
  Delivered: 'bg-green-100 text-[var(--color-success)]',
  Completed: 'bg-blue-100 text-[var(--color-primary)]',
  Shipped: 'bg-purple-100 text-purple-600',
  Processing: 'bg-orange-100 text-orange-500',
};

export default function RecentOrders() {
  const navigate=useNavigate()
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-[var(--color-text-dark)]">Recent Orders</h3>
        <button className="text-sm font-semibold text-[var(--color-primary)] cursor-pointer hover:underline"
        onClick={()=>navigate("/orders")}
        >View All</button>
      </div>

      <div className="space-y-3">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--color-bg-section)] transition-colors">
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${order.type === 'Medicines' ? 'bg-blue-100' : 'bg-teal-100'}`}>
              {order.type === 'Medicines'
                ? <ShoppingBag className="w-5 h-5 text-[var(--color-primary)]" />
                : <FlaskConical className="w-5 h-5 text-teal-600" />
              }
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[var(--color-text-dark)]">Order #{order.id}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{order.type}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{order.date}</p>
            </div>

            {/* Amount + Status */}
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-[var(--color-text-dark)] mb-1">₹{order.amount.toLocaleString()}</p>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
