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
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Service } from '../../types';
import { apiClient } from '../../api/client';
import { formatCurrency } from '../../utils/formatters';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const defaultServices = [
    {
      slug: 'home-nursing-care',
      title: 'Home Nursing Care',
      shortDescription: 'Professional clinical nursing support delivered with compassion in the comfort of your home.',
      category: 'Clinical Care',
      durationMinutes: 120,
      basePrice: 4500,
      currency: 'KES',
      icon: Heart,
    },
    {
      slug: 'elderly-care',
      title: 'Elderly Care',
      shortDescription: 'Compassionate, dignified, and attentive home care tailored specifically for senior loved ones.',
      category: 'Senior Support',
      durationMinutes: 180,
      basePrice: 3500,
      currency: 'KES',
      icon: Users,
    },
    {
      slug: 'post-surgery-care',
      title: 'Post-Surgery Care',
      shortDescription: 'Comprehensive recovery and rehabilitation support following hospital discharge.',
      category: 'Recovery',
      durationMinutes: 120,
      basePrice: 5000,
      currency: 'KES',
      icon: Activity,
    },
    {
      slug: 'medication-management',
      title: 'Medication Management',
      shortDescription: 'Reliable support with prescribed medication routines, schedules, and reminders.',
      category: 'Wellness',
      durationMinutes: 60,
      basePrice: 2800,
      currency: 'KES',
      icon: Pill,
    },
    {
      slug: 'palliative-care',
      title: 'Palliative Care',
      shortDescription: 'Comfort, dignity, and quality-of-life focused holistic home care for complex conditions.',
      category: 'Specialized Care',
      durationMinutes: 180,
      basePrice: 6000,
      currency: 'KES',
      icon: ShieldCheck,
    },
    {
      slug: 'patient-escort',
      title: 'Patient Escort',
      shortDescription: 'Professional bedside-to-appointment accompaniment for hospital visits and therapy.',
      category: 'Mobility',
      durationMinutes: 240,
      basePrice: 3800,
      currency: 'KES',
      icon: Calendar,
    },
    {
      slug: 'vital-signs-monitoring',
      title: 'Vital Signs Monitoring',
      shortDescription: 'Systematic monitoring of vital parameters by certified clinicians to spot trends early.',
      category: 'Preventive',
      durationMinutes: 45,
      basePrice: 2500,
      currency: 'KES',
      icon: Stethoscope,
    },
    {
      slug: 'health-education',
      title: 'Health Education',
      shortDescription: 'Guidance and practical training for patients and family caregivers.',
      category: 'Education',
      durationMinutes: 90,
      basePrice: 3000,
      currency: 'KES',
      icon: BookOpen,
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await apiClient<{ success: boolean; data: Service[] }>('/services');
        if (res.success && res.data.length > 0) {
          setServices(res.data);
        }
      } catch {
        // use fallback
      }
    };
    fetchServices();
  }, []);

  const displayList = services.length > 0 ? services : (defaultServices as any);

  const categories = ['All', 'Clinical Care', 'Senior Support', 'Recovery', 'Wellness', 'Specialized Care'];

  const filteredServices = categoryFilter === 'All'
    ? displayList
    : displayList.filter((s: any) => s.category === categoryFilter);

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
          Comprehensive Services
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-navy-900 tracking-tight">
          Home-Based Healthcare Services
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Explore our range of personalized in-home clinical nursing, elderly companionship, surgical recovery, and vital signs monitoring services.
        </p>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 pt-4 overflow-x-auto flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                categoryFilter === cat
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service: any) => {
          return (
            <div
              key={service.slug}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-komfo-50 text-komfo-600 flex items-center justify-center mb-6 group-hover:bg-komfo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-komfo-600">
                  {service.category}
                </span>
                <h3 className="text-xl font-bold text-navy-900 mt-1 mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">Starting from</span>
                  <span className="font-bold text-navy-900 text-sm">
                    {formatCurrency(service.basePrice, service.currency || 'KES')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/services/${service.slug}`}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-komfo-600 hover:bg-komfo-50 transition-colors"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/book-care?service=${service.slug}`}
                    className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
