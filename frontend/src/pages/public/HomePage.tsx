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
  ChevronDown,
  Search,
  Zap,
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

  // Hero Terminal Interactive State
  const [heroDiscipline, setHeroDiscipline] = useState<'wound' | 'elderly' | 'postop' | 'vitals'>('wound');

  // Care Plan Configurator State
  const [careFrequency, setCareFrequency] = useState<'single' | 'weekly' | 'daily'>('weekly');
  const [careDuration, setCareDuration] = useState<number>(2); // hours
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['wound', 'vitals']);

  // Neighborhood Coverage State
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Westlands');

  // FAQ Accordion State & Search
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  // Comprehensive Clinical Services Catalog (Exact 8 Services)
  const defaultServices = [
    {
      slug: 'home-nursing-care',
      title: 'Home Nursing Care',
      category: 'Nursing Care',
      shortDescription: 'Professional nursing care tailored to your needs.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      price: 4500,
      duration: '120 Min',
      index: '01',
      highlights: ['Tailored Care Plans', 'Sterile Dressing Kits', 'NCK Registered Nurses'],
    },
    {
      slug: 'elderly-care',
      title: 'Elderly Care',
      category: 'Senior Support',
      shortDescription: 'Compassionate care and assistance for seniors.',
      imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
      price: 3500,
      duration: '180 Min',
      index: '02',
      highlights: ['Dignity & Companionship', 'Mobility Assistance', 'Routine Daily Support'],
    },
    {
      slug: 'post-surgery-care',
      title: 'Post-Surgery Care',
      category: 'Rehabilitation',
      shortDescription: 'Helping you heal safely and comfortably at home.',
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      price: 5000,
      duration: '120 Min',
      index: '03',
      highlights: ['Incision Surveillance', 'Drain & Wound Care', 'Infection Prevention'],
    },
    {
      slug: 'medication-management',
      title: 'Medication Management',
      category: 'Clinical Adherence',
      shortDescription: 'Safe medication reminders and administration.',
      imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=800',
      price: 2800,
      duration: '60 Min',
      index: '04',
      highlights: ['Prescription Synchronization', 'Refill Coordination', 'Safe Administration'],
    },
    {
      slug: 'palliative-care',
      title: 'Palliative Care',
      category: 'Holistic Support',
      shortDescription: 'Dignified care focused on comfort and quality of life.',
      imageUrl: '/images/holistic-health.jpg',
      price: 6000,
      duration: '240 Min',
      index: '05',
      highlights: ['Comfort-Centered Care', 'Pain & Symptom Relief', 'Family Respite & Guidance'],
    },
    {
      slug: 'patient-escort',
      title: 'Patient Escort Services',
      category: 'Mobility & Escort',
      shortDescription: 'Assistance to and from medical appointments.',
      imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800',
      price: 3800,
      duration: '180 Min',
      index: '06',
      highlights: ['Door-to-Door Chaperone', 'Appointment Consultation Notes', 'Safe Transit'],
    },
    {
      slug: 'vital-signs-monitoring',
      title: 'Vital Signs Monitoring',
      category: 'Diagnostic Telemetry',
      shortDescription: 'Regular monitoring for your health and peace of mind.',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
      price: 2500,
      duration: '60 Min',
      index: '07',
      highlights: ['BP & Glucose Telemetry', 'SpO2 & Heart Rhythm', 'Trend Logging for Doctors'],
    },
    {
      slug: 'health-education',
      title: 'Health Education',
      category: 'Family Training',
      shortDescription: 'Empowering you and your family with health knowledge.',
      imageUrl: '/images/nutrition-wellness.jpg',
      price: 3000,
      duration: '90 Min',
      index: '08',
      highlights: ['Caregiver Skills Training', 'Hygiene & Safety Protocols', 'Preventive Guidance'],
    },
  ];

  const defaultProfessionals = [
    {
      fullName: 'Shanice',
      roleTitle: 'Founder & Chief Executive Officer',
      nckReg: 'CEO / KOMFOCARE',
      qualifications: 'Healthcare Administration | Home-Based Care Innovation | Patient-Centred Leadership',
      areasOfPractice: 'Strategic Leadership • Home Healthcare Operations • Community Health',
      experienceYears: 0,
      rating: 5.0,
      totalVisits: 0,
      photoUrl: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=400',
      bio: 'Shanice is the visionary founder and CEO of KomfoCare, driving the mission to bring compassionate, hospital-grade healthcare directly into Kenyan homes. Under her leadership, KomfoCare has redefined home-based care across Nairobi.',
    },
  ];

  const categories = ['ALL', 'NURSING CARE', 'SENIOR SUPPORT', 'REHABILITATION', 'CLINICAL ADHERENCE', 'HOLISTIC SUPPORT', 'MOBILITY & ESCORT', 'DIAGNOSTIC TELEMETRY', 'FAMILY TRAINING'];

  const filteredServices =
    activeCategory === 'ALL'
      ? defaultServices
      : defaultServices.filter((s) => s.category.toUpperCase() === activeCategory);

  // Hero Terminal Dynamic Data
  const terminalData = {
    wound: {
      title: 'Sterile Wound & Home Nursing Care',
      category: 'Home Nursing Care',
      lead: 'Shanice — CEO, KomfoCare',
      nck: 'CEO / KOMFOCARE',
      eta: '35 mins',
      rate: 'KES 4,500',
      kitStatus: 'Sterile Surgical Tray & Antiseptics Ready',
      vitalsSample: 'BP 118/78 • SpO2 99% • Pulse 72 bpm',
      photo: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=400',
      serviceSlug: 'home-nursing-care',
    },
    elderly: {
      title: 'Elderly Care & Assisted Living',
      category: 'Elderly Care',
      lead: 'Shanice — CEO, KomfoCare',
      nck: 'CEO / KOMFOCARE',
      eta: '40 mins',
      rate: 'KES 3,500',
      kitStatus: 'Fall-Risk Monitor & Medication Organizer Ready',
      vitalsSample: 'BP 125/82 • Glucose 5.4 mmol/L • Temp 36.7°C',
      photo: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=400',
      serviceSlug: 'elderly-care',
    },
    postop: {
      title: 'Post-Surgery Care & Recovery',
      category: 'Post-Surgery Care',
      lead: 'Shanice — CEO, KomfoCare',
      nck: 'CEO / KOMFOCARE',
      eta: '30 mins',
      rate: 'KES 5,000',
      kitStatus: 'Incision Care Kit & Drainage Monitor Ready',
      vitalsSample: 'BP 120/80 • SpO2 98% • Pulse 70 bpm',
      photo: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=400',
      serviceSlug: 'post-surgery-care',
    },
    vitals: {
      title: 'Vital Signs Monitoring & Telemetry',
      category: 'Vital Signs Monitoring',
      lead: 'Shanice — CEO, KomfoCare',
      nck: 'CEO / KOMFOCARE',
      eta: '25 mins',
      rate: 'KES 2,500',
      kitStatus: 'Calibrated Blood Pressure & Glucometer Pack Ready',
      vitalsSample: 'BP 122/80 • Glucose 5.6 mmol/L • SpO2 99%',
      photo: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=400',
      serviceSlug: 'vital-signs-monitoring',
    },
  };

  const activeTerminal = terminalData[heroDiscipline];

  // Configurator Calculation
  const baseRate = careFrequency === 'single' ? 4500 : careFrequency === 'weekly' ? 12500 : 28000;
  const durationMultiplier = careDuration === 2 ? 1 : careDuration === 4 ? 1.6 : 2.5;
  const addonsTotal = selectedAddons.length * 800;
  const estimatedCost = Math.round(baseRate * durationMultiplier + addonsTotal);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Neighborhood Data
  const neighborhoods = [
    { name: 'Westlands', eta: '25-35 mins', activeNurses: 8, lead: 'KomfoCare Team' },
    { name: 'Karen & Langata', eta: '30-45 mins', activeNurses: 6, lead: 'KomfoCare Team' },
    { name: 'Kilimani & Lavington', eta: '20-30 mins', activeNurses: 9, lead: 'KomfoCare Team' },
    { name: 'Runda & Gigiri', eta: '35-45 mins', activeNurses: 5, lead: 'KomfoCare Team' },
    { name: 'Parklands & Muthaiga', eta: '25-35 mins', activeNurses: 7, lead: 'KomfoCare Team' },
    { name: 'Kitisuru & Spring Valley', eta: '30-40 mins', activeNurses: 4, lead: 'KomfoCare Team' },
  ];

  const currentArea = neighborhoods.find((n) => n.name === selectedNeighborhood) || neighborhoods[0];

  // FAQs Data
  const faqs = [
    {
      q: 'How quickly can a registered nurse arrive at our home in Nairobi?',
      a: 'For urgent care and pre-scheduled appointments across Nairobi metro (Westlands, Karen, Kilimani, Lavington, Runda, Parklands), our average clinical dispatch time is under 45 minutes. You can track your clinician assignment in real-time.',
      category: 'Dispatch',
    },
    {
      q: 'Are all visiting healthcare professionals licensed by the Nursing Council of Kenya (NCK)?',
      a: 'Yes, 100% of KomfoCare visiting nurses and clinical practitioners hold active licenses with the Nursing Council of Kenya (NCK), up-to-date Basic Life Support (BLS) certifications, and undergo rigorous background vetting and sterile procedure testing.',
      category: 'Safety',
    },
    {
      q: 'Can family members living abroad or at work monitor clinical visit notes and vitals?',
      a: 'Yes. Every visit produces instant digital clinical documentation, including blood pressure, heart rate, blood glucose curves, wound progress notes, and clinician recommendations accessible 24/7 via the secure KomfoCare Family Portal.',
      category: 'Portal',
    },
    {
      q: 'What medical equipment and sterile supplies do the clinicians bring?',
      a: 'Every nurse arrives equipped with hospital-grade sterile dressing trays, antiseptic solutions, digital blood pressure cuffs, pulse oximeters, glucometers with sterile lancets, and single-use personal protective equipment (PPE).',
      category: 'Clinical',
    },
    {
      q: 'How does payment and booking confirmation work?',
      a: 'You can book seamlessly online without upfront penalty. We accept M-Pesa, card, and corporate direct invoicing. Transparent flat-rate pricing includes all standard clinical supplies with zero hidden fees.',
      category: 'Billing',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.category.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="space-y-24 sm:space-y-36 pb-24 overflow-hidden selection:bg-komfo-600 selection:text-white">
      {/* ========================================================
          HERO SECTION — Sleek Asymmetric Clinical Command
      ======================================================== */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-komfo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Micro Meta Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="text-label">KOMFOCARE HOME-BASED SERVICES • NAIROBI, KENYA</div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-mono text-slate-300 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CLINICAL DISPATCH ACTIVE • CALL 0792004232</span>
            </div>
          </div>

          {/* Asymmetric Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-500/10 border border-amber-400/20 px-3.5 py-1 rounded-full inline-block">
                  Compassionate Care. Right at Home.
                </span>
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-display text-display-massive text-white tracking-tight leading-[1.15]">
                  Professional <span className="text-komfo-300">Home-Based Care</span> Services.
                </h1>
              </div>

              <div className="space-y-2">
                <p className="text-base sm:text-lg text-slate-200 font-semibold leading-relaxed">
                  "We come to you, so you can stay where you feel safe."
                </p>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-xl leading-relaxed font-sans">
                  Compassionate, reliable and personalized care in the comfort of your home. Professional care. Personal touch. Peace of mind.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2 font-mono">
                <Link
                  to="/book-care"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-all duration-300"
                >
                  <span>Book Care Today</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:0792004232"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-komfo-400" />
                  <span>Call 0792004232</span>
                </a>
              </div>

              {/* Micro-Meta Badges */}
              <div className="flex items-center flex-wrap gap-y-2 gap-x-6 pt-4 text-[11px] uppercase tracking-widest text-slate-300 font-mono border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-komfo-400" />
                  <span>komfocare@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>&lt; 45m Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase — Interactive Live Clinical Dispatch Terminal */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl p-5 sm:p-7 glass-surface border border-white/15 shadow-2xl space-y-6">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 ml-2 font-bold">
                      BOOK CARE TODAY • RADAR
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    HOTLINE: 0792004232
                  </span>
                </div>

                {/* Discipline Selector Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                  <button
                    type="button"
                    onClick={() => setHeroDiscipline('wound')}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold uppercase transition-all ${
                      heroDiscipline === 'wound'
                        ? 'bg-komfo-600 text-white shadow-glow border border-komfo-400'
                        : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                    }`}
                  >
                    Wound Care
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroDiscipline('elderly')}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold uppercase transition-all ${
                      heroDiscipline === 'elderly'
                        ? 'bg-komfo-600 text-white shadow-glow border border-komfo-400'
                        : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                    }`}
                  >
                    Elderly Care
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroDiscipline('postop')}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold uppercase transition-all ${
                      heroDiscipline === 'postop'
                        ? 'bg-komfo-600 text-white shadow-glow border border-komfo-400'
                        : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                    }`}
                  >
                    Post-Surgery
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroDiscipline('vitals')}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold uppercase transition-all ${
                      heroDiscipline === 'vitals'
                        ? 'bg-komfo-600 text-white shadow-glow border border-komfo-400'
                        : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                    }`}
                  >
                    Vitals Check
                  </button>
                </div>

                {/* Matched Clinician Interactive Preview */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={activeTerminal.photo}
                        alt={activeTerminal.lead}
                        className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl object-cover border border-white/20 shadow-md flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm sm:text-base font-display">
                            {activeTerminal.lead}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[9px] font-mono font-bold">
                            VERIFIED
                          </span>
                        </div>
                        <p className="text-xs text-amber-400 font-mono mt-0.5">{activeTerminal.nck}</p>
                        <p className="text-[11px] text-slate-400 font-sans">{activeTerminal.category}</p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right font-mono">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Dispatch</span>
                      <span className="text-base font-extrabold text-emerald-400 flex items-center sm:justify-end gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {activeTerminal.eta}
                      </span>
                      <span className="text-xs text-slate-300 font-bold">{activeTerminal.rate}</span>
                    </div>
                  </div>

                  {/* Supply & Protocol Status */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-[11px] text-slate-400">Clinical Protocol:</span>
                      <span className="text-amber-300 font-semibold">{activeTerminal.kitStatus}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 pt-1.5 border-t border-white/5">
                      <span className="text-[11px] text-slate-400">Telemetry Stream:</span>
                      <span className="text-emerald-400 font-bold">{activeTerminal.vitalsSample}</span>
                    </div>
                  </div>
                </div>

                {/* Terminal Footer Quick Action */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="text-[11px] text-slate-400 font-sans">
                    Includes sterile supplies, nurse lead, and family app telemetry.
                  </div>

                  <Link
                    to={`/book-care?service=${activeTerminal.serviceSlug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-komfo-600 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-glow transition-all hover:scale-105 flex-shrink-0"
                  >
                    <span>Instant Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          TELEMETRY METRICS RIBBON — High Contrast Proof
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">1,250+</span>
            <p className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">Verified Home Visits</p>
            <p className="text-[11px] text-slate-400 font-sans">Across Nairobi metro families</p>
          </div>
          <div className="space-y-1 border-l border-white/10">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-emerald-400 tracking-tight">100%</span>
            <p className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">NCK Registered Nurses</p>
            <p className="text-[11px] text-slate-400 font-sans">Zero unverified aides</p>
          </div>
          <div className="space-y-1 border-l border-white/10">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">4.98 / 5.0</span>
            <p className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">Family Rating Score</p>
            <p className="text-[11px] text-slate-400 font-sans">From 340+ verified reviews</p>
          </div>
          <div className="space-y-1 border-l border-white/10">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-komfo-300 tracking-tight">&lt; 45 Min</span>
            <p className="text-xs font-mono uppercase tracking-wider text-komfo-300 font-bold">Rapid Dispatch ETA</p>
            <p className="text-[11px] text-slate-400 font-sans">Punctual bedside arrival</p>
          </div>
        </div>
      </section>

      {/* ========================================================
          OUR SERVICES — 6 Core Disciplines (First Image Overview)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="text-label">OUR SERVICES OVERVIEW</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-display-massive text-white tracking-tight">
              Hospital-Standard Care In Your Home.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md font-sans leading-relaxed">
            Professional home healthcare delivered with compassionate precision across Nairobi, Kenya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Medical Doctors',
              desc: 'Qualified physician assessments, treatment plan evaluations, and continuous clinical oversight.',
              icon: Stethoscope,
              tag: 'Clinical Lead',
              image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
            },
            {
              title: 'Nursing Team',
              desc: 'Licensed registered nurses providing sterile wound care, medication administration, and vital checks.',
              icon: Heart,
              tag: 'NCK Registered',
              image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
            },
            {
              title: 'Physiotherapy',
              desc: 'Targeted physical rehabilitation, mobility enhancement, and post-stroke or orthopedic recovery.',
              icon: Activity,
              tag: 'Rehabilitation',
              image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
            },
            {
              title: 'Nutrition Services',
              desc: 'Personalized dietary guidance, diabetes management, and balanced nutrition planning for recovery.',
              icon: Sparkles,
              tag: 'Wellness',
              image: '/images/nutrition-wellness.jpg',
            },
            {
              title: 'Care in the Comfort of Your Home',
              desc: 'We come to you, so you can stay where you feel safe. High quality care in your private sanctuary.',
              icon: ShieldCheck,
              tag: 'Home-Based',
              image: '/images/holistic-health.jpg',
            },
            {
              title: 'Elderly & Chronic Care Support',
              desc: 'Attentive companionship, daily living support, fall prevention, and chronic condition management.',
              icon: Users,
              tag: 'Geriatric Support',
              image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=600',
            },
          ].map((item, idx) => (
            <div
              key={item.title}
              className="rounded-3xl glass-card border border-white/15 overflow-hidden hover:border-komfo-400/60 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Media image header */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1428] via-[#0d1428]/50 to-transparent" />
                
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md text-komfo-300 border border-white/20 flex items-center justify-center shadow-sm">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-amber-300 font-bold">
                    {item.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between -mt-4 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>0{idx + 1} Pillar</span>
                  <Link to="/book-care" className="text-komfo-400 hover:text-white font-bold flex items-center gap-1">
                    <span>Book Care</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE CARE PLAN & INVESTMENT ESTIMATOR (Advanced)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="text-label">INTERACTIVE CARE PLAN ESTIMATOR</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-display-massive text-white tracking-tight">
              Tailor Your In-Home Clinical Plan.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md font-sans leading-relaxed">
            Configure visit cadence, required procedures, and session duration for transparent, upfront pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Cadence Selection */}
            <div className="p-6 rounded-3xl glass-card border border-white/15 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                Step 1: Select Care Cadence
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <button
                  type="button"
                  onClick={() => setCareFrequency('single')}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    careFrequency === 'single'
                      ? 'bg-komfo-600/30 border-komfo-400 shadow-glow text-white'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-sm block">Single Acute Visit</span>
                  <span className="text-[10px] text-slate-400 block mt-1">One-off procedure or check</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCareFrequency('weekly')}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    careFrequency === 'weekly'
                      ? 'bg-komfo-600/30 border-komfo-400 shadow-glow text-white'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-sm block">3x / Week Recovery</span>
                  <span className="text-[10px] text-amber-400 font-bold block mt-1">Most Recommended</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCareFrequency('daily')}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    careFrequency === 'daily'
                      ? 'bg-komfo-600/30 border-komfo-400 shadow-glow text-white'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-sm block">7-Day Continuous</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Comprehensive living care</span>
                </button>
              </div>
            </div>

            {/* Duration Slider */}
            <div className="p-6 rounded-3xl glass-card border border-white/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Step 2: Clinician Session Duration
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold">
                  {careDuration} Hours / Visit
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono">
                {[2, 4, 8].map((hours) => (
                  <button
                    key={hours}
                    type="button"
                    onClick={() => setCareDuration(hours)}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                      careDuration === hours
                        ? 'bg-komfo-600 text-white border-komfo-400 shadow-glow'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {hours} Hours {hours === 8 ? '(Full Shift)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Addon Procedures */}
            <div className="p-6 rounded-3xl glass-card border border-white/15 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                Step 3: Clinical Procedures Included
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {[
                  { id: 'wound', label: 'Sterile Wound Dressing Kit', detail: 'Hospital-grade asepsis' },
                  { id: 'vitals', label: 'Biomarker & Vitals Telemetry', detail: 'BP, SpO2, Heart Rhythm' },
                  { id: 'meds', label: 'Medication Compliance Setup', detail: 'Multi-drug review & refill' },
                  { id: 'mobility', label: 'Rehab Transfer & Ambulation', detail: 'Fall-prevention support' },
                ].map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-2xl border text-left flex items-start justify-between transition-all ${
                        isChecked
                          ? 'bg-white/10 border-komfo-400/80 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-white text-xs">{addon.label}</p>
                        <p className="text-[10px] text-slate-400 font-sans mt-0.5">{addon.detail}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border mt-0.5 ${
                          isChecked ? 'bg-komfo-600 border-komfo-400 text-white' : 'border-white/20'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Calculation Summary Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-7 rounded-3xl glass-surface border border-white/20 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                  Configured Care Summary
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] font-mono font-bold uppercase">
                  Transparent Rate
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-mono">Estimated Total Care Investment:</span>
                <div className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight mt-1">
                  KES {estimatedCost.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {careFrequency === 'single' ? 'Per single home session' : careFrequency === 'weekly' ? 'Billed weekly (3 visits)' : 'Billed weekly (7 visits)'}
                </span>
              </div>

              {/* What is Included List */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs font-sans">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Licensed NCK Registered Nurse Lead</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Hospital-grade sterile PPE & procedure supplies</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Real-time digital vitals charting on Family Portal</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Dedicated care coordinator phone hotline</span>
                </div>
              </div>

              <Link
                to="/book-care"
                className="w-full py-4 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-mono font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-[1.02] transition-all text-center block"
              >
                Proceed with Configured Plan
              </Link>

              <p className="text-[10px] text-slate-400 text-center font-mono">
                No credit card required upfront • Free cancellation 24h prior
              </p>
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

          {/* Category Chips Bar */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1428] via-[#0d1428]/40 to-transparent" />

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
          HOSPITAL STANDARD VS TRADITIONAL CARE (Comparison Matrix)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="text-label justify-center">CLINICAL COMPARISON MATRIX</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-display-massive text-white tracking-tight">
            Why In-Home Clinical Care?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            How KomfoCare's hospital-grade home care compares to hospital queues and informal hiring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hospital Outpatient */}
          <div className="p-7 rounded-3xl glass-card border border-white/10 space-y-5 opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Standard Hospital Outpatient
            </span>
            <h3 className="text-xl font-bold font-display text-white">Crowded Hospital Visits</h3>
            <ul className="space-y-3 text-xs font-sans text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>2-4 hours waiting in congested corridors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Elevated exposure to nosocomial infections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Stressful transit for frail or post-op patients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Rushed 5-minute consultation window</span>
              </li>
            </ul>
          </div>

          {/* KomfoCare In-Home Clinical Standard (Featured) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0d1f4a] to-[#080d1a] border-2 border-komfo-500 shadow-glow space-y-5 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-komfo-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
              KOMFOCARE CLINICAL STANDARD
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block pt-2">
              Hospital-Grade In Your Home
            </span>
            <h3 className="text-2xl font-bold font-display text-white">Compassion & Precision</h3>
            <ul className="space-y-3 text-xs font-sans text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>NCK-Licensed Registered Nurses & Clinicians</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Hospital-grade sterile procedure kits brought to bedside</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Real-time digital vitals charting on secure Family Portal</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Dignified, unhurried 1-on-1 personalized attention</span>
              </li>
            </ul>
            <Link
              to="/book-care"
              className="w-full py-3 rounded-full bg-gradient-to-r from-komfo-600 to-indigo-600 text-white font-mono font-bold text-xs uppercase tracking-wider text-center block shadow-md hover:scale-105 transition-all"
            >
              Book In-Home Visit
            </Link>
          </div>

          {/* Informal Domestic Care */}
          <div className="p-7 rounded-3xl glass-card border border-white/10 space-y-5 opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Informal Unvetted Aides
            </span>
            <h3 className="text-xl font-bold font-display text-white">Unregulated Domestic Aides</h3>
            <ul className="space-y-3 text-xs font-sans text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>No Nursing Council of Kenya credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>No sterile procedure or infection control training</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Zero clinical documentation or vital signs logs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>High liability and uncertain emergency protocols</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================
          LEADERSHIP SHOWCASE — Shanice, CEO of KomfoCare
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative">
        {/* Liquid ambient orbs */}
        <div className="liquid-blob w-[500px] h-[500px] bg-komfo-600 top-0 left-1/2 -translate-x-1/2 -z-10" />
        <div className="liquid-blob-sm liquid-blob w-[300px] h-[300px] bg-sky-500 bottom-0 right-0 -z-10" style={{animationDelay: '4s'}} />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="text-label">LEADERSHIP / FOUNDER</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-display-massive text-white tracking-tight">
              The Vision Behind KomfoCare.
            </h2>
          </div>
          <Link
            to="/professionals"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full morphic-pill text-white font-mono text-xs uppercase tracking-wider hover:border-komfo-400 transition-all"
          >
            <span>Meet the Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Single CEO Feature Card */}
        {defaultProfessionals.map((prof) => (
          <div
            key={prof.fullName}
            className="liquid-profile liquid-shimmer rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row gap-10 items-center"
          >
            {/* Photo */}
            <div className="relative flex-shrink-0">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border border-komfo-500/30 shadow-glow">
                <img
                  src={prof.photoUrl}
                  alt={prof.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl bg-komfo-600 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-glow">
                CEO & Founder
              </div>
              {/* Liquid glow ring */}
              <div className="absolute inset-0 rounded-3xl" style={{boxShadow: '0 0 60px rgba(37,99,235,0.2)'}} />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6 relative z-10">
              <div className="space-y-1">
                <p className="text-xs font-mono font-bold tracking-widest text-komfo-400 uppercase">KOMFOCARE LEADERSHIP</p>
                <h3 className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight">{prof.fullName}</h3>
                <p className="text-base text-sky-300 font-mono font-semibold">{prof.roleTitle}</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-xl">
                {prof.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="liquid-card rounded-2xl p-4 space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Focus Areas</p>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">{prof.areasOfPractice}</p>
                </div>
                <div className="liquid-card rounded-2xl p-4 space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Background</p>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">{prof.qualifications}</p>
                </div>
              </div>

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
        ))}
      </section>

      {/* ========================================================
          NAIROBI METRO COVERAGE RADAR (Interactive Area Checker)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="p-8 sm:p-12 rounded-3xl glass-surface border border-white/15 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-label">RAPID DISPATCH RADAR</div>
              <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
                Nairobi Metro Neighborhood Coverage
              </h3>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold self-start sm:self-auto">
              ALL 6 ZONES ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
            {neighborhoods.map((zone) => (
              <button
                key={zone.name}
                type="button"
                onClick={() => setSelectedNeighborhood(zone.name)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedNeighborhood === zone.name
                    ? 'bg-komfo-600 text-white border-komfo-400 shadow-glow'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-xs font-bold block truncate">{zone.name}</span>
                <span className="text-[10px] opacity-80 block mt-1">{zone.eta}</span>
              </button>
            ))}
          </div>

          {/* Active Area Details Banner */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-komfo-600/30 border border-komfo-400/40 text-komfo-300 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white font-sans">{currentArea.name} Sector</p>
                <p className="text-xs text-slate-400">
                  {currentArea.activeNurses} Clinicians On-Call • Lead: {currentArea.lead}
                </p>
              </div>
            </div>

            <Link
              to="/book-care"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-komfo-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all"
            >
              <span>Dispatch to {currentArea.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          BRAND VALUES & BENEFITS — 4 Core Concepts (Second Image)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <div className="text-label justify-center">OUR PROMISE & BRAND VALUES</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-display-massive text-white tracking-tight">
            We Bring Quality Care to You.
          </h2>
          <p className="text-sm sm:text-base text-amber-300 font-semibold font-sans">
            "So you can focus on what matters most."
          </p>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Professional care. Personal touch. Peace of mind. Compassionate care, right at home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-3xl glass-card border border-white/15 space-y-3 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-komfo-600/20 text-komfo-400 border border-komfo-400/30 flex items-center justify-center shadow-glow mb-1">
              <Heart className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">01 / HOME SANCTUARY</span>
            <h3 className="text-xl font-bold font-display text-white">Care at Home</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              We come to you, so you can stay where you feel safe. Clinical recovery delivered in familiar, stress-free surroundings.
            </p>
          </div>

          <div className="p-7 rounded-3xl glass-card border border-white/15 space-y-3 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shadow-glow mb-1">
              <Sparkles className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">02 / EMPATHY & DIGNITY</span>
            <h3 className="text-xl font-bold font-display text-white">Compassionate Support</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Attentive, dignity-centered care that listens to patients and supports family caregivers with unwavering empathy.
            </p>
          </div>

          <div className="p-7 rounded-3xl glass-card border border-white/15 space-y-3 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shadow-glow mb-1">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">03 / VERIFIED EXPERTISE</span>
            <h3 className="text-xl font-bold font-display text-white">Professional & Reliable</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Licensed registered nurses (NCK), punctual clinical dispatch across Nairobi, and hospital-standard procedure kits.
            </p>
          </div>

          <div className="p-7 rounded-3xl glass-card border border-white/15 space-y-3 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shadow-glow mb-1">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">04 / CLINICAL SAFETY</span>
            <h3 className="text-xl font-bold font-display text-white">You Are in Safe Hands</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Thorough clinical protocols, continuous vital telemetry tracking, and physician collaboration for complete peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          BOOK CARE TODAY & QUICK CONNECT CARD (With QR Code)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-4xl glass-surface border border-white/20 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="text-label">DIRECT BOOKING & COORDINATION</div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-display-massive text-white tracking-tight">
                BOOK CARE TODAY!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Professional home-based care services across Nairobi, Kenya. Reach our clinical team directly or scan our quick connect code.
              </p>
            </div>

            {/* Contact coordinates list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <a
                href="tel:0792004232"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400 transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">PHONE BOOKING</span>
                  <span className="text-white font-bold text-sm group-hover:text-amber-300">0792004232</span>
                </div>
              </a>

              <a
                href="mailto:komfocare@gmail.com"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-komfo-400 transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-komfo-600/20 text-komfo-300 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <Phone className="w-5 h-5 opacity-0 hidden" />
                  <Heart className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="text-slate-400 text-[10px] block">EMAIL BOOKING</span>
                  <span className="text-white font-bold text-xs group-hover:text-komfo-300 truncate block">komfocare@gmail.com</span>
                </div>
              </a>
            </div>

            {/* Social channels */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                Social Media Channels
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <a
                  href="https://facebook.com/KomfoCare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-komfo-400 text-slate-300 hover:text-white transition-colors"
                >
                  Facebook: KomfoCare
                </a>
                <a
                  href="https://instagram.com/KomfoCare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-komfo-400 text-slate-300 hover:text-white transition-colors"
                >
                  Instagram: @KomfoCare
                </a>
                <a
                  href="https://x.com/KomfoCare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-komfo-400 text-slate-300 hover:text-white transition-colors"
                >
                  Twitter/X: @KomfoCare
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/book-care"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-all"
              >
                <span>Complete Online Booking Wizard</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* QR Code Graphic Box */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 text-center space-y-4 max-w-xs shadow-2xl backdrop-blur-xl">
              <div className="w-44 h-44 mx-auto rounded-2xl bg-white p-3 shadow-inner flex flex-col items-center justify-center">
                {/* SVG QR Code Illustration */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                  <rect x="10" y="10" width="25" height="25" rx="4" />
                  <rect x="15" y="15" width="15" height="15" fill="white" rx="2" />
                  <rect x="18" y="18" width="9" height="9" fill="#7C3AED" />
                  <rect x="65" y="10" width="25" height="25" rx="4" />
                  <rect x="70" y="15" width="15" height="15" fill="white" rx="2" />
                  <rect x="73" y="18" width="9" height="9" fill="#7C3AED" />
                  <rect x="10" y="65" width="25" height="25" rx="4" />
                  <rect x="15" y="70" width="15" height="15" fill="white" rx="2" />
                  <rect x="18" y="73" width="9" height="9" fill="#7C3AED" />
                  <rect x="42" y="10" width="8" height="8" rx="1" />
                  <rect x="52" y="18" width="8" height="8" rx="1" />
                  <rect x="42" y="28" width="8" height="8" rx="1" />
                  <rect x="10" y="42" width="8" height="8" rx="1" />
                  <rect x="22" y="48" width="8" height="8" rx="1" />
                  <rect x="42" y="42" width="16" height="16" fill="#7C3AED" rx="3" />
                  <rect x="65" y="42" width="8" height="8" rx="1" />
                  <rect x="78" y="48" width="8" height="8" rx="1" />
                  <rect x="42" y="65" width="8" height="8" rx="1" />
                  <rect x="52" y="75" width="8" height="8" rx="1" />
                  <rect x="70" y="65" width="8" height="8" rx="1" />
                  <rect x="65" y="78" width="12" height="12" rx="2" />
                  <rect x="82" y="78" width="8" height="8" rx="1" />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  Scan to connect with us
                </span>
                <p className="text-[11px] text-slate-300 font-mono">
                  Instant WhatsApp & Helpline Dispatch
                </p>
                <a
                  href="tel:0792004232"
                  className="text-xs font-mono font-extrabold text-white hover:text-amber-300 block pt-1"
                >
                  0792004232
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE PROTOCOL & FAQ ACCORDION
      ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 text-center">
          <div className="text-label justify-center">CLINICAL QUESTIONS & ANSWERS</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-display-massive text-white tracking-tight">
            Frequently Asked Questions.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl mx-auto">
            Everything you need to know about credentials, sterile safety protocols, and family coordination.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search questions by keyword..."
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-komfo-500 focus:outline-none focus:border-komfo-400 font-mono"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl glass-card border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-white text-base hover:text-komfo-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-400 flex items-center justify-center flex-shrink-0">
                      ?
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-white bg-komfo-600 border-komfo-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          FINAL CTA CARD — Massive Glowing Editorial Call-to-Action
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-4xl overflow-hidden bg-gradient-to-br from-[#0d1f4a] via-[#091530] to-[#080d1a] border border-white/15 p-8 sm:p-16 text-center space-y-8 shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-komfo-600/25 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="text-label justify-center">SCHEDULE HOME HEALTHCARE</div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-display-massive text-white tracking-tight">
              Ready for Compassionate Care at Home?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Schedule a qualified registered nurse or clinician today. Instant booking confirmation with reference tracking code.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-mono">
            <Link
              to="/book-care"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-all"
            >
              <span>Book a Home Visit Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Contact Care Helpline</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

