import React from 'react';
import { BookingWizard } from '../../components/booking/BookingWizard';

export const RequestServicePage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-label justify-center">QUICK CLINICAL INTAKE</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          Request a Home Care Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          Tell us about the care support you need, and our clinical coordinator will arrange the proper care plan.
        </p>
      </div>

      <BookingWizard />
    </div>
  );
};
