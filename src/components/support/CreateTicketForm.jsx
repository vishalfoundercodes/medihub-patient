import { useState } from 'react';
import { FileText, Image, Send, X, Loader2 } from 'lucide-react';
import api, { apis } from '../../utlities/api';

export default function CreateTicketForm({ onSuccess }) {
  const [form, setForm] = useState({ title: '', description: '', image: null });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((p) => ({ ...p, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      if (form.image) formData.append('image', form.image);

      const res = await api.post(apis.createSupportTicket, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setForm({ title: '', description: '', image: null });
        setPreview(null);
        setErrors({});
        onSuccess(res.data.message || 'Ticket created successfully!');
      } else {
        setErrors((p) => ({ ...p, submit: res.data.message || 'Failed to create ticket.' }));
      }
    } catch (err) {
      setErrors((p) => ({ ...p, submit: err?.response?.data?.message || 'Network error. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-5">Create Support Ticket</h3>
      <div className="space-y-4">

        {/* Title */}
        <div>
          <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Title *</label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input
              type="text"
              value={form.title}
              onChange={(e) => { setForm((p) => ({ ...p, title: e.target.value })); setErrors((p) => ({ ...p, title: '' })); }}
              placeholder="Enter ticket title"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${errors.title ? 'border-red-400' : 'border-[var(--color-border)]'}`}
            />
          </div>
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => { setForm((p) => ({ ...p, description: e.target.value })); setErrors((p) => ({ ...p, description: '' })); }}
            placeholder="Describe your issue in detail..."
            rows={5}
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none ${errors.description ? 'border-red-400' : 'border-[var(--color-border)]'}`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Attach Image (Optional)</label>
          {!preview ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-border)] rounded-xl p-6 cursor-pointer hover:border-[var(--color-primary)] hover:bg-blue-50 transition-all">
              <Image className="w-8 h-8 text-[var(--color-text-secondary)] mb-2" />
              <p className="text-sm font-medium text-[var(--color-text-dark)] mb-1">Upload Screenshot</p>
              <p className="text-xs text-[var(--color-text-secondary)]">PNG, JPG up to 5MB</p>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          ) : (
            <div className="relative border border-[var(--color-border)] rounded-xl overflow-hidden">
              <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
              <button onClick={() => { setForm((p) => ({ ...p, image: null })); setPreview(null); }}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {errors.submit && (
          <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2">{errors.submit}</p>
        )}

        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-100">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? 'Creating Ticket...' : 'Create Ticket'}
        </button>
      </div>
    </div>
  );
}
