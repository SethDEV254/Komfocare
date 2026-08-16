import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Award, MapPin, Calendar, Heart, Search, ArrowUpRight } from 'lucide-react';
import { HealthcareProfessional } from '../../types';
import { apiClient } from '../../api/client';

export const ProfessionalsPage: React.FC = () => {
  const [professionals, setProfessionals] = useState<HealthcareProfessional[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');

  const defaultStaff = [
    {
      id: 'prof-1',
      fullName: 'Nurse Sarah Ombati, RN',
      title: 'Nurse',
      roleTitle: 'Senior Home Care Lead & Registered Nurse',
      qualifications: 'BSc Nursing (UoN), BLS Certified, Geriatric Specialist',
      areasOfPractice: 'Home Nursing • Elderly Care • Chronic Care',
      experienceYears: 9,
      bio: 'Sarah has over 9 years of dedicated clinical nursing experience specializing in personalized geriatric care and in-home chronic illness support.',
      rating: 4.98,
      totalVisits: 142,
      photoUrl: 'https://images.unsplash.com/photo-1594824813689-d758c5c7d0d0?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'prof-2',
      fullName: 'Nurse David Kiprop, RN',
      title: 'Nurse',
      roleTitle: 'Post-Operative & Wound Care Specialist',
      qualifications: 'Higher Dip Critical Care, Wound Specialist (CWS)',
      areasOfPractice: 'Post-Surgery Care • Sterile Dressing • IV Therapy',
      experienceYears: 7,
      bio: 'David brings critical care and advanced surgical recovery expertise straight to patients recovering peacefully in their private home residences.',
      rating: 4.95,
      totalVisits: 98,
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'prof-3',
      fullName: 'Dr. Evans Mwangi, CO',
      title: 'Dr.',
      roleTitle: 'Clinical Officer & Medical Assessments Lead',
      qualifications: 'BSc Clinical Medicine, Advanced Cardiac Life Support (ACLS)',
      areasOfPractice: 'Health Assessments • Vital Monitoring • Clinical Reviews',
      experienceYears: 12,
      bio: 'Evans oversees clinical home assessments, coordinating tailored physician-aligned care plans for families and elderly individuals.',
      rating: 5.0,
      totalVisits: 215,
      photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'prof-4',
      fullName: 'Grace Wanjiku, PT',
      title: 'Physiotherapist',
      roleTitle: 'Home Physical & Mobility Rehabilitation Specialist',
      qualifications: 'BSc Physiotherapy, Orthopedic Rehabilitation Certified',
      areasOfPractice: 'Post-Stroke Rehab • Mobility Enhancement • Fall Prevention',
      experienceYears: 8,
      bio: 'Grace is dedicated to helping homebound patients regain independence, functional strength, and confident movement safely within their homes.',
      rating: 4.97,
      totalVisits: 130,
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    },
  ];

  const specialties = ['ALL', 'HOME NURSING', 'ELDERLY CARE', 'POST-SURGERY', 'REHABILITATION'];

  const filteredStaff = defaultStaff.filter((prof) => {
    const matchesSearch =
      prof.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.areasOfPractice.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === 'ALL' ||
      prof.areasOfPractice.toUpperCase().includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-label">CLINICAL PRACTITIONERS / DIRECTORY</div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-display-massive text-white tracking-tight">
          Licensed Healthcare Professionals.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Every clinician at KomfoCare is fully verified with the relevant statutory licensing bodies, holding clinical background certifications and specialized home healthcare training.
        </p>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center flex-wrap gap-2">
          {specialties.map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 border ${
                selectedSpecialty === spec
                  ? 'bg-komfo-600 text-white border-komfo-400 shadow-glow font-bold'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
          <input
            type="text"
            placeholder="Search by name, discipline..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-komfo-400"
          />
        </div>
      </div>

      {/* Clinicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStaff.map((prof) => (
          <div
            key={prof.id}
            className="group rounded-3xl overflow-hidden glass-card p-6 sm:p-8 space-y-6 flex flex-col justify-between border border-white/15 hover:border-komfo-400/60 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="flex items-start gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/15 flex-shrink-0">
                <img
                  src={prof.photoUrl}
                  alt={prof.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-komfo-300 transition-colors">
                    {prof.fullName}
                  </h3>
                </div>
                <p className="text-xs text-amber-400 font-mono">{prof.roleTitle}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{prof.rating}</span>
                  <span className="text-[11px] font-mono text-slate-400">({prof.totalVisits} visits • {prof.experienceYears} yrs exp)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {prof.bio}
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-slate-300 text-[11px]">
                {prof.qualifications}
              </div>
              <p className="text-[11px] text-slate-400">
                <strong className="text-amber-400">Areas: </strong>
                {prof.areasOfPractice}
              </p>
            </div>

            <Link
              to="/book-care"
              className="w-full py-3 rounded-full bg-gradient-to-r from-komfo-600 to-indigo-600 hover:from-komfo-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider text-center shadow-glow transition-all block flex items-center justify-center gap-1.5"
            >
              <span>Schedule Home Visit with Clinician</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
