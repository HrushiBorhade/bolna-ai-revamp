"use client"

import { useState } from "react"
import {
  AiBrain01Icon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  AnimatedCard,
  SliderField,
  DocsLink,
  EmptyActionButton,
} from "./shared"

export function LlmTab() {
  const [provider, setProvider] = useState("azure")
  const [model, setModel] = useState("gpt-4.1-mini-cluster")
  const [maxTokens, setMaxTokens] = useState(150)
  const [temperature, setTemperature] = useState(0.1)
  const [knowledgeBase, setKnowledgeBase] = useState("")

  return (
    <div className="flex flex-col gap-3">
      <AnimatedCard
        index={0}
        icon={AiBrain01Icon}
        title="LLM Configuration"
        tooltip="Select the LLM provider, model, and fine-tune generation parameters"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          <div className="flex flex-col gap-1.5">
            <Label>Provider</Label>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="azure">Azure</SelectItem>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="openrouter">OpenRouter</SelectItem>
                <SelectItem value="perplexity">Perplexity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4.1-mini-cluster">gpt-4.1-mini cluster</SelectItem>
                <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          <SliderField
            label="Tokens generated on each LLM output"
            value={maxTokens}
            onValueChange={setMaxTokens}
            min={1}
            max={500}
            step={1}
            description="Increasing tokens enables longer responses to be queued for speech generation but increases latency"
          />
          <SliderField
            label="Temperature"
            value={temperature}
            onValueChange={setTemperature}
            min={0}
            max={1}
            step={0.1}
            description="Increasing temperature enables heightened creativity, but increases chance of deviation from prompt."
          />
        </div>

        <Separator />

        <div className="flex flex-col gap-1.5">
          <Label>Add knowledge base <span className="text-muted-foreground font-normal">(Multi-select)</span></Label>
          <Select value={knowledgeBase} onValueChange={setKnowledgeBase}>
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Select knowledge bases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product-docs">Product Documentation</SelectItem>
              <SelectItem value="faq">FAQ Database</SelectItem>
              <SelectItem value="policies">Company Policies</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </AnimatedCard>

      <AnimatedCard
        index={1}
        icon={Wrench01Icon}
        title="Add FAQs & Guardrail"
        tooltip="Add structured FAQs and safety guardrails for your agent"
        action={<DocsLink href="#" label="View Docs" />}
      >
        <div className="flex flex-col items-center gap-2 py-1">
          <p className="text-sm text-muted-foreground text-center">
            Add structured Q&A pairs to guide your agent&apos;s responses
          </p>
          <EmptyActionButton label="Add blocks for FAQs & Guardrails" />
        </div>
      </AnimatedCard>
    </div>
  )
}
