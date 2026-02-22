"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

// ─── Types ───────────────────────────────────────────────────

interface Testimonial {
  company: string
  quote: string
  stats: { value: string; label: string }[]
  href: string
}

// ─── Data ────────────────────────────────────────────────────

const TESTIMONIALS: Testimonial[] = [
  {
    company: "Awign",
    quote:
      "Awign automated technical screening with Bolna\u2019s Voice AI \u2014 faster interviews, structured insights, and lower costs at scale.",
    stats: [
      { value: "17.1 Mins", label: "Longest Interview Duration" },
      { value: "6.8 Mins", label: "Average Interview Duration" },
    ],
    href: "#",
  },
  {
    company: "Hyreo",
    quote:
      "Hyreo improved candidate experience and reduced offer drop-offs with Bolna\u2019s 24x7 AI helpline and proactive escalations.",
    stats: [
      { value: "96.55%", label: "Call minutes growth rate" },
      { value: "10,000+", label: "Voice AI call conversations" },
    ],
    href: "#",
  },
  {
    company: "GoKwik",
    quote:
      "GoKwik scaled high-volume e-commerce conversations \u2014 cart recovery, surveys, collections \u2014 while answering real questions and sharing WhatsApp links.",
    stats: [
      { value: "4,00,000+", label: "Unique engagements" },
      { value: "250+", label: "Peak concurrent calls" },
    ],
    href: "#",
  },
  {
    company: "Hypothesis AI",
    quote:
      "Hypothesis automated thousands of recovery calls with Bolna, recovering \u20B92.5 Cr+ in revenue with 24-hour turnaround.",
    stats: [
      { value: "\u20B92.5 Cr+", label: "Revenue recovered" },
      { value: "300+", label: "SKUs live" },
    ],
    href: "#",
  },
  {
    company: "Futwork",
    quote:
      "Futwork launched a national campaign with Bolna\u2019s Voice AI \u2014 10K+ calls daily and seamless human escalations.",
    stats: [
      { value: "10K+", label: "Calls daily" },
      { value: "250+", label: "Concurrent calls" },
    ],
    href: "#",
  },
]

// ─── Animation helpers ───────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring" as const, duration: 0.6, bounce: 0, delay },
})

const VISIBLE = 3
const CYCLE_MS = 4000

// ─── Card content crossfade (shared by mobile + desktop card swap) ─

const cardCrossfade = {
  initial: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
  transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
}

// ─── Main Section ────────────────────────────────────────────

export function TestimonialsSection() {
  return (
    <section id="case-studies" className="relative py-14 sm:py-20 lg:py-24 px-4 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-10 lg:mb-12"
        >
          <div>
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium tracking-wider uppercase text-muted-foreground mb-4">
              Case Studies
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal italic tracking-tight leading-[1.1]">
              Helping Companies Scale{" "}
              <span className="block">their Call Operations</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
              Explore how top organisations leverage Bolna&apos;s Voice Agents to
              Streamline Internal Workflows, Improve Efficiency, and stay
              competitive in the age of AI.
            </p>
          </div>
        </motion.div>

        {/* Desktop: two-column layout */}
        <div className="hidden lg:grid grid-cols-[1fr_1.4fr] gap-16 items-center">
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-6">
            <CardStackController />
          </motion.div>
          <motion.div {...fadeUp(0.15)}>
            <CardStack3D />
          </motion.div>
        </div>

        {/* Mobile + Tablet: auto-cycling single card with pill nav */}
        <motion.div {...fadeUp(0.1)} className="lg:hidden">
          <MobileCardCycler />
        </motion.div>
      </div>
    </section>
  )
}

// ─── Shared Card Fragments ───────────────────────────────────

function CaseStudyLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      Read Full Story
      <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} className="size-3" />
    </a>
  )
}

function StatBlock({
  stats,
  valueSize = "text-xl",
  labelSize = "text-[11px]",
}: {
  stats: Testimonial["stats"]
  valueSize?: string
  labelSize?: string
}) {
  return (
    <>
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className={`${valueSize} font-mono font-semibold tracking-tight`}>
            {stat.value}
          </p>
          <p className={`${labelSize} text-muted-foreground/70 mt-0.5`}>{stat.label}</p>
        </div>
      ))}
    </>
  )
}

// ─── Card Stack Controller (desktop left column) ─────────────

function CardStackController() {
  return (
    <div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        From HR tech to e-commerce to fintech, companies trust Bolna to
        handle millions of voice interactions every month.
      </p>
      <div className="flex flex-wrap gap-2">
        {TESTIMONIALS.map((t) => (
          <span
            key={t.company}
            className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            {t.company}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Mobile Testimonial Card (inner content) ─────────────────

function MobileTestimonialCard({ data }: { data: Testimonial }) {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-semibold tracking-tight">{data.company}</span>
        <CaseStudyLink href={data.href} />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        &ldquo;{data.quote}&rdquo;
      </p>

      <div className="flex gap-6 pt-4 border-t border-border">
        <StatBlock stats={data.stats} />
      </div>
    </div>
  )
}

// ─── Mobile Card Cycler ──────────────────────────────────────

function MobileCardCycler() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length)
    }, CYCLE_MS)
    return () => clearTimeout(id)
  }, [active])

  return (
    <div>
      {/* Company pill navigation */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.company}
            onClick={() => setActive(i)}
            className="relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors"
          >
            {active === i && (
              <motion.div
                layoutId="case-study-pill"
                className="absolute inset-0 rounded-full bg-muted border border-border"
                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              />
            )}
            <span className={`relative z-10 ${active === i ? "text-foreground" : "text-muted-foreground/70"}`}>
              {t.company}
            </span>
          </button>
        ))}
      </div>

      {/* Card -- static shell, content crossfades */}
      <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            {...cardCrossfade}
          >
            <MobileTestimonialCard data={TESTIMONIALS[active]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-5">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.company}
            onClick={() => setActive(i)}
            aria-label={`Go to ${t.company} case study`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-primary" : "w-1.5 bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── 3D Card Stack (desktop) ─────────────────────────────────

function CardStack3D() {
  const [order, setOrder] = useState(() => TESTIMONIALS.map((_, i) => i))

  const cycle = useCallback(() => {
    setOrder((prev) => [...prev.slice(1), prev[0]])
  }, [])

  useEffect(() => {
    const id = setInterval(cycle, CYCLE_MS)
    return () => clearInterval(id)
  }, [cycle])

  return (
    <div
      className="relative h-[280px] w-full"
      style={{ perspective: 1200 }}
    >
      <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        {order.map((cardIdx, pos) => {
          if (pos >= VISIBLE) return null
          return (
            <motion.div
              key={cardIdx}
              className="absolute inset-0 cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                zIndex: VISIBLE - pos,
              }}
              animate={{
                rotateY: -6,
                rotateX: 2,
                x: pos * 40,
                y: pos * -16,
                scale: 1 - pos * 0.04,
                opacity: 1 - pos * 0.25,
              }}
              transition={{
                type: "spring",
                duration: 0.7,
                bounce: 0.05,
              }}
              onClick={pos === 0 ? cycle : undefined}
            >
              <DesktopTestimonialCard data={TESTIMONIALS[cardIdx]} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Desktop Testimonial Card ────────────────────────────────

function DesktopTestimonialCard({ data }: { data: Testimonial }) {
  return (
    <div className="h-full rounded-2xl border border-border bg-card p-6 flex flex-col shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="text-base font-semibold tracking-tight">{data.company}</span>
        <CaseStudyLink href={data.href} />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
        &ldquo;{data.quote}&rdquo;
      </p>

      <div className="flex items-end gap-8 pt-3 border-t border-border">
        <StatBlock stats={data.stats} valueSize="text-2xl" labelSize="text-xs" />
      </div>
    </div>
  )
}
