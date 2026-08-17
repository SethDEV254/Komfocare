import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md p-8 sm:p-10 glass-card border border-white/15 rounded-3xl shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-komfo-600 to-amber-500 text-white mx-auto flex items-center justify-center shadow-glow">
          <Heart className="w-8 h-8 fill-white/20" />
        </div>

        <div>
          <span className="text-5xl font-mono font-black text-amber-400">404</span>
          <h2 className="text-2xl font-bold font-display text-white mt-1">Page Not Found</h2>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
            We couldn't find the page you are looking for. Let's get you back to KomfoCare home healthcare.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-komfo-600 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4" />
            <span>Back Home</span>
          </Link>
          <Link
            to="/services"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors w-full sm:w-auto justify-center"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
};
