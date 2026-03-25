# Smile Connect Nepal

A modern landing page for a dental clinic built with React, Vite, Tailwind CSS, Radix UI, and Shadcn components.

## 🚀 Features

- Multi-section landing page (hero, services, team, results, booking, map, testimonials)
- Light/dark theme toggle with `next-themes`
- English / Nepali language toggle
- Animated UI using `framer-motion`
- Booking form with Nepali phone validation
- Smooth section scrolling and responsive navbar
- Toaster notifications (`sonner`) and structured UI primitives (`@radix-ui`)

## 🧩 Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI + Shadcn components
- React Router
- TanStack Query
- Framer Motion
- Sonner Toast

## 🏁 Getting Started

Clone repository:

```bash
git clone https://github.com/<your-org>/smile-connect-nepal-main.git
cd smile-connect-nepal-main
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open in browser:

- `http://localhost:5173`

## 🛠️ Scripts

- `npm run dev`: Start dev server
- `npm run build`: Build production bundle
- `npm run preview`: Preview built site
- `npm run lint`: Run ESLint
- `npm run test`: Run Vitest once
- `npm run test:watch`: Watch mode tests

## ✅ Project Structure

- `src/App.tsx`: App root + providers + router
- `src/pages/Index.tsx`: main landing page composition
- `src/components`: UI sections + widget components
- `src/components/ui`: Shadcn/Radix UI component primitives
- `src/hooks/useLanguage.ts`: translation context + toggle
- `src/hooks/useTheme.ts`: theme providers

## 🧪 Testing

Run tests:

```bash
npm run test
```

Add tests in `src/test`.

## 📦 Build and deploy

Build:

```bash
npm run build
```

Preview production output:

```bash
npm run preview
```

Deploy the `dist/` folder to Netlify, Vercel, GitHub Pages, or your preferred host.

## 🔧 Enhancements

- Connect `BookingForm` to a backend API endpoint
- Add full i18n support with `react-i18next`
- Add form validation using `react-hook-form` + `zod`
- Add E2E tests via Playwright

## ℹ️ Notes

- `npm audit` shows some vulnerabilities; run `npm audit fix` as needed

---

Enjoy building, and feel free to ask to add any feature or fix to this project!
