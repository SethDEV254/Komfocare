import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShieldCheck,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Activity,
  Pill,
  Stethoscope,
  BookOpen,
  Phone,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Award,
  Lock,
  MessageCircle,
  TrendingUp,
  Check,
} from 'lucide-react';
import { Service, HealthcareProfessional, Testimonial, ServiceArea } from '../../types';
import { apiClient } from '../../api/client';
import { formatCurrency } from '../../utils/formatters';

export const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<HealthcareProfessional[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [servRes, profRes, testRes, areaRes] = await Promise.allSettled([
          apiClient<{ success: boolean; data: Service[] }>('/services'),
          apiClient<{ success: boolean; data: HealthcareProfessional[] }>('/professionals/public'),
          apiClient<{ success: boolean; data: Testimonial[] }>('/testimonials/public'),
          apiClient<{ success: boolean; data: ServiceArea[] }>('/service-areas/public'),
        ]);

        if (servRes.status === 'fulfilled' && servRes.value?.data) {
          setServices(servRes.value.data);
        }
        if (profRes.status === 'fulfilled' && profRes.value?.data) {
          setProfessionals(profRes.value.data);
        }
        if (testRes.status === 'fulfilled' && testRes.value?.data) {
          setTestimonials(testRes.value.data);
        }
        if (areaRes.status === 'fulfilled' && areaRes.value?.data) {
          setServiceAreas(areaRes.value.data);
        }
      } catch (err) {
        // Fallbacks will render cleanly
      }
    };

    loadHomeData();
  }, []);

  // Fallback defaults
  const defaultServices = [
    {
      slug: 'home-nursing-care',
      title: 'Home Nursing Care',
      category: 'Clinical Care',
      shortDescription: 'Licensed clinical nursing, sterile wound dressing, IV infusion management, and comprehensive vitals tracking at your bedside.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      price: 4500,
      duration: '120 Min',
      index: '01',
    },
    {
      slug: 'elderly-care',
      title: 'Elderly & Geriatric Support',
      category: 'Geriatric Care',
      shortDescription: 'Attentive companionship, mobility assistance, medication organizer scheduling, and dignity-centered daily routine support.',
      imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
      price: 3500,
      duration: '180 Min',
      index: '02',
    },
    {
      slug: 'post-surgery-care',
      title: 'Post-Surgery Home Recovery',
      category: 'Rehabilitation',
      shortDescription: 'Post-operative clinical surveillance, incision infection prevention, pain titration, and assisted rehabilitation transfers.',
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      price: 5000,
      duration: '120 Min',
      index: '03',
    },
    {
      slug: 'medication-management',
      title: 'Medication Management',
      category: 'Pharmacotherapy',
      shortDescription: 'Strict medication compliance reviews, multi-drug interaction screening, refill coordination, and caregiver dosage guidance.',
      imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=800',
      price: 2800,
      duration: '60 Min',
      index: '04',
    },
    {
      slug: 'vital-signs-monitoring',
      title: 'Vital Signs & Biomarkers',
      category: 'Diagnostic Care',
      shortDescription: 'Clinical assessment of Blood Pressure, SpO2, Heart Rhythm, Blood Glucose curves, and early deterioration risk mitigation.',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
      price: 2500,
      duration: '60 Min',
      index: '05',
    },
    {
      slug: 'palliative-care',
      title: 'Palliative & Comfort Care',
      category: 'Holistic Care',
      shortDescription: 'Empathetic symptom management, comfort-oriented physical relief, and emotional support tailored for complex chronic illnesses.',
      imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      price: 6000,
      duration: '240 Min',
      index: '06',
    },
  ];

  const defaultProfessionals = [
    {
      fullName: 'Nurse Sarah Ombati, RN',
      roleTitle: 'Senior Home Care Lead & Registered Nurse',
      qualifications: 'BSc Nursing (UoN), BLS Certified',
      areasOfPractice: 'Home Nursing • Elderly Care • Chronic Care',
      experienceYears: 9,
      rating: 4.98,
      totalVisits: 142,
      photoUrl: 'https://images.unsplash.com/photo-1594824813689-d758c5c7d0d0?auto=format&fit=crop&q=80&w=400',
    },
    {
      fullName: 'Nurse David Kiprop, RN',
      roleTitle: 'Post-Operative & Wound Care Specialist',
      qualifications: 'Higher Dip Critical Care, Wound Specialist',
      areasOfPractice: 'Post-Surgery Care • Sterile Dressing • IV Therapy',
      experienceYears: 7,
      rating: 4.95,
      totalVisits: 118,
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    },
    {
      fullName: 'Nurse Faith Wanjiru, RN',
      roleTitle: 'Geriatric & Palliative Care Clinician',
      qualifications: 'BSc Nursing, Gerontology Certified',
      areasOfPractice: 'Elderly Care • Palliative Support • Dementia Care',
      experienceYears: 11,
      rating: 4.99,
      totalVisits: 215,
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    },
  ];

  const categories = ['ALL', 'CLINICAL CARE', 'GERIATRIC CARE', 'REHABILITATION', 'DIAGNOSTIC CARE', 'HOLISTIC CARE'];

  const filteredServices =
    activeCategory === 'ALL'
      ? defaultServices
      : defaultServices.filter((s) => s.category.toUpperCase() === activeCategory);

  return (
    <div className="space-y-24 sm:space-y-36 pb-24 overflow-hidden">
      {/* ========================================================
          HERO SECTION — Massive Editorial Sleek Aesthetics
      ======================================================== */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20">
        {/* Subtle background ambient glowing orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-komfo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Micro Meta Label */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="text-label">NAIROBI METRO HOME HEALTHCARE</div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CLINICAL DISPATCH ACTIVE</span>
            </div>
          </div>

          {/* Asymmetric Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-display-massive text-white tracking-tight leading-[0.95]">
                Compassionate <span className="text-transparent bg-clip-text bg-gradient-to-r from-komfo-400 via-purple-300 to-amber-300">Clinical Care</span>, Right at Home.
              </h1>

              <p className="text-sm sm:text-base text-slate-300/90 max-w-2xl leading-relaxed font-sans">
                KomfoCare connects families with licensed registered nurses, geriatric specialists, and post-surgery clinicians. Receive personalized, hospital-grade care in the comfort and dignity of your home.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/book-care"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-all duration-300"
                >
                  <span>Book Home Care Visit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300"
                >
                  <span>Explore 8 Disciplines</span>
                </Link>
              </div>

              {/* Micro-Meta Badges */}
              <div className="flex items-center flex-wrap gap-y-2 gap-x-6 pt-4 text-[11px] uppercase tracking-widest text-slate-400 font-mono border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Licensed Nurses (NCK)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-komfo-400" />
                  <span>24/7 Triage Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Digital Vitals Log</span>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden glass-card p-2 border border-white/15 shadow-2xl">
                <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
                    alt="Nurse providing home healthcare"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08000a] via-black/30 to-transparent" />

                  {/* Top floating pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                      KC CLINICAL DISPATCH
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AVAILABLE NOW
                    </span>
                  </div>

                  {/* Bottom Floating Stats Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0f0514]/90 backdrop-blur-xl border border-white/15 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-komfo-600 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                          SO
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Nurse Sarah Ombati, RN</p>
                          <p className="text-[10px] text-slate-400">Senior Home Care Lead</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>4.98</span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-mono">142 Visits</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-300">
                      <span>Recent Vitals Recorded:</span>
                      <span className="text-emerald-400 font-bold">BP 120/80 • SpO2 99%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SERVICES CATALOG / CASE CARDS — Sleek Gallery Grid
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="text-label">OUR SERVICES / 08 DISCIPLINES</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-display-massive text-white tracking-tight">
              Clinical Excellence in Your Sanctuary.
            </h2>
          </div>

          {/* Category Chips Bar (nex101 style) */}
          <div className="flex items-center flex-wrap gap-2">
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
        </div>

        {/* 3-Column Sleek Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((serv) => (
            <Link
              key={serv.slug}
              to={`/services/${serv.slug}`}
              className="group relative rounded-3xl overflow-hidden glass-card flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Media Image Container */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={serv.imageUrl}
                  alt={serv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0514] via-[#0f0514]/40 to-transparent" />

                {/* Top Corner Badge & Index */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-amber-300 font-bold">
                    {serv.category}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-xs font-mono font-bold text-slate-300 group-hover:border-komfo-400 group-hover:text-komfo-300 transition-colors">
                    {serv.index}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-komfo-300 transition-colors flex items-center justify-between">
                    <span>{serv.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-komfo-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-300/80 leading-relaxed font-sans line-clamp-2">
                    {serv.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">From {formatCurrency(serv.price)}</span>
                  <span className="text-amber-400/90 font-bold uppercase tracking-wider">
                    {serv.duration}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Services Footer Link */}
        <div className="text-center pt-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-widest hover:border-komfo-400 transition-all"
          >
            <span>View All 8 Clinical Care Disciplines</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          WHY CHOOSE KOMFOCARE — Sleek Dark Bento Cards
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2">
          <div className="text-label">WHY KOMFOCARE / CLINICAL ADVANTAGE</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-display-massive text-white tracking-tight">
            Designed for Dignity, Clinical Safety & Peace of Mind.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 rounded-3xl glass-card space-y-4 group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400/90 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 font-bold">
                01/VERIFIED
              </span>
              <ShieldCheck className="w-5 h-5 text-komfo-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">Licensed Clinicians Only</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every nurse and clinician is rigorously vetted with Nursing Council of Kenya credentials, background checks, and clinical competency reviews.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card space-y-4 group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400/90 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 font-bold">
                02/PROTOCOLS
              </span>
              <Activity className="w-5 h-5 text-komfo-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">Hospital-Grade Sterile Care</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standardized asepsis procedures, high-grade dressing kits, and protocol-driven care for post-operative recovery and chronic wound management.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card space-y-4 group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400/90 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 font-bold">
                03/TRANSPARENCY
              </span>
              <Users className="w-5 h-5 text-komfo-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">Family Care Coordination</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Real-time digital visit notes, vital signs trend charting, and synchronized notifications keep authorized family members fully informed.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card space-y-4 group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400/90 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 font-bold">
                04/RAPID DISPATCH
              </span>
              <Clock className="w-5 h-5 text-komfo-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">Rapid Nairobi Coverage</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Strategic clinician placement across Westlands, Karen, Kilimani, Lavington, Runda, and surrounding metro hubs for punctual home visits.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          HEALTHCARE PROFESSIONALS SHOWCASE — Sleek Clinician Cards
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="text-label">VERIFIED ROSTER / PRACTITIONERS</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-display-massive text-white tracking-tight">
              Meet Our Senior Home Care Leads.
            </h2>
          </div>

          <Link
            to="/professionals"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider hover:border-komfo-400 transition-all"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {defaultProfessionals.map((prof) => (
            <div
              key={prof.fullName}
              className="group rounded-3xl overflow-hidden glass-card border border-white/15 hover:border-komfo-400/60 p-6 space-y-5 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/15 flex-shrink-0">
                  <img
                    src={prof.photoUrl}
                    alt={prof.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h4 className="font-bold font-display text-white text-base group-hover:text-komfo-300 transition-colors">
                    {prof.fullName}
                  </h4>
                  <p className="text-xs text-amber-400 font-mono">{prof.roleTitle}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white">{prof.rating}</span>
                    <span className="text-[10px] font-mono">({prof.totalVisits} completed visits)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-slate-300 font-mono text-[11px]">
                  {prof.qualifications}
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong className="text-slate-300 font-semibold">Specialties:</strong> {prof.areasOfPractice}
                </p>
              </div>

              <Link
                to="/book-care"
                className="w-full py-2.5 rounded-full bg-white/5 hover:bg-komfo-600 border border-white/10 hover:border-komfo-400 text-white font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 block"
              >
                Request Clinician
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          HOW IT WORKS — 4-Step Interactive Timeline
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="text-label justify-center">SEAMLESS PROCESS</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-display-massive text-white tracking-tight">
            How KomfoCare Delivers.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Simple, safe, and transparent from initial intake to personalized ongoing bedside care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
            <span className="text-2xl font-extrabold font-mono text-komfo-400">01</span>
            <h4 className="text-base font-bold font-display text-white">Select Service & Needs</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose your required care discipline, provide patient health background, and preferred visit timing.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
            <span className="text-2xl font-extrabold font-mono text-amber-400">02</span>
            <h4 className="text-base font-bold font-display text-white">Clinical Triage & Match</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our clinical coordinator reviews the intake and assigns the optimal licensed nurse or practitioner.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
            <span className="text-2xl font-extrabold font-mono text-komfo-400">03</span>
            <h4 className="text-base font-bold font-display text-white">In-Home Clinical Visit</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your assigned clinician arrives promptly with sterile clinical supplies to perform care and vital logs.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
            <span className="text-2xl font-extrabold font-mono text-emerald-400">04</span>
            <h4 className="text-base font-bold font-display text-white">Digital Vitals & Follow-Up</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Access digital clinical notes, monitor vital signs progress curves, and schedule ongoing care seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          FINAL CTA CARD — Massive Glowing Editorial Call-to-Action
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-4xl overflow-hidden bg-gradient-to-br from-[#1b0a2a] via-[#100418] to-[#08000a] border border-white/15 p-8 sm:p-16 text-center space-y-8 shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-komfo-600/25 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="text-label justify-center">SCHEDULE HOME HEALTHCARE</div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-display-massive text-white tracking-tight">
              Ready for Compassionate Care at Home?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Schedule a qualified registered nurse or clinician today. Instant booking confirmation with reference tracking code.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book-care"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-all"
            >
              <span>Book a Home Visit Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs uppercase tracking-wider transition-all"
            >
              <span>Contact Care Helpline</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
