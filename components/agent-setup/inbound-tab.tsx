"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CallIncoming01Icon,
  Settings01Icon,
  TelephoneIcon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AnimatedCard, InfoTooltip, DocsLink, SectionDivider } from "./shared"

export function InboundTab() {
  const [maxCalls, setMaxCalls] = useState("-1")
  const [whitelist, setWhitelist] = useState("")

  return (
    <div className="flex flex-col gap-3">
      <AnimatedCard
        index={0}
        icon={CallIncoming01Icon}
        title="Inbound Agent Settings"
        action={
          <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <HugeiconsIcon
              icon={Settings01Icon}
              strokeWidth={2}
              className="size-4"
            />
          </button>
        }
      >
        <p className="text-sm text-muted-foreground">
          Tweak your inbound agents and add your call settings for receiving
          incoming calls.
        </p>

        <SectionDivider title="Database for Inbound Phone Numbers" />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">
              Match incoming calls to users and preload their data before the
              call starts
            </p>
            <DocsLink label="Docs" />
          </div>

          <Select disabled>
            <SelectTrigger className="w-full sm:w-1/2 h-9 opacity-60">
              <SelectValue placeholder="Select data source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="postgres">PostgreSQL</SelectItem>
              <SelectItem value="mysql">MySQL</SelectItem>
              <SelectItem value="sheets">Google Sheets</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Allow incoming phone calls only from the chosen database
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 py-6 border-2 border-dashed border-muted-foreground/15 rounded-lg bg-muted/20">
          <div className="flex items-center justify-center size-14 rounded-full bg-muted">
            <HugeiconsIcon
              icon={TelephoneIcon}
              strokeWidth={1.5}
              className="size-6 text-muted-foreground"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            This agent isn&apos;t linked to an inbound phone number
          </p>
          <Button variant="outline" size="sm">
            <HugeiconsIcon
              icon={TelephoneIcon}
              strokeWidth={2}
              className="size-3.5"
            />
            Set inbound number
          </Button>
        </div>

        <SectionDivider title="Spam Prevention Settings" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <label className="text-sm font-medium">Max calls per number</label>
              <InfoTooltip content="Set to -1 for unlimited calls. Limits how many calls a single number can make." />
            </div>
            <Input
              type="number"
              min={-1}
              value={maxCalls}
              onChange={(e) => setMaxCalls(e.target.value)}
              className="h-9"
            />
            <p className="text-xs text-muted-foreground">-1 = unlimited</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <label className="text-sm font-medium">Always-allow list</label>
              <InfoTooltip content="Phone numbers in this list will never be blocked or rate-limited" />
            </div>
            <Input
              value={whitelist}
              onChange={(e) => setWhitelist(e.target.value)}
              placeholder="+1234567890, +0987654321"
              className="h-9"
            />
            <p className="text-xs text-muted-foreground">Comma-separated numbers</p>
          </div>
        </div>
      </AnimatedCard>
    </div>
  )
}
