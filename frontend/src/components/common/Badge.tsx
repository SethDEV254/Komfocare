import React from 'react';
import { getStatusBadgeVariant } from '../../utils/formatters';

interface BadgeProps {
  status: string;
  className?: string;
  showDot?: boolean;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, className = '', showDot = true }) => {
  const variant = getStatusBadgeVariant(status);
  const formattedText = status.replace(/_/g, ' ');

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${variant.bg} ${variant.border} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${variant.dot} animate-pulse`} />
      )}
      <span className="capitalize">{formattedText}</span>
    </span>
  );
};
