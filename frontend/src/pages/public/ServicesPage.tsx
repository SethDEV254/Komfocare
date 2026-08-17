import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Users,
  Activity,
  Pill,
  ShieldCheck,
  Calendar,
  Stethoscope,
  BookOpen,
  ArrowUpRight,
  Sparkles,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { Service } from '../../types';
import { apiClient } from '../../api/client';
import { formatCurrency } from '../../utils/formatters';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const defaultServices = [
    {
      slug: 'home-nursing-care',
      title: 'Home Nursing Care',
      shortDescription: 'Professional nursing care tailored to your needs.',
      category: 'NURSING CARE',
      durationMinutes: 120,
      basePrice: 4500,
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      index: '01',
    },
    {
      slug: 'elderly-care',
      title: 'Elderly Care',
      shortDescription: 'Compassionate care and assistance for seniors.',
      category: 'SENIOR SUPPORT',
      durationMinutes: 180,
      basePrice: 3500,
      imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
      index: '02',
    },
    {
      slug: 'post-surgery-care',
      title: 'Post-Surgery Care',
      category: 'REHABILITATION',
      shortDescription: 'Helping you heal safely and comfortably at home.',
      durationMinutes: 120,
      basePrice: 5000,
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      index: '03',
    },
    {
      slug: 'medication-management',
      title: 'Medication Management',
      category: 'CLINICAL ADHERENCE',
      shortDescription: 'Safe medication reminders and administration.',
      durationMinutes: 60,
      basePrice: 2800,
      imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=800',
      index: '04',
    },
    {
      slug: 'palliative-care',
      title: 'Palliative Care',
      category: 'HOLISTIC SUPPORT',
      shortDescription: 'Dignified care focused on comfort and quality of life.',
      durationMinutes: 240,
      basePrice: 6000,
      imageUrl: '/images/holistic-health.jpg',
      index: '05',
    },
    {
      slug: 'patient-escort',
      title: 'Patient Escort Services',
      category: 'MOBILITY & ESCORT',
      shortDescription: 'Assistance to and from medical appointments.',
      durationMinutes: 180,
      basePrice: 3800,
      imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800',
      index: '06',
    },
    {
      slug: 'vital-signs-monitoring',
      title: 'Vital Signs Monitoring',
      category: 'DIAGNOSTIC TELEMETRY',
      shortDescription: 'Regular monitoring for your health and peace of mind.',
      durationMinutes: 60,
      basePrice: 2500,
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
      index: '07',
    },
    {
      slug: 'health-education',
      title: 'Health Education',
      category: 'FAMILY TRAINING',
      shortDescription: 'Empowering you and your family with health knowledge.',
      durationMinutes: 90,
      basePrice: 3000,
      imageUrl: '/images/nutrition-wellness.jpg',
      index: '08',
    },
  ];

  const categories = ['ALL', 'NURSING CARE', 'SENIOR SUPPORT', 'REHABILITATION', 'CLINICAL ADHERENCE', 'HOLISTIC SUPPORT', 'MOBILITY & ESCORT', 'DIAGNOSTIC TELEMETRY', 'FAMILY TRAINING'];

  const filteredServices =
    activeCategory === 'ALL'
      ? defaultServices
      : defaultServices.filter((s) => s.category.toUpperCase() === activeCategory);

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-label">KOMFOCARE HOME-BASED SERVICES • 08 DISCIPLINES</div>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-display-massive text-white tracking-tight leading-[1.15]">
          Professional <span className="text-komfo-300">Home-Based Care</span> Services.
        </h1>
        <p className="text-base sm:text-lg text-amber-300 font-semibold leading-relaxed">
          "Compassionate care. Right at home."
        </p>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          We come to you, so you can stay where you feel safe. Explore our 8 detailed home-based care services delivered by certified, background-checked registered nurses and practitioners in Nairobi.
        </p>
      </div>

      {/* 6 Pillars Quick Overview Bar */}
      <div className="p-6 rounded-3xl glass-surface border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
            Our Care Disciplines Overview
          </span>
          <span className="text-xs font-mono text-slate-400">Nairobi Metro</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono text-center">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-200">Medical Doctors</div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-200">Nursing Team</div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-200">Physiotherapy</div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-200">Nutrition Services</div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-200">Care at Home</div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-200">Elderly & Chronic</div>
        </div>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="flex items-center flex-wrap gap-2 pt-2 border-b border-white/10 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 border ${
              activeCategory === cat
                ? 'bg-komfo-600 text-white border-komfo-400 shadow-glow font-bold'
                : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/25 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sleek Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((serv) => (
          <Link
            key={serv.slug}
            to={`/services/${serv.slug}`}
            className="group relative rounded-3xl overflow-hidden glass-card flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5"
          >
            {/* Image Container */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={serv.imageUrl}
                alt={serv.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1428] via-[#0d1428]/40 to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-amber-300 font-bold">
                  {serv.category}
                </span>
                <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-xs font-mono font-bold text-slate-300 group-hover:border-komfo-400 group-hover:text-komfo-300 transition-colors">
                  {serv.index}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between -mt-6 relative z-10">
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-display text-white group-hover:text-komfo-300 transition-colors flex items-center justify-between">
                  <span>{serv.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-komfo-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h3>
                <p className="text-xs text-slate-300/80 leading-relaxed font-sans line-clamp-3">
                  {serv.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">From {formatCurrency(serv.basePrice)}</span>
                <span className="text-amber-400/90 font-bold uppercase tracking-wider">
                  {serv.durationMinutes} Min
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
