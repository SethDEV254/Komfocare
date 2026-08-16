import React from 'react';
import { BookingWizard } from '../../components/booking/BookingWizard';

export const RequestServicePage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
          Quick Service Intake
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-navy-900 tracking-tight">
          Request a Home Care Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Tell us about the care support you need, and our clinical coordinator will arrange the proper care plan.
        </p>
      </div>

      <BookingWizard />
    </div>
  );
};
