'use client'

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

export function AuthCallout() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
      <SignedIn>
        <div className="flex items-center gap-3 rounded-full border px-4 py-2">
          <UserButton afterSignOutUrl="/" />
          <p className="text-sm text-muted-foreground">You’re signed in with Clerk.</p>
        </div>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <Button size="lg" className="w-full sm:w-auto">
            Sign in to try it live
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  )
}


