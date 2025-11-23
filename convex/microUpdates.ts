import { mutationGeneric, queryGeneric } from "convex/server"
import { v } from "convex/values"

export const publish = mutationGeneric({
  args: {
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("You must be signed in to post an update.")
    }

    const trimmed = args.message.trim()
    if (!trimmed) {
      throw new Error("Message cannot be empty.")
    }

    await ctx.db.insert("microUpdates", {
      message: trimmed,
      userId: identity.subject,
      authorName: identity.name ?? identity.email ?? "Anonymous builder",
      authorImage: identity.pictureUrl ?? undefined,
      createdAt: Date.now(),
    })
  },
})

export const list = queryGeneric({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 5
    return ctx.db
      .query("microUpdates")
      .withIndex("by_createdAt")
      .order("desc")
      .take(limit)
  },
})

export const stats = queryGeneric({
  args: {},
  handler: async (ctx) => {
    const documents = await ctx.db.query("microUpdates").collect()
    const uniqueAuthors = new Set(documents.map((doc) => doc.userId)).size
    const latest = documents.sort((a, b) => b.createdAt - a.createdAt)[0]

    return {
      totalUpdates: documents.length,
      uniqueAuthors,
      lastUpdate: latest ? new Date(latest.createdAt).toLocaleDateString() : "—",
    }
  },
})


