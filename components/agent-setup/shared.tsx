"use client"

import { motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  InformationCircleIcon,
  ArrowRight01Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons"
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function cardAnimation(i: number) {
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: i * 0.03,
      duration: 0.15,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }
}

export function InfoTooltip({ content }: { content: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="More information"
            className="text-muted-foreground hover:text-foreground transition-colors p-2.5 -m-2.5"
          >
            <HugeiconsIcon
              icon={InformationCircleIcon}
              strokeWidth={2}
              className="size-3.5"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function SliderValue({
  value,
  suffix = "",
  variant = "default",
}: {
  value: number | string
  suffix?: string
  variant?: "default" | "primary"
}) {
  return (
    <span
      className={cn(
        "text-sm font-medium tabular-nums px-2.5 py-0.5 rounded-md whitespace-nowrap",
        variant === "primary"
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-foreground"
      )}
    >
      {value}
      {suffix}
    </span>
  )
}

export function DocsLink({
  href = "#",
  label = "View docs",
}: {
  href?: string
  label?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs font-medium text-primary/80 hover:text-primary hover:underline flex items-center gap-1 transition-colors"
    >
      {label}
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        strokeWidth={2}
        className="size-3"
      />
    </a>
  )
}

export function LanguagePills({
  languages,
  selected,
  onSelect,
  onAdd,
}: {
  languages: string[]
  selected: string
  onSelect: (lang: string) => void
  onAdd?: () => void
}) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {languages.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onSelect(lang)}
          className={cn(
            "px-3 py-1 text-xs font-medium rounded-full transition-colors",
            selected === lang
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          {lang}
        </button>
      ))}
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="size-3" />
          Add
        </button>
      )}
    </div>
  )
}

export function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase select-none">
        {title}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

export function EmptyActionButton({
  icon,
  label,
  onClick,
}: {
  icon?: typeof Add01Icon
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border-2 border-dashed border-muted-foreground/15 rounded-lg py-5 text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-muted/30 transition-all cursor-pointer flex items-center justify-center gap-2"
    >
      <HugeiconsIcon
        icon={icon ?? Add01Icon}
        strokeWidth={2}
        className="size-4"
      />
      {label}
    </button>
  )
}

export function AnimatedCard({
  index,
  icon,
  title,
  tooltip,
  action,
  children,
}: {
  index: number
  icon: typeof Add01Icon
  title: string
  tooltip?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <motion.div {...cardAnimation(index)}>
      <Card size="sm" className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-7 rounded-md bg-muted">
              <HugeiconsIcon
                icon={icon}
                strokeWidth={2}
                className="size-4 text-foreground"
              />
            </div>
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            {tooltip && <InfoTooltip content={tooltip} />}
          </div>
          {action && <CardAction>{action}</CardAction>}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function SliderField({
  label,
  tooltip,
  value,
  onValueChange,
  min,
  max,
  step,
  description,
  icon,
}: {
  label: string
  tooltip?: string
  value: number
  onValueChange: (value: number) => void
  min: number
  max: number
  step: number
  description?: string
  icon?: typeof Add01Icon
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {icon && (
            <HugeiconsIcon
              icon={icon}
              strokeWidth={2}
              className="size-4 text-muted-foreground"
            />
          )}
          <p className="text-sm font-medium">{label}</p>
          {tooltip && <InfoTooltip content={tooltip} />}
        </div>
        <SliderValue value={Number.isInteger(step) ? value : value.toFixed(step < 0.1 ? 2 : 1)} />
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onValueChange(v)}
        min={min}
        max={max}
        step={step}
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

export function FeatureToggle({
  icon,
  label,
  tooltip,
  checked,
  onCheckedChange,
  children,
}: {
  icon: typeof Add01Icon
  label: string
  tooltip: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  children?: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={icon}
            strokeWidth={2}
            className="size-4 text-muted-foreground"
          />
          <span className="text-sm font-medium">{label}</span>
          <InfoTooltip content={tooltip} />
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </div>
      {children}
    </div>
  )
}
