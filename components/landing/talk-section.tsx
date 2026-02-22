"use client"

import { motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { Call02Icon } from "@hugeicons/core-free-icons"

const PHONE_NUMBER = "+91 22 6953 9260"
const TEL_HREF = "tel:+912269539260"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring" as const, duration: 0.6, bounce: 0, delay },
})

/* iOS-style phone SVG icon — matches SF Symbols phone.fill */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
    </svg>
  )
}

export function TalkSection() {
  return (
    <section className="relative pt-10 sm:pt-14 lg:pt-16 pb-20 sm:pb-28 lg:pb-36 px-3 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp(0)}>
          {/* Card with noise gradient background */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-primary/90" />

            {/* SVG noise overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-soft-light pointer-events-none" aria-hidden="true">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>

            {/* Dark overlay for depth */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
              {/* Left — Text */}
              <div className="flex flex-col gap-5 p-8 sm:p-10 lg:p-14 justify-center">
                <span className="inline-flex items-center self-start rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-wider uppercase text-white/70">
                  Contact Us
                </span>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal italic tracking-tight leading-[1.1] text-white">
                  Talk to Bolna
                </h2>

                <p className="max-w-xs text-sm text-white/60 leading-relaxed">
                  Have questions? Give our AI Agent a call and
                  we&apos;ll help you get started.
                </p>

                <a
                  href={TEL_HREF}
                  className="inline-flex items-center self-start gap-3 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm hover:bg-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors mt-1"
                >
                  <HugeiconsIcon icon={Call02Icon} strokeWidth={2} className="size-4" />
                  {PHONE_NUMBER}
                </a>
              </div>

              {/* Right — Cropped iPhone top */}
              <div className="hidden lg:flex items-end justify-center overflow-hidden">
                <div className="translate-y-8">
                  <IPhoneMockup />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function IPhoneMockup() {
  return (
    <div className="w-[280px] xl:w-[300px]">
      {/* iPhone frame — top portion only */}
      <div className="relative w-full rounded-t-[2.5rem] rounded-b-none border-[5px] border-b-0 border-zinc-300 bg-zinc-100 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="bg-zinc-100">
          {/* Dynamic Island — expanded incoming call */}
          <div className="flex justify-center pt-3 pb-4">
            <div className="w-[85%] h-[72px] bg-black rounded-full flex items-center justify-between px-3 shadow-lg">
              {/* Caller info */}
              <div className="min-w-0 pl-2">
                <p className="text-white text-sm font-normal italic leading-tight truncate" style={{ fontFamily: "var(--font-heading)" }}>Bolna AI</p>
                <p className="text-[10px] text-zinc-400 leading-none mt-0.5">incoming call...</p>
              </div>

              {/* Right — iOS-style decline + accept */}
              <div className="flex items-center gap-2">
                <button className="size-11 rounded-full bg-red-500 flex items-center justify-center" aria-label="Decline">
                  <PhoneIcon className="size-[18px] text-white rotate-[135deg]" />
                </button>
                <a href={TEL_HREF} className="size-11 rounded-full bg-green-500 flex items-center justify-center" aria-label="Accept">
                  <PhoneIcon className="size-[18px] text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Recents call log */}
          <div className="px-4 pt-3 pb-10">
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide px-1 mb-2">Recents</p>
            <div className="rounded-xl bg-white shadow-sm overflow-hidden">
              {[
                { name: "Bolna AI", time: "Today, 2:14 PM", type: "incoming" },
                { name: "Bolna AI", time: "Today, 11:30 AM", type: "outgoing" },
                { name: "Bolna AI", time: "Yesterday", type: "missed" },
              ].map((call, i, arr) => (
                <div key={i} className={`flex items-center justify-between px-4 py-2.5 ${i < arr.length - 1 ? "border-b border-zinc-100" : ""}`}>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className={`size-3.5 ${call.type === "missed" ? "text-red-500" : "text-green-500"} ${call.type === "outgoing" ? "rotate-[225deg]" : ""}`} />
                    <div>
                      <p className={`text-[13px] font-medium ${call.type === "missed" ? "text-red-500" : "text-zinc-900"}`}>{call.name}</p>
                      <p className="text-[10px] text-zinc-400">{call.type === "incoming" ? "Incoming" : call.type === "outgoing" ? "Outgoing" : "Missed"}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-400">{call.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
