import { AgentHeader } from "@/components/agent-setup/agent-header"
import { AgentTabs } from "@/components/agent-setup/agent-tabs"

export default function AgentSetupPage() {
  return (
    <div className="flex flex-col gap-6">
      <AgentHeader />
      <AgentTabs />
    </div>
  )
}
