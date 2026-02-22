"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const BAR_COUNT = 200

// Default bar color — can be overridden via props
const DEFAULT_BAR_COLOR = "var(--primary)"

// Deterministic pseudo-random
function hash(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

// Easter egg: bar heights follow the melodic contour of Jana Gana Mana
// India's national anthem — a hidden tribute in the waveform shape
const ANTHEM_MELODY = [
  0.40, 0.42, 0.50, 0.55, 0.60, 0.70, 0.80,          // "Jana gana mana" — ascending
  0.90, 0.85, 0.70, 0.50,                               // "adhinaayaka" — peak, descend
  0.35, 0.25,                                            // "jaya he" — breath
  0.50, 0.60, 0.70, 0.80, 0.90, 0.95,                  // "Bhaarata bhaagya vidhaata" — big ascent
  0.20,                                                  // breath
  0.50, 0.55, 0.60, 0.55, 0.60, 0.50,                  // "Punjab Sindh Gujarat Maraatha" — rolling
  0.20,                                                  // breath
  0.50, 0.60, 0.70, 0.80,                               // "Vindhya Himaachala" — ascending
  0.70, 0.60, 0.50,                                      // "Yamunaa Gangaa" — descending
  0.20,                                                  // breath
  0.55, 0.65, 0.70, 0.65, 0.75, 0.80,                  // "uchchhala jaladhi taranga" — rolling
  0.20,                                                  // breath
  0.50, 0.60, 0.70, 0.80, 0.90,                         // "Tava shubha naame jaage" — ascending
  0.85, 0.90, 0.95,                                      // "tava shubha aashisha maage" — sustained
  0.20,                                                  // breath
  0.70, 0.80, 0.90, 1.00, 0.95,                         // "Gaahe tava jaya gaathaa" — peak
  0.20,                                                  // breath
  0.55, 0.65, 0.75, 0.80, 0.70, 0.60,                  // "Jana gana mangala daayaka" — descend
  0.50, 0.40,                                            // "jaya he"
  0.20,                                                  // breath
  0.60, 0.70, 0.80, 0.90, 0.95, 1.00,                  // "Bhaarata bhaagya vidhaata" — final peak
  0.20,                                                  // breath
  0.80, 0.90, 0.85, 0.90, 0.85,                         // "Jaya he jaya he jaya he"
  0.90, 1.00, 0.95, 0.90, 0.85, 0.40,                  // "Jaya jaya jaya jaya he" — ending
]

function anthemEnvelope(t: number): number {
  const pos = t * (ANTHEM_MELODY.length - 1)
  const i = Math.floor(pos)
  const frac = pos - i
  const a = ANTHEM_MELODY[Math.min(i, ANTHEM_MELODY.length - 1)]
  const b = ANTHEM_MELODY[Math.min(i + 1, ANTHEM_MELODY.length - 1)]
  return a + (b - a) * frac
}

// Voice-like keyframe pattern per bar
function getVoicePattern(i: number): number[] {
  const h = (offset: number) => hash(i * 7 + offset)
  return [
    0.18 + h(0) * 0.12,
    0.4 + h(1) * 0.25,
    0.55 + h(2) * 0.45,
    0.3 + h(3) * 0.2,
    0.4 + h(4) * 0.35,
    0.25 + h(5) * 0.15,
    0.18 + h(0) * 0.12,
  ]
}

// Bar data — speech envelope shapes the height, creating realistic voice timeline
const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / (BAR_COUNT - 1)
  const center = 1 - Math.abs(t * 2 - 1)

  // Melody contour from Jana Gana Mana shapes the bar heights
  const envelope = anthemEnvelope(t)
  // Small random variation on top of envelope
  const variation = 0.7 + hash(i) * 0.3
  const maxH = (40 + 320 * envelope * variation) * (0.7 + center * 0.3)

  return {
    maxH,
    pattern: getVoicePattern(i),
    duration: 1.8 + hash(i + 500) * 1.7,
    delay: hash(i + 600) * 2.0,
    opacity: 0.5 + center * 0.5,
  }
})

const voiceTimes = [0, 0.15, 0.35, 0.50, 0.70, 0.88, 1]
const CENTER_INDEX = BAR_COUNT / 2

export function VoiceWaveform({
  className,
  color,
  fadeColor,
  hideFade,
  entranceDelay,
}: {
  className?: string
  color?: string
  fadeColor?: string
  hideFade?: boolean
  entranceDelay?: number
}) {
  const barColor = color || DEFAULT_BAR_COLOR
  const hasEntrance = entranceDelay != null

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center gap-[2px] sm:gap-[3px] lg:gap-1 overflow-hidden",
        "h-36 sm:h-72 lg:h-[22rem]",
        className
      )}
      aria-hidden="true"
    >
      {!hideFade && (
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-40 z-10"
          style={{
            background: fadeColor
              ? `linear-gradient(to right, ${fadeColor}, transparent)`
              : undefined,
          }}
        >
          {!fadeColor && <div className="h-full w-full bg-gradient-to-r from-background to-transparent" />}
        </div>
      )}

      {bars.map((bar, i) => {
        // Distance from center normalized to 0–1
        const distFromCenter = Math.abs(i - CENTER_INDEX) / CENTER_INDEX
        // Entrance: center bars appear first, edges last
        const barEntranceDelay = hasEntrance
          ? entranceDelay + distFromCenter * 0.6
          : bar.delay

        return (
          <motion.div
            key={i}
            className="shrink-0 rounded-full"
            style={{
              width: 3,
              height: bar.maxH,
              backgroundColor: barColor,
              transformOrigin: "center",
              willChange: "transform",
              ...(hasEntrance ? {} : { opacity: bar.opacity }),
            }}
            initial={hasEntrance ? { scaleY: 0, opacity: 0 } : undefined}
            animate={{
              scaleY: bar.pattern,
              ...(hasEntrance ? { opacity: bar.opacity } : {}),
            }}
            transition={hasEntrance ? {
              scaleY: {
                duration: bar.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: barEntranceDelay,
                times: voiceTimes,
              },
              opacity: {
                duration: 0.4,
                delay: barEntranceDelay,
                ease: "easeOut",
              },
            } : {
              duration: bar.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bar.delay,
              times: voiceTimes,
            }}
          />
        )
      })}

      {!hideFade && (
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-40 z-10"
          style={{
            background: fadeColor
              ? `linear-gradient(to left, ${fadeColor}, transparent)`
              : undefined,
          }}
        >
          {!fadeColor && <div className="h-full w-full bg-gradient-to-l from-background to-transparent" />}
        </div>
      )}
    </div>
  )
}
