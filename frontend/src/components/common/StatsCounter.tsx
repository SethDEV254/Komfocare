import React from 'react';

interface StatsCounterProps {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ value, label, description, icon }) => {
  return (
    <div className="rounded-2xl p-6 glass-card border border-white/10 shadow-2xl transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          {value}
        </span>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-komfo-400 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-sm font-bold text-white tracking-tight">{label}</h4>
        {description && <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">{description}</p>}
      </div>
    </div>
  );
};
