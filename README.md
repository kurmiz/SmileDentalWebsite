# Smile Connect Nepal 🦷

A modern, high-conversion, full-stack web application designed for a dental clinic in Butwal, Nepal. Features a public-facing landing page for lead generation and a premium, authenticated administrative dashboard for managing appointments.

## 🚀 Key Features

*   **Public Landing Page**: Multi-section, responsive design (Hero, Services, Doctors/Team, Before & After Slider, Map, Testimonials).
*   **Booking System:** Custom form validation (specifically for 10-digit Nepali phone numbers starting with 98, 97, or 96) driving high-quality inbound leads.
*   **i18n & Theming:** English / Nepali language toggle (`LanguageContext`) and Light/Dark theme toggle (`next-themes`).
*   **Premium Admin Dashboard:** Split-screen authenticated login and a professional dashboard utilizing Shadcn UI components for premium grid alignments and fluid table interaction. Includes dynamic status filters.
*   **Animations:** Smooth entrance bounding and interaction animations via `framer-motion`.
*   **Toaster Notifications:** Clean responsive user alerts using `sonner`.

## 🧩 Tech Stack

### Frontend (User & Admin UI)
*   **Frameworks:** React 18, TypeScript, Vite
*   **Styling:** Tailwind CSS, PostCSS
*   **UI Primitives:** Radix UI + Shadcn UI components
*   **Routing:** React Router DOM
*   **Data Fetching:** TanStack Query v5 (React Query)
*   **Animations:** Framer Motion

### Backend (API & Database)
*   **Runtime:** Node.js, Express.js
*   **Database:** MongoDB via Mongoose ORM
*   **Security:** Helmet, CORS (Strict Origin Checking), Express-Rate-Limit
*   **Environment Data:** Dotenv

---

## 🏁 Getting Started (Local Development)

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. You will also need access to a MongoDB cluster (e.g., MongoDB Atlas) to save booking data.

### 2. Clone the Repository
```bash
git clone https://github.com/<your-org>/smile-connect-nepal-main.git
cd smile-connect-nepal-main
```

### 3. Backend Setup
The backend is an Express server running natively on port `5000` connected to MongoDB.

```bash
cd server
npm install
```

**Environment Variables (`server/.env`):**
Create a `.env` file in the `server` directory if one does not exist:
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.../smile_dental?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:5175,http://localhost:5173,http://localhost:8081,http://localhost:8082
ADMIN_API_KEY=smile-connect-admin-2024-secure-key
RATE_LIMIT=30
```

Start the backend server:
```bash
npm run dev
```

### 4. Frontend Setup
Open a new terminal session in the root of the project to spawn the Vite UI.

```bash
# From the root directory
npm install
```

**Environment Variables (`.env.local`):**
Create a `.env.local` in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_PASSWORD=admin123
VITE_ADMIN_API_KEY=smile-connect-admin-2024-secure-key
```

Start the Vite development server:
```bash
npm run dev
```

> The application UI will typically start running on `http://localhost:8081` or `http://localhost:5173`.

---

## 🛠️ Accessing the Admin Panel

1. Navigate to your local route path at `/admin/login` in the browser.
2. Enter the strict administrator credentials configured in your `VITE_ADMIN_PASSWORD` (default in dev: `admin123`).
3. View the premium dashboard interface on `/admin/dashboard` to manage, edit, filter, and export patient appointment requests to a formatted CSV file.

## ✅ Project Structure Overview

*   `server/`: Isolated express backend API logic (`server.js`, `controllers/`, `models/`, `routes/`).
*   `src/App.tsx`: App root providers (QueryClient, Toasters) and UI routing module.
*   `src/pages/Index.tsx`: Main public landing page composite handling the entire single-page view.
*   `src/pages/admin/`: Admin Authentication mechanism and dynamic Dashboard UI modules.
*   `src/components/`: Modular reusable React components (Navbar, Services, BookingForm, Doctors).
*   `src/components/ui/`: Shadcn and Radix UI localized primitives (`Table`, `Card`, `Button`, `Dialog` etc.).
*   `src/hooks/`: Custom state management controllers (`useLanguage.ts`, `useTheme.ts`).

## 🧪 Testing

```bash
# Run the Vitest test suite once
npm run test

# Execute test suite within watcher mode
npm run test:watch
```
*Note: Add unit tests logic inside the matching testing files in `src/test/` to increase overall coverage constraints.*

## 📦 Build and Deploy

For production, compile the frontend payload while hosting a continuous instance of the Node.js backend. 

```bash
# Build the production bundle for the frontend into the /dist folder
npm run build

# Preview the built frontend architecture locally
npm run preview
```

**Deployment Strategy**: 
1. Build and deploy the `server/` directory code onto a Node.js compatible system host like **Render**, **Heroku**, or **DigitalOcean Apps**. 
2. Change the `VITE_API_URL` environment variable for your frontend platform to reference the new live API endpoint.
3. Deploy the compiled root Vite project payload to **Vercel**, **Netlify**, or standard **GitHub pages**.

## 🔧 Future Enhancements

*   **Security Architecture:** Migrate the simplistic API key/Local Storage token checks on the Admin panel towards a fully established JSON Web Token (JWT) + rigorous hashing model backend mechanism.
*   **Validation Hardening:** Safely integrate `zod` schema parsers in conjunction with `react-hook-form` logic to drastically maximize client-side form validation metrics alongside improved UX accessibility indicators.
*   **Automated E2E Checkpoints:** Construct End-To-End browser testing mechanisms utilizing `Playwright` allowing CI/CD checkpoints to emulate and test the critical appointment booking funnel.
*   **CMS Capabilities:** Move standard text nodes like "Services" and "Doctors Profiles" out of array/constant files into an independent MongoDB Schema setup for unrestricted dynamic data-entry via the newly created Admin Panel.
