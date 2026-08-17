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
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [fullDrawerOpen, setFullDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') return false;
    return true; // default to dark
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    // Apply initial theme
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer and dropdown on route change
  useEffect(() => {
    setFullDrawerOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Handle Theme Toggle
  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const getDashboardRoute = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') return '/dashboard/admin';
    if (user.role === 'HEALTHCARE_PROFESSIONAL') return '/dashboard/professional';
    return '/dashboard/patient';
  };

  const servicesList = [
    { title: 'Home Nursing Care', slug: 'home-nursing-care', icon: Heart, category: 'Nursing' },
    { title: 'Elderly Care', slug: 'elderly-care', icon: Users, category: 'Seniors' },
    { title: 'Post-Surgery Care', slug: 'post-surgery-care', icon: Activity, category: 'Recovery' },
    { title: 'Medication Management', slug: 'medication-management', icon: Pill, category: 'Safety' },
    { title: 'Palliative Care', slug: 'palliative-care', icon: ShieldCheck, category: 'Comfort' },
    { title: 'Patient Escort Services', slug: 'patient-escort', icon: Calendar, category: 'Escort' },
    { title: 'Vital Signs Monitoring', slug: 'vital-signs-monitoring', icon: Stethoscope, category: 'Monitoring' },
    { title: 'Health Education', slug: 'health-education', icon: BookOpen, category: 'Knowledge' },
  ];

  const fullDrawerLinks = [
    { label: 'Home', path: '/' },
    { label: 'About KomfoCare', path: '/about' },
    { label: 'All Services (8 Disciplines)', path: '/services' },
    { label: 'Healthcare Professionals', path: '/professionals' },
    { label: 'Health Resources & Guides', path: '/resources' },
    { label: 'Track Request Status', path: '/track-request' },
    { label: 'Contact & Helpline', path: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3 pb-2 transition-all duration-300 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <div
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 border ${
              isScrolled
                ? 'bg-[#0d1428]/90 backdrop-blur-2xl border-white/15 shadow-2xl shadow-blue-950/40'
                : 'bg-[#0d1428]/75 backdrop-blur-xl border-white/10 shadow-lg'
            }`}
          >
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <img
                src="/images/komfocare-logo.png"
                alt="KomfoCare Logo"
                className="w-10 h-10 object-contain rounded-full group-hover:scale-105 transition-transform"
              />
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
            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
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
                    <div className="p-3 rounded-2xl bg-[#0d1428]/95 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-1">
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

            {/* Right Group: Action CTA + Theme Toggle + Menu Circle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Portal / Sign In */}
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to={getDashboardRoute()}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-white font-semibold text-xs transition-all inline-flex items-center gap-1.5"
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
                  className="hidden md:inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Book Care Magnetic CTA Pill */}
              <Link
                to="/book-care"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-komfo-600 via-komfo-500 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs shadow-glow hover:scale-105 transition-all tracking-wider uppercase flex-shrink-0"
              >
                <span>Book Care</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {/* Theme Toggle Button (Nex101 style) */}
              <button
                type="button"
                onClick={toggleTheme}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-amber-400 flex items-center justify-center text-slate-300 hover:text-amber-300 transition-all flex-shrink-0 shadow-sm"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
                ) : (
                  <Moon className="w-4 h-4 text-komfo-400" />
                )}
              </button>

              {/* Far Right Circular Menu Button (Nex101 style) */}
              <button
                type="button"
                onClick={() => setFullDrawerOpen(true)}
                title="Open Navigation Menu"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-komfo-400 flex flex-col items-center justify-center gap-1 text-white shadow-glow hover:scale-105 transition-all flex-shrink-0 group cursor-pointer"
                aria-label="Open Fullscreen Menu"
              >
                <span className="w-4 h-[2px] bg-white group-hover:bg-komfo-300 transition-all rounded-full" />
                <span className="w-2.5 h-[2px] bg-amber-400 group-hover:w-4 group-hover:bg-komfo-300 transition-all rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Sliding Editorial Drawer (Nex101 Creative Hub Style) */}
      {fullDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
            onClick={() => setFullDrawerOpen(false)}
          />

          {/* Sliding Drawer Content */}
          <div className="relative w-full max-w-md sm:max-w-lg bg-[#0c0310] border-l border-white/15 h-full p-6 sm:p-10 flex flex-col justify-between overflow-y-auto shadow-2xl z-10">
            {/* Top Bar of Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                  KomfoCare Menu
                </span>
              </div>

              {/* Close Circular Button */}
              <button
                type="button"
                onClick={() => setFullDrawerOpen(false)}
                className="w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Editorial Menu Navigation Links */}
            <div className="py-8 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block mb-4">
                Navigation Directory
              </span>

              {fullDrawerLinks.map((item, idx) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setFullDrawerOpen(false)}
                  className="group flex items-center justify-between py-3 px-3 rounded-2xl text-xl sm:text-2xl font-bold font-display text-white hover:text-komfo-300 hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 group-hover:text-amber-400">
                      0{idx + 1}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-komfo-300 group-hover:translate-x-1.5 transition-all opacity-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>

            {/* Bottom Contact & Quick Access */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Care Helpline</span>
                  <a href="tel:0792004232" className="text-amber-400 font-bold hover:underline">
                    0792004232
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Direct Email</span>
                  <a href="mailto:komfocare@gmail.com" className="text-white font-bold hover:underline">
                    komfocare@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-white/5">
                  <span>Location</span>
                  <span className="text-slate-300">Nairobi, Kenya</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setFullDrawerOpen(false)}
                  className="py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider text-center transition-all"
                >
                  {isAuthenticated ? 'My Portal' : 'Sign In'}
                </Link>

                <Link
                  to="/book-care"
                  onClick={() => setFullDrawerOpen(false)}
                  className="py-3 rounded-full bg-gradient-to-r from-komfo-600 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider text-center shadow-glow transition-all"
                >
                  Book Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
