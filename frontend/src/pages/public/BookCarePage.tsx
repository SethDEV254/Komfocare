import React from 'react';
import { BookingWizard } from '../../components/booking/BookingWizard';

export const BookCarePage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-label">CARE INTAKE / SCHEDULING</div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-display-massive text-white tracking-tight">
          Book Professional Home Care.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Complete this structured clinical intake to schedule a verified, licensed registered nurse or clinician for your loved one in Nairobi.
        </p>
      </div>

      {/* Multi-step wizard */}
      <BookingWizard />
    </div>
  );
};
