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
    <div className="py-12 sm:py-16 max-w-lg mx-auto px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-elevated space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-900 to-komfo-600 flex items-center justify-center text-white shadow-md">
              <Heart className="w-5 h-5 fill-white/20" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold font-display text-navy-900">Create KomfoCare Account</h2>
          <p className="text-xs text-slate-500">Register as a patient or family caregiver for home care coordination</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Esther Njeri Karanja"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+254 7XX XXX XXX"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Password *</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Home Residence Address</label>
            <input
              type="text"
              placeholder="e.g. Westlands, Nairobi"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Account Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 bg-white"
            >
              <option value="PATIENT">Patient (Receiving Home Care)</option>
              <option value="FAMILY_CAREGIVER">Family Member / Caregiver</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-navy-900 to-komfo-700 hover:from-navy-950 hover:to-komfo-800 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-komfo-600 hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};
