import React, { useState } from 'react';
import { AlertTriangle, Phone, X, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmergencyBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Emergency Notice" className="bg-amber-500/10 border-b border-amber-500/20 text-amber-950 px-4 py-2.5 text-xs sm:text-sm transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <div className="p-1 rounded-md bg-amber-500/20 text-amber-700 flex-shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <p className="font-medium">
            <span className="font-bold text-amber-900">Need emergency medical attention?</span>{' '}
            KomfoCare home-care visits are scheduled services and not an emergency response service.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="tel:999"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full text-xs transition-colors shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Emergency Help: 999 / 112</span>
          </a>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss emergency banner"
            className="text-amber-800/70 hover:text-amber-900 p-1 hover:bg-amber-500/10 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
