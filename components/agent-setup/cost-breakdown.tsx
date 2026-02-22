"use client"

import { cn } from "@/lib/utils"

interface CostCategory {
  cost: number
  label: string
  color: string
}

interface CostBreakdownProps {
  breakdown: Record<string, CostCategory>
  className?: string
}

export function CostBreakdown({ breakdown, className }: CostBreakdownProps) {
  const categories = Object.values(breakdown)
  const total = categories.reduce((sum, cat) => sum + cat.cost, 0)

  if (categories.length === 0) return null

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-semibold text-foreground">
            ${total.toFixed(3)}
          </span>
          <span className="text-[11px] text-muted-foreground">/min</span>
        </div>
        <div className="flex h-1.5 w-24 overflow-hidden rounded-full bg-muted">
          {categories.map((cat) => {
            const widthPercent = total > 0 ? (cat.cost / total) * 100 : 0
            return (
              <div
                key={cat.label}
                className={cn(
                  "h-full first:rounded-l-full last:rounded-r-full",
                  cat.color
                )}
                style={{ width: `${widthPercent}%` }}
              />
            )
          })}
        </div>
      </div>

      <div className="hidden sm:block h-8 w-px bg-border" />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {categories.map((cat) => (
          <div key={cat.label} className="flex items-center gap-1.5">
            <div className={cn("size-2 rounded-full shrink-0", cat.color)} />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {cat.label}
            </span>
            <span className="text-xs font-medium text-foreground">
              ${cat.cost.toFixed(3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
