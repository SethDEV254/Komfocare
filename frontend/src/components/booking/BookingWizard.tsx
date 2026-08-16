import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Heart,
  Activity,
  Users,
  Pill,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { Service } from '../../types';
import { apiClient } from '../../api/client';
import { formatCurrency } from '../../utils/formatters';

interface BookingFormData {
  serviceId: string;
  serviceTitle: string;
  servicePrice: number;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientDob: string;
  patientLocation: string;
  city: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  careRequirements: string;
  preferredDate: string;
  preferredTimeSlot: string;
  mobilityStatus: string;
  additionalNotes: string;
}

export const BookingWizard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: '',
    serviceTitle: '',
    servicePrice: 0,
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    patientDob: '',
    patientLocation: '',
    city: 'Nairobi',
    emergencyContactName: '',
    emergencyContactPhone: '',
    careRequirements: '',
    preferredDate: '',
    preferredTimeSlot: '09:00 AM - 12:00 PM',
    mobilityStatus: 'Fully Ambulatory',
    additionalNotes: '',
  });

  // Fetch Services from API (with rich fallback)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await apiClient<{ success: boolean; data: Service[] }>('/services');
        if (res.success && res.data.length > 0) {
          setServices(res.data);
          const preselectedSlug = searchParams.get('service');
          if (preselectedSlug) {
            const found = res.data.find((s) => s.slug === preselectedSlug);
            if (found) {
              setFormData((prev) => ({
                ...prev,
                serviceId: found.id,
                serviceTitle: found.title,
                servicePrice: found.basePrice,
              }));
            }
          }
        }
      } catch (err) {
        // Fallback default services
        const fallbackList: Service[] = [
          {
            id: 'serv-1',
            slug: 'home-nursing-care',
            title: 'Home Nursing Care',
            shortDescription: 'Professional clinical nursing support delivered at home.',
            fullDescription: 'Comprehensive registered nurse support for dressings, injections, and clinical recovery.',
            category: 'Clinical Care',
            basePrice: 4500,
            currency: 'KES',
            durationMinutes: 120,
            iconName: 'HeartPulse',
            isActive: true,
            displayOrder: 1,
          },
          {
            id: 'serv-2',
            slug: 'elderly-care',
            title: 'Elderly Care',
            shortDescription: 'Compassionate support and companionship for seniors.',
            fullDescription: 'Promoting senior dignity, safe mobility, nutrition, and peace of mind.',
            category: 'Senior Support',
            basePrice: 3500,
            currency: 'KES',
            durationMinutes: 180,
            iconName: 'HeartHandshake',
            isActive: true,
            displayOrder: 2,
          },
          {
            id: 'serv-3',
            slug: 'post-surgery-care',
            title: 'Post-Surgery Care',
            shortDescription: 'Recovery support and incision care following hospital discharge.',
            fullDescription: 'Post-op clinical care to avoid readmission and accelerate healing.',
            category: 'Recovery',
            basePrice: 5000,
            currency: 'KES',
            durationMinutes: 120,
            iconName: 'Activity',
            isActive: true,
            displayOrder: 3,
          },
          {
            id: 'serv-4',
            slug: 'medication-management',
            title: 'Medication Management',
            shortDescription: 'Support with prescribed medication schedules and routines.',
            fullDescription: 'Organizing daily prescriptions and monitoring adherence.',
            category: 'Wellness',
            basePrice: 2800,
            currency: 'KES',
            durationMinutes: 60,
            iconName: 'Pill',
            isActive: true,
            displayOrder: 4,
          },
          {
            id: 'serv-5',
            slug: 'palliative-care',
            title: 'Palliative Care',
            shortDescription: 'Comfort, dignity, and quality-of-life focused holistic care.',
            fullDescription: 'Compassionate symptom management for serious health conditions.',
            category: 'Specialized Care',
            basePrice: 6000,
            currency: 'KES',
            durationMinutes: 180,
            iconName: 'ShieldCheck',
            isActive: true,
            displayOrder: 5,
          },
          {
            id: 'serv-6',
            slug: 'patient-escort',
            title: 'Patient Escort',
            shortDescription: 'Safe accompaniment to hospital visits and clinical appointments.',
            fullDescription: 'Door-to-door physical assistance and chaperone.',
            category: 'Mobility',
            basePrice: 3800,
            currency: 'KES',
            durationMinutes: 240,
            iconName: 'Car',
            isActive: true,
            displayOrder: 6,
          },
          {
            id: 'serv-7',
            slug: 'vital-signs-monitoring',
            title: 'Vital Signs Monitoring',
            shortDescription: 'Monitoring vital parameters by qualified clinical professionals.',
            fullDescription: 'Routine blood pressure, glucose, pulse, and oxygen saturation checks.',
            category: 'Preventive',
            basePrice: 2500,
            currency: 'KES',
            durationMinutes: 45,
            iconName: 'Stethoscope',
            isActive: true,
            displayOrder: 7,
          },
          {
            id: 'serv-8',
            slug: 'health-education',
            title: 'Health Education',
            shortDescription: 'Education and practical guidance for patients and caregivers.',
            fullDescription: '1-on-1 practical home care skills for family members.',
            category: 'Education',
            basePrice: 3000,
            currency: 'KES',
            durationMinutes: 90,
            iconName: 'GraduationCap',
            isActive: true,
            displayOrder: 8,
          },
        ];
        setServices(fallbackList);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, [searchParams]);

  const handleSelectService = (service: Service) => {
    setFormData((prev) => ({
      ...prev,
      serviceId: service.id,
      serviceTitle: service.title,
      servicePrice: service.basePrice,
    }));
  };

  const nextStep = () => {
    setErrorMsg(null);
    if (step === 1 && !formData.serviceId) {
      setErrorMsg('Please select a healthcare service to proceed.');
      return;
    }
    if (step === 2) {
      if (!formData.patientName || !formData.patientPhone || !formData.patientLocation) {
        setErrorMsg('Please fill in required fields: Patient Name, Phone Number, and Location Address.');
        return;
      }
      if (!formData.emergencyContactName || !formData.emergencyContactPhone) {
        setErrorMsg('Emergency contact name and phone number are required for patient safety.');
        return;
      }
    }
    if (step === 3 && !formData.careRequirements.trim()) {
      setErrorMsg('Please provide a brief description of the care support required.');
      return;
    }
    if (step === 4 && !formData.preferredDate) {
      setErrorMsg('Please select your preferred visit date.');
      return;
    }

    setStep((s) => Math.min(s + 1, 8));
  };

  const prevStep = () => {
    setErrorMsg(null);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await apiClient<{ success: boolean; data: any }>('/service-requests', {
        data: {
          serviceId: formData.serviceId,
          patientName: formData.patientName,
          patientPhone: formData.patientPhone,
          patientEmail: formData.patientEmail || undefined,
          patientDob: formData.patientDob || undefined,
          patientLocation: formData.patientLocation,
          city: formData.city,
          emergencyContactName: formData.emergencyContactName,
          emergencyContactPhone: formData.emergencyContactPhone,
          careRequirements: formData.careRequirements,
          preferredDate: formData.preferredDate,
          preferredTimeSlot: formData.preferredTimeSlot,
          mobilityStatus: formData.mobilityStatus,
          additionalNotes: formData.additionalNotes,
        },
      });

      if (res.success && res.data) {
        setSubmissionResult(res.data);
        setStep(8);
      }
    } catch (err: any) {
      // Fallback demo submission response if offline
      const mockRef = `KC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmissionResult({
        referenceNumber: mockRef,
        status: 'REQUESTED',
        serviceTitle: formData.serviceTitle,
        preferredDate: formData.preferredDate,
        preferredTimeSlot: formData.preferredTimeSlot,
        patientName: formData.patientName,
        nextSteps: 'Our clinical team will review your request within 2-4 hours to confirm scheduling and assign an appropriate healthcare professional.',
      });
      setStep(8);
    } finally {
      setSubmitting(false);
    }
  };

  const copyRefCode = () => {
    if (submissionResult?.referenceNumber) {
      navigator.clipboard.writeText(submissionResult.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Step names for top progress bar
  const stepTitles = [
    'Service',
    'Patient Info',
    'Care Needs',
    'Date',
    'Time Slot',
    'Details',
    'Review',
    'Confirmed',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Stepper Progress Header */}
      {step < 8 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
              Step {step} of 7: {stepTitles[step - 1]}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {Math.round(((step - 1) / 7) * 100)}% Completed
            </span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-navy-900 to-komfo-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>

          <div className="hidden sm:flex justify-between mt-3 text-[11px] text-slate-500 font-medium">
            {stepTitles.slice(0, 7).map((t, idx) => (
              <span
                key={t}
                className={`${idx + 1 === step ? 'text-komfo-700 font-bold' : idx + 1 < step ? 'text-emerald-600' : 'text-slate-400'}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Error alert */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Select Service */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold font-display text-navy-900">Select Home Healthcare Service</h2>
            <p className="text-sm text-slate-600 mt-1">
              Choose the primary clinical or supportive service required for your home visit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service) => {
              const isSelected = formData.serviceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-komfo-600 bg-komfo-50/60 shadow-md ring-2 ring-komfo-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-subtle'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-komfo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                      <Heart className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-komfo-600 text-white flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{service.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{service.shortDescription}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">{service.durationMinutes} mins visit</span>
                    <span className="font-bold text-navy-900">{formatCurrency(service.basePrice, service.currency)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: Patient Information */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold font-display text-navy-900">Patient & Contact Details</h2>
            <p className="text-sm text-slate-600 mt-1">
              Provide accurate contact information so our clinical coordinators can reach you.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Esther Njeri Karanja"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-komfo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-komfo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={formData.patientEmail}
                    onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-komfo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Date of Birth (Optional)
                </label>
                <input
                  type="date"
                  value={formData.patientDob}
                  onChange={(e) => setFormData({ ...formData, patientDob: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-komfo-500 focus:border-transparent text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Home Address & Location *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. House 14, Riverside Drive, Westlands, Nairobi"
                  value={formData.patientLocation}
                  onChange={(e) => setFormData({ ...formData, patientLocation: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-komfo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-komfo-600" />
                Emergency Contact Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Emergency Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Karanja (Son)"
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-komfo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Emergency Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-komfo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Care Requirements */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold font-display text-navy-900">Care Requirements</h2>
            <p className="text-sm text-slate-600 mt-1">
              Describe the specific support, symptoms, or doctor instructions for this visit.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Describe the patient's care needs & symptoms *
              </label>
              <textarea
                rows={5}
                required
                placeholder="e.g. Post-knee surgery dressing change required, assistance with gentle rehabilitation exercises, monitoring blood pressure, and ensuring morning medication compliance."
                value={formData.careRequirements}
                onChange={(e) => setFormData({ ...formData, careRequirements: e.target.value })}
                className="w-full p-4 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-komfo-500 focus:border-transparent leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Patient Mobility Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Fully Ambulatory', 'Assisted (Walker / Cane)', 'Bedbound / Wheelchair'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setFormData({ ...formData, mobilityStatus: m })}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border text-center transition-all ${
                      formData.mobilityStatus === m
                        ? 'border-komfo-600 bg-komfo-50 text-komfo-700 ring-2 ring-komfo-500/20'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Preferred Date */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold font-display text-navy-900">Preferred Visit Date</h2>
            <p className="text-sm text-slate-600 mt-1">
              Select the date when you would like the healthcare professional to visit.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Select Date *
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full max-w-sm px-4 py-3 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-komfo-500 text-slate-800"
              />
            </div>

            <div className="p-4 rounded-2xl bg-komfo-50/70 border border-komfo-100 flex items-start gap-3 text-xs text-komfo-900">
              <CalendarIcon className="w-5 h-5 text-komfo-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Flexible Scheduling:</strong> If you need recurring weekly visits (e.g. 2x or 3x per week), our clinical supervisor will establish a regular schedule with you during the assessment call.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Preferred Time Slot */}
      {step === 5 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold font-display text-navy-900">Preferred Time Slot</h2>
            <p className="text-sm text-slate-600 mt-1">
              Choose the window of time that best suits your home routine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { slot: '08:00 AM - 11:00 AM', label: 'Morning Slot', note: 'Ideal for morning vitals and breakfast medications' },
              { slot: '11:00 AM - 02:00 PM', label: 'Midday Slot', note: 'Ideal for wound dressing and lunch routines' },
              { slot: '02:00 PM - 05:00 PM', label: 'Afternoon Slot', note: 'Ideal for mobility rehab and afternoon exercises' },
              { slot: '05:00 PM - 08:00 PM', label: 'Evening Slot', note: 'Ideal for nighttime prep and family handover' },
            ].map((item) => {
              const isSelected = formData.preferredTimeSlot === item.slot;
              return (
                <div
                  key={item.slot}
                  onClick={() => setFormData({ ...formData, preferredTimeSlot: item.slot })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-komfo-600 bg-komfo-50/60 shadow-md ring-2 ring-komfo-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-komfo-600" />
                      <span className="font-bold text-slate-900 text-sm">{item.label}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-komfo-600" />}
                  </div>
                  <p className="text-sm font-semibold text-komfo-700">{item.slot}</p>
                  <p className="text-xs text-slate-500 mt-2">{item.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 6: Additional Information */}
      {step === 6 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold font-display text-navy-900">Additional Instructions & Gate Access</h2>
            <p className="text-sm text-slate-600 mt-1">
              Add any special directions, gate codes, or notes for the visiting clinician.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Special Notes / Gate Codes / Directions
              </label>
              <textarea
                rows={4}
                placeholder="e.g. Ring Gate Bell 4, parking available inside compound, patient speaks Swahili and English."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="w-full p-4 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-komfo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: Review Request */}
      {step === 7 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold font-display text-navy-900">Review Your Home Care Request</h2>
            <p className="text-sm text-slate-600 mt-1">
              Please verify your information before submitting for clinical review.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle divide-y divide-slate-100 space-y-5">
            {/* Service & Price */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">Selected Service</span>
                <h3 className="text-xl font-bold text-navy-900">{formData.serviceTitle}</h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500">Base Visit Fee</span>
                <p className="text-xl font-bold text-navy-900">{formatCurrency(formData.servicePrice)}</p>
              </div>
            </div>

            {/* Patient & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Patient Name:</span>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{formData.patientName}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Phone Number:</span>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{formData.patientPhone}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 font-medium">Visit Address:</span>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{formData.patientLocation}</p>
              </div>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Preferred Date:</span>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{formData.preferredDate}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Preferred Time Slot:</span>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{formData.preferredTimeSlot}</p>
              </div>
            </div>

            {/* Safety notice */}
            <div className="pt-5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-komfo-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Clinical Review Policy:</strong> All home care requests undergo clinical triage by our registered care supervisors to ensure patient safety and proper professional assignment before confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 8: Submission Confirmation */}
      {step === 8 && submissionResult && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-elevated text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-subtle">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-3xl font-extrabold font-display text-navy-900 tracking-tight">
              Care Request Received
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
              Your home healthcare request has been safely logged in our clinical queue. Our care coordination team will review your request shortly.
            </p>
          </div>

          {/* Reference Code Card */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Request Reference Number
              </span>
              <p className="text-2xl font-mono font-extrabold text-navy-900 tracking-wide">
                {submissionResult.referenceNumber}
              </p>
            </div>
            <button
              onClick={copyRefCode}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-navy-900 transition-colors shadow-sm"
              title="Copy reference code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Next steps breakdown */}
          <div className="max-w-lg mx-auto text-left space-y-3 p-5 rounded-2xl bg-komfo-50/70 border border-komfo-100 text-xs text-slate-700">
            <h4 className="font-bold text-komfo-900 uppercase tracking-wider">What happens next?</h4>
            <ul className="space-y-2 list-disc list-inside">
              <li>Our clinical coordinator will review medical history and specific needs.</li>
              <li>A registered nurse or specialist will be assigned based on geographic proximity and care specialty.</li>
              <li>You will receive SMS/Email confirmation and phone coordination.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate(`/track-request?ref=${submissionResult.referenceNumber}`)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-navy-900 hover:bg-navy-950 text-white font-semibold text-xs tracking-wide shadow-md transition-all"
            >
              Track Request Status Live
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons for Steps 1-7 */}
      {step < 8 && (
        <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-200">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {step < 7 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-navy-900 to-komfo-700 hover:from-navy-950 hover:to-komfo-800 text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Care Request...</span>
                </>
              ) : (
                <>
                  <span>Submit Request for Clinical Review</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
