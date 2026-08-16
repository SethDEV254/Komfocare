import React, { useState } from 'react';
import { Phone, X, ShieldAlert } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Emergency Notice" className="bg-[#120509]/90 border-b border-amber-500/20 text-amber-200/90 px-4 py-2 text-xs transition-all backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
          <p className="text-[11px] sm:text-xs">
            <strong className="text-amber-300 uppercase tracking-wider font-semibold">Clinical Notice:</strong>{' '}
            KomfoCare provides scheduled home healthcare. For critical emergencies, call national emergency response immediately.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="tel:999"
            className="inline-flex items-center gap-1 px-3 py-0.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 font-bold rounded-full text-[10px] tracking-wider uppercase transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>Hotline: 999 / 112</span>
          </a>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss emergency banner"
            className="text-amber-400/60 hover:text-amber-300 p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
