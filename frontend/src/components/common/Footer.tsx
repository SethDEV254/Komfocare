import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  ArrowRight,
  ArrowUpRight,
  ShieldAlert,
  Send,
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
            <div className="text-label">NEWSLETTER & CLINICAL UPDATES</div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              Stay Informed on Home Health Best Practices.
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Subscribe for evidence-based home recovery guides, geriatric care insights, and service expansions in Nairobi.
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
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-komfo-600 to-amber-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <span className="text-2xl font-bold font-display tracking-tight text-white">
                Komfo<span className="text-komfo-400">Care</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans">
              <strong className="text-white">Compassionate Care, Right at Home.</strong>
              <br />
              Professional home healthcare connecting families across the Nairobi metropolitan area with licensed registered nurses, geriatric specialists, and clinical rehabilitation care.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Clinical Dispatch Online
              </span>
            </div>
          </div>

          {/* Col 3: Care Services */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] font-mono text-amber-400 mb-4">
              Care Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/services/home-nursing-care" className="hover:text-white transition-colors">
                  Home Nursing Care
                </Link>
              </li>
              <li>
                <Link to="/services/elderly-care" className="hover:text-white transition-colors">
                  Elderly Care & Support
                </Link>
              </li>
              <li>
                <Link to="/services/post-surgery-care" className="hover:text-white transition-colors">
                  Post-Surgery Recovery
                </Link>
              </li>
              <li>
                <Link to="/services/medication-management" className="hover:text-white transition-colors">
                  Medication Management
                </Link>
              </li>
              <li>
                <Link to="/services/palliative-care" className="hover:text-white transition-colors">
                  Palliative & Comfort Care
                </Link>
              </li>
              <li>
                <Link to="/services/vital-signs-monitoring" className="hover:text-white transition-colors">
                  Vital Signs Monitoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Portals */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] font-mono text-amber-400 mb-4">
              Platform & Access
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About KomfoCare
                </Link>
              </li>
              <li>
                <Link to="/professionals" className="hover:text-white transition-colors">
                  Clinicians Directory
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Health Resources
                </Link>
              </li>
              <li>
                <Link to="/track-request" className="hover:text-white transition-colors">
                  Track Request Status
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Portal Login / Demo Access
                </Link>
              </li>
              <li>
                <Link to="/book-care" className="hover:text-white transition-colors">
                  Book Home Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Coordinates */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] font-mono text-amber-400 mb-4">
              Coordinates
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-komfo-400 flex-shrink-0 mt-0.5" />
                <span>Riverside Square, Westlands, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-komfo-400 flex-shrink-0" />
                <a href="tel:+254700000000" className="hover:text-white font-mono">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-komfo-400 flex-shrink-0" />
                <a href="mailto:care@komfocare.com" className="hover:text-white font-mono">
                  care@komfocare.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-komfo-400 flex-shrink-0" />
                <span>Mon – Sun: 07:00 AM – 09:00 PM</span>
              </li>
            </ul>
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
          <p>© {new Date().getFullYear()} KomfoCare Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-amber-400/80">Scheduled Home Care Service</span>
            <span>Privacy & Clinical Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
