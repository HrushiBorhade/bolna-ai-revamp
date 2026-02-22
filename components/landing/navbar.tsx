"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Menu01Icon,
  ArrowUpRight01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Pricing", href: "/pricing" },
]

const resourceLinks = [
  { label: "Documentation", href: "#docs", external: true },
  { label: "News", href: "#news", external: false },
  { label: "Pilots", href: "#pilots", external: false },
  { label: "Careers", href: "#careers", external: true },
]

const spring = { type: "spring" as const, duration: 0.5, bounce: 0.1 }

export function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  )
}

function DesktopNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Appear after hero card expansion finishes
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 hidden lg:flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
        animate={{
          opacity: ready ? 1 : 0,
          y: ready ? 0 : -20,
          filter: ready ? "blur(0px)" : "blur(4px)",
          maxWidth: scrolled ? 760 : 1400,
          borderRadius: scrolled ? 9999 : 12,
          marginTop: scrolled ? 12 : 0,
          paddingLeft: scrolled ? 8 : 24,
          paddingRight: scrolled ? 8 : 24,
          paddingTop: scrolled ? 6 : 12,
          paddingBottom: scrolled ? 6 : 12,
        }}
        transition={spring}
        className={cn(
          "flex w-full items-center gap-1 pointer-events-auto",
          "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
          scrolled
            ? "border border-border/60 bg-background/80 backdrop-blur-md shadow-sm"
            : "border border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <a href="/" className="flex items-center px-3 shrink-0">
          <img src="/bolna-logo.png" alt="Bolna" className="h-8 w-auto" />
        </a>

        {/* Spacer — naturally compresses as container narrows */}
        <div className="flex-1" />

        {/* Nav links */}
        <div className="flex items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="whitespace-nowrap px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50"
            >
              {link.label}
            </a>
          ))}

          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground text-sm font-normal rounded-full h-auto px-3 py-1.5">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-48">
                  {resourceLinks.map((link) => (
                    <NavigationMenuLink key={link.label} href={link.href} className="justify-between">
                      <span className="text-sm">{link.label}</span>
                      {link.external && (
                        <HugeiconsIcon
                          icon={ArrowUpRight01Icon}
                          strokeWidth={2}
                          className="size-3.5 text-muted-foreground"
                        />
                      )}
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Separator */}
        <div className="h-5 w-px bg-border mx-1 shrink-0" />

        {/* CTAs */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button variant="ghost" size="lg" className="rounded-full text-sm font-normal">
            Login
          </Button>
          <Button size="lg" className="rounded-full text-sm">
            Book a Demo
          </Button>
        </div>
      </motion.nav>
    </header>
  )
}

function MobileNavbar() {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 lg:hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -20 }}
      transition={spring}
    >
      <div className="flex items-center justify-between h-14 px-4 bg-background/80 backdrop-blur-md border-b border-border/40">
        <a href="/" className="flex items-center">
          <img src="/bolna-logo.png" alt="Bolna" className="h-8 w-auto" />
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="size-9">
              <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} className="size-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" showCloseButton={false} className="w-72 p-0">
            <SheetHeader className="p-4 pb-0 flex-row items-center justify-between">
              <SheetTitle>
                <img src="/bolna-logo.png" alt="Bolna" className="h-8 w-auto" />
              </SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon-sm">
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                  <span className="sr-only">Close</span>
                </Button>
              </SheetClose>
            </SheetHeader>

            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="h-px bg-border my-2" />

              <p className="px-3 text-xs text-muted-foreground font-medium mb-1">Resources</p>
              {resourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {link.label}
                  {link.external && (
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      strokeWidth={2}
                      className="size-3.5 text-muted-foreground"
                    />
                  )}
                </a>
              ))}
            </nav>

            <div className="mt-auto p-4 flex flex-col gap-2 border-t border-border">
              <Button variant="outline" className="w-full justify-center rounded-lg h-9 text-sm">
                Login
              </Button>
              <Button className="w-full justify-center rounded-lg h-9 text-sm">
                Book a Demo
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.div>
  )
}
