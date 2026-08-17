import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Lock,
  Stethoscope,
  Activity,
  ArrowUpRight,
  User,
  Globe,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-label">KOMFOCARE HOME-BASED SERVICES • ABOUT US</div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-display-massive text-white tracking-tight">
          Compassionate Care. <span className="text-transparent bg-clip-text bg-gradient-to-r from-komfo-400 via-purple-300 to-amber-300">Right at Home.</span>
        </h1>
        <p className="text-base sm:text-lg text-amber-300 font-semibold leading-relaxed">
          "We come to you, so you can stay where you feel safe."
        </p>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          KOMFOCARE HOME-BASED SERVICES delivers compassionate, reliable, and personalized healthcare in the comfort and dignity of your home. Professional care. Personal touch. Peace of mind.
        </p>
      </div>

      {/* Founder & Leadership Spotlight */}
      <div className="rounded-3xl p-8 sm:p-12 glass-surface border border-white/15 shadow-2xl space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-komfo-600 to-amber-500 p-1 shadow-glow flex items-center justify-center">
              <div className="w-full h-full rounded-[22px] bg-[#0c0310] flex flex-col items-center justify-center text-white space-y-2">
                <User className="w-16 h-16 text-amber-400" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">FOUNDER</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-white">
                OBIERO SHANICE AUMA
              </h2>
              <p className="text-xs text-amber-400 font-mono font-bold mt-0.5">
                Founder & Clinical Director
              </p>
              <p className="text-[11px] text-slate-400 font-mono">KOMFOCARE HOME-BASED SERVICES</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <div className="text-label">FOUNDER'S MESSAGE</div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              We Bring Quality Care to You, So You Can Focus on What Matters Most.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              At KomfoCare, our vision is built on delivering clinical excellence with genuine human warmth. Whether recovering from surgery, managing a chronic condition, or providing dedicated assistance for an aging parent, we ensure every patient receives high-touch, hospital-grade attention without the burden and distress of hospital commutes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 text-[10px] block">DIRECT PHONE</span>
                <a href="tel:0792004232" className="text-amber-400 font-bold text-sm hover:underline block">
                  0792004232
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 text-[10px] block">FOUNDER EMAIL</span>
                <a href="mailto:obieroshanice@gmail.com" className="text-slate-200 font-bold hover:text-white truncate block">
                  obieroshanice@gmail.com
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 text-[10px] block">LOCATION</span>
                <span className="text-slate-200 font-bold block">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-3xl p-8 sm:p-10 glass-card space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-komfo-600/20 text-komfo-400 border border-komfo-400/30 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white">Our Core Mission</h2>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            To provide compassionate, reliable, and personalized home-based healthcare services that empower individuals to heal, thrive, and preserve their independence within the comfort of their homes.
          </p>
        </div>

        <div className="rounded-3xl p-8 sm:p-10 glass-card space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white">Our Clinical Vision</h2>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            To be Kenya's most trusted home healthcare partner, recognized for exceptional clinical standards, empathetic personal touch, and unwavering peace of mind for families.
          </p>
        </div>
      </div>

      {/* 4 Brand Values / Benefits (Image 2) */}
      <div className="rounded-4xl p-8 sm:p-14 glass-surface border border-white/10 space-y-8">
        <div className="space-y-2">
          <div className="text-label">BRAND VALUES & PILLARS</div>
          <h3 className="text-3xl font-extrabold text-display-massive text-white tracking-tight">
            The 4 Pillars of KomfoCare
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            "Professional care. Personal touch. Peace of mind."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300">
          <div className="p-6 rounded-2xl bg-[#0d1428] border border-white/10 space-y-3">
            <span className="text-[10px] font-mono text-amber-400 font-bold block">01 / SANCTUARY</span>
            <h4 className="text-lg font-bold text-white">Care at Home</h4>
            <p className="text-slate-400 leading-relaxed">
              We come to you, so you can stay where you feel safe. Rest and heal in the peaceful familiarity of your personal residence.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1428] border border-white/10 space-y-3">
            <span className="text-[10px] font-mono text-komfo-400 font-bold block">02 / EMPATHY</span>
            <h4 className="text-lg font-bold text-white">Compassionate Support</h4>
            <p className="text-slate-400 leading-relaxed">
              Dignity-centered care designed with deep empathy, active listening, and honoring respect for patients and families.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1428] border border-white/10 space-y-3">
            <span className="text-[10px] font-mono text-emerald-400 font-bold block">03 / EXCELLENCE</span>
            <h4 className="text-lg font-bold text-white">Professional & Reliable</h4>
            <p className="text-slate-400 leading-relaxed">
              NCK-licensed registered nurses and qualified clinicians delivering punctual, hospital-standard clinical procedures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1428] border border-white/10 space-y-3">
            <span className="text-[10px] font-mono text-indigo-400 font-bold block">04 / SAFETY</span>
            <h4 className="text-lg font-bold text-white">You Are in Safe Hands</h4>
            <p className="text-slate-400 leading-relaxed">
              Sterile medical kits, continuous vital signs monitoring, and coordinated communication with primary doctors.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Clinical Showcase: Nutrition & Holistic Care */}
      <div className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="text-label justify-center">HOLISTIC WELLNESS IN PRACTICE</div>
          <h3 className="text-3xl font-extrabold text-display-massive text-white tracking-tight">
            Integrated Clinical & Lifestyle Healing
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Bridging hospital medicine, dietary planning, and daily vitality directly in your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Nutrition & Vitality Planning */}
          <div className="rounded-3xl glass-card border border-white/15 overflow-hidden group">
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <img
                src="/images/nutrition-wellness.jpg"
                alt="Nutrition and daily wellness care"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0414] via-[#0e0414]/40 to-transparent" />
              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                NUTRITION SERVICES & WELLNESS
              </span>
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <h4 className="text-2xl font-bold font-display text-white">
                Personalized Dietary Care & Vitality Planning
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Nutrition is medicine. Our clinical team works with families to design balanced post-surgery meal plans, diabetes-friendly diets, hydration schedules, and vitamin regimens that accelerate healing.
              </p>
            </div>
          </div>

          {/* Card 2: Holistic Home-Based Health Care */}
          <div className="rounded-3xl glass-card border border-white/15 overflow-hidden group">
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <img
                src="/images/holistic-health.jpg"
                alt="Holistic healthcare and movement"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0414] via-[#0e0414]/40 to-transparent" />
              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-komfo-300 font-bold">
                HOLISTIC HEALTH & PHYSIOTHERAPY
              </span>
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <h4 className="text-2xl font-bold font-display text-white">
                Comprehensive Mind, Body & Clinical Support
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                True health encompasses medical precision, safe mobility exercises, stress reduction, and emotional companionship. We bring the full spectrum of recovery to your living room.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview Grid */}
      <div className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="text-label justify-center">OUR CARE DISCIPLINES</div>
          <h3 className="text-3xl font-extrabold text-display-massive text-white tracking-tight">
            Comprehensive Clinical Catalogue
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Tailored to support acute recovery, senior well-being, and family peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          {[
            { title: 'Home Nursing Care', desc: 'Professional nursing care tailored to your needs.' },
            { title: 'Elderly Care', desc: 'Compassionate care and assistance for seniors.' },
            { title: 'Post-Surgery Care', desc: 'Helping you heal safely and comfortably at home.' },
            { title: 'Medication Management', desc: 'Safe medication reminders and administration.' },
            { title: 'Palliative Care', desc: 'Dignified care focused on comfort and quality of life.' },
            { title: 'Patient Escort Services', desc: 'Assistance to and from medical appointments.' },
            { title: 'Vital Signs Monitoring', desc: 'Regular monitoring for your health and peace of mind.' },
            { title: 'Health Education', desc: 'Empowering you and your family with health knowledge.' },
          ].map((s, i) => (
            <div key={s.title} className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-amber-400 font-bold block">0{i + 1} SERVICE</span>
              <h4 className="text-base font-bold font-display text-white">{s.title}</h4>
              <p className="text-slate-300 leading-relaxed text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact & CTA Box */}
      <div className="rounded-3xl p-8 sm:p-12 glass-card flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/15 shadow-2xl">
        <div className="space-y-2 text-center lg:text-left">
          <h3 className="text-2xl font-bold font-display text-white">BOOK CARE TODAY!</h3>
          <p className="text-xs text-slate-300 max-w-md">
            Call <strong className="text-amber-400 font-mono font-bold">0792004232</strong> or email <strong className="text-white font-mono">komfocare@gmail.com</strong> to schedule immediate home nursing or senior care.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono">
          <Link
            to="/book-care"
            className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all"
          >
            <span>Book Home Visit</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:0792004232"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-komfo-400" />
            <span>0792004232</span>
          </a>
        </div>
      </div>
    </div>
  );
};
