'use client'

import { useMemo } from "react"
import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UpdatesFeed() {
  const updates = useQuery(api.microUpdates.list, { limit: 12 })

  const entries = useMemo(
    () =>
      updates?.map((entry) => ({
        id: String(entry._id),
        message: entry.message as string,
        authorName: entry.authorName as string,
        createdAt: new Date(entry.createdAt as number),
      })) ?? [],
    [updates],
  )

  return (
    <Card className="h-full overflow-hidden border bg-muted/30">
      <CardHeader>
        <CardTitle>Recent updates</CardTitle>
        <CardDescription>What your team has shipped lately.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {updates === undefined && <p className="text-sm text-muted-foreground">Loading activity…</p>}
        {updates?.length === 0 && <p className="text-sm text-muted-foreground">No updates yet—add one on the left.</p>}
        <div className="space-y-3 overflow-y-auto pr-1 max-h-[420px]">
          {entries.map((item) => (
            <article key={item.id} className="rounded-xl border bg-background px-4 py-3 shadow-sm">
              <p className="text-sm font-medium">{item.message}</p>
              <p className="text-xs text-muted-foreground">
                {item.authorName} •{" "}
                {item.createdAt.toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


