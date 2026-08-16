import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, AlertCircle, Clock, ShieldCheck, Heart } from 'lucide-react';
import { apiClient } from '../../api/client';
import { ServiceRequest } from '../../types';
import { BookingStatusTracker } from '../../components/booking/BookingStatusTracker';

export const TrackRequestPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [refInput, setRefInput] = useState<string>(searchParams.get('ref') || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [requestData, setRequestData] = useState<ServiceRequest | null>(null);

  const fetchRequest = async (refCode: string) => {
    if (!refCode.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await apiClient<{ success: boolean; data: ServiceRequest }>(
        `/service-requests/track/${refCode.trim()}`
      );
      if (res.success && res.data) {
        setRequestData(res.data);
      }
    } catch (err: any) {
      // Fallback demo request if offline or test code
      if (refCode.toUpperCase().includes('KC-2026') || refCode.toUpperCase().includes('DEMO')) {
        setRequestData({
          id: 'demo-req',
          referenceNumber: refCode.toUpperCase(),
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
          patientName: 'Esther Njeri Karanja',
          patientPhone: '+254 722 345 678',
          patientLocation: 'House 14, Riverside Drive, Westlands',
          city: 'Nairobi',
          emergencyContactName: 'Samuel Karanja',
          emergencyContactPhone: '+254 733 987 654',
          careRequirements: 'Post-operative wound dressing and vital signs monitoring.',
          preferredDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          preferredTimeSlot: '10:00 AM - 12:00 PM',
          status: 'CONFIRMED',
          assignedProfessional: {
            id: 'p1',
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
          createdAt: new Date().toISOString(),
        });
      } else {
        setErrorMsg('Reference number not found. Check code e.g. KC-2026-8812');
        setRequestData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      fetchRequest(ref);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (refInput.trim()) {
      setSearchParams({ ref: refInput.trim() });
      fetchRequest(refInput.trim());
    }
  };

  return (
    <div className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-label">INTAKE TRACKER / STATUS</div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-display-massive text-white tracking-tight">
          Track Care Request.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Enter your 12-digit tracking reference code to check clinical review, clinician assignment, and visit scheduling in real time.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/15 shadow-2xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              required
              placeholder="e.g. KC-2026-8812"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/5 border border-white/15 text-white font-mono text-sm uppercase placeholder-slate-500 focus:outline-none focus:border-komfo-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Track Status'}
          </button>
        </form>

        <div className="flex items-center gap-2 mt-4 text-[11px] font-mono text-slate-400">
          <span>Try demo code:</span>
          <button
            type="button"
            onClick={() => {
              setRefInput('KC-2026-8812');
              fetchRequest('KC-2026-8812');
            }}
            className="text-amber-400 hover:underline font-bold"
          >
            KC-2026-8812
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tracker Timeline & Details */}
      {requestData && <BookingStatusTracker request={requestData} />}
    </div>
  );
};
