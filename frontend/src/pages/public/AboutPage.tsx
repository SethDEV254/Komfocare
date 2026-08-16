import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Award, Users, CheckCircle2, Calendar, Phone } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
          About KomfoCare
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-navy-900 tracking-tight">
          Compassionate Care, Right at Home.
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          KomfoCare was founded on a simple principle: high-quality, professional healthcare should be accessible, personalized, and delivered in the comfort and dignity of a patient's own home.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-komfo-50 text-komfo-600 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-display text-navy-900">Our Core Mission</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            To connect individuals and families with qualified, verified healthcare professionals who deliver personalized, clinical, and supportive home care with empathy, clinical precision, and respect.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-komfo-600" />
          </div>
          <h2 className="text-2xl font-bold font-display text-navy-900">Our Clinical Vision</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            To be the leading, trusted home-based healthcare platform in the region, bridging the gap between hospital discharge and long-term home health recovery through technology and compassionate human touch.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-14 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-komfo-400">Our Principles</span>
          <h3 className="text-3xl font-extrabold font-display">What Defines KomfoCare</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300">
          <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-2">
            <h4 className="text-base font-bold text-white">Trust & Safety</h4>
            <p>Rigorous vetting, background checks, and active council licensing for all clinicians.</p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-2">
            <h4 className="text-base font-bold text-white">Patient Dignity</h4>
            <p>Treating every individual with honoring care, autonomy, and empathetic listening.</p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-2">
            <h4 className="text-base font-bold text-white">Family Connection</h4>
            <p>Transparent communication and real-time digital visit updates for authorized caregivers.</p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-2">
            <h4 className="text-base font-bold text-white">Clinical Quality</h4>
            <p>Adherence to high medical standards, sterile techniques, and physician collaboration.</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-navy-900">Ready to discuss home healthcare needs?</h3>
          <p className="text-xs text-slate-600 mt-1">Our clinical coordination team is ready to assist your family.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/book-care"
            className="px-6 py-3 rounded-full bg-navy-900 hover:bg-navy-950 text-white font-semibold text-xs shadow-md transition-all"
          >
            Book Home Care
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};
