import { useEffect, useState } from 'react';
import { ShoppingBag, FlaskConical, Calendar, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getOrdersAPI } from '../../services/cartService';

const statusStyle = {
  placed:    'bg-orange-100 text-orange-500',
  confirmed: 'bg-teal-100 text-teal-600',
  shipped:   'bg-purple-100 text-purple-600',
  delivered: 'bg-green-100 text-green-600',
  completed: 'bg-blue-100 text-blue-600',
  cancelled: 'bg-red-100 text-red-500',
};

const statusLabel = {
  placed: 'Processing', confirmed: 'Confirmed', shipped: 'Shipped',
  delivered: 'Delivered', completed: 'Completed', cancelled: 'Cancelled',
};

const getTypeIcon = (items) => {
  const type = items?.[0]?.type;
  if (type === 'lab_test') return { Icon: FlaskConical, bg: 'bg-teal-100', color: 'text-teal-600' };
  if (type === 'appointment') return { Icon: Calendar, bg: 'bg-purple-100', color: 'text-purple-600' };
  return { Icon: ShoppingBag, bg: 'bg-blue-100', color: 'text-[var(--color-primary)]' };
};

export default function RecentOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersAPI()
      .then((res) => { if (res.success) setOrders(res.data.orders.slice(0, 5)); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-[var(--color-text-dark)]">Recent Orders</h3>
        <button className="text-sm font-semibold text-[var(--color-primary)] cursor-pointer hover:underline" onClick={() => navigate('/orders')}>
          View All
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-sm text-[var(--color-text-secondary)] text-center py-6">No orders yet</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const { Icon, bg, color } = getTypeIcon(order.items);
            const date = new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
            return (
              <div key={order.id} onClick={() => navigate(`/order/${order.uid}`)}
                className="flex items-center gap-4 p-2 rounded-xl hover:bg-[var(--color-bg-section)] transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[var(--color-text-dark)]">{order.uid}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-[var(--color-text-dark)] mb-1">₹{parseFloat(order.total_amount).toLocaleString()}</p>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[order.status] || 'bg-gray-100 text-gray-500'}`}>
                    {statusLabel[order.status] || order.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
