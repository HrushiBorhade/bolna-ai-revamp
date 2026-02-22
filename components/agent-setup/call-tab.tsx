"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Call02Icon,
  Clock01Icon,
  PhoneOff01Icon,
  MicOff01Icon,
  MailVoice01Icon,
  KeyboardIcon,
  Calendar01Icon,
  Timer01Icon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  AnimatedCard,
  InfoTooltip,
  SliderValue,
  LanguagePills,
  FeatureToggle,
} from "./shared"

export function CallTab() {
  const [telephonyProvider, setTelephonyProvider] = useState("twilio")
  const [noiseCancellation, setNoiseCancellation] = useState(false)
  const [voicemailDetection, setVoicemailDetection] = useState(true)
  const [voicemailSeconds, setVoicemailSeconds] = useState("2.5")
  const [keypadInput, setKeypadInput] = useState(false)
  const [autoReschedule, setAutoReschedule] = useState(false)
  const [timingRestrictions, setTimingRestrictions] = useState(false)
  const [selectedLang, setSelectedLang] = useState("English")
  const [finalMessage, setFinalMessage] = useState("")
  const [hangupSilence, setHangupSilence] = useState(10)
  const [hangupEnabled, setHangupEnabled] = useState(true)
  const [callTimeout, setCallTimeout] = useState(600)

  return (
    <div className="flex flex-col gap-3">
      <AnimatedCard
        index={0}
        icon={Call02Icon}
        title="Call Configuration"
      >
        <div className="flex flex-col gap-1.5 sm:w-1/2">
          <Label>Telephony Provider</Label>
          <Select value={telephonyProvider} onValueChange={setTelephonyProvider}>
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="twilio">Twilio</SelectItem>
              <SelectItem value="plivo">Plivo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="flex flex-col divide-y divide-border/50">
          <FeatureToggle
            icon={MicOff01Icon}
            label="Noise Cancellation"
            tooltip="Enable AI-powered background noise removal during calls"
            checked={noiseCancellation}
            onCheckedChange={setNoiseCancellation}
          />

          <FeatureToggle
            icon={MailVoice01Icon}
            label="Voicemail Detection"
            tooltip="Detect voicemail and hang up automatically after the specified duration"
            checked={voicemailDetection}
            onCheckedChange={setVoicemailDetection}
          >
            {voicemailDetection && (
              <div className="ml-6 pb-3 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Hang up after</span>
                <Input
                  type="number"
                  min={0}
                  max={30}
                  step={0.5}
                  value={voicemailSeconds}
                  onChange={(e) => setVoicemailSeconds(e.target.value)}
                  className="h-7 w-16 text-center text-xs"
                />
                <span className="text-xs text-muted-foreground">seconds</span>
              </div>
            )}
          </FeatureToggle>

          <FeatureToggle
            icon={KeyboardIcon}
            label="Keypad Input (DTMF)"
            tooltip="Allow users to interact using keypad tones during the call"
            checked={keypadInput}
            onCheckedChange={setKeypadInput}
          />

          <FeatureToggle
            icon={Calendar01Icon}
            label="Auto Reschedule"
            tooltip="Automatically reschedule calls that go unanswered or are disconnected"
            checked={autoReschedule}
            onCheckedChange={setAutoReschedule}
          />
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Clock01Icon}
                strokeWidth={2}
                className="size-4 text-muted-foreground"
              />
              <span className="text-sm font-medium">Outbound Call Timing Restrictions</span>
              <InfoTooltip content="Restrict outbound calls to specific time windows to comply with regulations" />
            </div>
            <Switch
              checked={timingRestrictions}
              onCheckedChange={setTimingRestrictions}
            />
          </div>
          <AnimatePresence>
            {timingRestrictions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="rounded-lg bg-muted/50 border border-border px-4 py-6 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Time window configuration coming soon
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatedCard>

      <AnimatedCard
        index={1}
        icon={PhoneOff01Icon}
        title="Call Behavior"
        tooltip="Configure final call message and automatic call termination settings"
      >
        <LanguagePills
          languages={["English"]}
          selected={selectedLang}
          onSelect={setSelectedLang}
        />

        <div className="flex flex-col gap-1.5">
          <Textarea
            placeholder="e.g. Thank you for your time. Goodbye!"
            value={finalMessage}
            onChange={(e) => setFinalMessage(e.target.value)}
            className="min-h-[80px] text-sm w-full"
          />
          <span className="text-xs text-muted-foreground text-right">
            {finalMessage.length} chars
          </span>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={VolumeOffIcon}
                  strokeWidth={2}
                  className="size-4 text-muted-foreground"
                />
                <Label>Hangup on User Silence</Label>
                <InfoTooltip content="Automatically hang up if the user is silent for the specified duration" />
              </div>
              <div className="flex items-center gap-2">
                <SliderValue value={hangupSilence} suffix="s" />
                <Switch
                  checked={hangupEnabled}
                  onCheckedChange={setHangupEnabled}
                />
              </div>
            </div>
            <Slider
              value={[hangupSilence]}
              onValueChange={([v]) => setHangupSilence(v)}
              min={0}
              max={60}
              step={1}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Timer01Icon}
                  strokeWidth={2}
                  className="size-4 text-muted-foreground"
                />
                <Label>Total Call Timeout</Label>
                <InfoTooltip content="Maximum total duration for a single call before automatic termination" />
              </div>
              <SliderValue value={callTimeout} suffix="s" />
            </div>
            <Slider
              value={[callTimeout]}
              onValueChange={([v]) => setCallTimeout(v)}
              min={0}
              max={3600}
              step={10}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  )
}
