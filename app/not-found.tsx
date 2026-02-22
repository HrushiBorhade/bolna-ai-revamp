"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// ─── Animation helpers ───────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const, delay },
})

// ─── Disconnected waveform illustration ──────────────────────

// Deterministic pseudo-random
function hash(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const BAR_COUNT = 120
const GAP_CENTER = BAR_COUNT / 2
const CLEAR_ZONE = 24   // bars within this range are invisible (text space)
const FADE_ZONE = 34    // bars within this range fade in from the clear zone edge

const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / (BAR_COUNT - 1)
  const center = 1 - Math.abs(t * 2 - 1)
  const variation = 0.5 + hash(i) * 0.5
  const maxH = (20 + 180 * variation) * (0.5 + center * 0.5)

  const distFromGap = Math.abs(i - GAP_CENTER)
  // Two-zone gap: clear center for text, then gradual fade-in
  const gapFade = distFromGap < CLEAR_ZONE
    ? 0
    : distFromGap < FADE_ZONE
      ? Math.pow((distFromGap - CLEAR_ZONE) / (FADE_ZONE - CLEAR_ZONE), 1.5)
      : 1

  return {
    height: maxH * gapFade,
    opacity: gapFade < 0.01 ? 0 : 0.15 + gapFade * 0.35,
  }
})

function DisconnectedWaveform() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex items-center justify-center gap-[2px] sm:gap-[3px] w-full max-w-2xl mx-auto h-32 sm:h-44"
      aria-hidden="true"
    >
      {bars.map((bar, i) => {
        // Normalized distance from center: 0 at center, 1 at edges
        const normDist = Math.abs(i - GAP_CENTER) / (BAR_COUNT / 2)
        // Entrance: bars ripple inward from edges, breaking at the gap
        const entranceDelay = 0.3 + (1 - normDist) * 0.6

        return (
          <motion.div
            key={i}
            className="shrink-0 rounded-full"
            style={{
              width: 2.5,
              backgroundColor: "rgba(255,255,255,0.5)",
              transformOrigin: "center",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: [0.15, 0.15 + hash(i) * 0.15, 0.15],
              opacity: bar.opacity,
              height: bar.height,
            }}
            transition={{
              scaleY: {
                duration: 2 + hash(i + 100) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: entranceDelay,
              },
              opacity: { duration: 0.6, delay: entranceDelay },
              height: { duration: 0.6, delay: entranceDelay },
            }}
          />
        )
      })}
    </motion.div>
  )
}

// ─── Component ───────────────────────────────────────────────

export default function NotFound() {
  return (
    <main className="relative min-h-svh flex items-center px-3 sm:px-6 py-6 sm:py-8">
      {/* Noise gradient card */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-6xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden min-h-[calc(100svh-3rem)] sm:min-h-[calc(100svh-4rem)] flex flex-col"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-primary/90" />
        <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-soft-light pointer-events-none" aria-hidden="true">
          <filter id="notfound-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#notfound-noise)" />
        </svg>
        <div className="absolute inset-0 bg-black/40" />

        {/* Center content */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4">
          {/* Disconnected waveform with text overlaid in the gap */}
          <div className="relative w-full">
            <DisconnectedWaveform />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                {...fadeUp(0.5)}
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal italic tracking-tight text-white/90"
              >
                We didn&apos;t catch that
              </motion.span>
            </div>
          </div>

          {/* Direct explanation */}
          <motion.h1
            {...fadeUp(0.6)}
            className="font-heading text-lg sm:text-xl lg:text-2xl font-normal italic tracking-tight leading-[1.1] text-white mt-4 sm:mt-5"
          >
            This page doesn&apos;t exist
          </motion.h1>

          {/* Helpful subtitle */}
          <motion.p
            {...fadeUp(0.7)}
            className="max-w-sm text-xs sm:text-sm text-white/40 tracking-tight leading-relaxed mt-3"
          >
            The page you&apos;re looking for may have been moved
            <br className="hidden sm:block" />
            or is no longer available. Let&apos;s get you back.
          </motion.p>

          {/* CTA */}
          <motion.div {...fadeUp(0.8)} className="mt-6">
            <Button
              asChild
              size="lg"
              className="rounded-full h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-medium gap-2 bg-white text-zinc-900 hover:bg-white/90 cursor-pointer"
            >
              <Link href="/">
                Back to Home
                <span className="inline-flex items-center gap-[2px]">
                  {[4, 10, 6, 12, 5, 8, 3].map((h, i) => (
                    <span
                      key={i}
                      className="w-[2px] rounded-full bg-current opacity-70"
                      style={{ height: h }}
                    />
                  ))}
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Bottom spacer */}
        <div className="relative z-20 h-12 sm:h-16" />
      </motion.div>
    </main>
  )
}
