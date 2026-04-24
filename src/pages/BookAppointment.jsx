import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, Video, Building2, User, Calendar,
  CheckCircle, Loader2, ShieldCheck, FileText,
  Clock, Stethoscope, Upload, X, FileImage, File
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import { doctors } from '../data/doctorsData';

const TIME_SLOTS = {
  morning:   ['7:00 AM - 8:00 AM', '8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM'],
  afternoon: ['12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM'],
  evening:   ['5:00 PM - 6:00 PM', '6:00 PM - 7:00 PM', '7:00 PM - 8:00 PM'],
};

const getAvailableDates = () => {
  const dates = [];
  for (let i = 0; i <= 6; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push({
      value: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-IN', { month: 'short' }),
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : '',
    });
  }
  return dates;
};

const CONSULTATION_TYPES = [
  {
    id: 'clinic',
    label: 'In-Clinic Visit',
    icon: Building2,
    desc: 'Visit the doctor at their clinic',
    color: 'text-[var(--color-primary)]',
    bg: 'bg-blue-50',
  },
  {
    id: 'video',
    label: 'Video Consultation',
    icon: Video,
    desc: 'Consult online from home',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
];

export default function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === Number(id));

  const [consultationType, setConsultationType] = useState('clinic');
  const [form, setForm] = useState({ patientName: '', age: '', gender: '', reason: '' });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reports, setReports] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newReports = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type.startsWith('image/') ? 'image' : 'pdf',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));
    setReports((prev) => [...prev, ...newReports]);
    e.target.value = '';
  };

  const removeReport = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: '' }));
  };

  const dates = getAvailableDates();

  const validate = () => {
    const e = {};
    // if (!form.patientName.trim()) e.patientName = 'Patient name is required';
    if (!form.age || isNaN(form.age) || form.age < 1) e.age = 'Valid age is required';
    if (!form.gender) e.gender = 'Gender is required';
    if (!selectedDate) e.date = 'Please select a date';
    if (!selectedTime) e.time = 'Please select a time slot';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20 text-center">
          <p className="text-5xl mb-4">👨‍⚕️</p>
          <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-4">Doctor not found</h2>
          <button onClick={() => navigate('/doctors')} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold">
            Browse Doctors
          </button>
        </Container>
        <Footer />
      </div>
    );
  }

  // ── Success screen ──
  if (success) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <Navbar />
        <Container className="py-20">
          <div className="max-w-lg mx-auto bg-white rounded-3xl border border-[var(--color-border)] p-10 text-center shadow-xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-11 h-11 text-[var(--color-success)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-2">Appointment Confirmed!</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Your appointment with <span className="font-semibold text-[var(--color-text-dark)]">{doctor.name}</span> has been booked successfully.
            </p>

            <div className="bg-[var(--color-bg-section)] rounded-2xl p-4 text-left mb-6 space-y-2.5">
              <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2">APPOINTMENT DETAILS</p>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Doctor</span>
                <span className="font-semibold text-[var(--color-text-dark)]">{doctor.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Patient</span>
                <span className="font-semibold text-[var(--color-text-dark)]">
                  {/* {form.patientName},  */}
                  {form.age} yrs</span>

              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Date & Time</span>
                <span className="font-semibold text-[var(--color-text-dark)]">{selectedDate} • {selectedTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Type</span>
                <span className="font-semibold text-[var(--color-text-dark)]">{consultationType === 'video' ? 'Video Consultation' : 'In-Clinic Visit'}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-[var(--color-border)] pt-2 mt-2">
                <span className="font-bold text-[var(--color-text-dark)]">Consultation Fee</span>
                <span className="font-bold text-[var(--color-primary)]">₹{doctor.fee}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => navigate('/appointments')} className="flex-1 border cursor-pointer border-[var(--color-border)] text-[var(--color-text-dark)] font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all text-sm">
                My Appointments
              </button>
              <button onClick={() => navigate('/')} className="flex-1 bg-[var(--color-primary)] cursor-pointer text-white font-semibold py-3 rounded-xl hover:bg-[var(--color-primary-dark)] transition-all text-sm">
                Go to Home
              </button>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">
        {/* Back + Title */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Doctors
          </button>
          <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">
            Book Appointment
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Fill in the details to confirm your appointment
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-7">
          {/* ── Left — Form (2/3) ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Card */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
              <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[var(--color-bg-section)] shrink-0 border border-[var(--color-border)]">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-lg text-[var(--color-text-dark)] mb-0.5">
                    {doctor.name}
                  </h2>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    {doctor.specialty} • {doctor.experience} Yrs Experience
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-[var(--color-text-dark)]">
                        {doctor.rating}
                      </span>
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        ({doctor.reviews}+ reviews)
                      </span>
                    </div>
                    {doctor.availableToday && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-[var(--color-success)] bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full" />{" "}
                        Available Today
                      </span>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-[var(--color-text-dark)]">
                      ₹{doctor.fee}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Consultation Fee
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Type */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[var(--color-primary)]" />
                Consultation Type
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {CONSULTATION_TYPES.map(
                  ({ id, label, icon: Icon, desc, color, bg }) => (
                    <div
                      key={id}
                      onClick={() => setConsultationType(id)}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${
                        consultationType === id
                          ? "border-[var(--color-primary)] bg-blue-50"
                          : "border-[var(--color-border)] hover:border-blue-200"
                      }`}
                    >
                      <div
                        className={`${bg} w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}
                      >
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-[var(--color-text-dark)] mb-0.5">
                          {label}
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)]">
                          {desc}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5
                      ${consultationType === id ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--color-border)]"}`}
                      >
                        {consultationType === id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Date Selection */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
                Select Date
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 overflow-x-auto scrollbar-hide pb-1">
                {dates.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => {
                      setSelectedDate(d.value);
                      setErrors((p) => ({ ...p, date: "" }));
                    }}
                    className={`flex flex-col cursor-pointer items-center px-4 py-3 rounded-xl border transition-all shrink-0 min-w-[64px]
                      ${
                        selectedDate === d.value
                          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-blue-100"
                          : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                      }`}
                  >
                    <span className="text-xs font-medium">{d.day}</span>
                    <span className="text-lg font-bold leading-tight">
                      {d.date}
                    </span>
                    <span className="text-xs">{d.month}</span>
                    {d.label && (
                      <span
                        className={`text-[10px] font-bold mt-0.5 ${selectedDate === d.value ? "text-blue-100" : "text-[var(--color-primary)]"}`}
                      >
                        {d.label}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {errors.date && (
                <p className="text-red-500 text-xs mt-2">{errors.date}</p>
              )}
            </div>

            {/* Time Slots */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--color-primary)]" />
                Select Time Slot
              </h3>
              {Object.entries(TIME_SLOTS).map(([period, slots]) => (
                <div key={period} className="mb-4">
                  {/* <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-2 capitalize">
                    {period}
                  </p> */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedTime(slot);
                          setErrors((p) => ({ ...p, time: "" }));
                        }}
                        className={`px-1 py-2 cursor-pointer rounded-xl border text-sm font-medium transition-all
                          ${
                            selectedTime === slot
                              ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                              : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                          }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {errors.time && (
                <p className="text-red-500 text-xs mt-1">{errors.time}</p>
              )}
            </div>

            {/* Patient Details */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-5 flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--color-primary)]" />
                Patient Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                {/* <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    value={form.patientName}
                    onChange={(e) => set("patientName", e.target.value)}
                    placeholder="Enter patient full name"
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${errors.patientName ? "border-red-400" : "border-[var(--color-border)]"}`}
                  />
                  {errors.patientName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.patientName}
                    </p>
                  )}
                </div> */}

                {/* Age */}
                <div>
                  <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => set("age", e.target.value)}
                    placeholder="Age in years"
                    min={1}
                    max={120}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${errors.age ? "border-red-400" : "border-[var(--color-border)]"}`}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">
                    Gender *
                  </label>
                  <select
                    value={form.gender}
                    onChange={(e) => set("gender", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${errors.gender ? "border-red-400" : "border-[var(--color-border)]"}`}
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>

                {/* Phone */}

                {/* Reason */}
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-[var(--color-text-dark)] mb-2 block">
                    Reason for Visit{" "}
                    <span className="text-[var(--color-text-secondary)] font-normal">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    value={form.reason}
                    onChange={(e) => set("reason", e.target.value)}
                    placeholder="Describe your symptoms or reason for visit..."
                    rows={3}
                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Upload Reports */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-1 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[var(--color-primary)]" />
                Upload Reports
                <span className="text-xs font-normal text-[var(--color-text-secondary)] ml-1">
                  (Optional)
                </span>
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mb-4">
                Share previous reports, prescriptions or test results with the
                doctor
              </p>

              {/* Drop zone */}
              <div
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload({
                    target: { files: e.dataTransfer.files },
                    value: "",
                  });
                }}
                className="border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)] rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-blue-50 group"
              >
                <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                  <Upload className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                  Click or drag files here
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  PDF, JPG, PNG supported • Max 10MB per file
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Uploaded files list */}
              {reports.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {reports.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-center gap-3 p-3 bg-[var(--color-bg-section)] rounded-xl border border-[var(--color-border)]"
                    >
                      {r.type === "image" && r.preview ? (
                        <img
                          src={r.preview}
                          alt={r.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-red-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text-dark)] truncate">
                          {r.name}
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)]">
                          {r.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeReport(r.id)}
                        className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors shrink-0"
                      >
                        <X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-red-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ── Right — Booking Summary (1/3) ── */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sticky top-24">
              <h3 className="font-bold text-[var(--color-text-dark)] mb-4">
                Booking Summary
              </h3>

              {/* Doctor mini */}
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-border)] mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-xl object-cover object-top"
                />
                <div>
                  <p className="font-bold text-sm text-[var(--color-text-dark)]">
                    {doctor.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {doctor.specialty}
                  </p>
                </div>
              </div>

              {/* Summary rows */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Stethoscope className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  <span className="text-[var(--color-text-secondary)]">
                    Type:
                  </span>
                  <span className="font-semibold text-[var(--color-text-dark)]">
                    {consultationType === "video"
                      ? "Video Consultation"
                      : "In-Clinic Visit"}
                  </span>
                </div>
                {selectedDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span className="text-[var(--color-text-secondary)]">
                      Date:
                    </span>
                    <span className="font-semibold text-[var(--color-text-dark)]">
                      {selectedDate}
                    </span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span className="text-[var(--color-text-secondary)]">
                      Time:
                    </span>
                    <span className="font-semibold text-[var(--color-text-dark)]">
                      {selectedTime}
                    </span>
                  </div>
                )}
                {form.patientName && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span className="text-[var(--color-text-secondary)]">
                      Patient:
                    </span>
                    <span className="font-semibold text-[var(--color-text-dark)]">
                      {/* {form.patientName} */}
                      {form.age ? `, ${form.age} yrs` : ""}
                    </span>
                  </div>
                )}
              </div>

              {/* Fee */}
              <div className="border-t border-dashed border-[var(--color-border)] pt-4 mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--color-text-secondary)]">
                    Consultation Fee
                  </span>
                  <span className="font-medium">₹{doctor.fee}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--color-text-secondary)]">
                    Platform Fee
                  </span>
                  <span className="font-medium text-[var(--color-success)]">
                    FREE
                  </span>
                </div>
                <div className="flex justify-between font-bold mt-3 pt-3 border-t border-[var(--color-border)]">
                  <span className="text-[var(--color-text-dark)]">
                    Total Amount
                  </span>
                  <span className="text-xl text-[var(--color-text-dark)]">
                    ₹{doctor.fee}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 text-white font-bold py-4 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100 text-sm"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                {loading ? "Confirming..." : "Confirm Appointment"}
              </button>

              {/* Trust */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" />
                  Verified Doctor
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" />
                  Secure Booking
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
