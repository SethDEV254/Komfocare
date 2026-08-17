import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, Mail, Lock, Phone, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'PATIENT',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      await register(formData);
      navigate('/dashboard/patient');
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="py-12 sm:py-20 max-w-lg mx-auto px-4">
      <div className="rounded-3xl p-8 sm:p-10 glass-card border border-white/15 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-komfo-600 to-amber-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white/20" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold font-display text-white">Create KomfoCare Account</h2>
          <p className="text-xs text-slate-400 font-sans">Register as a patient or family caregiver for home care coordination</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Esther Njeri Karanja"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-komfo-500 focus:outline-none focus:border-komfo-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-komfo-500 focus:outline-none focus:border-komfo-400"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+254 7XX XXX XXX"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-komfo-500 focus:outline-none focus:border-komfo-400"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">Password *</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-komfo-500 focus:outline-none focus:border-komfo-400"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">Home Residence Address</label>
            <input
              type="text"
              placeholder="e.g. Westlands, Nairobi"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-komfo-500 focus:outline-none focus:border-komfo-400"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">Account Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#12071d] border border-white/15 text-white text-xs focus:ring-2 focus:ring-komfo-500 focus:outline-none focus:border-komfo-400"
            >
              <option value="PATIENT" className="bg-[#12071d] text-white">Patient (Receiving Home Care)</option>
              <option value="FAMILY_CAREGIVER" className="bg-[#12071d] text-white">Family Member / Caregiver</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-[1.02] transition-all disabled:opacity-50 mt-2 font-mono"
          >
            {isLoading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/10 text-xs text-slate-400 font-sans">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-komfo-400 hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};
