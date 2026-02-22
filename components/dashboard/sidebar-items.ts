import {
  Robot01Icon,
  Clock01Icon,
  TelephoneIcon,
  Knowledge01Icon,
  Task01Icon,
  Mic01Icon,
  CodeIcon,
  PlugSocketIcon,
  WorkflowCircle01Icon,
  Megaphone01Icon,
  BookOpen01Icon,
  Building01Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"

export type NavItem = {
  title: string
  url: string
  icon: IconSvgElement
  isActive?: boolean
  items?: { title: string; url: string }[]
}

export const platformItems: NavItem[] = [
  {
    title: "Agent Setup",
    url: "/dashboard/agent-setup",
    icon: Robot01Icon,
  },
  {
    title: "Call History",
    url: "/dashboard/calls",
    icon: Clock01Icon,
  },
  {
    title: "My Numbers",
    url: "/dashboard/numbers",
    icon: TelephoneIcon,
  },
  {
    title: "Knowledge Base",
    url: "/dashboard/knowledge",
    icon: Knowledge01Icon,
  },
  {
    title: "Batches",
    url: "/dashboard/batches",
    icon: Task01Icon,
  },
  {
    title: "Voice Lab",
    url: "/dashboard/voice-lab",
    icon: Mic01Icon,
  },
  {
    title: "Developers",
    url: "/dashboard/developers",
    icon: CodeIcon,
  },
  {
    title: "Providers",
    url: "/dashboard/providers",
    icon: PlugSocketIcon,
  },
  {
    title: "Workflows",
    url: "/dashboard/workflows",
    icon: WorkflowCircle01Icon,
  },
  {
    title: "Campaigns",
    url: "/dashboard/campaigns",
    icon: Megaphone01Icon,
  },
  {
    title: "Documentation",
    url: "/dashboard/docs",
    icon: BookOpen01Icon,
  },
]

export const teamItems: NavItem[] = [
  {
    title: "Workplace",
    url: "/dashboard/workplace",
    icon: Building01Icon,
    items: [
      { title: "Members", url: "/dashboard/workplace/members" },
      { title: "Settings", url: "/dashboard/workplace/settings" },
    ],
  },
]
