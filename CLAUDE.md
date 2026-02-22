# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bolna AI dashboard — a Next.js frontend for a voice AI agent platform. Currently contains the agent setup/configuration page with sidebar navigation.

## Commands

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint
```

No test framework is configured yet.

## Architecture

### Tech Stack
- **Next.js 16.1.6** with Turbopack, React 19.2.3, TypeScript
- **Tailwind CSS v4** with `@tailwindcss/postcss` — uses `@theme inline` and CSS custom properties (oklch color space)
- **shadcn/ui** — style: `radix-mira`, icon library: `hugeicons`, base color: `neutral`
- **framer-motion** for animations (AnimatePresence, motion.div, layoutId)
- **next-themes** for dark/light mode (class-based)
- **pnpm** as package manager

### Routing Structure
```
app/
├── layout.tsx              # Root layout (fonts, ThemeProvider)
├── page.tsx                # Landing page
└── dashboard/
    ├── layout.tsx          # Dashboard shell (sidebar + content area)
    ├── page.tsx            # Redirects to /dashboard/agent-setup
    └── agent-setup/
        └── page.tsx        # Agent configuration page
```

### Layout Pattern
The dashboard uses a locked viewport layout — `SidebarProvider` is constrained to `h-svh` with `overflow-hidden`. Content scrolls only inside the inner content div, never the outer shell. This prevents nested scrollbars.

The sidebar uses `variant="inset"` + `collapsible="icon"` which provides the rounded container visual (`rounded-xl m-2 ml-0 shadow-sm`) on `lg+` breakpoints.

### Component Organization
```
components/
├── ui/                     # shadcn primitives (do NOT customize these)
├── agent-setup/            # Agent setup page components
│   ├── agent-header.tsx    # Title row, action buttons, agent selector, cost breakdown
│   ├── agent-tabs.tsx      # Tab navigation (LLM, Voice, Audio, Engine, etc.)
│   ├── agent-config-tab.tsx# Configuration form with provider/model selects
│   ├── cost-breakdown.tsx  # Cost per minute bar visualization
│   ├── import-agent-dialog.tsx
│   └── new-agent-dialog.tsx
└── dashboard/              # Sidebar, nav components
    ├── app-sidebar.tsx     # Sidebar shell with logo, nav groups, user menu
    ├── nav-main.tsx        # Navigation items renderer
    ├── nav-user.tsx        # User avatar + dropdown
    └── sidebar-items.ts    # Navigation data (platformItems, teamItems)
```

### Key Conventions

- **Mobile breakpoint is 1024px** — `useIsMobile()` in `hooks/use-mobile.ts` uses `MOBILE_BREAKPOINT = 1024`, not the default 768px. Below 1024px the sidebar renders as a Sheet overlay.
- **Path alias**: `@/*` maps to `./*` (project root)
- **Fonts**: DM Sans (`--font-sans`) for body, Geist Sans/Mono for code
- **Icons**: Use `@hugeicons/react` with `@hugeicons/core-free-icons`. Pattern: `<HugeiconsIcon icon={SomeIcon} strokeWidth={2} />`
- **Do not customize shadcn button variants** with inline responsive overrides. Use the built-in `size` and `variant` props. For responsive visibility, wrap buttons in containers with `hidden sm:contents` or use `hidden sm:inline-flex` on the button itself.
- **CSS utilities**: `scrollbar-hide` and `no-scrollbar` classes are defined in `globals.css` for hiding scrollbars.
- **Reduced motion**: Global `prefers-reduced-motion` media query is in `globals.css`.
