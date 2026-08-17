# KOMFOCARE HOME-BASED SERVICES — Compassionate Care. Right at Home.

> "We come to you, so you can stay where you feel safe."
> **Professional care. Personal touch. Peace of mind.**

🔗 **Live Site**: [https://frontend-eight-sand-81.vercel.app](https://frontend-eight-sand-81.vercel.app)

KOMFOCARE HOME-BASED SERVICES connects licensed registered nurses, geriatric specialists, and clinical practitioners with families in Nairobi, Kenya, delivering personalized, hospital-grade home healthcare.

---

## 📋 Company & Founder Overview

- **Company**: KOMFOCARE HOME-BASED SERVICES
- **Founder**: OBIERO SHANICE AUMA
- **Phone / Helpline**: `0792004232`
- **Primary Booking Email**: `komfocare@gmail.com`
- **Founder Email**: `obieroshanice@gmail.com`
- **Location**: Nairobi, Kenya
- **Website**: [https://frontend-eight-sand-81.vercel.app](https://frontend-eight-sand-81.vercel.app)
- **Socials**: Facebook (`KomfoCare`), Instagram (`@KomfoCare`), Twitter/X (`@KomfoCare`)
- **Tagline**: *"Compassionate care. Right at home."*
- **Core Promise**: *"We bring quality care to you, so you can focus on what matters most."*

---

## 🌟 8 Detailed Clinical Care Disciplines

1. **HOME NURSING CARE** — Professional nursing care tailored to your needs.
2. **ELDERLY CARE** — Compassionate care and assistance for seniors.
3. **POST-SURGERY CARE** — Helping you heal safely and comfortably at home.
4. **MEDICATION MANAGEMENT** — Safe medication reminders and administration.
5. **PALLIATIVE CARE** — Dignified care focused on comfort and quality of life.
6. **PATIENT ESCORT SERVICES** — Assistance to and from medical appointments.
7. **VITAL SIGNS MONITORING** — Regular monitoring for your health and peace of mind.
8. **HEALTH EDUCATION** — Empowering you and your family with health knowledge.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS (with Dark/Light theme toggle persistence), Lucide React
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, JWT Authentication, Zod, Helmet, Morgan
- **Database**: PostgreSQL (Production / Railway-ready) with dynamic fallback
- **Deployment**: Railway (Backend + PostgreSQL) & Vercel / Netlify (Frontend)

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
EMERGENCY_HOTLINE="0792004232"
SUPPORT_EMAIL="komfocare@gmail.com"
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

The login interface (`/login`) includes **1-Click Test Accounts** for immediate testing:
- **Admin**: Clinical Operations Center
- **Nurse Lead**: Clinician Care Desk & Visit Documentation
- **Patient**: Patient Portal & Vital Signs Tracking

---

## 📄 License
ISC License © 2026 KOMFOCARE HOME-BASED SERVICES
