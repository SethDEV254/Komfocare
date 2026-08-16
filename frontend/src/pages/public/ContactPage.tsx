import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
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
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
          Contact & Coordination
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-navy-900 tracking-tight">
          We are Here to Help Your Family
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Have questions about home nursing care, senior companionship, or coverage in your area? Speak with our care coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-navy-950 text-white rounded-3xl p-8 space-y-6 shadow-elevated">
            <h3 className="text-xl font-bold font-display">KomfoCare Headquarters</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Serving patients across Nairobi Metropolitan and surrounding regions with scheduled home-based healthcare.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-komfo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Call Helpline</p>
                  <a href="tel:+254700000000" className="text-slate-300 hover:text-white">
                    +254 700 000 000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-komfo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Support Email</p>
                  <a href="mailto:care@komfocare.com" className="text-slate-300 hover:text-white">
                    care@komfocare.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-komfo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Operating Hours</p>
                  <p className="text-slate-300">Monday – Saturday: 7:00 AM – 8:00 PM</p>
                  <p className="text-slate-300">Sunday: 8:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Emergency Guidance:</strong> If you or a loved one are experiencing acute, life-threatening symptoms (chest pain, acute stroke signs, severe trauma), please call 999 or proceed directly to an emergency hospital casualty.
            </p>
          </div>
        </div>

        {/* Right: Interactive Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-subtle">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-navy-900">Message Received</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for contacting KomfoCare. Our care coordinator will respond to your message promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="text-xl font-bold font-display text-navy-900 mb-2">Send Us an Inquiry</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Karanja"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none bg-white text-slate-700"
                >
                  <option>General Home Care Inquiry</option>
                  <option>Elderly Care Consultation</option>
                  <option>Post-Surgery Recovery Setup</option>
                  <option>Pricing & Caregiver Training</option>
                  <option>Service Area Coverage Check</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you or your family member?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-navy-900 to-komfo-700 hover:from-navy-950 hover:to-komfo-800 text-white font-semibold text-xs shadow-md transition-all"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
