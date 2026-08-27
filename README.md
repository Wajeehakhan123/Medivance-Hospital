# 🏥 Medivance Hospital

A modern hospital management and appointment booking platform built with React, TypeScript, Tailwind CSS, and Supabase.

Medivance Hospital provides patients with an easy way to explore hospital departments, doctors, medical services, and book appointments online. The platform also includes an admin portal for managing appointment records.

## ✨ Features

### 👨‍⚕️ Patient Features

* Browse hospital departments
* Explore medical services
* View doctor profiles
* Search and filter doctors
* Book appointments online
* Dynamic doctor selection by department
* Appointment form validation
* Appointment reference number
* Printable appointment receipt
* Download appointment voucher
* Emergency care information
* Medical health blog
* FAQs and patient information
* Fully responsive design

### 🔐 Admin Features

* Admin login and registration
* Single administrator registration slot
* View all appointments
* Search patient bookings
* Filter appointments by status, department, and date
* Update appointment status
* View complete appointment details
* Daily clinic schedule
* Export bookings to CSV
* Print appointment information

### ☁️ Backend

The application is connected to Supabase for database functionality.

Appointment information submitted through the booking form is stored in the Supabase PostgreSQL database.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd medivance-hospital
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add your Supabase configuration:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

Do not upload your `.env` file or private credentials to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL shown in your terminal.

## 🗄️ Database

The project uses Supabase PostgreSQL to store appointment information.

The appointment system supports information including:

* Patient name
* Email
* Phone
* Date of birth
* Gender
* Department
* Doctor
* Appointment date
* Appointment time
* Appointment type
* Reason for visit
* Additional message
* Appointment status
* Reference number
* Created date

## 📱 Responsive Design

Medivance Hospital is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📲 Tablet

The interface uses a clean medical design system with blue, white, light blue, and soft gray tones.

## 🔒 Security

The project uses Supabase authentication and Row Level Security policies for database access.

Never expose private API keys, service-role keys, passwords, or other sensitive credentials in the frontend or GitHub repository.

##  Main Sections

* Home
* About Us
* Departments
* Doctors
* Medical Services
* Appointment Booking
* Emergency Services
* Medical Blog
* Contact
* FAQs
* Admin Portal

## 🎯 Project Goal

The goal of Medivance Hospital is to demonstrate how a modern healthcare platform can combine a responsive frontend, online appointment booking, database integration, and administrative management into one application.

## 🔮 Future Improvements

Possible future features include:

* Email appointment notifications
* SMS reminders
* Patient accounts
* Doctor dashboard
* Online payments
* Prescription management
* Patient medical records
* Advanced analytics dashboard

