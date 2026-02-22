"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const VoiceWaveform = dynamic(
  () => import("./voice-waveform").then((m) => m.VoiceWaveform),
  { ssr: false }
)

// ─── Animation Timing ────────────────────────────────────────

/** Card spring duration — content starts appearing before it fully settles */
const CARD_DURATION = 0.7

/** Content begins mid-expansion for a seamless overlap */
const CONTENT_START = 0.45

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const, delay: CONTENT_START + delay },
})

// ─── Component ───────────────────────────────────────────────

export function HeroSection() {
  return (
    <section className="relative min-h-svh flex items-center px-3 sm:px-6 pt-16 lg:pt-18 pb-6 sm:pb-8">
      {/* Noise gradient card — clip-path reveal from center (no layout shift) */}
      <motion.div
        initial={{ clipPath: "inset(35% round 48px)", opacity: 0, filter: "blur(12px)" }}
        animate={{ clipPath: "inset(0% round 24px)", opacity: 1, filter: "blur(0px)" }}
        transition={{
          clipPath: { type: "spring", duration: CARD_DURATION, bounce: 0.05 },
          opacity: { duration: 0.3, ease: "easeOut" },
          filter: { duration: 0.4, ease: "easeOut" },
        }}
        className="relative w-full max-w-6xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden min-h-[calc(100svh-7rem)] lg:min-h-[calc(100svh-8rem)] flex flex-col"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-primary/90" />
        <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-soft-light pointer-events-none" aria-hidden="true">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
        <div className="absolute inset-0 bg-black/40" />

        {/* Content — vertically centered */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pt-8 sm:pt-12 pb-52 sm:pb-64 lg:pb-[20rem] gap-3 sm:gap-4">
          {/* YC Badge */}
          <motion.div {...fadeUp(0.1)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-1.5 text-sm text-white/60">
              <span className="size-2 rounded-full bg-orange-500 shrink-0" />
              <span>
                Backed by{" "}
                <span className="inline-flex items-center gap-1">
                  <span className="inline-flex items-center justify-center size-5 rounded bg-orange-500 text-white text-xs font-bold leading-none">
                    Y
                  </span>
                  <span className="text-white font-medium">Combinator</span>
                </span>
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.2)}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal italic tracking-tight leading-[1.1] text-white"
          >
            <span className="block">Voice AI</span>
            <span className="block bg-clip-text text-transparent pr-2" style={{ backgroundImage: 'linear-gradient(90deg, #FF9933 0%, #FFB866 30%, #F5E6CA 50%, #6BCB77 70%, #2D8B4E 100%)' }}>
              Built for India
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.3)}
            className="max-w-md text-xs sm:text-sm lg:text-base text-white/50 tracking-tight leading-relaxed"
          >
            Power thousands of inbound and outbound calls
            <br className="hidden sm:block" />
            every minute with human-like, multilingual intelligence
          </motion.p>

          {/* CTA */}
          <motion.div {...fadeUp(0.4)}>
            <Button
              asChild
              size="lg"
              className="rounded-full h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-medium gap-2 bg-white text-zinc-900 hover:bg-white/90 cursor-pointer"
            >
            <Link href="/dashboard">
              Experience Bolna
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

        {/* Waveform — bars ripple from center outward */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <VoiceWaveform color="rgba(255,255,255,0.5)" hideFade entranceDelay={CONTENT_START + 0.25} />
        </div>
      </motion.div>
    </section>
  )
}
