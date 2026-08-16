import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShieldCheck,
  Calendar,
  ArrowRight,
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
} from 'lucide-react';
import { Service, HealthcareProfessional, Testimonial, ServiceArea } from '../../types';
import { apiClient } from '../../api/client';
import { formatCurrency } from '../../utils/formatters';

export const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<HealthcareProfessional[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);

  useEffect(() => {
    // Fetch Homepage data from backend API with fallback defaults
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
        console.warn('Using default seed visuals for static preview');
      }
    };

    loadHomeData();
  }, []);

  // Fallback defaults if API not ready
  const defaultServices = [
    {
      slug: 'home-nursing-care',
      title: 'Home Nursing Care',
      shortDescription: 'Professional clinical nursing support delivered with compassion in the comfort of your home.',
      icon: Heart,
      price: 4500,
    },
    {
      slug: 'elderly-care',
      title: 'Elderly Care',
      shortDescription: 'Compassionate, dignified, and attentive home care tailored specifically for senior loved ones.',
      icon: Users,
      price: 3500,
    },
    {
      slug: 'post-surgery-care',
      title: 'Post-Surgery Care',
      shortDescription: 'Comprehensive recovery and rehabilitation support following hospital discharge.',
      icon: Activity,
      price: 5000,
    },
    {
      slug: 'medication-management',
      title: 'Medication Management',
      shortDescription: 'Reliable support with prescribed medication routines, schedules, and reminders.',
      icon: Pill,
      price: 2800,
    },
    {
      slug: 'palliative-care',
      title: 'Palliative Care',
      shortDescription: 'Comfort, dignity, and quality-of-life focused holistic home care for complex conditions.',
      icon: ShieldCheck,
      price: 6000,
    },
    {
      slug: 'patient-escort',
      title: 'Patient Escort',
      shortDescription: 'Professional bedside-to-appointment accompaniment for hospital visits and therapy.',
      icon: Calendar,
      price: 3800,
    },
    {
      slug: 'vital-signs-monitoring',
      title: 'Vital Signs Monitoring',
      shortDescription: 'Systematic monitoring of vital parameters by certified clinicians to spot trends early.',
      icon: Stethoscope,
      price: 2500,
    },
    {
      slug: 'health-education',
      title: 'Health Education',
      shortDescription: 'Guidance and practical training for patients and family caregivers.',
      icon: BookOpen,
      price: 3000,
    },
  ];

  const defaultProfessionals = [
    {
      fullName: 'Nurse Sarah Ombati, RN',
      roleTitle: 'Senior Home Care Lead & Registered Nurse',
      qualifications: 'BSc Nursing (UoN), BLS Certified',
      areasOfPractice: 'Home Nursing • Elderly Care • Chronic Disease Management',
      experienceYears: 9,
      photoUrl: 'https://images.unsplash.com/photo-1594824813689-d758c5c7d0d0?auto=format&fit=crop&q=80&w=400',
    },
    {
      fullName: 'Nurse David Kiprop, RN',
      roleTitle: 'Post-Operative & Wound Care Specialist',
      qualifications: 'Higher Dip Critical Care, Certified Wound Specialist',
      areasOfPractice: 'Post-Surgery Care • Complex Wound Dressing • IV Therapy',
      experienceYears: 7,
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    },
    {
      fullName: 'Dr. Evans Mwangi, CO',
      roleTitle: 'Clinical Officer & Medical Assessments Lead',
      qualifications: 'BSc Clinical Medicine, ACLS Certified',
      areasOfPractice: 'Comprehensive Health Assessments • Vital Monitoring',
      experienceYears: 12,
      photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    },
    {
      fullName: 'Grace Wanjiku, PT',
      roleTitle: 'Home Physical & Mobility Specialist',
      qualifications: 'BSc Physiotherapy, Orthopedic Rehab',
      areasOfPractice: 'Post-Stroke Rehab • Mobility Enhancement • Fall Prevention',
      experienceYears: 8,
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    },
  ];

  const defaultTestimonials = [
    {
      name: 'Catherine Mwangi',
      roleOrRelationship: 'Daughter of Elderly Client',
      rating: 5,
      content: 'KomfoCare has brought immense peace of mind to our family. Nurse Sarah visits my 82-year-old mother twice a week with such kindness and professionalism. We receive instant updates after every visit.',
      location: 'Kilimani, Nairobi',
    },
    {
      name: 'James Omondi',
      roleOrRelationship: 'Post-Surgery Patient',
      rating: 5,
      content: 'After my knee replacement, traveling to the hospital every 3 days for dressing was daunting. KomfoCare arranged for Nurse David to come home. My recovery was smooth, comfortable, and infection-free.',
      location: 'Westlands, Nairobi',
    },
    {
      name: 'Grace & Anthony Njuguna',
      roleOrRelationship: 'Family Caregivers',
      rating: 5,
      content: 'The booking process was seamless, and the caregiver education session taught us how to safely assist our father with mobility. Truly a world-class home healthcare platform.',
      location: 'Karen, Nairobi',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-12 sm:pt-12 sm:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-komfo-100/80 border border-komfo-200 text-komfo-800 text-xs font-semibold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-komfo-600" />
                <span>Professional Support • Personalized Care • Delivered at Home</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-navy-900 tracking-tight leading-[1.15]">
                Compassionate Care, <br />
                <span className="text-gradient">Right at Home.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Professional home-based healthcare services designed around the needs of you and your loved ones. Connecting families with verified registered nurses and healthcare professionals.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/book-care"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-navy-900 to-komfo-700 hover:from-navy-950 hover:to-komfo-800 text-white font-semibold text-sm shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Home Care</span>
                </Link>

                <Link
                  to="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-navy-900 font-semibold text-sm border border-slate-300 shadow-subtle transition-all"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-komfo-600" />
                </Link>
              </div>

              {/* Key Trust Checkmarks */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 border-t border-slate-200/80">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Verified Registered Clinicians</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Individualized Care Plans</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Family Visit Progress Updates</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800"
                  alt="Compassionate healthcare professional providing personalized care to an elderly patient at home"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Glass Float Card 1: Active Care Notice */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl glass-panel text-slate-900 shadow-elevated">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-komfo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-navy-900">Personalized Home Visit Protocol</h4>
                      <p className="text-[11px] text-slate-600">Vitals logged • Dressings managed • Doctor notes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
            Our Healthcare Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-navy-900 tracking-tight">
            Comprehensive Care in Your Home
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            From licensed nursing support to geriatric assistance and post-operative recovery, our clinicians provide dedicated attention right in your living room.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(services.length > 0 ? services : defaultServices).map((service: any) => {
            const IconComponent = service.icon || Heart;
            return (
              <div
                key={service.slug}
                className="group bg-white rounded-3xl p-6 border border-slate-200/90 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-komfo-50 text-komfo-600 flex items-center justify-center mb-5 group-hover:bg-komfo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-komfo-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs font-bold text-komfo-600 group-hover:text-komfo-700 inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to={`/book-care?service=${service.slug}`}
                    className="text-[11px] font-semibold text-slate-500 hover:text-navy-900 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Book
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-navy-900 font-semibold text-xs transition-colors"
          >
            <span>View All Clinical Services & Pricing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 3. WHY CHOOSE KOMFOCARE */}
      <section className="bg-navy-950 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-komfo-400">
              Why KomfoCare
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Healthcare That Comes Home With You
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Designed around dignity, professional clinical competence, and seamless family coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Convenient',
                desc: 'Receive appropriate clinical care without unnecessary trips to a facility, reducing hospital commute stress.',
                icon: Clock,
              },
              {
                title: 'Professional',
                desc: 'Care delivered by appropriately qualified, background-verified registered healthcare professionals.',
                icon: Award,
              },
              {
                title: 'Personalized',
                desc: 'Care structured around individual patient health requirements and physician directives.',
                icon: Heart,
              },
              {
                title: 'Compassionate',
                desc: 'Treating every patient and senior loved one with unwavering dignity, kindness, and respect.',
                icon: Users,
              },
              {
                title: 'Family Connected',
                desc: 'Keep authorized family members informed with transparent visit summaries and clinical notes.',
                icon: MessageCircle,
              },
              {
                title: 'Reliable',
                desc: 'Professional coordination from initial booking request through continuous clinical follow-up.',
                icon: ShieldCheck,
              },
            ].map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-navy-900/80 border border-navy-800 p-8 rounded-3xl hover:border-komfo-500/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-navy-800 text-komfo-400 flex items-center justify-center mb-5 group-hover:bg-komfo-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (4-Step Timeline) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-navy-900 tracking-tight">
            How KomfoCare Works
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Booking professional home healthcare is frictionless, transparent, and clinically structured.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Request Care',
              desc: 'Select your required service, describe patient needs, and choose your preferred date and time slot.',
            },
            {
              step: '02',
              title: 'Clinical Assessment',
              desc: 'Our nursing coordinator reviews your request and determines the appropriate clinician and care parameters.',
            },
            {
              step: '03',
              title: 'Care at Home',
              desc: 'An appropriately qualified registered nurse or therapist arrives at your home to deliver agreed services.',
            },
            {
              step: '04',
              title: 'Continued Support',
              desc: 'KomfoCare coordinates follow-up, uploads digital visit records, and supports ongoing recovery routines.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-extrabold font-display text-komfo-600/30">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-navy-900 mt-2 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRUST & SAFETY SECTION */}
      <section className="bg-gradient-to-br from-slate-100 to-komfo-50/50 py-16 rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 border border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-komfo-700">
              Commitment to Safety
            </span>
            <h2 className="text-3xl font-extrabold font-display text-navy-900 tracking-tight">
              Care You Can Feel Confident About
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every home visit adheres to strict clinical hygiene protocols, patient privacy standards, and empathetic communication.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Verified Healthcare Professionals:</strong> Every clinician is verified through credential vetting, background checks, and active council licensing.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-komfo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Privacy-Focused Healthcare:</strong> Medical information and visit logs are strictly confidential and only accessible to authorized family members.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Physician-Aligned Care:</strong> We coordinate with your primary treating doctor to ensure home recovery routines follow prescribed treatment protocols.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-elevated border border-slate-200 space-y-5">
            <h3 className="font-bold text-navy-900 text-lg">Need Assistance Selecting Care?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Speak directly with our clinical care supervisor to discuss elderly companionship, wound dressing, or post-operative recovery for your family.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Phone className="w-5 h-5 text-komfo-600 flex-shrink-0" />
              <div>
                <p className="text-[11px] text-slate-500">Care Helpline</p>
                <a href="tel:+254700000000" className="text-sm font-bold text-navy-900 hover:text-komfo-600">
                  +254 700 000 000
                </a>
              </div>
            </div>
            <Link
              to="/request-service"
              className="w-full text-center inline-block py-3 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-semibold text-xs shadow-md transition-all"
            >
              Request Free Care Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* 6. HEALTHCARE PROFESSIONALS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
              Our Clinical Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-navy-900 tracking-tight mt-1">
              Verified Healthcare Professionals
            </h2>
          </div>
          <Link
            to="/professionals"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-komfo-600 hover:text-komfo-700 hover:underline"
          >
            <span>View All Clinicians</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(professionals.length > 0 ? professionals : defaultProfessionals).map((prof: any) => (
            <div
              key={prof.fullName}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-slate-100">
                  <img
                    src={prof.photoUrl}
                    alt={prof.fullName}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-sm text-white text-[10px] font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>5.0</span>
                  </span>
                </div>

                <h3 className="font-bold text-navy-900 text-base">{prof.fullName}</h3>
                <p className="text-xs font-semibold text-komfo-600 mt-0.5">{prof.roleTitle}</p>
                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">{prof.areasOfPractice}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{prof.experienceYears}+ years exp</span>
                <Link
                  to={`/book-care`}
                  className="font-bold text-navy-900 hover:text-komfo-600"
                >
                  Book Visit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS CAROUSEL / GRID */}
      <section className="bg-slate-100/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
              Client Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-navy-900 tracking-tight">
              Trusted by Families Across the Region
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(testimonials.length > 0 ? testimonials : defaultTestimonials).map((t: any) => (
              <div
                key={t.name}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-navy-900 text-sm">{t.name}</h4>
                  <p className="text-[11px] text-komfo-600 font-medium">{t.roleOrRelationship}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SERVICE AREAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-komfo-400">
                Coverage & Availability
              </span>
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-white mt-1 mb-4">
                Service Areas Across Nairobi & Surrounding Regions
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                KomfoCare visiting healthcare professionals operate across primary metropolitan corridors with rapid dispatch capabilities.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  'Westlands & Kilimani',
                  'Karen & Langata',
                  'Lavington & Riverside',
                  'Runda, Muthaiga & Gigiri',
                  'Kileleshwa & Parklands',
                  'Kiambu Road & Environs',
                ].map((area) => (
                  <div key={area} className="flex items-center gap-2 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-komfo-400 flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy-950/80 p-6 rounded-2xl border border-navy-800 text-center space-y-4">
              <h3 className="font-bold text-white text-base">Check Your Location Coverage</h3>
              <p className="text-xs text-slate-400">
                Not sure if we cover your residence? Submit your location address for an instant coordination review.
              </p>
              <Link
                to="/book-care"
                className="inline-block px-6 py-2.5 rounded-full bg-komfo-600 hover:bg-komfo-500 text-white font-semibold text-xs shadow-md transition-all"
              >
                Schedule Home Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. STRONG FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-navy-900 via-navy-950 to-komfo-900 text-white rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
              Your Home. Your Comfort. Your Care.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Let KomfoCare help bring professional healthcare support closer to you and your loved ones.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/book-care"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-navy-900 hover:bg-slate-100 font-bold text-xs shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4 text-komfo-600" />
              <span>Book Home Care</span>
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-navy-800/80 hover:bg-navy-800 text-white font-semibold text-xs border border-navy-700 transition-all"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
