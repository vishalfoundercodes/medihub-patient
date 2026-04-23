import { useState } from 'react';
import { User, FileText, Image, Send, X, Loader2 } from 'lucide-react';
import { ISSUE_CATEGORIES } from '../../data/supportData';

export default function CreateTicketForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', issue: '', description: '', image: null });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.issue) e.issue = 'Please select an issue category';
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

  const handleRemoveImage = () => {
    setForm((p) => ({ ...p, image: null }));
    setPreview(null);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      onSubmit(form);
      setForm({ name: '', issue: '', description: '', image: null });
      setPreview(null);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
      <h3 className="font-bold text-[var(--color-text-dark)] mb-5">Create Support Ticket</h3>
      <div className="space-y-4">

        {/* Name */}
        <div>
          <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Your Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input
              type="text"
              value={form.name}
              onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: '' })); }}
              placeholder="Enter your name"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${errors.name ? 'border-red-400' : 'border-[var(--color-border)]'}`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Issue Category */}
        <div>
          <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Issue Category</label>
          <select
            value={form.issue}
            onChange={(e) => { setForm((p) => ({ ...p, issue: e.target.value })); setErrors((p) => ({ ...p, issue: '' })); }}
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${errors.issue ? 'border-red-400' : 'border-[var(--color-border)]'}`}
          >
            <option value="">Select issue category</option>
            {ISSUE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.issue && <p className="text-red-500 text-xs mt-1">{errors.issue}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">Issue Description</label>
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
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-100"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? 'Creating Ticket...' : 'Create Ticket'}
        </button>
      </div>
    </div>
  );
}
