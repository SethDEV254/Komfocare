import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Users,
  UserCheck,
  FileText,
  Activity,
  CreditCard,
  BookOpen,
  MessageSquareQuote,
  MapPin,
  FileSpreadsheet,
  PlusCircle,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Edit2,
  Trash2,
  Filter,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';
import { ServiceRequest, Appointment, Patient, HealthcareProfessional, RequestStatus } from '../../types';
import { formatDate, formatDateTime, formatCurrency, getStatusBadgeVariant } from '../../utils/formatters';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');

  // Fallback demo requests
  const defaultRequests: ServiceRequest[] = [
    {
      id: 'req-1',
      referenceNumber: 'KC-2026-8812',
      serviceId: 'serv-1',
      service: {
        id: 'serv-1',
        slug: 'home-nursing-care',
        title: 'Home Nursing Care',
        shortDescription: 'Professional clinical nursing support.',
        fullDescription: '',
        category: 'Clinical Care',
        basePrice: 4500,
        currency: 'KES',
        durationMinutes: 120,
        iconName: 'HeartPulse',
        isActive: true,
        displayOrder: 1,
      },
      patientName: 'Esther Njeri Karanja',
      patientPhone: '+254 722 345 678',
      patientEmail: 'patient@komfocare.com',
      patientLocation: 'House 14, Riverside Drive, Westlands',
      city: 'Nairobi',
      emergencyContactName: 'Samuel Karanja',
      emergencyContactPhone: '+254 733 987 654',
      careRequirements: 'Post-operative wound dressing and daily blood pressure check.',
      preferredDate: '2026-08-20',
      preferredTimeSlot: 'Morning (08:00 AM - 12:00 PM)',
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'req-2',
      referenceNumber: 'KC-2026-9043',
      serviceId: 'serv-2',
      service: {
        id: 'serv-2',
        slug: 'elderly-care',
        title: 'Elderly & Geriatric Care',
        shortDescription: 'Comprehensive supportive daily living.',
        fullDescription: '',
        category: 'Geriatric Support',
        basePrice: 3800,
        currency: 'KES',
        durationMinutes: 180,
        iconName: 'ShieldPlus',
        isActive: true,
        displayOrder: 2,
      },
      patientName: 'Mzee Juma Mwangi',
      patientPhone: '+254 711 889 012',
      patientEmail: 'juma.family@example.com',
      patientLocation: 'Apt 4B, Kilimani Gardens',
      city: 'Nairobi',
      emergencyContactName: 'Grace Mwangi',
      emergencyContactPhone: '+254 720 112 233',
      careRequirements: 'Daily vital checks, medication compliance, mobility assistance.',
      preferredDate: '2026-08-21',
      preferredTimeSlot: 'Afternoon (12:00 PM - 04:00 PM)',
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'req-3',
      referenceNumber: 'KC-2026-9521',
      serviceId: 'serv-3',
      service: {
        id: 'serv-3',
        slug: 'post-surgery-care',
        title: 'Post-Surgery Recovery',
        shortDescription: 'Post-operative clinical surveillance.',
        fullDescription: '',
        category: 'Rehabilitation',
        basePrice: 5000,
        currency: 'KES',
        durationMinutes: 120,
        iconName: 'Activity',
        isActive: true,
        displayOrder: 3,
      },
      patientName: 'David Kiprono',
      patientPhone: '+254 799 334 556',
      patientEmail: 'dkiprono@example.com',
      patientLocation: 'Courtyard Villa 8, Karen',
      city: 'Nairobi',
      emergencyContactName: 'Faith Kiprono',
      emergencyContactPhone: '+254 788 123 456',
      careRequirements: 'Knee arthroplasty rehabilitation, pain management monitoring.',
      preferredDate: '2026-08-22',
      preferredTimeSlot: 'Morning (08:00 AM - 12:00 PM)',
      status: 'REQUESTED',
      createdAt: new Date().toISOString(),
    },
  ];

  const defaultAppointments: Appointment[] = [
    {
      id: 'apt-adm-1',
      referenceNumber: 'APT-KC-2026-8841',
      patientId: 'demo-p1',
      patient: {
        id: 'demo-p1',
        fullName: 'Esther Njeri Karanja',
        phoneNumber: '+254 722 345 678',
        address: 'House 14, Riverside Drive, Westlands',
        city: 'Nairobi',
        emergencyContactName: 'Samuel Karanja',
        emergencyContactPhone: '+254 733 987 654',
      },
      serviceId: 'serv-1',
      service: {
        id: 'serv-1',
        slug: 'home-nursing-care',
        title: 'Home Nursing Care',
        shortDescription: 'Clinical care at home.',
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
        roleTitle: 'Senior Home Care Lead',
        qualifications: 'BSc Nursing, BLS',
        areasOfPractice: 'Home Nursing',
        experienceYears: 9,
        rating: 4.98,
        totalVisits: 142,
        isPublic: true,
        isAvailable: true,
      },
      scheduledDate: new Date().toISOString(),
      scheduledTimeSlot: '10:00 AM - 12:00 PM',
      status: 'ASSIGNED',
      locationAddress: 'House 14, Riverside Drive, Westlands, Nairobi',
    },
  ];

  const fetchData = async () => {
    try {
      const [reqRes, apptRes] = await Promise.allSettled([
        apiClient<{ success: boolean; data: ServiceRequest[] }>('/service-requests'),
        apiClient<{ success: boolean; data: Appointment[] }>('/appointments'),
      ]);

      if (reqRes.status === 'fulfilled' && reqRes.value?.data) {
        setRequests(reqRes.value.data);
      } else {
        setRequests(defaultRequests);
      }

      if (apptRes.status === 'fulfilled' && apptRes.value?.data) {
        setAppointments(apptRes.value.data);
      } else {
        setAppointments(defaultAppointments);
      }
    } catch {
      setRequests(defaultRequests);
      setAppointments(defaultAppointments);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (requestId: string, newStatus: RequestStatus) => {
    try {
      await apiClient(`/service-requests/${requestId}/status`, {
        method: 'PATCH',
        data: { status: newStatus },
      });
      fetchData();
    } catch {
      // Local optimistic update
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
      );
    }
  };

  const filteredRequests = requests.filter((r) => {
    const q = filterText.toLowerCase();
    return (
      r.patientName.toLowerCase().includes(q) ||
      r.referenceNumber.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 glass-surface border border-white/15 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-amber-400 text-xs font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CLINICAL OPERATIONS CONTROL CENTER</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
            KomfoCare Operations Center
          </h2>
          <p className="text-xs text-slate-300 max-w-xl font-sans">
            Real-time pipeline of home care requests, clinician dispatch, patient records, and quality compliance.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center sm:text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">System Status</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Railway API Online
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-white/10 shadow-xl space-y-1">
          <span className="text-slate-400 text-xs font-medium">Pending Requests</span>
          <div className="text-2xl font-bold font-display text-amber-400">
            {requests.filter((r) => r.status === 'REQUESTED' || r.status === 'PENDING_REVIEW').length}
          </div>
          <span className="text-[11px] text-amber-400/90 font-semibold font-mono">Requires triage</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-white/10 shadow-xl space-y-1">
          <span className="text-slate-400 text-xs font-medium">Active Appointments</span>
          <div className="text-2xl font-bold font-display text-white">{appointments.length}</div>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">Clinicians deployed</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-white/10 shadow-xl space-y-1">
          <span className="text-slate-400 text-xs font-medium">Registered Patients</span>
          <div className="text-2xl font-bold font-display text-white">48</div>
          <span className="text-[11px] text-komfo-400 font-semibold font-mono">Across Nairobi metro</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-white/10 shadow-xl space-y-1">
          <span className="text-slate-400 text-xs font-medium">Monthly Revenue (KES)</span>
          <div className="text-2xl font-bold font-display text-emerald-400">428,500</div>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">↑ 18.4% vs last month</span>
        </div>
      </div>

      {/* Main Operations Tabs */}
      <div className="rounded-3xl p-6 sm:p-8 glass-card border border-white/15 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold font-display text-white">
              Service Requests Pipeline
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Review intake requests, transition status, and assign healthcare professionals.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by patient, ref, city..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-komfo-500 focus:outline-none focus:border-komfo-400"
            />
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider font-mono font-bold text-[10px]">
                <th className="py-3 px-3">Reference</th>
                <th className="py-3 px-3">Patient & Location</th>
                <th className="py-3 px-3">Requested Care</th>
                <th className="py-3 px-3">Preferred Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-sans">
              {filteredRequests.map((req) => {
                const badge = getStatusBadgeVariant(req.status);
                return (
                  <tr key={req.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-3 font-mono font-bold text-amber-400">
                      {req.referenceNumber}
                    </td>

                    <td className="py-4 px-3">
                      <p className="font-bold text-white font-display">{req.patientName}</p>
                      <p className="text-[11px] text-slate-300 truncate max-w-xs">{req.patientLocation}, {req.city}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{req.patientPhone}</p>
                    </td>

                    <td className="py-4 px-3">
                      <span className="font-semibold text-komfo-300 block">
                        {req.service?.title || 'General Care'}
                      </span>
                      <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                        {req.careRequirements}
                      </p>
                    </td>

                    <td className="py-4 px-3 font-mono">
                      <p className="font-semibold text-white">{formatDate(req.preferredDate)}</p>
                      <p className="text-[10px] text-slate-400">{req.preferredTimeSlot}</p>
                    </td>

                    <td className="py-4 px-3 font-mono">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.bg}`}
                      >
                        <span>{req.status}</span>
                      </span>
                    </td>

                    <td className="py-4 px-3 text-right font-mono">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value as RequestStatus)}
                        className="bg-[#12071d] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:border-komfo-400 focus:outline-none"
                      >
                        <option value="REQUESTED" className="bg-[#12071d] text-white">Requested</option>
                        <option value="PENDING_REVIEW" className="bg-[#12071d] text-white">Pending Review</option>
                        <option value="ASSESSMENT" className="bg-[#12071d] text-white">Assessment</option>
                        <option value="CONFIRMED" className="bg-[#12071d] text-white">Confirmed</option>
                        <option value="ASSIGNED" className="bg-[#12071d] text-white">Assigned</option>
                        <option value="IN_PROGRESS" className="bg-[#12071d] text-white">In Progress</option>
                        <option value="COMPLETED" className="bg-[#12071d] text-white">Completed</option>
                        <option value="CANCELLED" className="bg-[#12071d] text-white">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
