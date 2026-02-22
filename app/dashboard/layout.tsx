import { cookies } from "next/headers"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { MobileBalance } from "@/components/dashboard/mobile-balance"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider defaultOpen={defaultOpen} className="h-svh !min-h-0 overflow-hidden">
        <AppSidebar />
        <SidebarInset className="min-w-0 overflow-hidden">
          {/* Mobile-only top bar */}
          <div className="lg:hidden flex h-12 shrink-0 items-center justify-between px-4">
            <SidebarTrigger className="size-8 cursor-pointer [&_svg]:size-4" />
            <MobileBalance />
          </div>
          <div className="relative flex-1 min-w-0 overflow-hidden">
            {/* Top scroll fade */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-background to-transparent z-10" />
            <div className="h-full overflow-y-auto overflow-x-hidden px-4 pb-4 pt-2 lg:px-6 lg:pb-6 lg:pt-3">
              {children}
            </div>
            {/* Bottom scroll fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-background to-transparent z-10" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
