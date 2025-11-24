import Link from "next/link"

import { AuthCallout } from "@/components/sections/auth-callout"
import { MicroUpdatesCard } from "@/components/sections/micro-updates-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const highlights = [
  {
    title: "Clerk auth built-in",
    body: "Drop in hosted sign-in flows or add fully customizable UI blocks when you are ready.",
  },
  {
    title: "Convex backend",
    body: "Store data without writing SQL and run serverless functions next to your tables.",
  },
  {
    title: "shadcn/ui styling",
    body: "Use prebuilt, accessible components so your pages look polished from day one.",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#141b2e] via-[#0b1120] to-transparent p-10 shadow-2xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1 backdrop-blur">
                Clerk + Convex starter kit
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <AuthCallout />
              <div className="max-w-3xl space-y-4">
                <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                  Launch secure apps without touching boilerplate
                </h1>
                <p className="text-lg text-white/70">
                  Discord-level polish for your own platform: hosted auth from Clerk, reactive data from Convex, and a
                  shadcn/ui foundation that stays fast and accessible.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-white text-[#05060a] transition-colors hover:bg-[#2b2f3c] hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <Link href="/dashboard">Open dashboard</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-12 rounded-full bg-white text-[#05060a] transition-colors hover:bg-[#2b2f3c] hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <Link href="https://clerk.com/docs/nextjs" target="_blank" rel="noreferrer">
                  Clerk docs
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="h-12 rounded-full border border-white/40 bg-white text-[#05060a] transition-colors hover:border-white hover:bg-[#2b2f3c] hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <Link href="https://docs.convex.dev/home" target="_blank" rel="noreferrer">
                  Convex docs
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <MicroUpdatesCard />

          <Card className="border-white/10 bg-white/5 text-white shadow-lg">
            <CardHeader>
              <CardTitle>Project checklist</CardTitle>
              <CardDescription>What to hook up next</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <ul className="space-y-2 text-white/70">
                <li>• Create a Clerk application and copy the publishable key.</li>
                <li>• Run `npx convex dev` and link your backend.</li>
                <li>• Deploy to Vercel once you see the page update locally.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title} className="border-white/5 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription className="text-white/70">{item.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
