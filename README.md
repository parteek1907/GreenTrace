# 🍃 GreenTrace — Environmental Intelligence Platform

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.7-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.13.1-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**A premium, high-end environmental intelligence platform that transforms personal carbon tracking into an interactive, beautifully crafted digital experience.**

[How It Works](#-how-it-works) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Deployment](#-deployment)

</div>

---

## 📌 Project Overview

GreenTrace is a next-generation personal sustainability tracker that discards the guilt-driven, utilitarian aesthetic of traditional climate apps. Instead, it positions environmental intelligence as a premium, highly crafted experience—drawing inspiration from Apple, Arc Browser, Linear, and Spotify Wrapped.

The platform relies on three core pillars: **The Intelligence Dashboard** (a robust, Recharts-powered analytics suite tracking real-world emissions), **The Carbon Twin Simulator** (a predictive engine that models the future impact of lifestyle changes instantly), and **The Carbon Signature** (a generative, shareable artifact that turns a user's sustainability journey into a uniquely beautiful digital identity card).

---

## 🧠 How It Works

### The Core Engine

```text
User Onboarding (Profile & Baseline Emissions)
        │
        ▼
 Step 1  Carbon Calculation Engine
         Applies real-world reduction coefficients based on user activity.
         Evaluates food, transport, energy, and consumption vectors.
        │
        ▼
 Step 2  The Intelligence Dashboard
         Visualizes real-time trajectory, goal progress, and monthly
         variance via Recharts & Framer Motion.
        │
        ▼
 Step 3  Carbon Twin Simulator
         An isolated sandbox environment. Users toggle hypotheticals
         (e.g., "Switch to EV", "Go plant-based") and instantly see
         projected outcomes mapped against their baseline.
        │
        ▼
 Step 4  Actionable Recommendations
         Context-aware challenges mapped directly to the user's
         highest emission categories.
        │
        ▼
 Step 5  The Carbon Signature
         A generative, WebGL-inspired shareable card capturing the
         user's carbon grade, lifetime reduction, and avatar.
```

---

## ✨ Features

**Premium Editorial Aesthetic** — Designed with aggressive whitespace, beautiful typography (Plus Jakarta Sans), buttery-smooth Framer Motion layout transitions, and subtle topographic micro-interactions.

**Carbon Twin Simulator** — An isolated prediction engine allowing users to simulate the outcome of future lifestyle changes before they happen.

**The Carbon Signature** — A stunning, exportable digital artifact reminiscent of Spotify Wrapped or Rivian UI, designed specifically for sharing on social platforms. 

**Architectural Dual-State Routing** — A completely custom mobile viewport strategy. Desktop users get a robust sidebar-driven analytics application, while mobile users (`< 768px`) are served an exclusive, highly curated, scroll-driven storytelling experience.

**Real-Time Carbon Context** — Heavy client-side state management (`CarbonContext` & `ProfileContext`) ensuring that all toggles, simulations, and challenges instantly re-render across the entire component tree without layout shifts.

**Animated Micro-Interactions** — Soft entrance choreographies, particle systems, staggered reveals, and organic gradients using advanced CSS and Framer Motion pipelines.

**Advanced Data Visualization** — Multi-layered composed charts and animated SVG radial gauges built with Recharts, displaying monthly reduction trends, baselines, and percentile ranks.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.2.7 (App Router, Turbopack) |
| **Language** | TypeScript 5.6.3 |
| **Styling** | Tailwind CSS 3.4.17 + Vanilla CSS Variables |
| **Typography** | Plus Jakarta Sans (next/font) |
| **Icons** | Lucide React |
| **Animations** | Framer Motion 11.13.1 |
| **Charts** | Recharts 2.15.2 |
| **State Management** | React Context API |
| **Database/Auth** | Supabase (PostgreSQL) |

---

## 📁 Project Structure

```
greentrace/
├── src/
│   ├── app/
│   │   ├── globals.css                # Core design tokens & typography
│   │   ├── layout.tsx                 # Root layout + Mobile overrides
│   │   ├── page.tsx                   # Landing page
│   │   └── dashboard/                 # Dashboard route group
│   │       ├── layout.tsx             # Sidebar & Topbar container
│   │       ├── page.tsx               # Analytics overview
│   │       └── simulator/             # Carbon Twin environment
│   │
│   ├── components/
│   │   ├── charts/                    # Recharts wrappers & animated counters
│   │   ├── dashboard/                 # Interactive intelligence panels
│   │   │   ├── MobileExperience.tsx   # Exclusive mobile view
│   │   │   └── CarbonSignature/       # Generative share cards
│   │   ├── landing/                   # Hero, Features, Statistics, FAQ
│   │   └── ui/                        # Reusable buttons, icons, modals
│   │
│   └── lib/
│       ├── carbon/                    # Carbon reduction math & constants
│       ├── contexts/                  # Global state management
│       └── utils/                     # Framer motion variants, formatters
│
├── tailwind.config.ts                 # Extended theme configuration
├── next.config.ts                     # Next.js settings & HMR rules
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A [Supabase](https://supabase.com) project (for backend persistence)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/parteek1907/GreenTrace.git
cd GreenTrace

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.local.example .env.local
```

### Run Locally

```bash
# Start the development server (with host exposed for mobile testing)
npm run dev -- -H 0.0.0.0
```

Available at **http://localhost:3000**.

> **Note on Mobile Testing**: If you are testing via a local network (e.g. `192.168.x.x`), ensure your device IP is added to `allowedDevOrigins` in `next.config.ts` to allow Hot Module Replacement (HMR).

---

## 🌐 Deployment

GreenTrace is fully optimized for **Vercel**. 

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project → Import Git Repository**.
3. Next.js App Router defaults will be automatically detected.
4. Add any necessary environment variables.
5. Click **Deploy**.

---

## 👤 Author

**Parteek Garg**  
[Building practical systems](https://www.parteekgarg.in/)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Every footprint leaves a trace. Understand yours.

</div>
