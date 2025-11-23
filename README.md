## Quick start

1. Make sure the portable Node binary that ships with this repo is on your path:
   ```bash
   export PATH="/Users/thommymac/Desktop/helt nyt fra macbook/node-v20.18.0-darwin-x64/bin:$PATH"
   ```
2. Install dependencies (already done once, but re-run after pulling new code):
   ```bash
   cd web-app
   npm install
   ```
3. Copy environment variables and add your keys:
   ```bash
   cp env.sample .env.local
   ```
   - Create a Clerk application and paste the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY`.
   - Run the Convex CLI (next step) and paste the generated `NEXT_PUBLIC_CONVEX_URL`.

4. Link Convex + keep the watcher running:
   ```bash
   npm run convex:dev
   ```
   Sign in, choose “Configure new deployment”, copy the printed Convex URL into `.env.local`, and leave this process running so your backend code syncs automatically.

5. Start the UI in a second terminal:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the shadcn/ui landing page. The hero includes a live Clerk call-to-action and the “Micro-update” card now persists data to Convex.

## Clerk integration

- The entire app is wrapped with `ClerkProvider` inside `src/components/providers/app-providers.tsx`.
- `AuthCallout` inside `src/app/page.tsx` shows signed-in/out states with `SignInButton` and `UserButton`.
- Add any protected routes by creating files under `src/app/(protected)` and updating `middleware.ts` (see [Clerk docs](https://clerk.com/docs/nextjs/protect-routes) for matcher examples).

## Convex integration

- The Convex client is lazily created inside the same `AppProviders` component and uses `ConvexProviderWithClerk` so your Convex functions automatically receive Clerk auth data.
- Install and link your backend by running:
  ```bash
  npm run convex:dev
  ```
  The CLI will open a browser so you can create/log into Convex, select `Configure new deployment`, and finally copy the generated `CONVEX_URL` into `.env.local`.
- Once a deployment exists you can keep the development server running with `npm run convex:dev` (which watches your Convex functions) while `npm run dev` serves the Next.js UI.
- Use `npm run convex:deploy` when you are ready to push functions to production and `npm run convex:codegen` if you need to regenerate types after editing the schema manually.

## Project structure highlights

- `src/app/page.tsx` – server component landing page that renders the hero, checklists, and mounts the interactive Convex card.
- `src/components/sections/auth-callout.tsx` – shadcn/ui block that swaps between `SignInButton` and `UserButton`.
- `src/components/sections/micro-updates-card.tsx` – client component that uses `useMutation`/`useQuery` to talk to Convex and display live updates.
- `src/components/providers/app-providers.tsx` – central place to attach additional global providers (Clerk, Convex, analytics, etc.).
- `convex/` – backend schema + functions. After editing anything inside this directory, run `npm run convex:codegen` to refresh generated types.
- `env.sample` – template for all required secrets.

## Deployment

Deploy to [Vercel](https://vercel.com/new) or another Node-compatible host. Be sure to set the same environment variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CONVEX_URL`) in the hosting dashboard and add a production Convex deployment with `npm run convex:deploy`.
