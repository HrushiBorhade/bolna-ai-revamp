"use client"

import React, { useState, useId } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

// ─── Types & Data ────────────────────────────────────────────

type Language = "python" | "javascript" | "curl"

const LANGUAGES: { id: Language; label: string }[] = [
  { id: "python", label: "Python" },
  { id: "javascript", label: "JavaScript" },
  { id: "curl", label: "cURL" },
]

const CODE: Record<Language, string> = {
  python: `import requests

url = "https://api.bolna.ai/call"

payload = {
    "agent_id": "123e4567-e89b-12d3-a456-426655440000",
    "recipient_phone_number": "+10123456789",
    "from_phone_number": "+19876543007",
    "user_data": {
        "variable1": "value1",
        "variable2": "value2",
        "variable3": "some phrase as value"
    }
}

headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)`,

  javascript: `const options = {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "agent_id": "123e4567-e89b-12d3-a456-426655440000",
    "recipient_phone_number": "+10123456789",
    "from_phone_number": "+19876543007",
    "user_data": {
      "variable1": "value1",
      "variable2": "value2",
      "variable3": "some phrase as value"
    }
  })
};

fetch('https://api.bolna.ai/call', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));`,

  curl: `curl --request POST \\
  --url https://api.bolna.ai/call \\
  --header 'Authorization: Bearer <token>' \\
  --header 'Content-Type: application/json' \\
  --data '{
  "agent_id": "123e4567-e89b-12d3-a456-426655440000",
  "recipient_phone_number": "+10123456789",
  "from_phone_number": "+19876543007",
  "user_data": {
    "variable1": "value1",
    "variable2": "value2",
    "variable3": "some phrase as value"
  }
}'`,
}

const STEPS = [
  {
    number: 1,
    label: "STEP ONE",
    title: "Connect Account",
    description: "Sign in with GitHub or Google to access the Dashboard",
  },
  {
    number: 2,
    label: "STEP TWO",
    title: "Configure Agent",
    description: "Choose a pre-built template or build from scratch with no-code tools",
  },
  {
    number: 3,
    label: "STEP THREE",
    title: "Launch Campaign",
    description: "Trigger calls, run campaigns, or connect with your phone number",
  },
]

// ─── Animation ───────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring" as const, duration: 0.6, bounce: 0, delay },
})

// ─── Dot Pattern ─────────────────────────────────────────────

function DotPattern({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg aria-hidden="true" className={className}>
      <defs>
        <pattern id={`${id}-dot`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
        <radialGradient id={`${id}-fade`}>
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-dot)`} mask={`url(#${id}-mask)`} />
    </svg>
  )
}

// ─── Syntax Highlighting ─────────────────────────────────────

const KEYWORDS: Record<Language, RegExp> = {
  python: /\b(import|from|print|def|class|return|if|else|for|in|as|with|True|False|None)\b/,
  javascript: /\b(const|let|var|function|async|await|return|if|else|for|new|true|false|null|undefined|JSON|fetch|console)\b/,
  curl: /(curl|--[\w-]+|\b(?:POST|GET|PUT|DELETE)\b)/,
}

function highlightKeywords(text: string, lang: Language) {
  const regex = KEYWORDS[lang]
  const parts = text.split(regex)
  if (parts.length <= 1) return text
  const test = new RegExp(`^(?:${regex.source})$`)
  return parts.map((p, i) =>
    p && test.test(p)
      ? <span key={i} className="text-violet-400">{p}</span>
      : <span key={i}>{p}</span>
  )
}

function highlightLine(line: string, lang: Language) {
  if (!line) return " "
  const trimmed = line.trimStart()
  if ((lang === "python" && trimmed.startsWith("#")) ||
      (lang === "javascript" && trimmed.startsWith("//"))) {
    return <span className="text-zinc-500 italic">{line}</span>
  }
  const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/)
  return parts.map((seg, i) => {
    if ((seg.startsWith('"') && seg.endsWith('"') && seg.length >= 2) ||
        (seg.startsWith("'") && seg.endsWith("'") && seg.length >= 2)) {
      return <span key={i} className="text-cyan-300">{seg}</span>
    }
    return <span key={i}>{highlightKeywords(seg, lang)}</span>
  })
}

// ─── Main Section ────────────────────────────────────────────

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-20 lg:py-28 px-4 bg-foreground text-background overflow-hidden">
      <DotPattern className="pointer-events-none absolute inset-0 h-full w-full text-background/[0.12]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-10 lg:mb-14">
          <div>
            <span className="inline-flex items-center rounded-full border border-background/20 bg-background/5 px-3 py-1 text-xs font-medium tracking-wider uppercase text-background/60 mb-4">
              How it Works
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal italic tracking-tight leading-[1.1]">
              Built for Developers,{" "}
              <span className="block">Easy for Everyone</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm sm:text-base text-background/50 leading-relaxed max-w-md">
              Whether you&apos;re a no-code builder or a developer, Bolna makes it easy to create
              powerful conversational voice AI agents that understand Indian languages and accents.
            </p>
          </div>
        </motion.div>

        {/* Two columns — stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: No-Code */}
          <motion.div {...fadeUp(0.1)}>
            <a href="/dashboard" className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-background/50 hover:text-background transition-colors mb-6">
              <span>No-Code Playground</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} className="size-3.5" />
            </a>
            <NoCodeFlow />
          </motion.div>

          {/* Right: Developer APIs */}
          <motion.div {...fadeUp(0.2)}>
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-background/50 mb-6">
              <span>Developer APIs</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} className="size-3.5" />
            </span>
            <CodeTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── No-Code Flow ────────────────────────────────────────────

const STEP_MOCKUPS: Record<number, () => React.ReactNode> = {
  1: () => <LoginMockup />,
  2: () => <AgentConfigMockup />,
  3: () => <CampaignMockup />,
}

function NoCodeFlow() {
  return (
    <div className="space-y-1">
      {STEPS.map((step, i) => (
        <div key={step.number}>
          <StepCard step={step} />
          {i < STEPS.length - 1 && (
            <DottedArrow direction={i % 2 === 0 ? "right" : "left"} />
          )}
        </div>
      ))}
    </div>
  )
}

function StepCard({ step }: { step: typeof STEPS[number] }) {
  const Mockup = STEP_MOCKUPS[step.number]
  return (
    <div className="relative rounded-xl border-l-[3px] border-l-primary bg-foreground border border-background/[0.1] shadow-md shadow-black/20 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Text */}
        <div className="p-4 sm:p-5 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-background/40">
              {step.label}
            </p>
            <span className="shrink-0 size-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
              {step.number}
            </span>
          </div>
          <h3 className="text-base font-semibold mb-1">
            {step.title}
          </h3>
          <p className="text-xs text-background/50 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* UI Mockup — hidden on very small screens, shown sm+ */}
        <div className="relative w-full sm:w-[200px] h-[120px] sm:h-auto shrink-0 flex items-end justify-end p-2">
          <div className="origin-bottom-right scale-[0.85] sm:scale-100">
            {Mockup && <Mockup />}
          </div>
        </div>
      </div>
    </div>
  )
}

function DottedArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <div className={`flex ${direction === "right" ? "justify-end pr-12" : "justify-start pl-12"} py-0.5`}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-background/20">
        <path
          d={
            direction === "right"
              ? "M6 2 C6 18, 30 18, 30 34"
              : "M30 2 C30 18, 6 18, 6 34"
          }
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />
        <polygon
          points={
            direction === "right"
              ? "26,31 30,37 34,31"
              : "2,31 6,37 10,31"
          }
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

// ─── Dashboard UI Mockups (dark-on-dark) ─────────────────────

function LoginMockup() {
  return (
    <div className="w-[170px] rounded-lg bg-background/[0.06] border border-background/[0.08] shadow-sm p-3">
      <p className="text-[9px] font-semibold text-background/70 mb-2">Sign in</p>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 rounded-md bg-background/[0.06] border border-background/[0.08] px-2.5 py-1.5">
          <GithubSvg className="size-3 text-background/60" />
          <span className="text-[8px] text-background/60 font-medium">Continue with GitHub</span>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-background/[0.06] border border-background/[0.08] px-2.5 py-1.5">
          <GoogleSvg className="size-3" />
          <span className="text-[8px] text-background/60 font-medium">Continue with Google</span>
        </div>
      </div>
    </div>
  )
}

function AgentConfigMockup() {
  return (
    <div className="w-[170px] rounded-lg bg-background/[0.06] border border-background/[0.08] overflow-hidden shadow-sm">
      {/* Tab bar */}
      <div className="flex gap-0.5 px-2 pt-2 pb-1 border-b border-background/[0.08]">
        {["Agent", "LLM", "Audio", "Engine"].map((tab, i) => (
          <span
            key={tab}
            className={`text-[7px] px-1.5 py-0.5 rounded ${i === 0 ? "bg-background/[0.1] text-background/80 font-medium" : "text-background/30"}`}
          >
            {tab}
          </span>
        ))}
      </div>
      {/* Form */}
      <div className="p-2.5 space-y-2">
        <div>
          <p className="text-[7px] text-background/40 mb-0.5">System Prompt</p>
          <div className="rounded bg-background/[0.06] border border-background/[0.08] px-2 py-1.5 min-h-[28px]">
            <p className="text-[7px] text-background/40 leading-tight">You are a helpful customer support agent for...</p>
          </div>
        </div>
        <div className="flex gap-1">
          {["Support", "Sales"].map((t) => (
            <span key={t} className="text-[6px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CampaignMockup() {
  return (
    <div className="w-[170px] rounded-lg bg-background/[0.06] border border-background/[0.08] p-3 shadow-sm">
      <p className="text-[9px] font-semibold text-background/70 mb-2">Launch Campaign</p>
      <div className="space-y-1.5">
        <div>
          <p className="text-[7px] text-background/40 mb-0.5">Phone Number</p>
          <div className="rounded bg-background/[0.06] border border-background/[0.08] px-2 py-1 text-[8px] text-background/50">
            +91 98765 43210
          </div>
        </div>
        <div>
          <p className="text-[7px] text-background/40 mb-0.5">Contacts</p>
          <div className="rounded bg-background/[0.06] border border-background/[0.08] px-2 py-1 text-[8px] text-background/50">
            Upload CSV (2,400 rows)
          </div>
        </div>
        <div className="rounded-md bg-primary px-2 py-1 text-center">
          <span className="text-[8px] font-medium text-primary-foreground">Launch Calls</span>
        </div>
      </div>
    </div>
  )
}

function GithubSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function GoogleSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16">
      <path fill="#4285F4" d="M15.68 8.18c0-.57-.05-1.11-.15-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.41v2h2.58c1.51-1.39 2.38-3.44 2.38-5.87z" />
      <path fill="#34A853" d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2.01c-.72.48-1.63.76-2.71.76-2.09 0-3.86-1.41-4.49-3.31H.84v2.07A7.99 7.99 0 008 16z" />
      <path fill="#FBBC05" d="M3.51 9.5a4.8 4.8 0 010-3.05V4.39H.84A7.99 7.99 0 000 8c0 1.29.31 2.51.84 3.6l2.67-2.1z" />
      <path fill="#EA4335" d="M8 3.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A7.96 7.96 0 008 0 7.99 7.99 0 00.84 4.4l2.67 2.07C4.14 4.57 5.91 3.18 8 3.18z" />
    </svg>
  )
}

// ─── Code Terminal ───────────────────────────────────────────

function CodeTerminal() {
  const [activeTab, setActiveTab] = useState<Language>("curl")
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CODE[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = CODE[activeTab].split("\n")

  return (
    <div className="rounded-xl bg-zinc-950/80 overflow-hidden ring-1 ring-white/[0.08]">
      {/* Chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-yellow-500/70" />
        <span className="size-2.5 rounded-full bg-green-500/70" />
        <span className="flex-1 text-center text-[11px] text-zinc-500 font-mono hidden sm:block">api-integration</span>
        <div className="w-[48px]" />
      </div>

      {/* Tabs + Copy */}
      <div className="flex items-center px-3 sm:px-4 pt-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveTab(lang.id)}
              className="relative px-2.5 sm:px-3 py-2 text-xs sm:text-sm transition-colors shrink-0"
            >
              {activeTab === lang.id && (
                <motion.div
                  layoutId="hiw-tab"
                  className="absolute inset-0 rounded-t-lg bg-zinc-800/80"
                  transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
                />
              )}
              <span className={`relative z-10 ${activeTab === lang.id ? "text-zinc-100 font-medium" : "text-zinc-500 hover:text-zinc-300"}`}>
                {lang.label}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="ml-auto mb-2 flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors rounded-md hover:bg-zinc-800/50 shrink-0"
        >
          {copied ? (
            <><CheckSvg className="size-3.5" /> Copied!</>
          ) : (
            <><CopySvg className="size-3.5" /> Copy</>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto scrollbar-hide max-h-[320px] sm:max-h-[380px] overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="p-3 sm:p-4 text-[10px] sm:text-[13px] leading-5 sm:leading-6 font-mono"
          >
            <code>
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="inline-block w-5 sm:w-7 text-right text-zinc-600 select-none mr-3 sm:mr-4 shrink-0 tabular-nums">
                    {i + 1}
                  </span>
                  <span className="text-zinc-300">
                    {highlightLine(line, activeTab)}
                  </span>
                </div>
              ))}
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Inline SVG Icons ────────────────────────────────────────

function CopySvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
