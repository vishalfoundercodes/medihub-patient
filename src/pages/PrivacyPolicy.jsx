import { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import api, { apis } from '../utlities/api';

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await api.get(apis.privacyPolicy);
        if (res.data.success) setPolicy(res.data.data.policy);
        else setError(res.data.message || 'Failed to load privacy policy.');
      } catch (err) {
        setError(err.response?.data?.message || 'Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8 max-w-4xl">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-24 text-center gap-3">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8">
            <h1 className="text-2xl font-bold text-[var(--color-text-dark)] mb-2">{policy.title}</h1>
            <p className="text-xs text-[var(--color-text-secondary)] mb-6">
              Last updated: {new Date(policy.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <div
              className="prose prose-sm max-w-none text-[var(--color-text-secondary)] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: policy.content }}
            />
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}
