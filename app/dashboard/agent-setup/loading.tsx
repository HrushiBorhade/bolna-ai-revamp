import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function SkeletonCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card size="sm" className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-md" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </Card>
  )
}

export default function AgentSetupLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="hidden sm:block h-9 w-28 rounded-md" />
            <Skeleton className="hidden sm:block h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>

        {/* Agent selector + badge */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-9 w-full sm:w-[280px] rounded-md" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3.5 w-6" />
              <Skeleton className="h-5 w-36 rounded" />
              <Skeleton className="size-3 rounded" />
            </div>
            <div className="hidden sm:block h-3 w-px bg-border" />
            <Skeleton className="h-3.5 w-12" />
            <div className="hidden sm:block h-3 w-px bg-border" />
            <Skeleton className="h-3.5 w-24" />
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-1.5 w-24 rounded-full" />
          </div>
          <div className="hidden sm:block h-8 w-px bg-border" />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Skeleton className="size-2 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-9 rounded-md shrink-0"
            style={{ width: [64, 52, 60, 68, 48, 56, 76, 72][i] }}
          />
        ))}
      </div>

      {/* Content: two-column layout matching Agent Config tab */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-3">
        {/* Main card */}
        <SkeletonCard>
          {/* Welcome message field */}
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-3 w-64" />
          </div>

          <Separator />

          {/* System prompt textarea */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-[180px] w-full rounded-md" />
          </div>

          {/* Quick templates */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-24" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-8 rounded-full"
                  style={{ width: [140, 120, 156, 130][i] }}
                />
              ))}
            </div>
          </div>
        </SkeletonCard>

        {/* Sidebar card */}
        <div className="lg:sticky lg:top-0 lg:self-start">
          <SkeletonCard>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1 px-0.5 py-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded" />
                  <Skeleton className="h-4 w-28" />
                  {i === 2 && <Skeleton className="ml-auto h-4 w-10 rounded" />}
                </div>
                <Skeleton className="h-3 w-44 ml-6" />
              </div>
            ))}
            <Separator className="my-1" />
            <Skeleton className="h-9 w-full rounded-md" />
          </SkeletonCard>
        </div>
      </div>
    </div>
  )
}
