"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  TextAlignLeftIcon,
  Notification01Icon,
} from "@hugeicons/core-free-icons"
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  cardAnimation,
  AnimatedCard,
  SliderField,
  SliderValue,
  DocsLink,
  LanguagePills,
} from "./shared"

export function EngineTab() {
  const [preciseTranscript, setPreciseTranscript] = useState(false)
  const [interruptWords, setInterruptWords] = useState(3)
  const [responseRate, setResponseRate] = useState("custom")
  const [endpointing, setEndpointing] = useState(100)
  const [linearDelay, setLinearDelay] = useState(500)
  const [userDetectionEnabled, setUserDetectionEnabled] = useState(false)
  const [selectedLang, setSelectedLang] = useState("English")
  const [detectionMessage, setDetectionMessage] = useState("")
  const [invokeAfter, setInvokeAfter] = useState(9)

  return (
    <div className="flex flex-col gap-3">
      <AnimatedCard
        index={0}
        icon={TextAlignLeftIcon}
        title="Engine Configuration"
        tooltip="Configure transcript accuracy, interruption handling, and response latency"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label>Generate precise transcript</Label>
            <Switch
              checked={preciseTranscript}
              onCheckedChange={setPreciseTranscript}
            />
          </div>
          <DocsLink href="#" label="View docs" />
        </div>

        <Separator />

        <SliderField
          label="Number of words to wait for before interrupting"
          value={interruptWords}
          onValueChange={setInterruptWords}
          min={1}
          max={10}
          step={1}
          description={`Agent will not consider interruptions until ${interruptWords} words are spoken (If recipient says "Stopwords" such as Stop, Wait, Hold On, agent will pause by default)`}
        />

        <Separator />

        <div className="flex flex-col gap-1.5 sm:w-1/2">
          <Label>Response Rate</Label>
          <Select value={responseRate} onValueChange={setResponseRate}>
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Select response rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom">Custom</SelectItem>
              <SelectItem value="fast">Fast</SelectItem>
              <SelectItem value="relaxed">Relaxed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          <SliderField
            label="Endpointing (ms)"
            value={endpointing}
            onValueChange={setEndpointing}
            min={0}
            max={1000}
            step={10}
            description="Time in milliseconds to wait after the user stops speaking before generating a response"
          />
          <SliderField
            label="Linear Delay (ms)"
            value={linearDelay}
            onValueChange={setLinearDelay}
            min={0}
            max={2000}
            step={50}
            description="Additional fixed delay added before sending the response to the user"
          />
        </div>

        <div className="rounded-lg bg-blue-500/5 border border-blue-500/10 px-4 py-3">
          <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
            Set custom Endpointing and Linear Delay values as per your requirement
          </p>
        </div>
      </AnimatedCard>

      <motion.div {...cardAnimation(1)}>
        <Card size="sm" className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-7 rounded-md bg-muted">
                <HugeiconsIcon
                  icon={Notification01Icon}
                  strokeWidth={2}
                  className="size-4 text-foreground"
                />
              </div>
              <CardTitle className="text-base font-medium">
                User Online Detection
              </CardTitle>
            </div>
            <CardAction>
              <Switch
                checked={userDetectionEnabled}
                onCheckedChange={setUserDetectionEnabled}
              />
            </CardAction>
          </CardHeader>
          <AnimatePresence>
            {userDetectionEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <CardContent className="flex flex-col gap-3">
                  <LanguagePills
                    languages={["English"]}
                    selected={selectedLang}
                    onSelect={setSelectedLang}
                  />

                  <div className="flex flex-col gap-1.5">
                    <Textarea
                      placeholder="Hey, are you still there"
                      value={detectionMessage}
                      onChange={(e) => setDetectionMessage(e.target.value)}
                      className="min-h-[80px] text-sm w-full"
                    />
                    <span className="text-xs text-muted-foreground text-right">
                      {detectionMessage.length} chars
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Label>Invoke message after (seconds)</Label>
                      <SliderValue value={invokeAfter} variant="primary" />
                    </div>
                    <Slider
                      value={[invokeAfter]}
                      onValueChange={([v]) => setInvokeAfter(v)}
                      min={0}
                      max={30}
                      step={1}
                    />
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  )
}
