import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-komfo-100 text-komfo-600 mx-auto flex items-center justify-center shadow-md">
          <Heart className="w-8 h-8" />
        </div>

        <div>
          <span className="text-4xl font-extrabold text-navy-900 font-display">404</span>
          <h2 className="text-2xl font-bold font-display text-navy-900 mt-1">Page Not Found</h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            We couldn't find the page you are looking for. Let's get you back to KomfoCare.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy-900 hover:bg-navy-950 text-white font-semibold text-xs shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back Home</span>
          </Link>
          <Link
            to="/services"
            className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
};
