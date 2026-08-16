import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Award, Users, CheckCircle2, Calendar, Phone, ArrowUpRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-label">ABOUT KOMFOCARE / PHILOSOPHY</div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-display-massive text-white tracking-tight">
          Compassionate Clinical Care, Right at Home.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          KomfoCare was founded on a simple principle: high-quality, professional clinical healthcare should be accessible, personalized, and delivered in the comfort, familiarity, and dignity of a patient's own sanctuary.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-3xl p-8 sm:p-10 glass-card space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-komfo-600/20 text-komfo-400 border border-komfo-400/30 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white">Our Core Mission</h2>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            To connect individuals and families with qualified, licensed healthcare professionals who deliver personalized, clinical, and supportive home care with empathy, clinical precision, and honoring respect.
          </p>
        </div>

        <div className="rounded-3xl p-8 sm:p-10 glass-card space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white">Our Clinical Vision</h2>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            To be the leading, trusted home-based healthcare platform across the African continent, bridging hospital discharge and long-term home health recovery through technology and compassionate human touch.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="rounded-4xl p-8 sm:p-14 glass-surface border border-white/10 space-y-8">
        <div className="space-y-2">
          <div className="text-label">FOUNDATIONAL VALUES</div>
          <h3 className="text-3xl font-extrabold text-display-massive text-white tracking-tight">
            What Sets KomfoCare Apart.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300">
          <div className="p-6 rounded-2xl bg-[#0f0514] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-amber-400 font-bold block">01/SAFETY</span>
            <h4 className="text-base font-bold text-white">Trust & Accreditation</h4>
            <p className="text-slate-400 leading-relaxed">Rigorous vetting, background checks, and active council licensing for all clinicians.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f0514] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-komfo-400 font-bold block">02/DIGNITY</span>
            <h4 className="text-base font-bold text-white">Patient Autonomy</h4>
            <p className="text-slate-400 leading-relaxed">Treating every individual with honoring care, gentle respect, and compassionate listening.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f0514] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-amber-400 font-bold block">03/TRANSPARENCY</span>
            <h4 className="text-base font-bold text-white">Family Synchronization</h4>
            <p className="text-slate-400 leading-relaxed">Real-time digital visit notes, vitals curves, and notifications keep caregivers fully in the loop.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f0514] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 font-bold block">04/EXCELLENCE</span>
            <h4 className="text-base font-bold text-white">Clinical Standard</h4>
            <p className="text-slate-400 leading-relaxed">Adherence to sterile techniques, hospital discharge protocols, and doctor collaboration.</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl p-8 sm:p-12 glass-card flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/15">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-display text-white">Ready to discuss home healthcare needs?</h3>
          <p className="text-xs text-slate-400">Our clinical coordination desk is available to assist your family.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/book-care"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-gradient-to-r from-komfo-600 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow transition-all"
          >
            <span>Book Home Visit</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};
