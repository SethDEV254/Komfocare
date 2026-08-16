import React from 'react';
import { BookingWizard } from '../../components/booking/BookingWizard';
import { ShieldCheck, Heart, Clock, Phone } from 'lucide-react';

export const BookCarePage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
          Seamless Online Booking
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-navy-900 tracking-tight">
          Book Professional Home Care
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Complete this simple 8-step form to schedule a verified clinician or registered nurse for your loved one.
        </p>
      </div>

      {/* Multi-step wizard */}
      <BookingWizard />
    </div>
  );
};
