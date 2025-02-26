import "server-only"

import FirecrawlApp from "@mendable/firecrawl-js"
import { and, eq, gt } from "drizzle-orm"

import { env } from "@/env"
import { inngest } from "@/inngest/client"
import { db } from "@/server/db"
import * as schema from "@/server/db/schema"

/**
 * Scrape a URL and return the markdown, html, and links.
 *
 * If the URL has previously been scraped within the last 24 hours, return the cached result.
 */
export default inngest.createFunction(
  { id: "scrape" },
  { event: "firecrawl/scrape" as const },
  async ({ event }) => {
    const { url } = event.data
    if (!url) {
      return {
        success: false,
        error: "No URL provided",
      }
    }

    const existingPage = await db.query.pages.findFirst({
      where: and(
        eq(schema.pages.url, url),
        gt(schema.pages.updatedAt, new Date(Date.now() - 24 * 60 * 60 * 1000))
      ),
      columns: {
        id: true, 
      }
    })
    if (existingPage) {
      return {
        success: true,
        id: existingPage.id,
      }
    }

    const app = new FirecrawlApp({
      apiKey: env.FIRECRAWL_API_KEY,
    })

    const scrapeResponse = await app.scrapeUrl(url, {
      formats: ["markdown", "html", "links"],
      removeBase64Images: true,
    })
    if (!scrapeResponse.success) {
      return {
        success: false,
        error: scrapeResponse.error,
      }
    }

    const result = await db
      .insert(schema.pages)
      .values({
        url,
        data: scrapeResponse,
      })
      .onConflictDoUpdate({
        target: schema.pages.url,
        set: { data: scrapeResponse },
      })
      .returning({ id: schema.pages.id })
      .then(([page]) => page)
    if (!result) {
      return {
        success: false,
        error: "Failed to insert page",
      }
    }

    return {
      success: true,
      id: result.id,
    }
  }
)
