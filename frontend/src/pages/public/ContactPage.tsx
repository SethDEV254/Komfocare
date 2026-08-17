import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Globe,
  User,
  QrCode,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Home Nursing Care',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-label">KOMFOCARE HOME-BASED SERVICES • CONTACT</div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-display-massive text-white tracking-tight">
          Speak with Our Clinical Coordination Team.
        </h1>
        <p className="text-base sm:text-lg text-amber-300 font-semibold leading-relaxed">
          "We come to you, so you can stay where you feel safe."
        </p>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Have inquiries regarding home nursing, senior support, post-surgery recovery, or booking in Nairobi? Our care desk is ready to assist your family.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl p-8 sm:p-10 glass-surface border border-white/10 space-y-6 shadow-2xl">
            <div>
              <span className="text-xl font-bold font-display text-white block">KOMFOCARE</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                HOME-BASED SERVICES
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Professional care. Personal touch. Peace of mind. Delivering hospital-standard care in the comfort of your home across Nairobi, Kenya.
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">Direct Helpline / Booking</p>
                  <a href="tel:0792004232" className="text-amber-400 font-bold text-base hover:underline">
                    0792004232
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-komfo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">Booking & Support Email</p>
                  <a href="mailto:komfocare@gmail.com" className="text-slate-200 hover:text-white font-bold">
                    komfocare@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">Founder & Executive Contact</p>
                  <p className="text-white font-bold">OBIERO SHANICE AUMA</p>
                  <a href="mailto:obieroshanice@gmail.com" className="text-slate-300 hover:text-white underline text-[11px]">
                    obieroshanice@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">Location</p>
                  <p className="text-slate-300 font-bold">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-komfo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">Official Website</p>
                  <span className="text-slate-300 font-bold">www.komfocare.com</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block">
                Social Media Channels
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <a
                  href="https://facebook.com/KomfoCare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-komfo-400 text-slate-300 hover:text-white transition-colors"
                >
                  Facebook: KomfoCare
                </a>
                <a
                  href="https://instagram.com/KomfoCare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-komfo-400 text-slate-300 hover:text-white transition-colors"
                >
                  Instagram: @KomfoCare
                </a>
                <a
                  href="https://x.com/KomfoCare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-komfo-400 text-slate-300 hover:text-white transition-colors"
                >
                  Twitter/X: @KomfoCare
                </a>
              </div>
            </div>

            {/* Quick QR Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0">
                <QrCode className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono">
                <span className="text-white font-bold block">Scan to connect with us</span>
                <span className="text-slate-400 text-[11px]">Direct mobile booking & dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl p-8 sm:p-10 glass-card border border-white/15 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white">Inquiry Received</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you. A KomfoCare clinical coordinator will contact you promptly at <strong className="text-amber-400 font-mono">{formData.phone || 'your phone number'}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-white/10 text-white font-mono text-xs uppercase"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
                <div className="space-y-1 mb-2">
                  <h3 className="text-2xl font-bold font-display text-white">Send an Inquiry or Request Care</h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Fill out this form or call <strong className="text-amber-400 font-mono">0792004232</strong> for immediate assistance.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-mono tracking-wider text-slate-300 mb-1.5 font-bold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mary Achieng"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-komfo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-mono tracking-wider text-slate-300 mb-1.5 font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-komfo-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-mono tracking-wider text-slate-300 mb-1.5 font-bold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="07XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-komfo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-mono tracking-wider text-slate-300 mb-1.5 font-bold">
                      Care Service Required
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#180826] border border-white/15 text-white focus:outline-none focus:border-komfo-400 font-sans"
                    >
                      <option value="Home Nursing Care">Home Nursing Care</option>
                      <option value="Elderly Care">Elderly Care</option>
                      <option value="Post-Surgery Care">Post-Surgery Care</option>
                      <option value="Medication Management">Medication Management</option>
                      <option value="Palliative Care">Palliative Care</option>
                      <option value="Patient Escort Services">Patient Escort Services</option>
                      <option value="Vital Signs Monitoring">Vital Signs Monitoring</option>
                      <option value="Health Education">Health Education</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-mono tracking-wider text-slate-300 mb-1.5 font-bold">
                    Message / Patient Details / Location *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the patient's condition, required schedule, or location in Nairobi..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-komfo-400 font-sans leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2 font-mono"
                >
                  <span>Submit Inquiry to Care Desk</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
