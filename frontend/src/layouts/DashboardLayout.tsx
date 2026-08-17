import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Heart,
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  ClipboardList,
  FileText,
  Activity,
  CreditCard,
  Bell,
  BookOpen,
  MessageSquareQuote,
  ShieldCheck,
  MapPin,
  FileSpreadsheet,
  Settings,
  LogOut,
  Menu,
  X,
  PlusCircle,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = user?.role || 'PATIENT';

  // Navigation config per role
  const getNavLinks = () => {
    if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
      return [
        { label: 'Operations Overview', path: '/dashboard/admin', icon: LayoutDashboard },
        { label: 'Service Requests', path: '/dashboard/admin?tab=requests', icon: ClipboardList },
        { label: 'Appointments Calendar', path: '/dashboard/admin?tab=appointments', icon: Calendar },
        { label: 'Patients Registry', path: '/dashboard/admin?tab=patients', icon: Users },
        { label: 'Healthcare Professionals', path: '/dashboard/admin?tab=professionals', icon: UserCheck },
        { label: 'Visit Documentation', path: '/dashboard/admin?tab=visits', icon: FileText },
        { label: 'Vital Signs Records', path: '/dashboard/admin?tab=vitals', icon: Activity },
        { label: 'Invoices & Payments', path: '/dashboard/admin?tab=payments', icon: CreditCard },
        { label: 'Services Catalog', path: '/dashboard/admin?tab=services', icon: ShieldCheck },
        { label: 'Health Resources', path: '/dashboard/admin?tab=resources', icon: BookOpen },
        { label: 'Testimonials', path: '/dashboard/admin?tab=testimonials', icon: MessageSquareQuote },
        { label: 'Service Areas', path: '/dashboard/admin?tab=areas', icon: MapPin },
        { label: 'Audit Logs', path: '/dashboard/admin?tab=audit', icon: FileSpreadsheet },
      ];
    }

    if (role === 'HEALTHCARE_PROFESSIONAL') {
      return [
        { label: 'My Schedule & Visits', path: '/dashboard/professional', icon: LayoutDashboard },
        { label: 'Assigned Patients', path: '/dashboard/professional?tab=patients', icon: Users },
        { label: 'Clinical Documentation', path: '/dashboard/professional?tab=docs', icon: FileText },
        { label: 'Vital Signs Entry', path: '/dashboard/professional?tab=vitals', icon: Activity },
      ];
    }

    // Patient / Caregiver
    return [
      { label: 'My Care Portal', path: '/dashboard/patient', icon: LayoutDashboard },
      { label: 'Upcoming Home Visits', path: '/dashboard/patient?tab=visits', icon: Calendar },
      { label: 'Vital Signs Trends', path: '/dashboard/patient?tab=vitals', icon: Activity },
      { label: 'Care Plan & Goals', path: '/dashboard/patient?tab=careplan', icon: ShieldCheck },
      { label: 'Billing & Invoices', path: '/dashboard/patient?tab=billing', icon: CreditCard },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen flex bg-[#080d1a] text-slate-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0d0417] text-slate-300 flex flex-col justify-between border-r border-white/10 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Logo */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-komfo-600 to-amber-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <div>
                <span className="text-xl font-bold font-display tracking-tight text-white">
                  Komfo<span className="text-komfo-400">Care</span>
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-amber-400 font-mono font-bold">
                  {role.replace('_', ' ')} PORTAL
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <div className="p-4 space-y-1 flex-1">
            <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Navigation
            </span>
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname + location.search === item.path ||
                (item.path.includes('?') && location.search.includes(item.path.split('?')[1])) ||
                (!location.search && item.path === location.pathname);

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-komfo-600 text-white shadow-glow font-bold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Book visit quick CTA for patient */}
          {role === 'PATIENT' && (
            <div className="p-4 mx-3 mb-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-xs font-bold text-white mb-1">Need a Home Visit?</p>
              <p className="text-[11px] text-slate-400 mb-3 font-sans">Schedule clinical nursing or elderly care.</p>
              <Link
                to="/book-care"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-komfo-600 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow w-full justify-center"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Book Care Visit</span>
              </Link>
            </div>
          )}

          {/* User Profile & Sign Out */}
          <div className="p-4 border-t border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-white text-xs font-mono">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">{user?.fullName || 'Active User'}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                title="Sign Out"
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-[#0d1428]/90 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-bold font-display text-white tracking-tight">
                {role === 'ADMIN' || role === 'SUPER_ADMIN'
                  ? 'Clinical Operations Center'
                  : role === 'HEALTHCARE_PROFESSIONAL'
                  ? 'Clinician Schedule & Care Desk'
                  : 'Patient Care Portal'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors font-mono"
            >
              <span>Public Website</span>
            </Link>

            <Link
              to="/book-care"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-komfo-600 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all font-mono"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </Link>
          </div>
        </header>

        {/* Dashboard View Body */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
