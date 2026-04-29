import { Clock, CheckCircle, AlertCircle, XCircle, MessageCircle } from 'lucide-react';

const statusConfig = {
  pending:  { icon: Clock,        text: 'text-orange-500',             bg: 'bg-orange-50', border: 'border-orange-100', label: 'Pending'  },
  resolved: { icon: CheckCircle,  text: 'text-[var(--color-success)]', bg: 'bg-green-50',  border: 'border-green-100',  label: 'Resolved' },
  rejected: { icon: XCircle,      text: 'text-red-500',                bg: 'bg-red-50',    border: 'border-red-100',    label: 'Rejected' },
};

export default function TicketHistoryCard({ ticket }) {
  const config = statusConfig[ticket.status] || statusConfig.pending;
  const Icon = config.icon;
  const createdDate = new Date(ticket.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] hover:shadow-md transition-all p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`${config.bg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
            <Icon className={`w-5 h-5 ${config.text}`} />
          </div>
          <div>
            <p className="font-bold text-[var(--color-text-dark)]">#{ticket.id} — {ticket.title}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{createdDate}</p>
          </div>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border shrink-0 ${config.text} ${config.bg} ${config.border}`}>
          {config.label}
        </span>
      </div>

      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">{ticket.description}</p>

      {ticket.image_url && (
        <img src={ticket.image_url} alt="Issue" className="w-full h-32 object-cover rounded-xl border border-[var(--color-border)] mb-3" />
      )}

      {ticket.admin_note && (
        <div className={`border rounded-xl p-3 ${config.status === 'rejected' ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
          <p className={`text-xs font-semibold mb-1 flex items-center gap-1 ${config.text}`}>
            <MessageCircle className="w-3 h-3" /> Admin Response
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">{ticket.admin_note}</p>
          {ticket.resolved_at && (
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              {new Date(ticket.resolved_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
