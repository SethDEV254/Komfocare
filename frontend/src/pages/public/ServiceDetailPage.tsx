import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Clock,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Phone,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  Check,
} from 'lucide-react';
import { Service } from '../../types';
import { apiClient } from '../../api/client';
import { formatCurrency } from '../../utils/formatters';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Static fallback map for all 8 services
  const fallbackServices: Record<string, any> = {
    'home-nursing-care': {
      title: 'Home Nursing Care',
      shortDescription: 'Professional clinical nursing support delivered with compassion in the comfort of your home.',
      fullDescription: 'Our licensed registered nurses provide specialized clinical nursing care including sterile surgical wound dressing, catheter care, injection administration, intravenous (IV) fluid management, post-acute monitoring, and symptom relief directly in your home environment.',
      category: 'Clinical Care',
      basePrice: 4500,
      currency: 'KES',
      durationMinutes: 120,
      benefits: [
        'Avoid stressful and costly hospital trips for routine clinical procedures',
        'Direct 1-on-1 attention from licensed registered nurses (RNs)',
        'Personalized care routines tailored to your physician recommendations',
        'Comfortable and infection-minimized home recovery environment',
      ],
      includedItems: [
        'Comprehensive clinical health examination & vital signs logging',
        'Sterile wound dressing, medication administration, or IV therapy',
        'Incision inspection and infection risk assessment',
        'Digital visit summary submitted to patient portal & treating doctor',
      ],
      faqs: [
        {
          question: 'What qualifications do your home nurses possess?',
          answer: 'All KomfoCare nurses are licensed Registered Nurses (RNs) registered with the Nursing Council with background checks and acute clinical experience.',
        },
        {
          question: 'How quickly can a nurse visit my home?',
          answer: 'Visits can be scheduled on the same day for urgent requests or planned ahead according to your weekly routine.',
        },
      ],
    },
    'elderly-care': {
      title: 'Elderly Care',
      shortDescription: 'Compassionate, dignified, and attentive home care tailored specifically for senior loved ones.',
      fullDescription: 'Our elderly care services focus on promoting independence, dignity, companionship, mobility safety, and daily living support for older adults, ensuring peace of mind for their families.',
      category: 'Senior Support',
      basePrice: 3500,
      currency: 'KES',
      durationMinutes: 180,
      benefits: [
        'Promotes dignity, social engagement, and emotional well-being',
        'Fall prevention and assistance with daily mobility routines',
        'Personal hygiene, nutrition, and hydration support',
        'Regular wellness updates provided to authorized family members',
      ],
      includedItems: [
        'Daily living and assisted mobility support',
        'Cognitive engagement, conversation, and companionship',
        'Nutrition and hydration monitoring',
        'Vital signs tracking and home safety environment audit',
      ],
      faqs: [
        {
          question: 'Can care plans be adjusted as needs change?',
          answer: 'Yes, care plans are periodically reviewed with families and adjusted seamlessly.',
        },
      ],
    },
    'post-surgery-care': {
      title: 'Post-Surgery Care',
      shortDescription: 'Comprehensive recovery and rehabilitation support following hospital discharge.',
      fullDescription: 'Recover faster and safer at home after surgical procedures with specialized wound management, pain management adherence, mobility assistance, and early complication prevention.',
      category: 'Recovery',
      basePrice: 5000,
      currency: 'KES',
      durationMinutes: 120,
      benefits: [
        'Significantly lowers risk of post-operative hospital readmission',
        'Expert surgical incision and wound care management',
        'Guided gentle mobilization to accelerate physical recovery',
        'Continuous pain monitoring and medication adherence',
      ],
      includedItems: [
        'Incision inspection and sterile dressing changes',
        'Drain and catheter management if present',
        'Pain and vital signs monitoring',
        'Discharge instruction adherence coordination',
      ],
      faqs: [
        {
          question: 'When should post-surgery home care begin?',
          answer: 'Ideally within 24 hours of hospital discharge, pre-coordinated before discharge.',
        },
      ],
    },
    'medication-management': {
      title: 'Medication Management',
      shortDescription: 'Reliable support with prescribed medication routines, schedules, and reminders.',
      fullDescription: 'Ensure accurate medication adherence, prevent missed doses or double dosage, monitor for adverse side-effects, and maintain an organized medication schedule aligned with your prescribing physician.',
      category: 'Wellness & Adherence',
      basePrice: 2800,
      currency: 'KES',
      durationMinutes: 60,
      benefits: [
        'Eliminates confusion across multiple daily prescriptions',
        'Prevents dangerous drug-drug interactions and dosage errors',
        'Maintains timely refill schedules and pill organizer setups',
        'Documents compliance logs for treating physicians',
      ],
      includedItems: [
        'Medication reconciliation and routine setup',
        'Weekly pill organizer preparation',
        'Side-effect monitoring and physician communication',
        'Digital adherence logging',
      ],
      faqs: [
        {
          question: 'Does KomfoCare prescribe medication?',
          answer: 'No. KomfoCare administers and organizes medications strictly prescribed by your licensed medical practitioner.',
        },
      ],
    },
    'palliative-care': {
      title: 'Palliative Care',
      shortDescription: 'Comfort, dignity, and quality-of-life focused holistic home care for complex health journeys.',
      fullDescription: 'Compassionate medical, emotional, and physical support designed to optimize quality of life and relieve distress for patients and families managing serious chronic or advanced illnesses.',
      category: 'Specialized Care',
      basePrice: 6000,
      currency: 'KES',
      durationMinutes: 180,
      benefits: [
        'Expert symptom and pain relief tailored to patient comfort',
        'Empathetic emotional support for both patient and family members',
        'Dignity-centered care delivered in warm, familiar surroundings',
        'Coordinated communication with primary treating specialists',
      ],
      includedItems: [
        'Holistic comfort and symptom assessment',
        'Gentle hygiene, skin integrity, and positioning care',
        'Family emotional guidance and respite support',
        'Caregiver counseling and coordination',
      ],
      faqs: [],
    },
    'patient-escort': {
      title: 'Patient Escort',
      shortDescription: 'Professional bedside-to-appointment accompaniment for hospital visits and therapies.',
      fullDescription: 'Trained healthcare professionals accompany patients safely to doctor consultations, dialysis sessions, physiotherapy, or imaging appointments, taking care of navigation, notes, and comfort.',
      category: 'Mobility & Support',
      basePrice: 3800,
      currency: 'KES',
      durationMinutes: 240,
      benefits: [
        'Safe assisted transfer and clinical supervision throughout transport',
        'Assistance with clinical check-in and doctor note taking',
        'Peace of mind for busy family members who cannot take time off work',
      ],
      includedItems: [
        'Door-to-door physical support',
        'Appointment chaperone and consultation note recording',
        'Safe return home and post-visit report to family',
      ],
      faqs: [],
    },
    'vital-signs-monitoring': {
      title: 'Vital Signs Monitoring',
      shortDescription: 'Systematic monitoring of vital parameters by certified clinicians to spot trends early.',
      fullDescription: 'Regular tracking of blood pressure, blood glucose, oxygen saturation (SpO2), heart rhythm, and temperature by certified healthcare staff with digital records accessible to doctors.',
      category: 'Preventive Care',
      basePrice: 2500,
      currency: 'KES',
      durationMinutes: 45,
      benefits: [
        'Identifies clinical fluctuations before they become emergencies',
        'Digital historical trend charts for physician consultations',
        'Immediate notification for abnormal clinical readings',
      ],
      includedItems: [
        'Multi-parameter vital signs examination',
        'Blood glucose and oxygen saturation analysis',
        'Instant digital record upload to patient portal',
      ],
      faqs: [],
    },
    'health-education': {
      title: 'Health Education',
      shortDescription: 'Guidance and practical training for patients and family caregivers.',
      fullDescription: 'Empowering families with hands-on skills in patient lifting, safe transfer techniques, diabetes diet management, hygiene protocols, and early warning signs recognition.',
      category: 'Education & Training',
      basePrice: 3000,
      currency: 'KES',
      durationMinutes: 90,
      benefits: [
        'Empowers family members with confidence and competence',
        'Reduces caregiver burnout through efficient techniques',
        'Improves patient safety and home hygiene standards',
      ],
      includedItems: [
        '1-on-1 practical caregiver skills session',
        'Personalized caregiving manual and checklist',
        'Q&A session with qualified healthcare educator',
      ],
      faqs: [],
    },
  };

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      try {
        const res = await apiClient<{ success: boolean; data: Service }>(`/services/${slug}`);
        if (res.success && res.data) {
          setService(res.data);
        } else {
          setService(fallbackServices[slug] || null);
        }
      } catch {
        setService(fallbackServices[slug] || null);
      } finally {
        setLoadingServicesSafe();
      }
    };

    const setLoadingServicesSafe = () => setLoading(false);
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <span className="w-8 h-8 border-4 border-komfo-600 border-t-transparent rounded-full inline-block animate-spin" />
        <p className="text-xs text-slate-500 mt-3 font-semibold">Loading service details...</p>
      </div>
    );
  }

  const currentService = service || (slug && fallbackServices[slug]) || fallbackServices['home-nursing-care'];

  // Parse benefits & items safely
  let parsedBenefits: string[] = [];
  if (Array.isArray(currentService.benefits)) {
    parsedBenefits = currentService.benefits;
  } else if (typeof currentService.benefits === 'string') {
    try {
      parsedBenefits = JSON.parse(currentService.benefits);
    } catch {
      parsedBenefits = [currentService.benefits];
    }
  }

  let parsedItems: string[] = [];
  if (Array.isArray(currentService.includedItems)) {
    parsedItems = currentService.includedItems;
  } else if (typeof currentService.includedItems === 'string') {
    try {
      parsedItems = JSON.parse(currentService.includedItems);
    } catch {
      parsedItems = [currentService.includedItems];
    }
  }

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Top Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8 space-y-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-komfo-400 hover:text-komfo-300 uppercase tracking-wider"
          >
            ← Back to All Services
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              {currentService.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight">
            {currentService.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
            {currentService.fullDescription || currentService.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Clock className="w-4 h-4 text-komfo-400" />
              <span className="text-slate-200">{currentService.durationMinutes} Minutes Visit</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-200">Licensed Registered Clinician</span>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 glass-card border border-white/15 shadow-2xl space-y-5">
          <div>
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Standard Home Visit Fee</span>
            <p className="text-3xl font-extrabold text-white font-display mt-1">
              {formatCurrency(currentService.basePrice, currentService.currency || 'KES')}
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Delivered at patient residence</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Digital visit report & notes</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Clinical coordinator review</span>
            </div>
          </div>

          <Link
            to={`/book-care?service=${slug}`}
            className="w-full text-center inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Service</span>
          </Link>

          <a
            href="tel:0792004232"
            className="w-full text-center inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-komfo-400" />
            <span>Call to Inquire: 0792004232</span>
          </a>
        </div>
      </div>

      {/* Benefits & Included Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-3xl p-8 glass-card border border-white/15 space-y-4">
          <h3 className="text-xl font-bold font-display text-white">Key Benefits</h3>
          <ul className="space-y-3 text-xs text-slate-300">
            {(parsedBenefits.length > 0
              ? parsedBenefits
              : [
                  'Avoid hospital commute stress',
                  'Dedicated 1-on-1 attention',
                  'Familiar and relaxing home surroundings',
                  'Regular updates provided to family',
                ]
            ).map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl p-8 glass-card border border-white/15 space-y-4">
          <h3 className="text-xl font-bold font-display text-white">What is Included</h3>
          <ul className="space-y-3 text-xs text-slate-300">
            {(parsedItems.length > 0
              ? parsedItems
              : [
                  'Comprehensive health assessment',
                  'Sterile clinical procedures',
                  'Vital signs monitoring & documentation',
                  'Post-visit care report',
                ]
            ).map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-komfo-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
