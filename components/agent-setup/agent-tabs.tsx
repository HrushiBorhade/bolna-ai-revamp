"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Robot01Icon,
  AiBrain01Icon,
  AudioWaveIcon,
  EngineIcon,
  Call02Icon,
  Wrench01Icon,
  Analytics01Icon,
  CallIncoming01Icon,
} from "@hugeicons/core-free-icons"
import { AgentConfigTab } from "./agent-config-tab"
import { LlmTab } from "./llm-tab"
import { AudioTab } from "./audio-tab"
import { EngineTab } from "./engine-tab"
import { CallTab } from "./call-tab"
import { ToolsTab } from "./tools-tab"
import { AnalyticsTab } from "./analytics-tab"
import { InboundTab } from "./inbound-tab"
import { cn } from "@/lib/utils"

const tabs = [
  { value: "agent", label: "Agent", icon: Robot01Icon },
  { value: "llm", label: "LLM", icon: AiBrain01Icon },
  { value: "audio", label: "Audio", icon: AudioWaveIcon },
  { value: "engine", label: "Engine", icon: EngineIcon },
  { value: "call", label: "Call", icon: Call02Icon },
  { value: "tools", label: "Tools", icon: Wrench01Icon },
  { value: "analytics", label: "Analytics", icon: Analytics01Icon },
  { value: "inbound", label: "Inbound", icon: CallIncoming01Icon },
]

const tabComponents: Record<string, React.ComponentType> = {
  agent: AgentConfigTab,
  llm: LlmTab,
  audio: AudioTab,
  engine: EngineTab,
  call: CallTab,
  tools: ToolsTab,
  analytics: AnalyticsTab,
  inbound: InboundTab,
}

export function AgentTabs() {
  const [activeTab, setActiveTab] = useState("agent")
  const TabComponent = tabComponents[activeTab]

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
        className="relative"
      >
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 sm:hidden" />
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 min-w-max">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.value
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 pt-2 pb-3 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <HugeiconsIcon
                    icon={tab.icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-foreground rounded-full"
                      initial={{ opacity: 0, scaleX: 0.5 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {TabComponent && <TabComponent />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
