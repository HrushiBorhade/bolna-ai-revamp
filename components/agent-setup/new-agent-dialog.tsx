"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  SparklesIcon,
  UserMultiple02Icon,
  SaleTag01Icon,
  CustomerService01Icon,
  Calendar01Icon,
  MegaphoneIcon,
  DeskIcon,
  Note01Icon,
  Tick02Icon,
  ShoppingCartCheckIn01Icon,
  UserAdd01Icon,
  Call02Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const languages = [
  { id: "english", label: "English" },
  { id: "hindi", label: "Hindi" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
]

const prebuiltAgents = [
  { label: "Recruitment", icon: UserMultiple02Icon },
  { label: "Lead Qualification", icon: SaleTag01Icon },
  { label: "Onboarding", icon: UserAdd01Icon },
  { label: "Cart Abandonment", icon: ShoppingCartCheckIn01Icon },
  { label: "Customer Support", icon: CustomerService01Icon },
  { label: "Reminder", icon: Call02Icon },
  { label: "Announcement", icon: MegaphoneIcon },
  { label: "Front Desk", icon: DeskIcon },
  { label: "Survey", icon: Note01Icon },
  { label: "COD Confirmation", icon: Tick02Icon },
]

type Tab = "auto-build" | "pre-built"

interface NewAgentDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function NewAgentDialog({ open: externalOpen, onOpenChange: externalOnOpenChange }: NewAgentDialogProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("auto-build")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["english"])
  const [name, setName] = useState("")

  const open = externalOpen ?? internalOpen
  const setOpen = externalOnOpenChange ?? setInternalOpen

  const toggleLanguage = (langId: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(langId)
        ? prev.filter((l) => l !== langId)
        : [...prev, langId]
    )
  }

  const handleGenerate = () => {
    // TODO: implement agent generation
    setOpen(false)
  }

  const handleSelectPrebuilt = (_label: string) => {
    // TODO: implement pre-built agent selection
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {externalOpen === undefined && (
        <DialogTrigger asChild>
          <Button size="default">
            <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
            New Agent
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Auto-build an agent with AI or start from a pre-built template.
          </DialogDescription>
        </DialogHeader>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {(["auto-build", "pre-built"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === tab
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="new-agent-tab"
                  className="absolute inset-0 rounded-md bg-background shadow-sm"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                <HugeiconsIcon
                  icon={tab === "auto-build" ? SparklesIcon : UserMultiple02Icon}
                  strokeWidth={2}
                  className="size-3.5"
                />
                {tab === "auto-build" ? "Auto Build Agent" : "Pre-built Agents"}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="h-[400px] overflow-y-auto -mx-4 px-4">
          {activeTab === "auto-build" ? (
            <div className="flex flex-col gap-4 pb-4">
              {/* Agent Name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="new-agent-name">Name</Label>
                <Input
                  id="new-agent-name"
                  placeholder="e.g. Sales Outreach Bot"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Languages */}
              <div className="flex flex-col gap-2">
                <Label>Languages</Label>
                <div className="flex flex-wrap gap-3">
                  {languages.map((lang) => (
                    <label
                      key={lang.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedLanguages.includes(lang.id)}
                        onCheckedChange={() => toggleLanguage(lang.id)}
                      />
                      <span className="text-xs">{lang.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="new-agent-goal">
                  What do you want to achieve?
                </Label>
                <Textarea
                  id="new-agent-goal"
                  placeholder="Describe the goal of this agent..."
                  className="min-h-[80px]"
                />
              </div>

              {/* Next Steps */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="new-agent-steps">Ideal Next Steps</Label>
                <Textarea
                  id="new-agent-steps"
                  placeholder="What should happen after the call?"
                  className="min-h-[60px]"
                />
              </div>

              {/* FAQs */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="new-agent-faqs">
                  FAQs / Business Documents
                </Label>
                <Textarea
                  id="new-agent-faqs"
                  placeholder="Paste FAQs or relevant business context..."
                  className="min-h-[60px]"
                />
              </div>

              {/* Sample Transcript */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="new-agent-transcript">Sample Transcript</Label>
                <Textarea
                  id="new-agent-transcript"
                  placeholder="Paste a sample conversation transcript..."
                  className="min-h-[60px]"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-2">
                <Button onClick={handleGenerate} disabled={!name.trim()}>
                  <HugeiconsIcon icon={SparklesIcon} strokeWidth={2} />
                  Generate Agent
                </Button>
                <button
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
                  onClick={() => {
                    // TODO: navigate to manual agent creation
                    setOpen(false)
                  }}
                >
                  I want to create an agent from scratch
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pb-4">
              {prebuiltAgents.map((agent) => (
                <button
                  key={agent.label}
                  onClick={() => handleSelectPrebuilt(agent.label)}
                  className="group flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-center transition-colors hover:bg-muted/50 hover:border-foreground/20"
                >
                  <div className="flex items-center justify-center size-9 rounded-md bg-muted group-hover:bg-background transition-colors">
                    <HugeiconsIcon
                      icon={agent.icon}
                      strokeWidth={2}
                      className="size-4.5 text-foreground"
                    />
                  </div>
                  <span className="text-xs font-medium">{agent.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
