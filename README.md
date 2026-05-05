# Dukaan Pro

**Shop management PWA for Pakistani kirana store owners.**

Built with Next.js 16, shadcn/ui, TypeScript, and Bun. Uses the default shadcn/ui theme system — swap any theme from [tweakcn.com](https://tweakcn.com/) and the app adapts automatically.

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 (strict) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (New York style, zinc base) |
| Auth | NextAuth v5 — Credentials (email + password) |
| Data Fetching | TanStack Query v5 |
| Forms | TanStack Form + Zod |
| Tables | TanStack Table |
| State | Zustand (UI), Nuqs (URL) |
| Linting | OxLint + Oxfmt |
| Package Manager | Bun |

## Color System

Uses shadcn/ui semantic color tokens — no hardcoded hex values. The active theme determines actual colors.

```
bg-primary / text-primary          — CTAs, success states
bg-destructive / text-destructive  — danger, debt amounts
bg-background                      — page background
bg-card                            — card surfaces
bg-muted                           — secondary surfaces
text-muted-foreground              — secondary text
border-border                      — borders and dividers
```

Change the theme in `src/app/layout.tsx` (the `data-theme` attribute) or use any [tweakcn](https://tweakcn.com/) theme — all components adapt via CSS variables.

## App Screens

```
Auth:       A1 Sign in · A2 Sign up · A4 Success · A5 Forgot · A6 Reset
Mobile:     M1 Dashboard · M2 New sale · M3 Confirmation · M4 Inventory
            M5 Add product · M6 Purchase · M7 Udhaar · M8 Customer · M9 Reports
Desktop:    D1 Sign in (split) · D2 Dashboard · D3 POS · D4 Inventory table
            D5 Udhaar dashboard · D6 Reports
```

## Getting Started

```bash
bun install
cp env.example.txt .env.local
# Fill in AUTH_SECRET and any other required vars
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Dev credentials:** `admin@example.com` / `password123`

## Project Structure

```
src/
├── app/
│   ├── auth/          # Auth pages (sign-in, sign-up, success, forgot, reset)
│   └── dashboard/     # Protected app pages
├── features/          # Feature modules (auth, inventory, sales, udhaar, ...)
│   └── <name>/
│       ├── api/       # types.ts → service.ts → queries.ts
│       └── components/
├── components/
│   ├── ui/            # shadcn/ui primitives — never modify directly
│   ├── layout/        # AppSidebar, BottomNav, Header
│   └── icons.tsx      # Only icon source — import { Icons } from here
└── styles/
    └── themes/        # CSS theme files
```

## Commands

```bash
bun run dev      # Start dev server
bun run build    # Production build
bun run lint     # OxLint check
```
