"use client"

import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserAccountIcon,
  Setting06Icon,
  Logout01Icon,
  UnfoldMoreIcon,
  Sun01Icon,
  Moon01Icon,
  ComputerIcon,
} from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const user = {
  name: "Hrushi Borhade",
  email: "hrushiborhade@gmail.com",
  initials: "HB",
}

export function NavUser() {
  const { isMobile } = useSidebar()
  const { setTheme, theme } = useTheme()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground group-data-[collapsible=icon]:p-1!"
            >
              <Avatar size="sm" className="rounded-lg">
                <AvatarFallback className="rounded-lg text-xs">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-[0.625rem] text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <HugeiconsIcon
                icon={UnfoldMoreIcon}
                strokeWidth={2}
                className="ml-auto size-4"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-xs">
                <Avatar size="sm" className="rounded-lg">
                  <AvatarFallback className="rounded-lg text-xs">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-[0.625rem] text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={UserAccountIcon} strokeWidth={2} />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Setting06Icon} strokeWidth={2} />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <HugeiconsIcon
                    icon={theme === "dark" ? Moon01Icon : Sun01Icon}
                    strokeWidth={2}
                  />
                  Theme
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <HugeiconsIcon icon={Sun01Icon} strokeWidth={2} />
                    Light
                    {theme === "light" && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        ✓
                      </span>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <HugeiconsIcon icon={Moon01Icon} strokeWidth={2} />
                    Dark
                    {theme === "dark" && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        ✓
                      </span>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <HugeiconsIcon icon={ComputerIcon} strokeWidth={2} />
                    System
                    {theme === "system" && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        ✓
                      </span>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
