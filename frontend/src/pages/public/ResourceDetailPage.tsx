import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, ArrowLeft, Share2, Calendar, ShieldCheck, Heart } from 'lucide-react';
import { HealthResource } from '../../types';
import { apiClient } from '../../api/client';
import { formatDate } from '../../utils/formatters';

export const ResourceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<HealthResource | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fallbackArticle: HealthResource = {
    id: 'sample',
    slug: 'preparing-home-for-post-surgery-recovery',
    title: 'How to Prepare Your Home for Smooth Post-Surgery Recovery',
    excerpt: 'Essential practical steps and safety modifications to ensure a comfortable, safe, and complication-free recovery at home after hospital discharge.',
    content: `Returning home after a major medical procedure is an important milestone. However, an unprepared home environment can introduce avoidable hazards, slow healing, and cause family anxiety.\n\n### 1. Clear Walking Corridors and Remove Fall Hazards\nTrips and falls are among the most common causes of post-operative complications. Walk through your home and remove loose throw rugs, clutter, and electrical cables from hallways and bathroom entrances.\n\n### 2. Prepare Bedside Essentials\nArrange a bedside table with essentials within arm's reach: water bottle with straw, prescribed pain medications, reading glasses, call bell/phone, and a nightlight.\n\n### 3. Arrange Professional Home Nursing Support\nHaving a licensed registered nurse visit within the first 24-48 hours after discharge ensures surgical incisions are inspected, sterile dressing changes are performed properly, and medication regimens are adhered to strictly.\n\n### 4. Coordinate Authorized Family Caregiver Roles\nAssign designated roles for medication pickup, nutrition prep, and appointment transport so that care is predictable and restful for the patient.`,
    category: 'Recovery',
    readTimeMinutes: 5,
    featuredImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    authorName: 'Dr. Evans Mwangi, CO',
    authorRole: 'Clinical Operations Lead',
    isPublished: true,
    publishedAt: new Date().toISOString(),
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await apiClient<{ success: boolean; data: HealthResource }>(`/resources/${slug}`);
        if (res.success && res.data) {
          setArticle(res.data);
        } else {
          setArticle(fallbackArticle);
        }
      } catch {
        setArticle(fallbackArticle);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <span className="w-8 h-8 border-4 border-komfo-600 border-t-transparent rounded-full inline-block animate-spin" />
        <p className="text-xs text-slate-500 mt-2 font-medium">Loading article...</p>
      </div>
    );
  }

  const current = article || fallbackArticle;

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Link
        to="/resources"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-komfo-600 hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Health Resources</span>
      </Link>

      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full bg-komfo-100 text-komfo-700 text-xs font-bold uppercase tracking-wider">
          {current.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-navy-900 tracking-tight leading-tight">
          {current.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">{current.authorName}</span>
            <span>({current.authorRole})</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-komfo-600" />
            <span>{current.readTimeMinutes} min read</span>
          </div>
          <span>•</span>
          <span>{formatDate(current.publishedAt)}</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="rounded-3xl overflow-hidden aspect-[16/9] shadow-md border border-slate-100">
        <img
          src={current.featuredImage || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'}
          alt={current.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Markdown / Content */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-subtle space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
        {current.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-bold font-display text-navy-900 pt-4">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </div>

      {/* Booking CTA Box */}
      <div className="bg-gradient-to-r from-navy-900 to-komfo-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold font-display">Need Clinical Home Care?</h3>
          <p className="text-xs text-slate-300 mt-1">
            Schedule a licensed registered nurse or clinician to visit your residence.
          </p>
        </div>
        <Link
          to="/book-care"
          className="px-6 py-3 rounded-full bg-white text-navy-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-all flex-shrink-0"
        >
          Book Home Care
        </Link>
      </div>
    </div>
  );
};
