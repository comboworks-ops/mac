'use client'

import { useMemo } from "react"
import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardStats() {
  const stats = useQuery(api.microUpdates.stats, {})

  const items = useMemo(
    () => [
      { label: "Total updates", value: stats?.totalUpdates ?? "—" },
      { label: "Active authors", value: stats?.uniqueAuthors ?? "—" },
      { label: "Latest update", value: stats?.lastUpdate ?? "—" },
    ],
    [stats],
  )

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


