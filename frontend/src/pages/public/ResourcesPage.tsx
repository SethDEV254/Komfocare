import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, User, ArrowUpRight, Search } from 'lucide-react';
import { HealthResource } from '../../types';
import { apiClient } from '../../api/client';
import { formatDate } from '../../utils/formatters';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<HealthResource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const defaultArticles: HealthResource[] = [
    {
      id: 'res-1',
      slug: 'preparing-home-for-post-surgery-recovery',
      title: 'How to Prepare Your Home for Smooth Post-Surgery Recovery',
      excerpt: 'Essential practical steps and safety modifications to ensure a comfortable, safe, and complication-free recovery at home after hospital discharge.',
      content: 'Returning home after surgery is a comforting milestone...',
      category: 'RECOVERY',
      readTimeMinutes: 5,
      featuredImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      authorName: 'Dr. Evans Mwangi, CO',
      authorRole: 'Clinical Operations Lead',
      isPublished: true,
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'res-2',
      slug: 'understanding-blood-pressure-trends-at-home',
      title: 'Understanding Blood Pressure Trends: Why Regular Home Checks Matter',
      excerpt: 'Learn how consistent home vital signs monitoring helps identify hypertension patterns and protects long-term cardiovascular health.',
      content: 'Blood pressure fluctuates throughout the day...',
      category: 'PREVENTIVE CARE',
      readTimeMinutes: 4,
      featuredImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
      authorName: 'Nurse Sarah Ombati, RN',
      authorRole: 'Senior Home Care Lead',
      isPublished: true,
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'res-3',
      slug: 'supporting-elderly-loved-ones-with-dignity',
      title: 'Caring for Aging Parents: Balancing Independence and Safety',
      excerpt: 'Practical advice on supporting senior family members with daily routines while respecting their dignity, mobility autonomy, and mental health.',
      content: 'As our parents age, finding the balance between keeping them safe...',
      category: 'GERIATRIC CARE',
      readTimeMinutes: 6,
      featuredImage: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
      authorName: 'Nurse Faith Wanjiru, RN',
      authorRole: 'Geriatric Specialist',
      isPublished: true,
      publishedAt: new Date().toISOString(),
    },
  ];

  const categories = ['ALL', 'RECOVERY', 'PREVENTIVE CARE', 'GERIATRIC CARE'];

  const filteredArticles = defaultArticles.filter((item) => {
    const matchesCategory =
      selectedCategory === 'ALL' || item.category.toUpperCase() === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-label">CLINICAL PUBLICATIONS / ADVICE</div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-display-massive text-white tracking-tight">
          Home Health Resources & Guides.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Evidence-based healthcare articles, home caregiver guides, and post-discharge recovery tips written by our clinical nursing team.
        </p>
      </div>

      {/* Filter Chips Bar & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-komfo-600 text-white border-komfo-400 shadow-glow font-bold'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
          <input
            type="text"
            placeholder="Search guides, advice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-komfo-400"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            to={`/resources/${article.slug}`}
            className="group rounded-3xl overflow-hidden glass-card flex flex-col justify-between border border-white/15 hover:border-komfo-400/60 transition-all duration-500 hover:-translate-y-1.5"
          >
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0514] via-[#0f0514]/30 to-transparent" />
              <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-amber-300 font-bold">
                {article.category}
              </span>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between -mt-6 relative z-10">
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-display text-white group-hover:text-komfo-300 transition-colors flex items-center justify-between">
                  <span>{article.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-komfo-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
                </h3>
                <p className="text-xs text-slate-300/80 leading-relaxed font-sans line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>By {article.authorName}</span>
                <span className="text-amber-400">{article.readTimeMinutes} Min Read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
