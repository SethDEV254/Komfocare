import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Home Care Inquiry',
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
        <div className="text-label">COORDINATION DESK / HELPLINE</div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-display-massive text-white tracking-tight">
          Speak with Our Clinical Coordination Team.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Have inquiries regarding specialized home nursing, geriatric companionship, or scheduling in your specific Nairobi neighborhood? Our coordinators are available to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl p-8 sm:p-10 glass-surface border border-white/10 space-y-6 shadow-2xl">
            <h3 className="text-2xl font-bold font-display text-white">KomfoCare Headquarters</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Serving patients across Nairobi Metropolitan and surrounding hubs with prompt scheduled home healthcare.
            </p>

            <div className="space-y-5 text-xs font-mono">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-komfo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase tracking-wider">Clinical Care Helpline</p>
                  <a href="tel:+254700000000" className="text-amber-400 hover:underline">
                    +254 700 000 000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-komfo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase tracking-wider">Email Coordination</p>
                  <a href="mailto:care@komfocare.com" className="text-slate-300 hover:text-white">
                    care@komfocare.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-komfo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase tracking-wider">Physical Office</p>
                  <p className="text-slate-400">Riverside Square, Westlands, Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-komfo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase tracking-wider">Operational Window</p>
                  <p className="text-slate-400">Monday – Sunday: 07:00 AM – 09:00 PM</p>
                </div>
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
                  Thank you. A KomfoCare clinical coordinator will contact you shortly to address your inquiry.
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
                <h3 className="text-2xl font-bold font-display text-white mb-2">Send an Inquiry</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-mono tracking-wider text-slate-300 mb-1.5 font-bold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Karanja"
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
                      placeholder="+254 7XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-komfo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-mono tracking-wider text-slate-300 mb-1.5 font-bold">
                      Care Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#180826] border border-white/15 text-white focus:outline-none focus:border-komfo-400"
                    >
                      <option value="Home Nursing Care">Home Nursing Care</option>
                      <option value="Elderly Care">Elderly Care</option>
                      <option value="Post-Surgery Recovery">Post-Surgery Recovery</option>
                      <option value="Medication Management">Medication Management</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-mono tracking-wider text-slate-300 mb-1.5 font-bold">
                    Message / Clinical Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the patient's condition, requirements, or location..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-komfo-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
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
