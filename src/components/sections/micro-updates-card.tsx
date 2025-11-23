'use client'

import { FormEvent, useMemo, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function MicroUpdatesCard() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle")
  const { isSignedIn } = useAuth()

  const updates = useQuery(api.microUpdates.list, {})
  const publishUpdate = useMutation(api.microUpdates.publish)

  const isSaving = status === "saving"
  const isDisabled = !isSignedIn || isSaving || message.trim().length === 0

  const formattedUpdates = useMemo(() => {
    if (!updates) {
      return null
    }
    return updates.map((update) => ({
      id: update._id as string,
      message: update.message as string,
      authorName: update.authorName as string,
      createdAt: new Date(update.createdAt as number),
    }))
  }, [updates])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (isDisabled) {
      return
    }

    try {
      setStatus("saving")
      await publishUpdate({ message })
      setMessage("")
      setStatus("idle")
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  return (
    <Card className="h-full justify-between">
      <CardHeader>
        <CardTitle>Try the UI kit</CardTitle>
        <CardDescription>Post a micro-update and store it in Convex.</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Micro-update
            </label>
            <Input
              id="message"
              autoComplete="off"
              placeholder="Tell users what you are building next..."
              value={message}
              disabled={!isSignedIn}
              onChange={(event) => setMessage(event.target.value)}
            />
            {!isSignedIn && (
              <p className="text-muted-foreground text-sm">
                Sign in with Clerk above to unlock this form.
              </p>
            )}
          </div>
          <Button className="w-full" type="submit" disabled={isDisabled}>
            {isSaving ? "Publishing..." : "Publish update"}
          </Button>
          {status === "error" && (
            <p className="text-sm text-red-500">Something went wrong while saving. Try again.</p>
          )}
        </CardContent>
      </form>
      <CardFooter className="flex-col items-start gap-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Recent updates</p>
        <div className="space-y-3 w-full">
          {formattedUpdates === null && (
            <p className="text-sm text-muted-foreground">Loading updates...</p>
          )}
          {formattedUpdates?.length === 0 && (
            <p className="text-sm text-muted-foreground">Publish your first update above.</p>
          )}
          {formattedUpdates?.map((entry) => (
            <div key={entry.id} className="rounded-lg border bg-muted/40 px-4 py-3">
              <p className="text-sm font-medium">{entry.message}</p>
              <p className="text-xs text-muted-foreground">
                {entry.authorName} · {entry.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}


