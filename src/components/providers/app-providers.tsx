'use client'

import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ReactNode } from "react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ConvexReactClient } from "convex/react"

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const convexClient = convexUrl ? new ConvexReactClient(convexUrl) : null

type Props = {
  children: ReactNode
}

/**
 * Wraps the full app with Clerk and Convex context.
 * Convex is only attached once the deployment URL exists so local
 * styling still works without configuration.
 */
export function AppProviders({ children }: Props) {
  if (!convexClient) {
    return <ClerkProvider>{children}</ClerkProvider>
  }

  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}


