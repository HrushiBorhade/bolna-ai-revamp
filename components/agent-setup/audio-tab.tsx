"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mic01Icon,
  VolumeHighIcon,
  PlayIcon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AnimatedCard, InfoTooltip, SliderField } from "./shared"

export function AudioTab() {
  const [language, setLanguage] = useState("hindi")
  const [sttProvider, setSttProvider] = useState("deepgram")
  const [sttModel, setSttModel] = useState("nova-3")
  const [keywords, setKeywords] = useState("Bruce:100")

  const [ttsProvider, setTtsProvider] = useState("elevenlabs")
  const [ttsModel, setTtsModel] = useState("eleven_turbo_v2_5")
  const [ttsVoice, setTtsVoice] = useState("ziina")
  const [bufferSize, setBufferSize] = useState(200)
  const [speedRate, setSpeedRate] = useState(1)
  const [similarityBoost, setSimilarityBoost] = useState(0.75)
  const [stability, setStability] = useState(0.5)
  const [styleExaggeration, setStyleExaggeration] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      <AnimatedCard
        index={0}
        icon={Mic01Icon}
        title="Speech-to-Text"
        tooltip="Configure language, speech recognition provider, and model for transcribing caller audio"
      >
        <div className="flex flex-col gap-1.5 sm:w-1/2">
          <label className="text-sm font-medium">Language</label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="korean">Korean</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
              <SelectItem value="portuguese">Portuguese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Provider</label>
            <Select value={sttProvider} onValueChange={setSttProvider}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deepgram">Deepgram</SelectItem>
                <SelectItem value="bolna">Bolna</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Model</label>
            <Select value={sttModel} onValueChange={setSttModel}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nova-3">nova-3</SelectItem>
                <SelectItem value="nova-2">nova-2</SelectItem>
                <SelectItem value="whisper">whisper</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <label className="text-sm font-medium">Keywords</label>
            <InfoTooltip content="Boost recognition accuracy for specific words. Format: word:weight (higher weight = stronger boost)" />
          </div>
          <Input
            placeholder="word:weight, e.g. Bruce:100"
            className="h-9"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated keywords with boost weights. Format: word:weight (e.g. Bruce:100, Bolna:80)
          </p>
        </div>
      </AnimatedCard>

      <AnimatedCard
        index={1}
        icon={VolumeHighIcon}
        title="Text-to-Speech"
        tooltip="Configure the voice synthesis provider, model, and voice for your agent's spoken responses"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Provider</label>
            <Select value={ttsProvider} onValueChange={setTtsProvider}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="elevenlabs">Elevenlabs</SelectItem>
                <SelectItem value="cartesia">Cartesia</SelectItem>
                <SelectItem value="bolna">Bolna</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Model</label>
            <Select value={ttsModel} onValueChange={setTtsModel}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eleven_turbo_v2_5">eleven_turbo_v2_5</SelectItem>
                <SelectItem value="eleven_multilingual_v2">eleven_multilingual_v2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Voice</label>
            <Select value={ttsVoice} onValueChange={setTtsVoice}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ziina">Ziina - Confident & Clear</SelectItem>
                <SelectItem value="rachel">Rachel - Calm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="size-9 rounded-full shrink-0"
          >
            <HugeiconsIcon
              icon={PlayIcon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
          <span className="text-xs text-muted-foreground">Preview voice</span>
          <div className="flex-1" />
          <Button variant="link" size="sm" className="gap-1 text-xs shrink-0">
            Add voices
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              strokeWidth={2}
              className="size-3"
            />
          </Button>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
          <SliderField
            label="Similarity Boost"
            tooltip="How closely the output matches the original voice. Higher values sound more like the voice sample."
            value={similarityBoost}
            onValueChange={setSimilarityBoost}
            min={0}
            max={1}
            step={0.01}
          />
          <SliderField
            label="Stability"
            tooltip="How consistent the voice sounds across generations. Lower values are more expressive but less predictable."
            value={stability}
            onValueChange={setStability}
            min={0}
            max={1}
            step={0.01}
          />
          <SliderField
            label="Style Exaggeration"
            tooltip="Amplifies the style of the original speaker. Use with caution — high values can distort the voice."
            value={styleExaggeration}
            onValueChange={setStyleExaggeration}
            min={0}
            max={1}
            step={0.01}
          />
          <SliderField
            label="Buffer Size"
            tooltip="Number of characters to buffer before sending to TTS. Higher values reduce API calls but increase latency."
            value={bufferSize}
            onValueChange={setBufferSize}
            min={0}
            max={500}
            step={1}
          />
          <SliderField
            label="Speed rate"
            tooltip="Playback speed multiplier for the generated speech"
            value={speedRate}
            onValueChange={setSpeedRate}
            min={0.5}
            max={2}
            step={0.1}
          />
        </div>
      </AnimatedCard>
    </div>
  )
}
