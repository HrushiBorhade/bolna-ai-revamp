"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { FileImportIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ImportAgentDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ImportAgentDialog({ open: externalOpen, onOpenChange: externalOnOpenChange }: ImportAgentDialogProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [agentId, setAgentId] = useState("")
  const [agentName, setAgentName] = useState("")

  const open = externalOpen ?? internalOpen
  const setOpen = externalOnOpenChange ?? setInternalOpen

  const handleImport = () => {
    // TODO: implement import logic
    setOpen(false)
    setAgentId("")
    setAgentName("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {externalOpen === undefined && (
        <DialogTrigger asChild>
          <Button variant="outline" size="default">
            <HugeiconsIcon icon={FileImportIcon} strokeWidth={2} />
            Import
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Agent</DialogTitle>
          <DialogDescription>
            Import an existing agent by entering its ID and giving it a name.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="import-agent-id">Agent ID</Label>
            <Input
              id="import-agent-id"
              placeholder="agent_8f3k2m1x9p4v"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="import-agent-name">Agent Name</Label>
            <Input
              id="import-agent-name"
              placeholder="My Imported Agent"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleImport}
            disabled={!agentId.trim() || !agentName.trim()}
            className="w-full sm:w-auto"
          >
            Import this agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
