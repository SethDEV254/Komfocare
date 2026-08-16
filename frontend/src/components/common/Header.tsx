import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Heart,
  Menu,
  X,
  ChevronDown,
  Phone,
  Calendar,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  Stethoscope,
  Users,
  Activity,
  Pill,
  BookOpen,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const getDashboardRoute = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') return '/dashboard/admin';
    if (user.role === 'HEALTHCARE_PROFESSIONAL') return '/dashboard/professional';
    return '/dashboard/patient';
  };

  const servicesList = [
    { title: 'Home Nursing Care', slug: 'home-nursing-care', icon: Heart, category: 'Clinical' },
    { title: 'Elderly Care', slug: 'elderly-care', icon: Users, category: 'Support' },
    { title: 'Post-Surgery Care', slug: 'post-surgery-care', icon: Activity, category: 'Recovery' },
    { title: 'Medication Management', slug: 'medication-management', icon: Pill, category: 'Clinical' },
    { title: 'Palliative Care', slug: 'palliative-care', icon: ShieldCheck, category: 'Holistic' },
    { title: 'Patient Escort', slug: 'patient-escort', icon: Calendar, category: 'Transport' },
    { title: 'Vital Signs Monitoring', slug: 'vital-signs-monitoring', icon: Stethoscope, category: 'Diagnostic' },
    { title: 'Health Education', slug: 'health-education', icon: BookOpen, category: 'Family' },
  ];

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3 pb-2 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-3 rounded-full transition-all duration-300 border ${
            isScrolled
              ? 'bg-[#0f0514]/90 backdrop-blur-2xl border-white/15 shadow-2xl shadow-purple-950/40'
              : 'bg-[#0f0514]/75 backdrop-blur-xl border-white/10 shadow-lg'
          }`}
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-komfo-600 to-amber-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
              <Heart className="w-4.5 h-4.5 fill-white/20 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold font-display tracking-tight text-white flex items-center gap-0.5">
                Komfo<span className="text-komfo-400">Care</span>
              </span>
              <span className="hidden lg:block text-[9px] uppercase tracking-[0.2em] text-amber-400/90 font-bold -mt-0.5">
                Home Health
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Link
              to="/"
              className={`link-underline transition-colors hover:text-white ${
                location.pathname === '/' ? 'text-white font-bold' : ''
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`link-underline transition-colors hover:text-white ${
                location.pathname === '/about' ? 'text-white font-bold' : ''
              }`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                className={`link-underline inline-flex items-center gap-1 transition-colors hover:text-white ${
                  location.pathname.startsWith('/services') ? 'text-white font-bold' : ''
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-80 z-50">
                  <div className="p-3 rounded-2xl bg-[#0f0514]/95 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-1">
                    <div className="px-3 py-1.5 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                        8 Specialized Disciplines
                      </span>
                      <Link
                        to="/services"
                        className="text-[10px] text-komfo-400 hover:text-komfo-300 font-semibold"
                      >
                        View All
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-1 max-h-72 overflow-y-auto py-1">
                      {servicesList.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          className="flex items-center justify-between p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all group"
                        >
                          <span className="text-xs font-medium">{s.title}</span>
                          <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-white/5 text-amber-400/80 font-mono">
                            {s.category}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/professionals"
              className={`link-underline transition-colors hover:text-white ${
                location.pathname === '/professionals' ? 'text-white font-bold' : ''
              }`}
            >
              Clinicians
            </Link>

            <Link
              to="/resources"
              className={`link-underline transition-colors hover:text-white ${
                location.pathname === '/resources' ? 'text-white font-bold' : ''
              }`}
            >
              Resources
            </Link>

            <Link
              to="/track-request"
              className={`link-underline transition-colors hover:text-white ${
                location.pathname === '/track-request' ? 'text-white font-bold' : ''
              }`}
            >
              Track Care
            </Link>
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to={getDashboardRoute()}
                  className="px-4 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-white font-semibold text-xs transition-all inline-flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-komfo-400" />
                  <span>Portal</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="p-1.5 rounded-full text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/book-care"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs shadow-glow hover:scale-105 transition-all tracking-wider uppercase"
            >
              <span>Book Care</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/book-care"
              className="px-3 py-1.5 rounded-full bg-komfo-600 text-white font-bold text-[11px]"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-full bg-white/5 border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="mt-2 p-5 rounded-3xl bg-[#0f0514]/95 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-4 md:hidden">
            <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-200">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                About
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                All Services (8 Disciplines)
              </Link>
              <Link
                to="/professionals"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                Healthcare Professionals
              </Link>
              <Link
                to="/resources"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                Health Resources
              </Link>
              <Link
                to="/track-request"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                Track Care Status
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                Contact & Helpline
              </Link>
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-white/10 text-center font-bold text-xs text-white"
              >
                {isAuthenticated ? 'Go to Portal' : 'Sign In / Demo Login'}
              </Link>
              <Link
                to="/book-care"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-komfo-600 to-indigo-600 text-center font-bold text-xs text-white shadow-glow uppercase tracking-wider"
              >
                Book Home Care Visit
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
