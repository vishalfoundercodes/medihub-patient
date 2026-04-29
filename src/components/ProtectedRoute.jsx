import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, authLoading, setShowLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setShowLogin(true);
      navigate('/');
    }
  }, [authLoading, user]);

  if (authLoading) return null;
  if (!user) return null;

  return children;
}
