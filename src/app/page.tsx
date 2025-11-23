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
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-20">
        <section className="space-y-6 text-center">
          <span className="text-muted-foreground inline-flex items-center justify-center rounded-full border px-4 py-1 text-sm">
            Clerk + Convex starter kit
          </span>
          <div className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Launch secure apps without touching boilerplate
            </h1>
            <p className="text-muted-foreground text-lg">
              You already have auth (Clerk) and a data layer (Convex). This starter page wires in shadcn/ui so
              you can focus on your idea, not setup.
            </p>
          </div>
          <AuthCallout />
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="https://clerk.com/docs/nextjs" target="_blank" rel="noreferrer">
                Clerk docs
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="https://docs.convex.dev/home" target="_blank" rel="noreferrer">
                Convex docs
              </Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <MicroUpdatesCard />

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>Project checklist</CardTitle>
              <CardDescription>What to hook up next</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Create a Clerk application and copy the publishable key.</li>
                <li>• Run `npx convex dev` and link your backend.</li>
                <li>• Deploy to Vercel once you see the page update locally.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 border-t pt-8 sm:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
