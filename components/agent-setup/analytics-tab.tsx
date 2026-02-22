"use client"

import { useState } from "react"
import {
  Link01Icon,
  Analytics01Icon,
} from "@hugeicons/core-free-icons"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AnimatedCard, DocsLink, EmptyActionButton } from "./shared"

export function AnalyticsTab() {
  const [webhookUrl, setWebhookUrl] = useState(
    "https://hepatitis-furniture-nebraska-marble.trycloudflare.com/webhooks/bolna"
  )
  const [summarization, setSummarization] = useState(false)
  const [extraction, setExtraction] = useState(false)
  const [extractionPrompt, setExtractionPrompt] = useState(
    "user_name : Yield the name of the user.\npayment_mode : If user is paying by cash, yield cash. If they are paying by card yield card. Else yield NA"
  )

  return (
    <div className="flex flex-col gap-3">
      <AnimatedCard
        index={0}
        icon={Link01Icon}
        title="Push all execution data to webhook"
        tooltip="Send real-time call data and events to your webhook endpoint"
        action={<DocsLink label="See all events" />}
      >
        <Input
          type="url"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          placeholder="https://your-webhook-url.com/endpoint"
          className="h-9"
        />
      </AnimatedCard>

      <AnimatedCard
        index={1}
        icon={Analytics01Icon}
        title="Post Call Tasks"
        tooltip="Automatically process and extract data after each call ends"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Summarization</span>
            <span className="text-xs text-muted-foreground">
              Generate a summary of the conversation automatically.
            </span>
          </div>
          <Switch
            checked={summarization}
            onCheckedChange={setSummarization}
          />
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Extraction</span>
              <span className="text-xs text-muted-foreground">
                Extract structured data from the conversation based on your
                custom prompt
              </span>
            </div>
            <Switch
              checked={extraction}
              onCheckedChange={setExtraction}
            />
          </div>
          <Textarea
            className="min-h-[80px] leading-relaxed font-mono text-xs"
            placeholder="user_name : Yield the name of the user.&#10;payment_mode : If user is paying by cash, yield cash. If they are paying by card yield card. Else yield NA"
            value={extractionPrompt}
            onChange={(e) => setExtractionPrompt(e.target.value)}
          />
          <div className="flex justify-end">
            <span className="text-xs text-muted-foreground">
              {extractionPrompt.length} characters
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Custom Analytics</label>
          <p className="text-xs text-muted-foreground">
            Post call tasks to extract data from the call
          </p>
          <EmptyActionButton label="Extract custom analytics" />
        </div>
      </AnimatedCard>
    </div>
  )
}
