import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, User, ArrowRight, Search, Tag } from 'lucide-react';
import { HealthResource } from '../../types';
import { apiClient } from '../../api/client';
import { formatDate } from '../../utils/formatters';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<HealthResource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const defaultArticles: HealthResource[] = [
    {
      id: 'res-1',
      slug: 'preparing-home-for-post-surgery-recovery',
      title: 'How to Prepare Your Home for Smooth Post-Surgery Recovery',
      excerpt: 'Essential practical steps and safety modifications to ensure a comfortable, safe, and complication-free recovery at home after hospital discharge.',
      content: 'Returning home after surgery is a comforting milestone...',
      category: 'Recovery',
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
      category: 'Preventive Healthcare',
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
      excerpt: 'Practical advice on supporting senior family members with daily routines while respecting their dignity and autonomy.',
      content: 'As our parents age, finding the balance between keeping them safe...',
      category: 'Elderly Care',
      readTimeMinutes: 6,
      featuredImage: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
      authorName: 'Mary Achieng',
      authorRole: 'Palliative Care Specialist',
      isPublished: true,
      publishedAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await apiClient<{ success: boolean; data: HealthResource[] }>('/resources');
        if (res.success && res.data.length > 0) {
          setResources(res.data);
        }
      } catch {
        // fallback
      }
    };
    fetchResources();
  }, []);

  const displayList = resources.length > 0 ? resources : defaultArticles;

  const categories = ['All', 'Recovery', 'Preventive Healthcare', 'Elderly Care', 'Medication Adherence', 'Home Care'];

  const filtered = displayList.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-komfo-600">
          Health & Wellness Insights
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-navy-900 tracking-tight">
          Health Resources & Caregiver Guides
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Clinically guided articles and practical resources written by our healthcare team to support your family's health journey.
        </p>

        {/* Categories */}
        <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((article) => (
          <div
            key={article.slug}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden bg-slate-100 relative">
                <img
                  src={article.featuredImage || 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800'}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                  {article.category}
                </span>
              </div>

              {/* Text */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-komfo-600" />
                    <span>{article.readTimeMinutes} min read</span>
                  </span>
                  <span>•</span>
                  <span>{formatDate(article.publishedAt)}</span>
                </div>

                <h3 className="text-lg font-bold text-navy-900 group-hover:text-komfo-700 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-[11px] font-semibold text-slate-500">
                {article.authorName}
              </span>

              <Link
                to={`/resources/${article.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-komfo-600 hover:text-komfo-700 hover:underline"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
