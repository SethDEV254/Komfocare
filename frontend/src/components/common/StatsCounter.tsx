import React from 'react';

interface StatsCounterProps {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ value, label, description, icon }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl sm:text-4xl font-extrabold font-display text-navy-900 tracking-tight">
          {value}
        </span>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-komfo-50 text-komfo-600 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-800 tracking-tight">{label}</h4>
        {description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>}
      </div>
    </div>
  );
};
