import React from 'react';
import {
  CheckCircle2,
  Clock,
  UserCheck,
  ShieldCheck,
  Activity,
  AlertCircle,
  XCircle,
  Phone,
  Calendar,
  MapPin,
} from 'lucide-react';
import { ServiceRequest, RequestStatus } from '../../types';
import { formatDate, formatDateTime, getStatusBadgeVariant } from '../../utils/formatters';

interface TrackerProps {
  request: ServiceRequest;
}

export const BookingStatusTracker: React.FC<TrackerProps> = ({ request }) => {
  const steps: {
    key: RequestStatus;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'REQUESTED',
      label: 'Request Submitted',
      description: 'Your care request has been received and queued for review.',
      icon: <Clock className="w-5 h-5" />,
    },
    {
      key: 'PENDING_REVIEW',
      label: 'Clinical Review',
      description: 'Our care management team is evaluating clinical requirements.',
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      key: 'ASSESSMENT',
      label: 'Care Assessment',
      description: 'Determining optimal nurse qualifications and visit protocol.',
      icon: <Activity className="w-5 h-5" />,
    },
    {
      key: 'CONFIRMED',
      label: 'Booking Confirmed',
      description: 'Care date, time, and service parameters are verified.',
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      key: 'ASSIGNED',
      label: 'Professional Assigned',
      description: 'A licensed healthcare professional has been assigned to your home visit.',
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      key: 'IN_PROGRESS',
      label: 'Visit in Progress',
      description: 'Healthcare professional is currently on site conducting home care.',
      icon: <Activity className="w-5 h-5" />,
    },
    {
      key: 'COMPLETED',
      label: 'Care Completed',
      description: 'Visit concluded and digital clinical notes uploaded.',
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
  ];

  const statusOrder: RequestStatus[] = [
    'REQUESTED',
    'PENDING_REVIEW',
    'ASSESSMENT',
    'CONFIRMED',
    'ASSIGNED',
    'IN_PROGRESS',
    'COMPLETED',
  ];

  const currentIdx = statusOrder.indexOf(request.status);
  const isCancelled = request.status === 'CANCELLED';

  return (
    <div className="rounded-3xl p-6 sm:p-8 glass-card border border-white/15 shadow-2xl space-y-8">
      {/* Top Request Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Request Reference Number
          </span>
          <h2 className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400 mt-1">
            {request.referenceNumber}
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Submitted on {formatDateTime(request.createdAt)}
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end">
          <span className="text-xs font-mono text-slate-400 mb-1 font-medium">Current Status</span>
          <span
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${
              getStatusBadgeVariant(request.status).bg
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                getStatusBadgeVariant(request.status).dot
              } animate-pulse`}
            />
            <span>{request.status.replace(/_/g, ' ')}</span>
          </span>
        </div>
      </div>

      {/* Cancelled Banner if applicable */}
      {isCancelled && (
        <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-3">
          <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-rose-300">Care Request Cancelled</h4>
            <p className="mt-1 font-sans">
              This request was cancelled. If you need to rebook or have questions, please contact our support team at 0792004232.
            </p>
          </div>
        </div>
      )}

      {/* Timeline Steps */}
      {!isCancelled && (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-8 my-6">
          {steps.map((s, idx) => {
            const isPassed = currentIdx >= idx;
            const isCurrent = currentIdx === idx;

            return (
              <div key={s.key} className="relative group">
                {/* Step Bullet */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isPassed
                      ? 'bg-komfo-600 text-white shadow-glow ring-4 ring-komfo-900/50'
                      : 'bg-white/5 text-slate-500 border-2 border-white/10'
                  }`}
                >
                  {s.icon}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-bold font-display ${
                        isCurrent
                          ? 'text-amber-400'
                          : isPassed
                          ? 'text-white'
                          : 'text-slate-500'
                      }`}
                    >
                      {s.label}
                    </h4>
                    {isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                        Active Stage
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Activity className="w-4 h-4 text-komfo-400" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Service</span>
          </div>
          <p className="font-bold text-white text-sm font-sans">
            {request.service?.title || 'Home Healthcare Service'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Calendar className="w-4 h-4 text-komfo-400" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Scheduled Time</span>
          </div>
          <p className="font-bold text-white text-sm">{formatDate(request.preferredDate)}</p>
          <p className="text-slate-400">{request.preferredTimeSlot}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <MapPin className="w-4 h-4 text-komfo-400" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Location</span>
          </div>
          <p className="font-bold text-white text-sm font-sans">{request.patientLocation}</p>
        </div>
      </div>

      {/* Assigned Staff Preview if assigned */}
      {request.assignedProfessional && (
        <div className="p-5 rounded-2xl bg-white/5 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <img
              src={
                request.assignedProfessional.photoUrl ||
                'https://images.unsplash.com/photo-1594824813689-d758c5c7d0d0?auto=format&fit=crop&q=80&w=200'
              }
              alt={request.assignedProfessional.fullName}
              className="w-14 h-14 rounded-2xl object-cover border border-white/20 shadow-md"
            />
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-komfo-400">
                Assigned Visiting Clinician
              </span>
              <h4 className="font-bold font-display text-white text-base">
                {request.assignedProfessional.fullName}
              </h4>
              <p className="text-xs text-slate-300 font-sans">{request.assignedProfessional.roleTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:0792004232"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 hover:text-white font-semibold text-xs transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-komfo-400" />
              <span>Contact Coordinator (0792004232)</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
