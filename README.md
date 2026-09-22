# PMPingo — Adaptive PMP 2026 Examination Engine

An adaptive, progressive web app (PWA) designed with Swiss typographic discipline for intensive PMP exam preparation.

---

## Key Features

- **Swiss Design System**: Minimalist, high-contrast, distraction-free interface with instant **Dark** and **Clear (Light)** theme modes.
- **Adaptive 28-Day Roadmap**: Curated micro-lessons and scenarios mapped directly to the official PMI Exam Content Outline (People 42%, Process 50%, Business Environment 8%).
- **Situational Assessment Engine**: One-question-at-a-time focus with pre-decision confidence calibration (`1 • Guessing` to `4 • Very confident`).
- **Instructional Debrief**: 8-point analysis explaining why the best answer succeeds, distractor failure breakdown, and reusable PMP decision rules.
- **Error Taxonomy Lab**: Systematic tracking across 15 cognitive error categories (Mindset, First/Next sequence, Agile/Predictive confusion, Premature Escalation, etc.).
- **Spaced Repetition Engine**: 5-stage Leitner box algorithm automatically prioritizing fragile knowledge and dangerous misconceptions.
- **PMI Study Hall Benchmark**: Integrated logger to calibrate external Study Hall mock exam results.
- **Progressive Web App (PWA)**: Installable on smartphones (iOS Safari & Android Chrome) with offline persistence.
- **Data Portability**: Full JSON study pack export (`EXPORT PMP PACK`) compliant with project specifications.

---

## Getting Started

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

---

## Smartphone Installation (PWA)

- **iOS (Safari)**: Tap the Share icon $\rightarrow$ **"Add to Home Screen"**.
- **Android (Chrome)**: Tap the browser menu (⋮) $\rightarrow$ **"Install app"** or tap the in-app **App** button in the header.

---

## Deployment to Vercel

1. Import this repository into [Vercel](https://vercel.com).
2. Framework Preset: **Next.js**.
3. Deploy. Zero additional configuration required.
