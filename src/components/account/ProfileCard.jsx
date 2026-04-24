import { User, CheckCircle, Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 flex items-center gap-6">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-[var(--color-primary-dark)] rounded-full flex items-center justify-center shadow-lg">
          {user?.profile_img?<img src={`${user?.profile_img}`} alt="" className="w-full h-full rounded-full"/>:<User className="w-10 h-10 text-white" />}
        </div>
        {/* <button className="absolute bottom-0 right-0 w-7 h-7 bg-[var(--color-primary)] rounded-full flex items-center justify-center border-2 border-white shadow">
          <Pencil className="w-3 h-3 text-white" />
        </button> */}
      </div>

      {/* Info */}
      <div >
        <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-1">{user?.name}</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-0.5">{user?.email || 'No email added'}</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-2">+91 {user?.mobile}</p>
        {user?.verified && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-success)] bg-[var(--color-success-bg)] px-2.5 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" /> Verified
          </span>
        )}
      </div>
    </div>
  );
}
