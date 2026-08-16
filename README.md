# KomfoCare — Compassionate Care, Right at Home

> A modern, full-stack home-based healthcare platform connecting licensed clinicians, registered nurses, and caregivers with patients in need of personalized clinical and supportive home care.

---

## 🌟 Overview & Features

### 1. Patient & Public Experience
- **Interactive Multi-Step Booking Wizard**: 8-step intake flow with real-time reference generation (`KC-2026-XXXX`).
- **Live Status Tracker**: Real-time progress monitoring (`Requested` → `Pending Review` → `Assessment` → `Confirmed` → `Assigned` → `In Progress` → `Completed`).
- **8 Dedicated Clinical Service Catalog Pages**:
  - *Home Nursing Care*
  - *Elderly Care*
  - *Post-Surgery Care*
  - *Medication Management*
  - *Palliative Care*
  - *Patient Escort*
  - *Vital Signs Monitoring*
  - *Health Education*
- **Clinicians Directory**: Verified profiles with specialties, qualifications, experience, and direct booking triggers.
- **Health Resources / Blog**: Filterable clinical guidance articles with estimated reading time.
- **Service Area Coverage**: Nairobi metropolitan coverage points and regional availability indicator.
- **Safety Compliance**: Explicit non-alarmist medical disclaimers and emergency hotline banner.

### 2. Role-Based Portals
- **Patient Care Portal (`/dashboard/patient`)**:
  - Upcoming home visit card with clinician details
  - Interactive Vital Signs Trends Chart (BP, Heart Rate, SpO2, Blood Glucose, Temperature)
  - Active personalized Care Plan and emergency contacts
- **Clinician Care Desk (`/dashboard/professional`)**:
  - Assigned home visits schedule & patient location directions
  - "Record Visit Documentation" modal for clinical observations, administered care, and vitals recording
- **Clinical Operations Center (`/dashboard/admin`)**:
  - KPI operational dashboard (Active visits, revenue, pending requests, patient registry)
  - Service Requests Pipeline with interactive status transitions

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Framer Motion
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, JWT Authentication, Zod, Helmet, Morgan
- **Database**: PostgreSQL (Production / Railway-ready) with seamless fallback
- **Deployment**: Railway (Backend + PostgreSQL) & Vercel / Netlify / Railway (Frontend)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/SethDEV254/Komfocare.git
cd Komfocare

# Install dependencies in both frontend and backend
npm install --prefix frontend
npm install --prefix backend
```

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/komfocare?schema=public"
JWT_SECRET="komfocare_jwt_secret_key_change_in_production_2026_super_secure"
JWT_REFRESH_SECRET="komfocare_jwt_refresh_secret_key_2026_super_secure"
JWT_EXPIRES_IN="1d"
JWT_REFRESH_EXPIRES_IN="7d"
EMERGENCY_HOTLINE="+254 700 000 000"
SUPPORT_EMAIL="care@komfocare.com"
```

### 3. Run Development Servers
```bash
# Start frontend dev server
npm run dev --prefix frontend

# Start backend dev server
npm run dev --prefix backend
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Demo Logins

The login interface (`/login`) includes **1-Click Test Accounts** for immediate testing without manual signups:
- **Admin**: Clinical Operations Center
- **Nurse Lead**: Clinician Care Desk & Visit Documentation
- **Patient**: Patient Portal & Vital Signs Tracking

---

## 🚢 Railway Deployment Guide

1. Create a new project on [Railway](https://railway.app).
2. Provision a **PostgreSQL** database plugin.
3. Connect this repository and set root directory to `backend`.
4. Add environment variables in Railway dashboard:
   - `DATABASE_URL` (linked automatically from Railway Postgres)
   - `JWT_SECRET`, `JWT_REFRESH_SECRET`, `FRONTEND_URL`
5. Railway will automatically detect `Procfile` / `railway.json` and deploy.

---

## 📄 License
ISC License © 2026 KomfoCare Team
