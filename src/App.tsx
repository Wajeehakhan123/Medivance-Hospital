import React, { useState, useEffect } from 'react';
import { PageId, Doctor, Department, BlogPost } from './types';
import { departmentsData } from './data/departmentsData';
import { doctorsData } from './data/doctorsData';
import { blogData } from './data/blogData';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { QuickEmergencyFloat } from './components/layout/QuickEmergencyFloat';

// Common Modals
import { AppointmentModal } from './components/common/AppointmentModal';
import { DoctorDetailModal } from './components/common/DoctorDetailModal';
import { DepartmentDetailModal } from './components/common/DepartmentDetailModal';
import { BlogDetailModal } from './components/common/BlogDetailModal';

// Pages
import { HomePage } from './components/pages/HomePage';
import { AboutUsPage } from './components/pages/AboutUsPage';
import { DepartmentsPage } from './components/pages/DepartmentsPage';
import { DoctorsPage } from './components/pages/DoctorsPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { AppointmentPage } from './components/pages/AppointmentPage';
import { EmergencyPage } from './components/pages/EmergencyPage';
import { PatientInfoPage } from './components/pages/PatientInfoPage';
import { BlogPage } from './components/pages/BlogPage';
import { ContactPage } from './components/pages/ContactPage';
import { FaqPage } from './components/pages/FaqPage';
import { LegalPage } from './components/pages/LegalPage';
import { AdminPage } from './components/pages/AdminPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [pageParams, setPageParams] = useState<{ departmentId?: string; doctorId?: string; blogId?: string }>({});

  // Modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDeptId, setBookingDeptId] = useState<string>('');
  const [bookingDocId, setBookingDocId] = useState<string>('');

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Hash-based routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home', 'about', 'departments', 'doctors', 'services',
        'appointment', 'emergency', 'patient-info', 'blog',
        'contact', 'faqs', 'privacy', 'terms', 'admin'
      ];

      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId, params?: { departmentId?: string; doctorId?: string; blogId?: string }) => {
    setCurrentPage(page);
    if (params) {
      setPageParams(params);
      if (params.departmentId) {
        const foundDept = departmentsData.find(d => d.id === params.departmentId);
        if (foundDept) setSelectedDepartment(foundDept);
      }
      if (params.doctorId) {
        const foundDoc = doctorsData.find(d => d.id === params.doctorId);
        if (foundDoc) setSelectedDoctor(foundDoc);
      }
      if (params.blogId) {
        const foundBlog = blogData.find(b => b.id === params.blogId);
        if (foundBlog) setSelectedBlog(foundBlog);
      }
    }
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingModal = (deptId = '', docId = '') => {
    setBookingDeptId(deptId);
    setBookingDocId(docId);
    setIsBookingModalOpen(true);
  };

  const handleDoctorAppointmentFromModal = (docId: string, deptId: string) => {
    handleOpenBookingModal(deptId, docId);
  };

  const handleDepartmentAppointmentFromModal = (deptId: string) => {
    handleOpenBookingModal(deptId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans selection:bg-blue-600 selection:text-white">
      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onSelectDoctor={(doc) => setSelectedDoctor(doc)}
            onSelectDepartment={(dept) => setSelectedDepartment(dept)}
            onSelectBlog={(blog) => setSelectedBlog(blog)}
          />
        )}

        {currentPage === 'about' && (
          <AboutUsPage
            onNavigate={handleNavigate}
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        )}

        {currentPage === 'departments' && (
          <DepartmentsPage
            onSelectDepartment={(dept) => setSelectedDepartment(dept)}
            onOpenBookingModal={(deptId) => handleOpenBookingModal(deptId)}
          />
        )}

        {currentPage === 'doctors' && (
          <DoctorsPage
            onSelectDoctor={(doc) => setSelectedDoctor(doc)}
            onOpenBookingModal={(deptId, docId) => handleOpenBookingModal(deptId, docId)}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onOpenBookingModal={(deptId) => handleOpenBookingModal(deptId)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'appointment' && (
          <AppointmentPage
            initialDepartmentId={pageParams.departmentId}
            initialDoctorId={pageParams.doctorId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'emergency' && (
          <EmergencyPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'patient-info' && (
          <PatientInfoPage
            onNavigate={handleNavigate}
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            onSelectBlog={(blog) => setSelectedBlog(blog)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        )}

        {currentPage === 'faqs' && (
          <FaqPage
            onNavigate={handleNavigate}
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        )}

        {currentPage === 'privacy' && (
          <LegalPage
            type="privacy"
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'terms' && (
          <LegalPage
            type="terms"
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Quick Emergency & Booking Floating Action Widget */}
      <QuickEmergencyFloat
        onNavigate={handleNavigate}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Global Modals */}
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialDepartmentId={bookingDeptId}
        initialDoctorId={bookingDocId}
      />

      <DoctorDetailModal
        doctor={selectedDoctor}
        isOpen={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBookAppointment={handleDoctorAppointmentFromModal}
      />

      <DepartmentDetailModal
        department={selectedDepartment}
        isOpen={!!selectedDepartment}
        onClose={() => setSelectedDepartment(null)}
        onBookDepartment={handleDepartmentAppointmentFromModal}
        onSelectDoctor={(doc) => {
          setSelectedDepartment(null);
          setSelectedDoctor(doc);
        }}
      />

      <BlogDetailModal
        article={selectedBlog}
        isOpen={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        onBookWithDoctor={() => {
          if (selectedBlog?.authorDoctorId) {
            handleOpenBookingModal('', selectedBlog.authorDoctorId);
          } else {
            handleOpenBookingModal();
          }
        }}
      />
    </div>
  );
}

export default App;
