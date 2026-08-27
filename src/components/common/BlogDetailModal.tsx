import React from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogDetailModalProps {
  article: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onBookWithDoctor?: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  article,
  isOpen,
  onClose,
  onBookWithDoctor
}) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Image & Header */}
        <div className="relative h-56 sm:h-64 bg-slate-900 overflow-hidden shrink-0">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Metadata */}
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-2">
            <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight">{article.title}</h2>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Author Badge */}
          <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={article.authorImage}
                alt={article.authorDoctorName}
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <div>
                <p className="text-xs text-blue-950 font-bold">Medically Reviewed by {article.authorDoctorName}</p>
                <p className="text-[11px] text-blue-700">{article.authorSpecialty} • Medivance Hospital</p>
              </div>
            </div>

            {onBookWithDoctor && (
              <button
                onClick={() => {
                  onClose();
                  onBookWithDoctor();
                }}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Consult Specialist</span>
              </button>
            )}
          </div>

          {/* Intro Paragraph */}
          <p className="text-base text-slate-700 font-medium leading-relaxed border-l-4 border-blue-600 pl-4 py-1">
            {article.content.intro}
          </p>

          {/* Body Sections */}
          <div className="space-y-5">
            {article.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">{section.heading}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* Key Clinical Takeaways */}
          <div className="p-5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 space-y-2.5">
            <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Health Takeaways</span>
            </h4>
            <ul className="space-y-2 text-xs text-emerald-900">
              {article.content.keyTakeaways.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium">Tags:</span>
            {article.tags.map((t, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-500">
            Educational material published by Medivance Clinical Editorial Board.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
