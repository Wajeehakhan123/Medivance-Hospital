import React, { useState, useEffect } from 'react';
import {
  Phone,
  Calendar,
  Menu,
  X,
  Shield,
  Activity
} from 'lucide-react';
import { PageId } from '../../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, params?: { departmentId?: string; doctorId?: string; blogId?: string }) => void;
  onOpenBookingModal: (preselectedDept?: string, preselectedDoc?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBookingModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'services', label: 'Medical Services' },
    { id: 'blog', label: 'Health Blog' },
    { id: 'emergency', label: 'Emergency 24/7' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'faqs', label: 'FAQs' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* Main Navbar */}
      <div className={`transition-all duration-200 ${isScrolled ? 'py-2.5 bg-white/95 backdrop-blur-md shadow-md' : 'py-3.5 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => {
              onNavigate('home');
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-sky-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="relative">
                <Shield className="w-7 h-7 text-white/90" />
                <Activity className="w-4 h-4 text-blue-100 absolute inset-0 m-auto" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">MEDIVANCE</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase tracking-wider">Hospital</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">Compassionate Care • Trusted Healthcare</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const isEmergency = item.id === 'emergency';

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isEmergency
                      ? 'text-rose-600 hover:bg-rose-50 font-semibold'
                      : isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="header-book-appointment-btn"
              onClick={() => onOpenBookingModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-sm font-semibold shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              id="mobile-book-btn"
              onClick={() => onOpenBookingModal()}
              className="flex md:hidden items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-2 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
          <div className="p-3 bg-blue-50/70 rounded-xl mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-blue-900 font-semibold">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Emergency 24/7: (555) 911-CARE</span>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('emergency');
              }}
              className="text-xs bg-rose-600 text-white px-2.5 py-1 rounded-md font-medium"
            >
              Call ER
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const isEmergency = item.id === 'emergency';

              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isEmergency
                      ? 'bg-rose-50 text-rose-700 font-semibold'
                      : isActive
                      ? 'bg-blue-100 text-blue-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              id="mobile-drawer-book-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Doctor Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
