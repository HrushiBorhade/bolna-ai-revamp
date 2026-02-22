"use client"

import Image from "next/image"
import { motion } from "framer-motion"


const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring" as const, duration: 0.6, bounce: 0, delay },
})

/* ─── Integration logos (all SVGs with currentColor) ────── */

const LOGOS = [
  { src: "/logos/openai.svg", alt: "OpenAI" },
  { src: "/logos/azure.svg", alt: "Azure", colored: true },
  { src: "/logos/cartesia.svg", alt: "Cartesia" },
  { src: "/logos/elevenlabs.svg", alt: "ElevenLabs" },
  { src: "/logos/deepgram.svg", alt: "Deepgram" },
  { src: "/logos/plivo.svg", alt: "Plivo" },
  { src: "/logos/openrouter.svg", alt: "OpenRouter" },
  { src: "/logos/perplexity.svg", alt: "Perplexity" },
]

/* ─── Circle positions for hub-and-spoke layout ─────────── */

const RADIUS = 37
const CENTER = 50

const positions = LOGOS.map((_, i) => {
  const angle = (i / LOGOS.length) * 2 * Math.PI - Math.PI / 2
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  }
})

/* ─── Bolna waveform icon (inline SVG matching brand) ───── */

function BolnaWaveformIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="8" width="2.5" height="8" rx="1.25" fill="currentColor" />
      <rect x="6.5" y="4" width="2.5" height="16" rx="1.25" fill="currentColor" />
      <rect x="10.75" y="2" width="2.5" height="20" rx="1.25" fill="currentColor" />
      <rect x="15" y="4" width="2.5" height="16" rx="1.25" fill="currentColor" />
      <rect x="19.5" y="8" width="2.5" height="8" rx="1.25" fill="currentColor" />
    </svg>
  )
}

/* ─── Hub-and-spoke integration diagram ─────────────────── */

function IntegrationHub() {
  return (
    <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[360px] mx-auto">
      {/* SVG layer — connection lines + animated dots */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {/* Outer guide ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={0.35}
          strokeDasharray="1.5 2"
        />

        {/* Connection lines + traveling dots */}
        {positions.map((pos, i) => {
          const dx = CENTER - pos.x
          const dy = CENTER - pos.y
          const len = Math.sqrt(dx * dx + dy * dy)
          // Shorten line to not overlap with node tiles
          const outerPad = 5.5
          const innerPad = 5
          const startX = pos.x + (dx / len) * outerPad
          const startY = pos.y + (dy / len) * outerPad
          const endX = CENTER - (dx / len) * innerPad
          const endY = CENTER - (dy / len) * innerPad

          return (
            <g key={i}>
              {/* Static connection line */}
              <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={0.4}
              />

              {/* Animated dot traveling toward center */}
              <circle r={0.8} fill="rgba(255,255,255,0.5)" opacity={0}>
                <animateMotion
                  path={`M${startX},${startY} L${endX},${endY}`}
                  dur="4s"
                  repeatCount="indefinite"
                  begin={`${i * 0.5}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.5;0.5;0;0"
                  keyTimes="0;0.1;0.6;0.8;1"
                  dur="4s"
                  repeatCount="indefinite"
                  begin={`${i * 0.5}s`}
                />
              </circle>
            </g>
          )
        })}

      </svg>

      {/* Center Bolna node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-center size-14 sm:size-16 rounded-2xl border border-white/15 bg-white/[0.08] backdrop-blur-sm">
          <BolnaWaveformIcon className="size-7 sm:size-8 text-white" />
        </div>
      </div>

      {/* Outer integration logos */}
      {LOGOS.map((logo, i) => (
        <div
          key={logo.alt}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
          style={{
            left: `${positions[i].x}%`,
            top: `${positions[i].y}%`,
          }}
        >
          <div className="flex items-center justify-center size-10 sm:size-12 rounded-xl border border-white/15 bg-white/[0.08] backdrop-blur-sm">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={20}
              height={20}
              className={logo.colored ? "size-5" : "size-5 brightness-0 invert"}
            />
          </div>
          <span className="text-[9px] sm:text-[10px] text-white/40 font-medium whitespace-nowrap">
            {logo.alt}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─── Main Section ────────────────────────────────────────── */

export function IntegrationsSection() {
  return (
    <section className="relative px-3 sm:px-6 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp(0)}>
          {/* Card with noise gradient background */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-primary/90" />

            {/* SVG noise overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-soft-light pointer-events-none" aria-hidden="true">
              <filter id="integrations-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#integrations-noise)" />
            </svg>

            {/* Dark overlay for depth */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 p-6 sm:p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left — Hub-and-spoke diagram */}
                <div className="flex items-center justify-center py-4">
                  <IntegrationHub />
                </div>

                {/* Right — Heading, description, button */}
                <div className="flex flex-col gap-5">
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal italic tracking-tight leading-[1.15] text-white">
                    Effortlessly Integrate with{" "}
                    <span className="block">Your Tool Stack</span>
                  </h3>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-md">
                    Bolna works hand-in-hand with leading platforms to supercharge your communication stack.
                    Easily plug Bolna into your communication infrastructure and scale without friction.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center self-start gap-3 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm hover:bg-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors"
                  >
                    View all Integrations
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
