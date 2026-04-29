import { Heart, Star, Video, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export default function DoctorCard({ doctor }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { requireAuth } = useAuth();
  const wished = isWishlisted(doctor.id, 'doctor');
  const navigate = useNavigate();

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist({
      id: doctor.id, name: doctor.name, category: 'doctor',
      image: doctor.image, specialty: doctor.specialty,
      experience: doctor.experience, rating: doctor.rating,
      reviews: doctor.reviews, fee: doctor.fee,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] hover:border-blue-200 hover:shadow-lg transition-all duration-200 overflow-hidden group">
      {/* Image */}
      <div className="relative bg-gradient-to-b from-blue-50 to-slate-100 overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-32 object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart className={`w-4 h-4 transition-colors ${wished ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[var(--color-text-dark)] mb-0.5">{doctor.name}</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-2">{doctor.specialty}</p>

        {/* Rating + Experience */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-[var(--color-text-dark)]">{doctor.rating}</span>
            <span className="text-xs text-[var(--color-text-secondary)]">({doctor.reviews >= 1000 ? `${(doctor.reviews / 1000).toFixed(0)}k+` : `${doctor.reviews}+`})</span>
          </div>
          <span className="text-[var(--color-text-secondary)] text-xs">•</span>
          <span className="text-xs text-[var(--color-text-secondary)]">{doctor.experience} Yrs Exp</span>
        </div>

        {/* Fee + Consultation type */}
        <div className="mb-2">
          <span className="text-xl font-bold text-[var(--color-text-dark)]">₹{doctor.fee}</span>
          <div className="flex items-center gap-1 mt-0.5">
            {doctor.consultationType === 'Video Consultation'
              ? <Video className="w-3 h-3 text-[var(--color-primary)]" />
              : <Building2 className="w-3 h-3 text-[var(--color-text-secondary)]" />
            }
            <span className="text-xs text-[var(--color-text-secondary)]">{doctor.consultationType}</span>
          </div>
        </div>

        {/* Available Today badge */}
        {doctor.availableToday && (
          <div className="inline-flex items-center gap-1.5 bg-green-50 text-[var(--color-success)] text-xs font-semibold px-3 py-1.5 rounded-lg border border-green-100 mb-4">
            <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full" />
            Available Today
          </div>
        )}

        {/* Book Appointment */}
        <button
          onClick={() =>{console.log("button clicked"), requireAuth() && navigate(`/book-appointment/${doctor.id}`)}}
          className="w-full  bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] cursor-pointer text-white py-2.5 rounded-xl text-sm font-semibold transition-all">
          Book Appointment
        </button>
      </div>
    </div>
  );
}
