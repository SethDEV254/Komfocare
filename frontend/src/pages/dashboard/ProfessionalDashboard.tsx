import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  FileText,
  Activity,
  CheckCircle2,
  AlertCircle,
  Phone,
  Search,
  PlusCircle,
  ClipboardList,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';
import { Appointment, Patient, HealthcareProfessional, VitalSign } from '../../types';
import { formatDate, formatDateTime, getStatusBadgeVariant } from '../../utils/formatters';
import { VisitDocumentationModal } from '../../components/dashboard/VisitDocumentationModal';

export const ProfessionalDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'schedule';

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  // Fallback demo data
  const defaultAppointments: Appointment[] = [
    {
      id: 'apt-prof-1',
      referenceNumber: 'APT-KC-2026-8841',
      patientId: 'demo-p1',
      patient: {
        id: 'demo-p1',
        fullName: 'Esther Njeri Karanja',
        phoneNumber: '+254 722 345 678',
        address: 'House 14, Riverside Drive, Westlands',
        city: 'Nairobi',
        emergencyContactName: 'Samuel Karanja (Son)',
        emergencyContactPhone: '+254 733 987 654',
        medicalHistoryNotes: 'Post-operative recovery & hypertension management.',
        mobilityNeeds: 'Assisted walking with quad cane.',
      },
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
      scheduledDate: new Date().toISOString(),
      scheduledTimeSlot: '10:00 AM - 12:00 PM',
      status: 'ASSIGNED',
      locationAddress: 'House 14, Riverside Drive, Westlands, Nairobi',
      notes: 'Patient requires sterile wound redressing and blood pressure log.',
    },
    {
      id: 'apt-prof-2',
      referenceNumber: 'APT-KC-2026-9210',
      patientId: 'demo-p2',
      patient: {
        id: 'demo-p2',
        fullName: 'Mzee Juma Mwangi',
        phoneNumber: '+254 711 889 012',
        address: 'Apt 4B, Kilimani Gardens, Argwings Kodhek Rd',
        city: 'Nairobi',
        emergencyContactName: 'Grace Mwangi (Daughter)',
        emergencyContactPhone: '+254 720 112 233',
        medicalHistoryNotes: 'Type 2 Diabetes, mild cognitive support needed.',
      },
      serviceId: 'serv-2',
      service: {
        id: 'serv-2',
        slug: 'elderly-care',
        title: 'Elderly & Geriatric Care',
        shortDescription: 'Comprehensive supportive daily living and vital tracking.',
        fullDescription: '',
        category: 'Geriatric Support',
        basePrice: 3800,
        currency: 'KES',
        durationMinutes: 180,
        iconName: 'ShieldPlus',
        isActive: true,
        displayOrder: 2,
      },
      scheduledDate: new Date(Date.now() + 86400000).toISOString(),
      scheduledTimeSlot: '02:00 PM - 05:00 PM',
      status: 'CONFIRMED',
      locationAddress: 'Apt 4B, Kilimani Gardens, Argwings Kodhek Rd, Nairobi',
      notes: 'Weekly glucose curve review, medication organizer refilling.',
    },
  ];

  const fetchAppointments = async () => {
    try {
      const res = await apiClient<{ success: boolean; data: Appointment[] }>('/appointments/professional');
      if (res.success && res.data && res.data.length > 0) {
        setAppointments(res.data);
      } else {
        setAppointments(defaultAppointments);
      }
    } catch {
      setAppointments(defaultAppointments);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const openDocumentation = (appt: Appointment) => {
    setSelectedAppt(appt);
    setIsVisitModalOpen(true);
  };

  const filteredAppts = appointments.filter((a) => {
    const q = searchFilter.toLowerCase();
    return (
      a.patient?.fullName?.toLowerCase().includes(q) ||
      a.referenceNumber.toLowerCase().includes(q) ||
      a.service?.title.toLowerCase().includes(q) ||
      a.locationAddress.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Clinician Overview Banner */}
      <div className="rounded-3xl p-6 sm:p-8 glass-surface border border-white/15 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-amber-400 text-xs font-mono font-semibold">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>LICENSED CLINICIAN CARE PORTAL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
            Welcome, {user?.fullName || 'Nurse Sarah Ombati, RN'}
          </h2>
          <p className="text-xs text-slate-300 max-w-xl font-sans">
            You have <strong className="text-white font-semibold">{appointments.length} active visits</strong> assigned. Document observations and record vital metrics seamlessly.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center sm:text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Duty Status</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              On Active Roster
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-white/10 shadow-xl space-y-1">
          <span className="text-slate-400 text-xs font-medium">Assigned Visits</span>
          <div className="text-2xl font-bold font-display text-white">{appointments.length}</div>
          <span className="text-[11px] text-komfo-400 font-semibold font-mono">Home care schedule</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-white/10 shadow-xl space-y-1">
          <span className="text-slate-400 text-xs font-medium">Completed Visits</span>
          <div className="text-2xl font-bold font-display text-white">142</div>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">100% verified</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-white/10 shadow-xl space-y-1">
          <span className="text-slate-400 text-xs font-medium">Patient Satisfaction</span>
          <div className="text-2xl font-bold font-display text-white">4.98 / 5.0</div>
          <span className="text-[11px] text-amber-400 font-semibold font-mono">★ Top clinician</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-white/10 shadow-xl space-y-1">
          <span className="text-slate-400 text-xs font-medium">Clinical Documentation</span>
          <div className="text-2xl font-bold font-display text-white">Up to Date</div>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">Zero pending reviews</span>
        </div>
      </div>

      {/* Visit Schedule Section */}
      <div className="rounded-3xl p-6 sm:p-8 glass-card border border-white/15 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold font-display text-white">
              Assigned Home Care Visits & Schedule
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Review assigned patient profiles, address, clinical requirements, and log visit records.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search patient or ref..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-komfo-500 focus:outline-none focus:border-komfo-400"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredAppts.map((appt) => {
            const badge = getStatusBadgeVariant(appt.status);
            return (
              <div
                key={appt.id}
                className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-komfo-400/50 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-komfo-600/30 border border-komfo-400/40 text-komfo-300 flex items-center justify-center font-bold text-sm font-mono">
                      {appt.patient?.fullName?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm font-display">
                          {appt.patient?.fullName || 'Patient Name'}
                        </h4>
                        <span className="text-[10px] font-mono font-medium text-amber-400">
                          {appt.referenceNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">
                        {appt.service?.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                      <span>{appt.status}</span>
                    </span>

                    <button
                      onClick={() => openDocumentation(appt)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-komfo-600 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow transition-all font-mono"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Record Visit / Vitals</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-white/10 font-mono">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-komfo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Schedule</span>
                      <p className="font-semibold text-white">
                        {formatDate(appt.scheduledDate)} • {appt.scheduledTimeSlot}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-komfo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                      <p className="font-semibold text-white truncate font-sans">
                        {appt.locationAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-komfo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact</span>
                      <p className="font-semibold text-amber-400">
                        {appt.patient?.phoneNumber || '+254 700 000 000'}
                      </p>
                    </div>
                  </div>
                </div>

                {appt.notes && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-300 font-sans">
                    <strong className="text-white font-semibold">Special Instructions: </strong>
                    {appt.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Clinical Visit Documentation Modal */}
      {selectedAppt && (
        <VisitDocumentationModal
          isOpen={isVisitModalOpen}
          onClose={() => setIsVisitModalOpen(false)}
          appointment={selectedAppt}
          onSuccess={() => {
            fetchAppointments();
          }}
        />
      )}
    </div>
  );
};
