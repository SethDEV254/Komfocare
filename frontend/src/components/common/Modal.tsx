import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Dialog Card */}
        <div
          className={`relative transform overflow-hidden rounded-3xl bg-[#12071d] text-left shadow-2xl transition-all w-full ${maxWidthClasses} border border-white/15 p-6 sm:p-8 z-10 text-slate-100`}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
            <div>
              <h3 className="text-xl font-bold font-display text-white tracking-tight">{title}</h3>
              {subtitle && <p className="text-xs text-slate-400 mt-1 font-sans">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-xl p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
