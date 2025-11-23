import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

const users = defineTable({
  userId: v.string(),
  message: v.string(),
  authorName: v.string(),
  authorImage: v.optional(v.string()),
  createdAt: v.number(),
}).index("by_createdAt", ["createdAt"])

export default defineSchema({
  microUpdates: users,
})


