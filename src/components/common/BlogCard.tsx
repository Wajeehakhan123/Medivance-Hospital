import React from 'react';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onReadMore }) => {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-blue-300">
      {/* Cover Image */}
      <div
        className="relative h-48 bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => onReadMore(post)}
      >
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md bg-blue-600/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readTime}
            </span>
          </div>

          <h3
            onClick={() => onReadMore(post)}
            className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer"
          >
            {post.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {post.shortDescription}
          </p>
        </div>

        {/* Author Doctor & Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.authorImage}
              alt={post.authorDoctorName}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <div className="text-[11px]">
              <p className="font-semibold text-slate-900 leading-tight">{post.authorDoctorName}</p>
              <p className="text-slate-500 leading-tight">{post.authorSpecialty}</p>
            </div>
          </div>

          <button
            onClick={() => onReadMore(post)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group/btn cursor-pointer"
          >
            <span>Read More</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
