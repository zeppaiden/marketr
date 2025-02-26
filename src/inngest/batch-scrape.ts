import "server-only"

import FirecrawlApp from "@mendable/firecrawl-js"
import { and, gt, inArray } from "drizzle-orm"

import { env } from "@/env"
import { inngest } from "@/inngest/client"
import { db } from "@/server/db"
import * as schema from "@/server/db/schema"

/**
 * Batch scrape multiple URLs and return the markdown, html, and links for each.
 *
 * If a URL has previously been scraped within the last 24 hours, return the cached result.
 */
export default inngest.createFunction(
  { id: "batch-scrape" },
  { event: "firecrawl/batch-scrape" as const },
  async ({ event }) => {
    const { urls } = event.data
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return {
        success: false,
        error: "No URLs provided or invalid URLs array",
      }
    }

    // Check which URLs have been recently scraped (last 24 hours)
    const existingPages = await db.query.pages.findMany({
      where: and(
        inArray(schema.pages.url, urls),
        gt(schema.pages.updatedAt, new Date(Date.now() - 24 * 60 * 60 * 1000))
      ),
      columns: {
        id: true,
        url: true,
      }
    })

    // Get URLs that need to be scraped (not recently cached)
    const existingUrls = new Set(existingPages.map(page => page.url))
    const urlsToScrape = urls.filter(url => !existingUrls.has(url))

    // Results will contain both cached and freshly scraped pages
    const results = [...existingPages]

    // Only scrape if there are uncached URLs
    if (urlsToScrape.length > 0) {
      const app = new FirecrawlApp({
        apiKey: env.FIRECRAWL_API_KEY,
      })

      const batchScrapeResponse = await app.batchScrapeUrls(urlsToScrape, {
        formats: ["markdown", "html", "links"],
        removeBase64Images: true,
      })

      if (!batchScrapeResponse.success) {
        return {
          success: false,
          error: "Failed to batch scrape URLs",
          details: batchScrapeResponse,
        }
      }

      // Insert new pages into the database
      const scrapedData = batchScrapeResponse.data
      if (scrapedData && Array.isArray(scrapedData)) {
        for (let i = 0; i < scrapedData.length; i++) {
          const scrapeResult = scrapedData[i]
          const url = urlsToScrape[i]
          
          if (url) {
            const result = await db
              .insert(schema.pages)
              .values({
                url: url,
                data: scrapeResult,
              })
              .onConflictDoUpdate({
                target: schema.pages.url,
                set: { data: scrapeResult },
              })
              .returning({ id: schema.pages.id, url: schema.pages.url })
              .then(([page]) => page)

            if (result) {
              results.push(result)
            }
          }
        }
      }
    }

    return {
      success: true,
      results: results.map(page => ({ id: page.id, url: page.url })),
    }
  }
)
