import { currentUser } from "@clerk/nextjs/server"
import { Metadata } from "next"
import Link from "next/link"

import { MicroUpdatesCard } from "@/components/sections/micro-updates-card"
import { UpdatesFeed } from "@/components/sections/updates-feed"
import { DashboardStats } from "@/components/sections/dashboard-stats"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Dashboard · Clerk + Convex starter",
}

export default async function DashboardPage() {
  const user = await currentUser()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-4 rounded-3xl border bg-card px-6 py-8 text-card-foreground shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Dashboard</p>
            <h1 className="text-balance text-3xl font-semibold">
              Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
            </h1>
            <p className="text-muted-foreground">
              Manage your micro-updates, view recent activity, and share what you are building.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:text-right">
            <span>{user?.emailAddresses?.[0]?.emailAddress}</span>
            <span className="text-xs uppercase">Convex deployment</span>
            <Link href="https://dashboard.convex.dev" className="text-primary underline" target="_blank">
              Open Convex dashboard
            </Link>
          </div>
        </header>

        <DashboardStats />

        <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <MicroUpdatesCard />
          <UpdatesFeed />
        </section>

        <section className="rounded-3xl border bg-card px-6 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Need to deploy?</h2>
              <p className="text-muted-foreground">
                Push your Convex functions and ship the Next.js app to Vercel when you’re ready.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="outline">
                <Link href="https://docs.convex.dev/deploy" target="_blank">
                  Convex deploy docs
                </Link>
              </Button>
              <Button asChild>
                <Link href="https://vercel.com/new" target="_blank">
                  Deploy to Vercel
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}


