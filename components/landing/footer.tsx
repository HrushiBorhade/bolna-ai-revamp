"use client"

// ─── Data ────────────────────────────────────────────────────

const FOOTER_LINKS = {
  "API Documentation": [
    { label: "API authentication", href: "#" },
    { label: "Using Agents APIs", href: "#" },
    { label: "Making phone calls APIs", href: "#" },
    { label: "Get call data APIs", href: "#" },
    { label: "Phone numbers APIs", href: "#" },
    { label: "Inbound agents APIs", href: "#" },
    { label: "Knowledgebases APIs", href: "#" },
    { label: "Batch APIs", href: "#" },
    { label: "Sub account APIs", href: "#" },
  ],
  Product: [
    { label: "Dashboard", href: "#" },
    { label: "Function tool calling", href: "#" },
    { label: "PDFs, RAGs & Knowledge bases", href: "#" },
    { label: "Using Twilio with Bolna", href: "#" },
    { label: "Using Plivo with Bolna", href: "#" },
    { label: "Multilingual support", href: "#" },
    { label: "Making bulk calls & campaigns", href: "#" },
    { label: "Agent library & templates", href: "#" },
    { label: "Voice agent integrations", href: "#" },
  ],
  Company: [
    { label: "YC Launch", href: "#" },
    { label: "Contact us", href: "#" },
    { label: "Schedule a Call", href: "#" },
    { label: "Pricing & Plans", href: "#" },
    { label: "Bolna Blogs", href: "#" },
    { label: "News & Updates", href: "#" },
    { label: "LLMs.txt", href: "#" },
    { label: "Docs LLMs.txt", href: "#" },
    { label: "Top Indian AI Voice Agents", href: "#" },
  ],
}

// ─── Social Icons ────────────────────────────────────────────

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

// ─── Footer ──────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="lg:sticky lg:bottom-0 z-0 bg-foreground text-background overflow-hidden">
      {/* Top section — logo, social, links */}
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
          {/* Left — Logo & Social */}
          <div className="flex flex-col gap-6">
            <img src="/bolna-logo.png" alt="Bolna" className="h-10 w-auto brightness-0 invert self-start" />
            <p className="text-sm text-background/50 leading-relaxed max-w-[240px]">
              Voice AI platform built for India. Power thousands of calls with human-like, multilingual intelligence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-background/40 hover:text-background/70 transition-colors" aria-label="X (Twitter)">
                <XIcon className="size-5" />
              </a>
              <a href="#" className="text-background/40 hover:text-background/70 transition-colors" aria-label="LinkedIn">
                <LinkedInIcon className="size-5" />
              </a>
              <a href="#" className="text-background/40 hover:text-background/70 transition-colors" aria-label="YouTube">
                <YouTubeIcon className="size-5" />
              </a>
            </div>
          </div>

          {/* Right — Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-background/80 mb-4">{category}</h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-background/40 hover:text-background/70 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar — copyright, system status, social */}
      <div className="border-t border-background/[0.08] px-6 sm:px-8 py-5">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs text-background/30 font-mono tracking-wide uppercase">
              &copy; 2026 Bolna AI. All rights reserved.
            </p>
            <a
              href="https://github.com/HrushiBorhade"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-background/15 bg-background/5 px-2.5 py-1 text-[11px] text-background/70 hover:text-background/90 hover:bg-background/10 transition-colors"
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
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-background/40">System status</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="text-background/30 hover:text-background/50 transition-colors" aria-label="X (Twitter)">
                <XIcon className="size-4" />
              </a>
              <a href="#" className="text-background/30 hover:text-background/50 transition-colors" aria-label="LinkedIn">
                <LinkedInIcon className="size-4" />
              </a>
              <a href="#" className="text-background/30 hover:text-background/50 transition-colors" aria-label="YouTube">
                <YouTubeIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
