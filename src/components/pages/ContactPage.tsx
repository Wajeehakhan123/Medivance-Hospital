import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  Car,
  Compass,
  AlertCircle
} from 'lucide-react';
import { PageId } from '../../types';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenBookingModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 uppercase tracking-wider">
            24/7 Hospital Desk
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Contact & Campus Location
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get in touch with our administrative desks, billing inquiries, patient relations, or visit our medical campus in Metro City.
          </p>
        </div>
      </section>

      {/* Main 2-Column: Form + Contact Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="space-y-2 mb-6">
              <h3 className="text-xl font-bold text-slate-900">Send an Enquiry or Message</h3>
              <p className="text-xs text-slate-500">
                Our patient response team reviews and replies to online inquiries within 2 business hours.
              </p>
            </div>

            {isSent ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-emerald-950 text-base">Message Successfully Sent!</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your enquiry regarding "{formData.subject}" has been assigned to our patient relations department. We will reach you via {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Green"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Enquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="General Enquiry">General Hospital Enquiry</option>
                      <option value="Billing & Insurance">Billing & Insurance Query</option>
                      <option value="Medical Records">Medical Records (MRD) Request</option>
                      <option value="Feedback / Grievance">Patient Feedback / Experience</option>
                      <option value="International Patients">International Patient Assistance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message / Question <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe how we can assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Key Phone Numbers & Campus Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hospital Contact Info Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Hospital Phone Directory</h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-rose-900">24/7 Emergency Line</p>
                    <p className="text-[11px] text-rose-700">Ambulance & Trauma</p>
                  </div>
                  <a href="tel:5559112273" className="font-mono font-bold text-rose-700 text-sm hover:underline">
                    (555) 911-CARE
                  </a>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">OPD & Appointments Desk</p>
                    <p className="text-[11px] text-slate-500">8:00 AM – 8:00 PM</p>
                  </div>
                  <a href="tel:5550192834" className="font-mono font-bold text-blue-700 text-sm">
                    (555) 019-2834
                  </a>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">Billing & TPA Insurance</p>
                    <p className="text-[11px] text-slate-500">24/7 On-Call Desk</p>
                  </div>
                  <span className="font-mono font-bold text-slate-700 text-sm">
                    (555) 019-2835
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">Medical Records (MRD)</p>
                    <p className="text-[11px] text-slate-500">Mon–Sat (9 AM – 5 PM)</p>
                  </div>
                  <span className="font-mono font-bold text-slate-700 text-sm">
                    (555) 019-2840
                  </span>
                </div>
              </div>
            </div>

            {/* Campus Address Box */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Campus Physical Location</h4>
                  <p className="mt-1">
                    Medivance Hospital Complex<br />
                    742 Healthcare Boulevard, Medical District<br />
                    Metro City, MC 90210
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-emerald-600" />
                  <span><strong>Parking:</strong> 4-level covered parking garage + 24/7 valet service.</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-sky-600" />
                  <span><strong>Transit:</strong> Medical District Metro Station (Exit 3) — 2 mins walk.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
