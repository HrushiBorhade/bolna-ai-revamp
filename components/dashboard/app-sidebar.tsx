"use client"

import * as React from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Wallet01Icon, Add01Icon } from "@hugeicons/core-free-icons"

import { platformItems, teamItems } from "@/components/dashboard/sidebar-items"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* Expanded: logo + toggle */}
        <div className="flex items-center justify-between group-data-[collapsible=icon]:hidden">
          <Link href="/" className="flex items-center h-10 px-2 cursor-pointer">
            <img
              src="/bolna-logo.png"
              alt="Bolna"
              className="h-8 w-auto"
            />
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="size-8 shrink-0 cursor-pointer [&_svg]:size-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
            </TooltipTrigger>
            <TooltipContent side="right">Toggle Sidebar</TooltipContent>
          </Tooltip>
        </div>
        {/* Collapsed: just the expand trigger centered */}
        <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="size-8 cursor-pointer [&_svg]:size-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
            </TooltipTrigger>
            <TooltipContent side="right">Toggle Sidebar</TooltipContent>
          </Tooltip>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function SidebarBalance() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* Expanded state — static balance + interactive add funds */}
        <div className="flex items-center gap-2 rounded-[calc(var(--radius-sm)+2px)] p-2 h-12 group-data-[collapsible=icon]:hidden">
          <HugeiconsIcon icon={Wallet01Icon} strokeWidth={2} className="size-4 shrink-0 text-sidebar-foreground" />
          <div className="grid flex-1 text-left text-xs leading-tight">
            <span className="truncate font-medium">$5.00</span>
            <span className="truncate text-[0.625rem] text-muted-foreground">Balance</span>
          </div>
          <div className="h-4 w-px bg-sidebar-border shrink-0" />
          <button className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer shrink-0">
            <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="size-3.5" />
            Add funds
          </button>
        </div>
        {/* Collapsed state */}
        <SidebarMenuButton tooltip="$5.00 — Add funds" className="hidden group-data-[collapsible=icon]:flex size-8">
          <HugeiconsIcon icon={Wallet01Icon} strokeWidth={2} className="size-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={platformItems} label="Platform" />
        <NavMain items={teamItems} label="Team" />
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-1 group-data-[collapsible=icon]:hidden">
          <a
            href="https://github.com/HrushiBorhade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
            </span>
            Built by HrushiBorhade
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
        <SidebarBalance />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
