import { Clock, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';

const statusConfig = {
  Open:        { icon: AlertCircle,  text: 'text-orange-500',              bg: 'bg-orange-50',  border: 'border-orange-100' },
  'In Progress': { icon: Clock,      text: 'text-[var(--color-primary)]',  bg: 'bg-blue-50',    border: 'border-blue-100'   },
  Resolved:    { icon: CheckCircle,  text: 'text-[var(--color-success)]',  bg: 'bg-green-50',   border: 'border-green-100'  },
};

export default function TicketHistoryCard({ ticket }) {
  const config = statusConfig[ticket.status] || statusConfig.Open;
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] hover:shadow-md transition-all p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`${config.bg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
            <Icon className={`w-5 h-5 ${config.text}`} />
          </div>
          <div>
            <p className="font-bold text-[var(--color-text-dark)]">Ticket #{ticket.id}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{ticket.createdAt}</p>
          </div>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${config.text} ${config.bg} ${config.border}`}>
          {ticket.status}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div>
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-0.5">Issue</p>
          <p className="text-sm font-semibold text-[var(--color-text-dark)]">{ticket.issue}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-0.5">Description</p>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{ticket.description}</p>
        </div>
        {ticket.response && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 mt-3">
            <p className="text-xs font-semibold text-[var(--color-success)] mb-1 flex items-center gap-1">
              <MessageCircle className="w-3 h-3" /> Support Response
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">{ticket.response}</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">Updated: {ticket.updatedAt}</p>
          </div>
        )}
      </div>

      {ticket.image && (
        <img src={ticket.image} alt="Issue" className="w-full h-32 object-cover rounded-xl border border-[var(--color-border)]" />
      )}
    </div>
  );
}
