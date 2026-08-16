import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  Heart,
  Activity,
  PlusCircle,
  FileText,
  CreditCard,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';
import { Patient, Appointment, VitalSign } from '../../types';
import { formatDate, formatDateTime, formatCurrency, getStatusBadgeVariant } from '../../utils/formatters';
import { VitalsTrendChart } from '../../components/dashboard/VitalsTrendChart';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback demo patient data if offline
  const defaultPatient: Patient = {
    id: 'demo-p1',
    fullName: user?.fullName || 'Esther Njeri Karanja',
    phoneNumber: '+254 722 345 678',
    email: user?.email || 'patient@komfocare.com',
    address: 'House 14, Riverside Drive, Westlands',
    city: 'Nairobi',
    emergencyContactName: 'Samuel Karanja (Son)',
    emergencyContactPhone: '+254 733 987 654',
    medicalHistoryNotes: 'Post-operative recovery & hypertension management.',
    carePlans: [
      {
        id: 'cp-1',
        patientId: 'demo-p1',
        title: 'Post-Surgery Joint Rehab & Blood Pressure Routine',
        goals: 'Maintain blood pressure under 130/85 mmHg, support assisted walking, ensure daily sterile dressing integrity.',
        frequency: '2x Weekly Home Visits',
        startDate: new Date().toISOString(),
        status: 'Active',
      },
    ],
    vitalSigns: [
      {
        id: 'v1',
        patientId: 'demo-p1',
        recordedByName: 'Nurse Sarah Ombati, RN',
        systolicBP: 124,
        diastolicBP: 80,
        heartRate: 72,
        respiratoryRate: 16,
        spO2: 98.5,
        bloodGlucose: 5.6,
        temperature: 36.6,
        recordedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'v2',
        patientId: 'demo-p1',
        recordedByName: 'Nurse Sarah Ombati, RN',
        systolicBP: 128,
        diastolicBP: 82,
        heartRate: 74,
        respiratoryRate: 16,
        spO2: 98.0,
        bloodGlucose: 5.8,
        temperature: 36.7,
        recordedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  };

  const defaultAppointments: Appointment[] = [
    {
      id: 'apt-1',
      referenceNumber: 'APT-KC-2026-8841',
      patientId: 'demo-p1',
      serviceId: 'serv-1',
      service: {
        id: 'serv-1',
        slug: 'home-nursing-care',
        title: 'Home Nursing Care',
        shortDescription: 'Professional clinical nursing support delivered at home.',
        fullDescription: '',
        category: 'Clinical Care',
        basePrice: 4500,
        currency: 'KES',
        durationMinutes: 120,
        iconName: 'HeartPulse',
        isActive: true,
        displayOrder: 1,
      },
      professional: {
        id: 'prof-1',
        userId: 'u1',
        title: 'Nurse',
        fullName: 'Nurse Sarah Ombati, RN',
        roleTitle: 'Senior Home Care Lead & Registered Nurse',
        qualifications: 'BSc Nursing (UoN), BLS Certified',
        areasOfPractice: 'Home Nursing • Elderly Care',
        experienceYears: 9,
        rating: 4.98,
        totalVisits: 142,
        isPublic: true,
        isAvailable: true,
        photoUrl: 'https://images.unsplash.com/photo-1594824813689-d758c5c7d0d0?auto=format&fit=crop&q=80&w=300',
      },
      scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      scheduledTimeSlot: '10:00 AM - 12:00 PM',
      status: 'ASSIGNED',
      locationAddress: 'House 14, Riverside Drive, Westlands',
      notes: 'Scheduled dressing inspection and vitals log.',
    },
  ];

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const [profileRes, apptsRes] = await Promise.allSettled([
          apiClient<{ success: boolean; data: Patient }>('/patients/me'),
          apiClient<{ success: boolean; data: Appointment[] }>('/appointments/my'),
        ]);

        if (profileRes.status === 'fulfilled' && profileRes.value?.data) {
          setPatientData(profileRes.value.data);
        } else {
          setPatientData(defaultPatient);
        }

        if (apptsRes.status === 'fulfilled' && apptsRes.value?.data) {
          setAppointments(apptsRes.value.data);
        } else {
          setAppointments(defaultAppointments);
        }
      } catch {
        setPatientData(defaultPatient);
        setAppointments(defaultAppointments);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  const p = patientData || defaultPatient;
  const apptsList = appointments.length > 0 ? appointments : defaultAppointments;
  const upcomingVisit = apptsList.find((a) => a.status !== 'COMPLETED' && a.status !== 'CANCELLED');

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-900 to-komfo-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-komfo-300 uppercase tracking-wider">
            Patient Care Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Good morning, {p.fullName}
          </h2>
          <p className="text-xs text-slate-300">
            Welcome to your KomfoCare dashboard. Your personalized home healthcare overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/book-care"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-navy-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-all flex-shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-komfo-600" />
            <span>Book Visit</span>
          </Link>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          to="/book-care"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:border-komfo-500 hover:shadow-elevated transition-all flex flex-col items-center text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-komfo-50 text-komfo-600 flex items-center justify-center group-hover:bg-komfo-600 group-hover:text-white transition-colors">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="font-bold text-navy-900 text-xs">Book Home Care</span>
        </Link>

        <Link
          to="/track-request"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:border-komfo-500 hover:shadow-elevated transition-all flex flex-col items-center text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-komfo-50 text-komfo-600 flex items-center justify-center group-hover:bg-komfo-600 group-hover:text-white transition-colors">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-bold text-navy-900 text-xs">Track Status</span>
        </Link>

        <Link
          to="/contact"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:border-komfo-500 hover:shadow-elevated transition-all flex flex-col items-center text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-komfo-50 text-komfo-600 flex items-center justify-center group-hover:bg-komfo-600 group-hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <span className="font-bold text-navy-900 text-xs">Care Helpline</span>
        </Link>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex flex-col items-center text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-navy-900 text-xs">Care Plan Active</span>
        </div>
      </div>

      {/* Upcoming Visit Card */}
      {upcomingVisit && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-komfo-600">
                Next Scheduled Visit
              </span>
              <h3 className="text-xl font-bold font-display text-navy-900 mt-0.5">
                {upcomingVisit.service?.title}
              </h3>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                getStatusBadgeVariant(upcomingVisit.status).bg
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>{upcomingVisit.status}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Date & Window</span>
              <p className="font-bold text-slate-900 text-sm mt-1">{formatDate(upcomingVisit.scheduledDate)}</p>
              <p className="text-slate-600">{upcomingVisit.scheduledTimeSlot}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Location Address</span>
              <p className="font-bold text-slate-900 text-sm mt-1 truncate">{upcomingVisit.locationAddress}</p>
              <p className="text-slate-600">Nairobi, Kenya</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Assigned Clinician</span>
              <p className="font-bold text-slate-900 text-sm mt-1">
                {upcomingVisit.professional?.fullName || 'Clinical Lead Assigned'}
              </p>
              <p className="text-slate-600">{upcomingVisit.professional?.roleTitle || 'Licensed Nurse'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Vital Signs Chart Component */}
      <VitalsTrendChart vitalSigns={p.vitalSigns || []} />

      {/* Care Plan & Emergency Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 text-navy-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-komfo-600" />
            <span>Active Home Care Plan</span>
          </div>
          {p.carePlans && p.carePlans.length > 0 ? (
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-900">{p.carePlans[0].title}</h4>
              <p className="text-slate-600 leading-relaxed">{p.carePlans[0].goals}</p>
              <div className="p-3 bg-slate-50 rounded-xl font-semibold text-komfo-700">
                Frequency: {p.carePlans[0].frequency}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">Your care plan will be generated following your initial assessment visit.</p>
          )}
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 text-navy-900 font-bold text-sm">
            <User className="w-5 h-5 text-komfo-600" />
            <span>Authorized Emergency Contact</span>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400">Name & Relation:</span>
              <p className="font-bold text-slate-900">{p.emergencyContactName}</p>
            </div>
            <div>
              <span className="text-slate-400">Emergency Phone:</span>
              <p className="font-bold text-slate-900">{p.emergencyContactPhone}</p>
            </div>
            <div className="pt-2">
              <span className="text-slate-400">Known Allergies / Flags:</span>
              <p className="font-medium text-slate-700">{p.knownAllergies || 'None recorded'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
