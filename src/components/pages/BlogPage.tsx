import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { BlogPost, PageId } from '../../types';
import { blogData } from '../../data/blogData';
import { BlogCard } from '../common/BlogCard';

interface BlogPageProps {
  onSelectBlog: (post: BlogPost) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onSelectBlog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Cardiology', 'Orthopedics & Spine', 'Pediatrics & Neonatal', 'Oncology', 'Neurology', 'Preventive Health'];

  const filteredPosts = useMemo(() => {
    return blogData.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.authorDoctorName.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 uppercase tracking-wider">
            Medical Insights & Guidance
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Health & Medical Journal
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Evidence-based medical articles, preventive health tips, and cutting-edge clinical insights authored by Medivance Hospital physicians and surgeons.
          </p>
        </div>
      </section>

      {/* Search and Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="search-blog-input"
              placeholder="Search medical topics, symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No articles match your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Please adjust your search terms or select "All" categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onReadMore={onSelectBlog}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
