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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
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
    { title: 'Home Nursing Care', slug: 'home-nursing-care', icon: Heart },
    { title: 'Elderly Care', slug: 'elderly-care', icon: Users },
    { title: 'Post-Surgery Care', slug: 'post-surgery-care', icon: Activity },
    { title: 'Medication Management', slug: 'medication-management', icon: Pill },
    { title: 'Palliative Care', slug: 'palliative-care', icon: ShieldCheck },
    { title: 'Patient Escort', slug: 'patient-escort', icon: Calendar },
    { title: 'Vital Signs Monitoring', slug: 'vital-signs-monitoring', icon: Stethoscope },
    { title: 'Health Education', slug: 'health-education', icon: BookOpen },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-900 to-komfo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <span className="text-xl font-bold font-display tracking-tight text-navy-900">
                Komfo<span className="text-komfo-600">Care</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                Home Healthcare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors hover:text-komfo-600 ${
                location.pathname === '/' ? 'text-komfo-600' : 'text-slate-700'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`text-sm font-semibold transition-colors hover:text-komfo-600 ${
                location.pathname === '/about' ? 'text-komfo-600' : 'text-slate-700'
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
              <Link
                to="/services"
                className={`flex items-center gap-1 text-sm font-semibold transition-colors hover:text-komfo-600 ${
                  location.pathname.startsWith('/services') ? 'text-komfo-600' : 'text-slate-700'
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-elevated border border-slate-100 p-2 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical Home Services</span>
                    <Link to="/services" className="text-xs font-semibold text-komfo-600 hover:underline">View All</Link>
                  </div>
                  {servicesList.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-komfo-50 hover:text-komfo-700 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-komfo-100/70 text-komfo-600 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{service.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/professionals"
              className={`text-sm font-semibold transition-colors hover:text-komfo-600 ${
                location.pathname === '/professionals' ? 'text-komfo-600' : 'text-slate-700'
              }`}
            >
              Professionals
            </Link>

            <Link
              to="/resources"
              className={`text-sm font-semibold transition-colors hover:text-komfo-600 ${
                location.pathname.startsWith('/resources') ? 'text-komfo-600' : 'text-slate-700'
              }`}
            >
              Resources
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-semibold transition-colors hover:text-komfo-600 ${
                location.pathname === '/contact' ? 'text-komfo-600' : 'text-slate-700'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+254700000000"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100"
            >
              <Phone className="w-3.5 h-3.5 text-komfo-600" />
              <span>Call Us</span>
            </a>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to={getDashboardRoute()}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 font-semibold text-xs transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-komfo-600" />
                  <span>Dashboard ({user?.role?.replace('_', ' ')})</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  title="Sign out"
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-semibold text-navy-900 hover:text-komfo-600 transition-colors px-3 py-2"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/book-care"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-navy-900 to-komfo-700 hover:from-navy-950 hover:to-komfo-800 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Home Care</span>
            </Link>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/book-care"
              className="px-3.5 py-1.5 rounded-full bg-komfo-600 text-white font-semibold text-xs tracking-wide shadow-sm"
            >
              Book Care
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-slate-700 hover:text-navy-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-slate-200 shadow-2xl p-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200 z-50">
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className={`p-2.5 rounded-xl font-semibold text-sm ${
                location.pathname === '/' ? 'bg-komfo-50 text-komfo-700' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`p-2.5 rounded-xl font-semibold text-sm ${
                location.pathname === '/about' ? 'bg-komfo-50 text-komfo-700' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              About KomfoCare
            </Link>

            <div className="py-2 border-y border-slate-100">
              <span className="block px-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Home Healthcare Services
              </span>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {servicesList.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="p-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-komfo-50 hover:text-komfo-700 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-komfo-400" />
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/professionals"
              className={`p-2.5 rounded-xl font-semibold text-sm ${
                location.pathname === '/professionals' ? 'bg-komfo-50 text-komfo-700' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Healthcare Professionals
            </Link>

            <Link
              to="/resources"
              className={`p-2.5 rounded-xl font-semibold text-sm ${
                location.pathname.startsWith('/resources') ? 'bg-komfo-50 text-komfo-700' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Health Resources & Blog
            </Link>

            <Link
              to="/track-request"
              className="p-2.5 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-50"
            >
              Track Request Status
            </Link>

            <Link
              to="/contact"
              className={`p-2.5 rounded-xl font-semibold text-sm ${
                location.pathname === '/contact' ? 'bg-komfo-50 text-komfo-700' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardRoute()}
                    className="w-full text-center py-2.5 rounded-xl bg-slate-100 text-navy-900 font-semibold text-sm"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-center py-2 text-rose-600 font-semibold text-xs"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm"
                >
                  Sign In to Portal
                </Link>
              )}

              <Link
                to="/book-care"
                className="w-full text-center py-3 rounded-xl bg-navy-900 text-white font-semibold text-sm shadow-md"
              >
                Book Home Care Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
