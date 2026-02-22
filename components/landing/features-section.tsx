"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
  CallOutgoing01Icon,
  ApiIcon,
  UserGroup02Icon,
  FlowConnectionIcon,
  LanguageCircleIcon,
  ChatBotIcon,
  PuzzleIcon,
  Building01Icon,
  Shield01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring" as const, duration: 0.6, bounce: 0, delay },
})

const FEATURES: { title: string; description: string; icon: IconSvgElement }[] = [
  {
    title: "Bulk Calling at Scale",
    description: "Run campaigns with thousands of AI calls simultaneously.",
    icon: CallOutgoing01Icon,
  },
  {
    title: "Custom API Triggers",
    description: "Call external APIs in real-time during a live conversation.",
    icon: ApiIcon,
  },
  {
    title: "Human-in-the-Loop",
    description: "Transfer call to a human agent instantly when needed.",
    icon: UserGroup02Icon,
  },
  {
    title: "Workflow Integration",
    description: "Easy to integrate with n8n, Make.com, Zapier, and other tools.",
    icon: FlowConnectionIcon,
  },
  {
    title: "Multilingual",
    description: "Converse fluently in 10+ Indian and foreign languages.",
    icon: LanguageCircleIcon,
  },
  {
    title: "Natural Conversations",
    description: "Agents understand interruptions, reply with <300ms latency.",
    icon: ChatBotIcon,
  },
  {
    title: "Connect Any Model",
    description: "Integrated with 20+ ASR, LLM, and TTS models.",
    icon: PuzzleIcon,
  },
  {
    title: "Enterprise Plans",
    description: "Best-in-class pricing and Forward Deployed service.",
    icon: Building01Icon,
  },
  {
    title: "100% Data Privacy",
    description: "India / USA specific data residency, on-prem deployment.",
    icon: Shield01Icon,
  },
]

const COLS_LG = 3
const COLS_SM = 2

/* ─── Feature Card (shared between grid & carousel) ───────── */

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 size-10 rounded-xl bg-muted flex items-center justify-center">
        <HugeiconsIcon icon={feature.icon} strokeWidth={1.5} className="size-5 text-muted-foreground" />
      </div>
      <div>
        <h3 className="font-medium text-sm mb-1 text-foreground">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
      </div>
    </div>
  )
}

const CYCLE_MS = 4000

const cardCrossfade = {
  initial: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
  transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
}

/* ─── Mobile Carousel ─────────────────────────────────────── */

function MobileCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => {
      setActive((prev) => (prev + 1) % FEATURES.length)
    }, CYCLE_MS)
    return () => clearTimeout(id)
  }, [active])

  const prev = () => setActive((a) => (a - 1 + FEATURES.length) % FEATURES.length)
  const next = () => setActive((a) => (a + 1) % FEATURES.length)

  return (
    <div className="sm:hidden">
      {/* Card — static shell, content crossfades */}
      <div className="rounded-xl border border-border bg-card shadow-lg overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active} {...cardCrossfade} className="p-5">
            <FeatureCard feature={FEATURES[active]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation: arrows + dots */}
      <div className="flex items-center justify-between mt-5 px-1">
        <button
          onClick={prev}
          aria-label="Previous feature"
          className="size-8 flex items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
        </button>

        <div className="flex gap-1.5">
          {FEATURES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to ${FEATURES[i].title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-primary" : "w-1.5 bg-muted"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next feature"
          className="size-8 flex items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
        </button>
      </div>
    </div>
  )
}

/* ─── Desktop Grid ────────────────────────────────────────── */

function DesktopGrid() {
  return (
    <div className="hidden sm:block rounded-2xl border border-border overflow-hidden">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => {
          // Border logic — right border unless last in row, bottom border unless last row
          const lastRowStartSm = FEATURES.length - (FEATURES.length % COLS_SM || COLS_SM)
          const lastRowStartLg = FEATURES.length - (FEATURES.length % COLS_LG || COLS_LG)

          // SM: 2 cols — right border on even indices
          const rightBorderSm = (i + 1) % COLS_SM !== 0
          // LG: 3 cols — right border on col 0 & 1
          const rightBorderLg = (i + 1) % COLS_LG !== 0
          // Bottom borders
          const bottomBorderSm = i < lastRowStartSm
          const bottomBorderLg = i < lastRowStartLg

          return (
            <motion.div
              key={feature.title}
              {...fadeUp(0.04 * (i + 1))}
              className={[
                "p-6 sm:p-8",
                // Bottom border — responsive
                bottomBorderSm ? "border-b border-border" : "",
                !bottomBorderSm && bottomBorderLg ? "sm:border-b lg:border-b-0" : "",
                // Right border — responsive
                rightBorderSm ? "sm:border-r sm:border-r-border" : "",
                !rightBorderSm && rightBorderLg ? "lg:border-r lg:border-r-border" : "",
                rightBorderSm && !rightBorderLg ? "sm:border-r lg:border-r-0" : "",
              ].filter(Boolean).join(" ")}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Main Section ────────────────────────────────────────── */

export function FeaturesSection() {
  return (
    <section id="features" className="relative pb-10 sm:pb-14 lg:pb-16 px-4 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-10 lg:mb-12">
          <div>
            <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium tracking-wider uppercase text-muted-foreground mb-4">
              Features
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal italic tracking-tight leading-[1.1]">
              Features That Power{" "}
              <span className="block">Real Voice Agents</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
              With integrated speech, telephony, and APIs, Bolna provides everything you need
              to take your idea into secure, production-ready deployment.
            </p>
          </div>
        </motion.div>

        {/* Mobile: swipeable carousel */}
        <MobileCarousel />

        {/* Desktop: 3-col grid (2-col on sm) */}
        <DesktopGrid />
      </div>
    </section>
  )
}
