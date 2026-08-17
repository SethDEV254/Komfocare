import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Users, Award, Heart } from 'lucide-react';

const shanice = {
  id: 'shanice-ceo',
  fullName: 'Shanice',
  title: 'Founder & Chief Executive Officer',
  role: 'CEO / KOMFOCARE',
  qualifications:
    'Healthcare Administration | Home-Based Care Innovation | Patient-Centred Leadership',
  areasOfPractice: 'Strategic Leadership • Home Healthcare Operations • Community Health',
  bio: 'Shanice is the visionary founder and CEO of KomfoCare, driving the mission to bring compassionate, hospital-grade healthcare directly into Kenyan homes. Under her steadfast leadership, KomfoCare has redefined home-based care across Nairobi — placing dignity, safety, and warmth at the centre of every clinical interaction.',
  photoUrl:
    'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=600',
};

const pillars = [
  {
    icon: Heart,
    label: 'Compassionate Leadership',
    desc: 'Shanice built KomfoCare on the belief that every Kenyan deserves care that feels personal and dignified.',
  },
  {
    icon: Award,
    label: 'Quality & Standards',
    desc: 'She personally ensures all clinical protocols meet the highest professional healthcare benchmarks.',
  },
  {
    icon: Users,
    label: 'Community Impact',
    desc: 'Under her leadership, KomfoCare has served hundreds of families across Nairobi with compassionate home care.',
  },
];

export const ProfessionalsPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Liquid ambient background blobs */}
      <div
        className="liquid-blob w-[600px] h-[600px] bg-komfo-600 -top-32 left-1/2 -translate-x-1/2 -z-10"
        style={{ opacity: 0.10 }}
      />
      <div
        className="liquid-blob w-[350px] h-[350px] bg-sky-500 bottom-0 right-0 -z-10"
        style={{ opacity: 0.08, animationDelay: '6s' }}
      />

      {/* ─── Header ─── */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-label">LEADERSHIP / FOUNDER</div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-display-massive text-white tracking-tight">
          The Vision Behind KomfoCare.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          KomfoCare was built from a single belief — that compassionate, professional healthcare should
          reach every Kenyan right where they feel safest: home. Meet the founder who made it happen.
        </p>
      </div>

      {/* ─── CEO Liquid Feature Card ─── */}
      <div className="liquid-profile liquid-shimmer rounded-3xl p-8 sm:p-14 flex flex-col lg:flex-row gap-12 items-center">

        {/* Photo */}
        <div className="relative flex-shrink-0">
          <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border border-komfo-500/30 shadow-glow">
            <img
              src={shanice.photoUrl}
              alt={shanice.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating CEO badge */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-2 rounded-2xl bg-komfo-600 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-glow">
            CEO &amp; Founder
          </div>
          {/* Liquid glow halo */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ boxShadow: '0 0 80px rgba(37,99,235,0.22)' }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-7 relative z-10">
          <div className="space-y-1">
            <p className="text-xs font-mono font-bold tracking-widest text-komfo-400 uppercase">
              KOMFOCARE LEADERSHIP
            </p>
            <h2 className="text-5xl sm:text-6xl font-extrabold font-display text-white tracking-tight">
              {shanice.fullName}
            </h2>
            <p className="text-base text-sky-300 font-mono font-semibold">{shanice.title}</p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
            {shanice.bio}
          </p>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="liquid-card rounded-2xl p-4 space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Focus Areas</p>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">{shanice.areasOfPractice}</p>
            </div>
            <div className="liquid-card rounded-2xl p-4 space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Background</p>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">{shanice.qualifications}</p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-komfo-600 to-sky-600 hover:from-komfo-500 hover:to-sky-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all duration-300"
            >
              <span>Our Story</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full morphic-pill text-white font-mono font-bold text-xs uppercase tracking-wider hover:border-komfo-400 transition-all"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ─── More Clinicians Coming Soon Banner ─── */}
      <div className="liquid-surface rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <div className="space-y-3">
          <div className="text-label justify-center">GROWING TEAM</div>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            More Licensed Clinicians Coming Soon.
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
            KomfoCare is actively onboarding NCK-registered nurses, clinical officers, physiotherapists, and care specialists across Nairobi to serve you even better.
          </p>
        </div>
        <Link
          to="/book-care"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-komfo-600 to-sky-600 hover:from-komfo-500 hover:to-sky-500 text-white font-bold font-mono text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-all duration-300"
        >
          <span>Book Home Care Today</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ─── Leadership Pillars ─── */}
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="text-label">WHAT WE STAND FOR</div>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            The Values That Drive Us.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.label}
              className="liquid-card liquid-shimmer rounded-3xl p-7 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-komfo-600/20 border border-komfo-500/30 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-komfo-400" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold font-display text-white text-lg">{p.label}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
