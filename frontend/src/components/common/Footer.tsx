import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Globe,
  QrCode,
  Sparkles,
  ShieldCheck,
  User,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050007] text-slate-400 pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-komfo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Newsletter / Quick Consultation Row */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0e0413] border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <div className="text-label">NEWSLETTER & HEALTH UPDATES</div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              Compassionate Care. Right at Home.
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              We come to you, so you can stay where you feel safe. Subscribe for health guides, elderly care insights, and service updates in Nairobi.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to KomfoCare updates.');
            }}
            className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              className="px-5 py-3 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-komfo-400 w-full sm:w-72"
            />
            <button
              type="submit"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-komfo-600 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all flex items-center justify-center gap-1.5 flex-shrink-0"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Main Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Story & Founder */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-komfo-600 to-amber-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <div>
                <span className="text-xl font-bold font-display tracking-tight text-white block">
                  KOMFOCARE
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block">
                  HOME-BASED SERVICES
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans">
              <strong className="text-white">Professional care. Personal touch. Peace of mind.</strong>
              <br />
              We bring quality care to you, so you can focus on what matters most. Providing personalized home healthcare across Nairobi, Kenya.
            </p>

            {/* Founder Note */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-[11px]">
                <User className="w-3.5 h-3.5" />
                <span>Founder: OBIERO SHANICE AUMA</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Executive Contact:{' '}
                <a href="mailto:obieroshanice@gmail.com" className="text-slate-300 hover:text-white underline">
                  obieroshanice@gmail.com
                </a>
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-2 font-bold">
                Connect With Us
              </span>
              <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
                <a
                  href="https://facebook.com/KomfoCare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-komfo-400 hover:text-white transition-colors"
                >
                  Facebook: KomfoCare
                </a>
                <a
                  href="https://instagram.com/KomfoCare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-komfo-400 hover:text-white transition-colors"
                >
                  Instagram: @KomfoCare
                </a>
                <a
                  href="https://x.com/KomfoCare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-komfo-400 hover:text-white transition-colors"
                >
                  Twitter/X: @KomfoCare
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Care Services */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] font-mono text-amber-400 mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/services/home-nursing-care" className="hover:text-white transition-colors">
                  Home Nursing Care
                </Link>
              </li>
              <li>
                <Link to="/services/elderly-care" className="hover:text-white transition-colors">
                  Elderly Care
                </Link>
              </li>
              <li>
                <Link to="/services/post-surgery-care" className="hover:text-white transition-colors">
                  Post-Surgery Care
                </Link>
              </li>
              <li>
                <Link to="/services/medication-management" className="hover:text-white transition-colors">
                  Medication Management
                </Link>
              </li>
              <li>
                <Link to="/services/palliative-care" className="hover:text-white transition-colors">
                  Palliative Care
                </Link>
              </li>
              <li>
                <Link to="/services/patient-escort" className="hover:text-white transition-colors">
                  Patient Escort Services
                </Link>
              </li>
              <li>
                <Link to="/services/vital-signs-monitoring" className="hover:text-white transition-colors">
                  Vital Signs Monitoring
                </Link>
              </li>
              <li>
                <Link to="/services/health-education" className="hover:text-white transition-colors">
                  Health Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Navigation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] font-mono text-amber-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About KomfoCare
                </Link>
              </li>
              <li>
                <Link to="/professionals" className="hover:text-white transition-colors">
                  Healthcare Professionals
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Health Resources & Guides
                </Link>
              </li>
              <li>
                <Link to="/track-request" className="hover:text-white transition-colors">
                  Track Request Status
                </Link>
              </li>
              <li>
                <Link to="/book-care" className="hover:text-white transition-colors font-bold text-amber-300">
                  Book Care Today
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Coordinates & QR */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] font-mono text-amber-400 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-komfo-400 flex-shrink-0 mt-0.5" />
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-komfo-400 flex-shrink-0" />
                <a href="tel:0792004232" className="hover:text-white font-mono font-bold text-slate-200">
                  0792004232
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-komfo-400 flex-shrink-0" />
                <a href="mailto:komfocare@gmail.com" className="hover:text-white font-mono text-slate-200">
                  komfocare@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-komfo-400 flex-shrink-0" />
                <span className="font-mono">www.komfocare.com</span>
              </li>
            </ul>

            {/* Quick QR Connect Widget */}
            <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-mono leading-tight">
                <span className="text-white font-bold block">Scan to connect</span>
                <a href="tel:0792004232" className="text-amber-400 hover:underline">
                  0792004232
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Massive Typographic Signature */}
        <div className="pt-4 text-center select-none opacity-15 pointer-events-none">
          <span className="text-5xl sm:text-8xl lg:text-9xl font-black font-display tracking-tighter text-white block uppercase">
            KOMFOCARE
          </span>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500 pt-4">
          <p>© {new Date().getFullYear()} KOMFOCARE HOME-BASED SERVICES. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-amber-400/80">Compassionate Care. Right at Home.</span>
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
