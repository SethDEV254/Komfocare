import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Award, MapPin, Calendar, Heart, Search } from 'lucide-react';
import { HealthcareProfessional } from '../../types';
import { apiClient } from '../../api/client';

export const ProfessionalsPage: React.FC = () => {
  const [professionals, setProfessionals] = useState<HealthcareProfessional[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const defaultStaff = [
    {
      id: 'prof-1',
      fullName: 'Nurse Sarah Ombati, RN',
      title: 'Nurse',
      roleTitle: 'Senior Home Care Lead & Registered Nurse',
      qualifications: 'BSc Nursing (UoN), BLS Certified, Geriatric Specialist',
      areasOfPractice: 'Home Nursing • Elderly Care • Chronic Disease Management',
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
      qualifications: 'Higher Dip Critical Care, Certified Wound Specialist (CWS)',
      areasOfPractice: 'Post-Surgery Care • Complex Wound Dressing • IV Therapy',
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
      areasOfPractice: 'Comprehensive Health Assessments • Vital Monitoring • Clinical Reviews',
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
      rating: 4.92,
      totalVisits: 110,
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    },
  ];

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await apiClient<{ success: boolean; data: HealthcareProfessional[] }>('/professionals/public');
        if (res.success && res.data.length > 0) {
          setProfessionals(res.data);
        }
      } catch {
        // use fallback
      }
    };
    fetchStaff();
  }, []);

  const displayStaff = professionals.length > 0 ? professionals : (defaultStaff as any);

  const filteredStaff = displayStaff.filter((p: any) => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.areasOfPractice.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
          Our Clinical Team
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-navy-900 tracking-tight">
          Qualified Healthcare Professionals
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Every clinician visiting your home is vetted, licensed, and trained to provide compassionate, clinically sound care.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative pt-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-7" />
          <input
            type="text"
            placeholder="Search by clinician name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-komfo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStaff.map((staff: any) => (
          <div
            key={staff.fullName}
            className="bg-white rounded-3xl p-7 border border-slate-200 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Photo & Badge */}
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={staff.photoUrl}
                  alt={staff.fullName}
                  className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-slate-100 shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-navy-900 text-base">{staff.fullName}</h3>
                  <p className="text-xs font-semibold text-komfo-600">{staff.roleTitle}</p>
                  <div className="flex items-center gap-1 text-amber-500 text-xs mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold text-slate-800">{staff.rating || '5.0'}</span>
                    <span className="text-slate-400">({staff.totalVisits || 50}+ home visits)</span>
                  </div>
                </div>
              </div>

              {/* Qualifications */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Qualifications & Credentials
                  </span>
                  <p className="text-slate-700 font-medium">{staff.qualifications}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Areas of Practice
                  </span>
                  <p className="text-komfo-700 font-semibold">{staff.areasOfPractice}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {staff.bio}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                {staff.experienceYears}+ years experience
              </span>

              <Link
                to="/book-care"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-semibold text-xs shadow-sm transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Home Visit</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
