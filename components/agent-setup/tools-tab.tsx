"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Wrench01Icon,
  Settings01Icon,
  Delete01Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AnimatedCard, DocsLink } from "./shared"

export function ToolsTab() {
  const [functions, setFunctions] = useState([
    { id: "1", type: "custom_task", name: "get_sessions" },
    { id: "2", type: "custom_task", name: "route_instruction" },
    { id: "3", type: "custom_task", name: "trigger_action" },
  ])

  function handleDelete(id: string) {
    setFunctions((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="flex flex-col gap-3">
      <AnimatedCard
        index={0}
        icon={Wrench01Icon}
        title="Function Tools for LLM Models"
        tooltip="Add custom functions that your LLM agent can call during conversations"
        action={<DocsLink label="View Docs" />}
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Choose functions</label>
          <Select>
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Select functions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom_task">custom_task</SelectItem>
              <SelectItem value="api_call">api_call</SelectItem>
              <SelectItem value="database_query">database_query</SelectItem>
              <SelectItem value="send_email">send_email</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="flex flex-wrap items-center gap-2 justify-end">
          <Button variant="outline" size="sm">
            <HugeiconsIcon
              icon={Add01Icon}
              strokeWidth={2}
              className="size-3.5"
            />
            Add Transfer Call
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <HugeiconsIcon
              icon={Add01Icon}
              strokeWidth={2}
              className="size-3.5"
            />
            Add function
          </Button>
        </div>

        <Separator />

        {functions.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex items-center justify-center size-12 rounded-full bg-muted">
              <HugeiconsIcon
                icon={Wrench01Icon}
                strokeWidth={1.5}
                className="size-5 text-muted-foreground"
              />
            </div>
            <div>
              <p className="text-sm font-medium">No functions added</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add tools your agent can call during conversations
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <AnimatePresence initial={false}>
              {functions.map((fn, index) => (
                <motion.div
                  key={fn.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {index > 0 && <Separator />}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">{fn.name}</span>
                      <span className="text-xs text-muted-foreground">{fn.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="truncate max-w-full">
                        <HugeiconsIcon
                          icon={Settings01Icon}
                          strokeWidth={2}
                          className="size-3.5 shrink-0"
                        />
                        <span className="truncate">Configure {fn.name}</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => handleDelete(fn.id)}
                      >
                        <HugeiconsIcon
                          icon={Delete01Icon}
                          strokeWidth={2}
                          className="size-3.5"
                        />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </AnimatedCard>
    </div>
  )
}
