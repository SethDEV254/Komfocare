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
  ShieldAlert,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800/80">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-komfo-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <span className="text-2xl font-bold font-display tracking-tight text-white">
                Komfo<span className="text-komfo-400">Care</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              <strong>Compassionate Care, Right at Home.</strong>
              <br />
              Professional home-based healthcare services connecting families with qualified registered nurses, clinicians, and senior care specialists.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-navy-800 text-xs font-semibold text-komfo-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Clinical Professionals
              </span>
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Care Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
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
              <li>
                <Link to="/services/patient-escort" className="hover:text-white transition-colors">
                  Patient Medical Escort
                </Link>
              </li>
              <li>
                <Link to="/services/health-education" className="hover:text-white transition-colors">
                  Health & Caregiver Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Information */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
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
                  Health Resources & Blog
                </Link>
              </li>
              <li>
                <Link to="/track-request" className="hover:text-white transition-colors">
                  Track Care Request
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Portal Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Coverage */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-komfo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+254700000000" className="hover:text-white transition-colors font-medium">
                    +254 700 000 000
                  </a>
                  <p className="text-[11px] text-slate-500">Mon - Sat: 7:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-komfo-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:care@komfocare.com" className="hover:text-white transition-colors">
                  care@komfocare.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-komfo-400 flex-shrink-0 mt-0.5" />
                <span>Nairobi Metropolitan & Environs, Kenya</span>
              </li>
            </ul>

            <div className="mt-5">
              <Link
                to="/book-care"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-komfo-300 hover:text-white transition-colors"
              >
                <span>Request Home Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Safety Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 text-center md:text-left">
            <ShieldAlert className="w-4 h-4 text-amber-500/80 flex-shrink-0" />
            <p>
              KomfoCare provides scheduled home healthcare services and is not an emergency response provider. In a life-threatening medical emergency, immediately call 999/112 or proceed to the nearest emergency medical center.
            </p>
          </div>

          <div className="flex-shrink-0 text-center md:text-right">
            <p>© {new Date().getFullYear()} KomfoCare. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
