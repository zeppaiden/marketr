import { createId } from "@paralleldrive/cuid2"
import {
  pgTable,
  timestamp,
  text,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const test = pgTable("test", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => new Date())
})