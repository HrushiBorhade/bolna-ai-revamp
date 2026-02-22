"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon, Call02Icon, PlayIcon } from "@hugeicons/core-free-icons"

// ─── Types & Data ────────────────────────────────────────────

type Category = "Ecommerce" | "EdTech" | "HealthTech" | "BFSI" | "Hospitality"

const CATEGORIES: Category[] = ["Ecommerce", "EdTech", "HealthTech", "BFSI", "Hospitality"]

interface Agent {
  name: string
  tags: string[]
  description: string
  phone: string
}

const AGENTS: Record<Category, Agent[]> = {
  Ecommerce: [
    { name: "Customer Support Agent", tags: ["Customer Support", "English"], description: "Provides 24/7 inbound call answering for FAQs and customer triage", phone: "+918035317400" },
    { name: "Cart Abandonment Agent", tags: ["Cart Abandonment", "English + Hindi"], description: "Calls customers with abandoned items in carts, recovering sales", phone: "+918035317449" },
    { name: "COD Confirmation Agent", tags: ["COD Confirmation", "English + Hindi"], description: "Handles a variety of last mile logistics tasks, saving human effort", phone: "+918035317450" },
    { name: "Recruitment Agent", tags: ["Recruitment", "English"], description: "AI agents that screen, interview, and onboard candidates at scale", phone: "+918035317441" },
  ],
  EdTech: [
    { name: "Recruitment Agent", tags: ["Recruitment", "English"], description: "AI agents that screen, interview, and onboard candidates at scale", phone: "+918035317441" },
    { name: "Lead Qualification Agent", tags: ["Lead Qualification", "Hindi"], description: "Calls every lead to ask qualifying questions, answer FAQs, and warmly introduce the business", phone: "+918035317443" },
    { name: "Onboarding Agent", tags: ["Onboarding", "English"], description: "Conducts personalized guidance calls to warmly onboard users", phone: "+918035317448" },
    { name: "Announcements Agent", tags: ["Announcements", "English + Hindi"], description: "Keeps users engaged with all feature upgrades and product launches", phone: "+918035317403" },
  ],
  HealthTech: [
    { name: "Onboarding Agent", tags: ["Onboarding", "English"], description: "Conducts personalized guidance calls to warmly onboard users", phone: "+918035317448" },
    { name: "Customer Support Agent", tags: ["Customer Support", "English"], description: "Provides 24/7 inbound call answering for FAQs and customer triage", phone: "+918035317400" },
    { name: "Reminders Agent", tags: ["Reminders", "English + Hindi"], description: "Automates all reminders, from EMIs and collections to form filling deadlines", phone: "+918035317402" },
    { name: "Front Desk Agent", tags: ["Front Desk", "English"], description: "Answers every call to handle clinic, hotel, and office scheduling", phone: "+918035317405" },
  ],
  BFSI: [
    { name: "Reminders Agent", tags: ["Reminders", "English + Hindi"], description: "Automates all reminders, from EMIs and collections to form filling deadlines", phone: "+918035317402" },
    { name: "Customer Support Agent", tags: ["Customer Support", "English"], description: "Provides 24/7 inbound call answering for FAQs and customer triage", phone: "+918035317400" },
    { name: "Lead Qualification Agent", tags: ["Lead Qualification", "Hindi"], description: "Calls every lead to ask qualifying questions, answer FAQs, and warmly introduce the business", phone: "+918035317443" },
    { name: "Announcements Agent", tags: ["Announcements", "English + Hindi"], description: "Keeps users engaged with all feature upgrades and product launches", phone: "+918035317403" },
  ],
  Hospitality: [
    { name: "Front Desk Agent", tags: ["Front Desk", "English"], description: "Answers every call to handle clinic, hotel, and office scheduling", phone: "+918035317405" },
    { name: "Surveys Agent", tags: ["Surveys", "English"], description: "Automated NPS, feedback & product surveys with detailed personalised questioning", phone: "+918035317408" },
    { name: "Onboarding Agent", tags: ["Onboarding", "English"], description: "Conducts personalized guidance calls to warmly onboard users", phone: "+918035317448" },
    { name: "Announcements Agent", tags: ["Announcements", "English + Hindi"], description: "Keeps users engaged with all feature upgrades and product launches", phone: "+918035317403" },
  ],
}

// ─── Animation helpers ───────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-100px" },
  transition: { type: "spring" as const, duration: 0.6, bounce: 0, delay },
})

// ─── Card content transition (iOS 26 / Emil Kowalski style) ─

const contentTransition = {
  initial: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
  transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const },
}

// ─── Main Section ────────────────────────────────────────────

export function AgentsSection() {
  const [active, setActive] = useState<Category>("Ecommerce")

  return (
    <section className="relative py-10 sm:py-14 lg:py-20 px-4 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-6 lg:mb-8">
          <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium tracking-wider uppercase text-muted-foreground mb-4">
            Our Agents
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal italic tracking-tight leading-[1.1] mb-3">
            Agents That Do More<br className="hidden sm:block" /> Than Just Talk
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
            Create Voice AI agents for India that sound natural, understand context
            and take action that business oriented results without increasing your team size.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div {...fadeUp(0.08)} className="flex justify-center mb-6 lg:mb-8">
          <div className="flex flex-wrap justify-center gap-1.5 p-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="relative px-4 sm:px-6 py-2 text-sm font-medium transition-colors rounded-full"
              >
                {active === cat && (
                  <motion.div
                    layoutId="agents-tab"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  />
                )}
                <span className={`relative z-10 ${active === cat ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Agent Cards Grid — shell stays static, content cross-fades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              {...fadeUp(0.12 + i * 0.05)}
              className="h-full flex flex-col rounded-xl border border-border bg-card overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${active}-${i}`}
                  {...contentTransition}
                  transition={{ ...contentTransition.transition, delay: i * 0.035 }}
                  className="flex-1 flex flex-col"
                >
                  <AgentCardContent agent={AGENTS[active][i]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Agent Card Content (inner, animated) ────────────────────

function AgentCardContent({ agent }: { agent: Agent }) {
  const telHref = `tel:${agent.phone.replace(/\s/g, "")}`

  return (
    <>
      {/* Top section */}
      <div className="flex-1 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground mb-2">{agent.name}</h3>
            <div className="flex flex-wrap gap-1.5">
              {agent.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <button className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/15 transition-colors">
              <HugeiconsIcon icon={PlayIcon} strokeWidth={2} className="size-4" />
            </button>
            <button className="size-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center hover:bg-muted/80 transition-colors">
              <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} className="size-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{agent.description}</p>
      </div>

      {/* Phone strip */}
      <a
        href={telHref}
        className="flex items-center justify-center gap-2.5 px-5 py-3.5 border-t border-border hover:bg-muted/50 transition-colors"
      >
        <HugeiconsIcon icon={Call02Icon} strokeWidth={2} className="size-4 text-primary" />
        <span className="text-sm font-medium text-primary tracking-wide">{agent.phone}</span>
      </a>
    </>
  )
}
