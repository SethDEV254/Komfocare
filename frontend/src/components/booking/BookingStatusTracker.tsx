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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-8">
      {/* Top Request Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Request Reference Number
          </span>
          <h2 className="text-2xl sm:text-3xl font-mono font-extrabold text-navy-900 mt-1">
            {request.referenceNumber}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Submitted on {formatDateTime(request.createdAt)}
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end">
          <span className="text-xs text-slate-400 mb-1 font-medium">Current Status</span>
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
        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-3">
          <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-rose-950">Care Request Cancelled</h4>
            <p className="mt-1">
              This request was cancelled. If you need to rebook or have questions, please contact our support team at +254 700 000 000.
            </p>
          </div>
        </div>
      )}

      {/* Timeline Steps */}
      {!isCancelled && (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8 my-6">
          {steps.map((s, idx) => {
            const isPassed = currentIdx >= idx;
            const isCurrent = currentIdx === idx;

            return (
              <div key={s.key} className="relative group">
                {/* Step Bullet */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isPassed
                      ? 'bg-komfo-600 text-white shadow-md ring-4 ring-komfo-100'
                      : 'bg-slate-100 text-slate-400 border-2 border-slate-200'
                  }`}
                >
                  {s.icon}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-bold ${
                        isCurrent
                          ? 'text-komfo-700'
                          : isPassed
                          ? 'text-navy-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </h4>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-komfo-100 text-komfo-700 text-[10px] font-bold uppercase tracking-wider">
                        Active Stage
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <Activity className="w-4 h-4 text-komfo-600" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Service</span>
          </div>
          <p className="font-bold text-slate-900 text-sm">
            {request.service?.title || 'Home Healthcare Service'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <Calendar className="w-4 h-4 text-komfo-600" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Scheduled Time</span>
          </div>
          <p className="font-bold text-slate-900 text-sm">{formatDate(request.preferredDate)}</p>
          <p className="text-slate-600">{request.preferredTimeSlot}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <MapPin className="w-4 h-4 text-komfo-600" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Location</span>
          </div>
          <p className="font-bold text-slate-900 text-sm">{request.patientLocation}</p>
        </div>
      </div>

      {/* Assigned Staff Preview if assigned */}
      {request.assignedProfessional && (
        <div className="p-5 rounded-2xl bg-komfo-50/80 border border-komfo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <img
              src={
                request.assignedProfessional.photoUrl ||
                'https://images.unsplash.com/photo-1594824813689-d758c5c7d0d0?auto=format&fit=crop&q=80&w=200'
              }
              alt={request.assignedProfessional.fullName}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-komfo-700">
                Assigned Visiting Clinician
              </span>
              <h4 className="font-bold text-navy-900 text-base">
                {request.assignedProfessional.fullName}
              </h4>
              <p className="text-xs text-slate-600">{request.assignedProfessional.roleTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+254700000000"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-komfo-600" />
              <span>Contact Coordinator</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
