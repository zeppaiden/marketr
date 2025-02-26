import { inngest } from "@/inngest/client"
import FirecrawlApp from "@mendable/firecrawl-js"

export default inngest.createFunction(
  { id: "scrape" },
  { event: "firecrawl/scrape" as const },
  async ({ event }) => {
    const { url } = event.data

    const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })

    const scrapeResponse = await app.scrapeUrl(url, {
      formats: ["markdown", "html"],
    })
    if (!scrapeResponse.success) {
      return { error: scrapeResponse.error }
    }

    return { message: `Scraped ${url}!`, scrapeResponse }
  }
)
