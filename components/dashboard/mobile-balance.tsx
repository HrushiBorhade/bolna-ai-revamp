"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Wallet01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

export function MobileBalance() {
  return (
    <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
      <HugeiconsIcon icon={Wallet01Icon} strokeWidth={2} className="size-3.5" />
      $5.00
    </Button>
  )
}
