"use client"

import { useState, useRef } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AiBrain01Icon,
  BubbleChatIcon,
  CallIncoming01Icon,
  AiBrowserIcon,
  ArrowRight01Icon,
  SparklesIcon,
  CustomerService01Icon,
  SaleTag01Icon,
  Calendar01Icon,
  Note01Icon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { AnimatedCard, InfoTooltip } from "./shared"

const promptTemplates = [
  {
    label: "Customer support",
    icon: CustomerService01Icon,
    text: "You are a friendly customer support agent for our company. Your role is to help customers resolve their issues efficiently and empathetically. Always greet the customer, listen to their concern, provide clear solutions, and confirm resolution before ending the call. Keep responses concise - no more than 2-3 sentences at a time.",
  },
  {
    label: "Sales outreach",
    icon: SaleTag01Icon,
    text: "You are a professional sales representative making outbound calls. Your goal is to introduce our product, understand the prospect's needs, address objections, and schedule a follow-up meeting. Be conversational, not pushy. Ask open-ended questions to understand pain points before presenting solutions.",
  },
  {
    label: "Appointment booking",
    icon: Calendar01Icon,
    text: "You are an appointment scheduling assistant. Help callers book, reschedule, or cancel appointments. Collect their name, preferred date and time, and reason for the appointment. Confirm all details before finalizing. If the requested slot is unavailable, suggest the nearest available alternatives.",
  },
  {
    label: "Survey collection",
    icon: Note01Icon,
    text: "You are a survey agent conducting a brief customer satisfaction survey. Ask questions one at a time, wait for responses, and record answers. Be polite and thank the respondent after each answer. Keep the survey under 5 questions and summarize their feedback at the end.",
  },
]

export function AgentConfigTab() {
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const [promptValue, setPromptValue] = useState(
    "You are a helpful agent. You will help the customer with their queries and doubts. You will never speak more than 2 sentences. Keep your responses concise."
  )
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleInsertTemplate(text: string) {
    setPromptValue(text)
    textareaRef.current?.focus()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-3">
      <div className="flex flex-col gap-3 min-w-0">
        <AnimatedCard
          index={0}
          icon={AiBrain01Icon}
          title="Agent Configuration"
          tooltip="Configure your agent's greeting and behavior instructions"
          action={
            <Badge variant="secondary" className="gap-1">
              <HugeiconsIcon
                icon={SparklesIcon}
                strokeWidth={2}
                className="size-3"
              />
              AI Edit
            </Badge>
          }
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium flex items-center gap-1">
              Welcome Message
              <InfoTooltip content="The first message your agent says when a call starts" />
            </label>
            <Input
              placeholder="Hello! Thanks for calling. How can I help you today?"
              className="h-9"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Tip: Use <code className="bg-muted px-1.5 py-0.5 rounded text-[11px] font-mono">{"{variable_name}"}</code> to insert dynamic values like caller name
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">System Prompt</label>
            <Textarea
              ref={textareaRef}
              className="min-h-[180px] text-sm leading-relaxed"
              value={promptValue}
              onChange={(e) => setPromptValue(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">
              Quick templates
            </p>
            <div className="flex flex-wrap gap-2">
              {promptTemplates.map((template) => (
                <Button
                  key={template.label}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs gap-1.5 rounded-full"
                  onClick={() => handleInsertTemplate(template.text)}
                >
                  <HugeiconsIcon
                    icon={template.icon}
                    strokeWidth={2}
                    className="size-3.5"
                  />
                  {template.label}
                </Button>
              ))}
            </div>
          </div>
        </AnimatedCard>
      </div>

      <div className="flex flex-col gap-3 lg:sticky lg:top-0 lg:self-start min-w-0">
        <AnimatedCard index={2} icon={BubbleChatIcon} title="Quick Actions">
          <ActionButton
            icon={BubbleChatIcon}
            title="Chat with agent"
            description="Test your agent via text chat"
          />
          <ActionButton
            icon={CallIncoming01Icon}
            title="Get call from agent"
            description="Receive a phone call from this agent"
          />
          <ActionButton
            icon={AiBrowserIcon}
            title="Test via browser"
            description="Test voice interaction in your browser"
            badge="BETA"
          />
          <Separator className="my-1" />
          <Button
            variant="ghost"
            className="justify-between text-sm h-9 px-3"
          >
            <span>See all call logs</span>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
        </AnimatedCard>
      </div>
    </div>
  )
}

function ActionButton({
  icon,
  title,
  description,
  badge,
}: {
  icon: typeof BubbleChatIcon
  title: string
  description: string
  badge?: string
}) {
  return (
    <Button
      variant="outline"
      className="h-auto flex-col items-start gap-1 px-3.5 py-3 text-left"
    >
      <div className="flex items-center gap-2 w-full">
        <HugeiconsIcon icon={icon} strokeWidth={2} className="size-4 shrink-0" />
        <span className="text-sm font-medium">{title}</span>
        {badge && (
          <Badge
            variant="secondary"
            className="ml-auto text-[10px] px-1.5 py-0 h-4"
          >
            {badge}
          </Badge>
        )}
      </div>
      <span className="text-xs text-muted-foreground pl-6">{description}</span>
    </Button>
  )
}
