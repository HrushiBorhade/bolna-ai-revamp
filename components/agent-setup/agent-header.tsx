"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FloppyDiskIcon,
  BubbleChatIcon,
  CallIncoming01Icon,
  AiBrowserIcon,
  GlobeIcon,
  Clock01Icon,
  CheckmarkCircle01Icon,
  Copy01Icon,
  Tick01Icon,
  UnfoldMoreIcon,
  MoreVerticalIcon,
  FileImportIcon,
  Add01Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { CostBreakdown } from "./cost-breakdown"
import { ImportAgentDialog } from "./import-agent-dialog"
import { NewAgentDialog } from "./new-agent-dialog"

const agents = [
  { id: "agent_8f3k2m1x9p4v", name: "My New Agent", costPerMin: 0.102, routing: "India", status: "Active" as const, lastUpdated: "39 minutes ago" },
  { id: "agent_2x9m4k7p1v3f", name: "Sales Bot", costPerMin: 0.089, routing: "US", status: "Active" as const, lastUpdated: "2 hours ago" },
  { id: "agent_5n8j2r6w0t4q", name: "Support Agent", costPerMin: 0.115, routing: "EU", status: "Active" as const, lastUpdated: "1 day ago" },
]

const costBreakdown = {
  transcriber: { cost: 0.015, label: "Transcriber", color: "bg-emerald-500" },
  llm: { cost: 0.045, label: "LLM", color: "bg-red-500" },
  voice: { cost: 0.032, label: "Voice", color: "bg-amber-500" },
  telephony: { cost: 0.01, label: "Telephony", color: "bg-blue-500" },
}

export function AgentHeader() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0].id)
  const [selectorOpen, setSelectorOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [newAgentOpen, setNewAgentOpen] = useState(false)
  const currentAgent = agents.find((a) => a.id === selectedAgent) ?? agents[0]

  const handleCopyAgentId = async () => {
    try {
      await navigator.clipboard.writeText(currentAgent.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available (non-HTTPS, unfocused tab, etc.)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-5"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Agent Setup</h1>
        <div className="flex items-center gap-2">
          <div className="hidden sm:contents">
            <ImportAgentDialog />
            <NewAgentDialog />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="hidden sm:inline-flex">
                <HugeiconsIcon icon={CallIncoming01Icon} strokeWidth={2} />
                Test Agent
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem>
                <HugeiconsIcon icon={BubbleChatIcon} strokeWidth={2} />
                Chat
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={CallIncoming01Icon} strokeWidth={2} />
                Get call
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={AiBrowserIcon} strokeWidth={2} />
                Test via browser
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden size-8">
                <HugeiconsIcon icon={MoreVerticalIcon} strokeWidth={2} className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onSelect={() => setImportOpen(true)}>
                <HugeiconsIcon icon={FileImportIcon} strokeWidth={2} />
                Import Agent
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setNewAgentOpen(true)}>
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
                New Agent
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <HugeiconsIcon icon={BubbleChatIcon} strokeWidth={2} />
                Chat with agent
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={CallIncoming01Icon} strokeWidth={2} />
                Get call from agent
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={AiBrowserIcon} strokeWidth={2} />
                Test via browser
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ImportAgentDialog open={importOpen} onOpenChange={setImportOpen} />
          <NewAgentDialog open={newAgentOpen} onOpenChange={setNewAgentOpen} />

          <Button>
            <HugeiconsIcon icon={FloppyDiskIcon} strokeWidth={2} />
            Save
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Popover open={selectorOpen} onOpenChange={setSelectorOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={selectorOpen}
                className="w-full sm:max-w-[280px] justify-between font-normal"
              >
                {currentAgent.name}
                <HugeiconsIcon icon={UnfoldMoreIcon} strokeWidth={2} className="size-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search agents..." />
                <CommandList>
                  <CommandEmpty>No agent found.</CommandEmpty>
                  <CommandGroup>
                    {agents.map((agent) => (
                      <CommandItem
                        key={agent.id}
                        value={agent.name}
                        data-checked={selectedAgent === agent.id}
                        onSelect={() => {
                          setSelectedAgent(agent.id)
                          setSelectorOpen(false)
                        }}
                      >
                        {agent.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Badge
            variant="secondary"
            className="gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0"
          >
            <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="size-3" />
            {currentAgent.status}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="font-medium">ID</span>
            <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[11px]">
              {currentAgent.id}
            </code>
            <button
              onClick={handleCopyAgentId}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.div
                    key="tick"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.12 }}
                  >
                    <HugeiconsIcon icon={Tick01Icon} strokeWidth={2} className="size-3 text-emerald-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.12 }}
                  >
                    <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} className="size-3" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          <div className="hidden sm:block h-3 w-px bg-border" />

          <div className="flex items-center gap-1.5">
            <HugeiconsIcon icon={GlobeIcon} strokeWidth={2} className="size-3" />
            {currentAgent.routing}
          </div>

          <div className="hidden sm:block h-3 w-px bg-border" />

          <div className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="size-3" />
            {currentAgent.lastUpdated}
          </div>
        </div>
      </div>

      <CostBreakdown
        breakdown={costBreakdown}
        className="flex"
      />
    </motion.div>
  )
}
