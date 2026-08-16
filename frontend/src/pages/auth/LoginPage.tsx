import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Lock, Mail, ShieldCheck, UserCheck, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, demoLogin, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      await login(email, password);
      navigate('/dashboard/patient');
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check credentials.');
    }
  };

  const handleDemoSignIn = async (role: Role) => {
    setErrorMsg(null);
    try {
      await demoLogin(role);
      if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
        navigate('/dashboard/admin');
      } else if (role === 'HEALTHCARE_PROFESSIONAL') {
        navigate('/dashboard/professional');
      } else {
        navigate('/dashboard/patient');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed demo login');
    }
  };

  return (
    <div className="py-12 sm:py-20 max-w-md mx-auto px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-elevated space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-900 to-komfo-600 flex items-center justify-center text-white shadow-md">
              <Heart className="w-5 h-5 fill-white/20" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold font-display text-navy-900">Sign in to KomfoCare</h2>
          <p className="text-xs text-slate-500">Access your healthcare portal, visits, and patient records</p>
        </div>

        {/* 1-Click Demo Accounts Switcher */}
        <div className="p-4 rounded-2xl bg-komfo-50/70 border border-komfo-200/80 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-komfo-800">
            <Sparkles className="w-3.5 h-3.5 text-komfo-600" />
            <span>1-Click Test Accounts</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleDemoSignIn('SUPER_ADMIN')}
              className="px-2.5 py-2 rounded-xl bg-white border border-komfo-200 text-[11px] font-bold text-navy-900 hover:bg-navy-900 hover:text-white transition-all shadow-sm text-center"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoSignIn('HEALTHCARE_PROFESSIONAL')}
              className="px-2.5 py-2 rounded-xl bg-white border border-komfo-200 text-[11px] font-bold text-navy-900 hover:bg-navy-900 hover:text-white transition-all shadow-sm text-center"
            >
              Nurse Lead
            </button>
            <button
              type="button"
              onClick={() => handleDemoSignIn('PATIENT')}
              className="px-2.5 py-2 rounded-xl bg-white border border-komfo-200 text-[11px] font-bold text-navy-900 hover:bg-navy-900 hover:text-white transition-all shadow-sm text-center"
            >
              Patient
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="name@komfocare.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider">Password</label>
              <a href="#forgot" className="text-komfo-600 hover:underline text-[11px]">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-navy-900 to-komfo-700 hover:from-navy-950 hover:to-komfo-800 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-komfo-600 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
