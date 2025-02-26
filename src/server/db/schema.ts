import { createId } from "@paralleldrive/cuid2"
import {
  pgTable,
  timestamp,
  text,
  jsonb,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const pages = pgTable("pages", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  url: text("url").notNull().unique(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => new Date()),
  // Used for soft deletes.
  deletedAt: timestamp("deleted_at"),
  // The Firecrawl JSON response.
  data: jsonb("data"),
})
