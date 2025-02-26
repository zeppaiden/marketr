import { EventSchemas, type GetEvents, Inngest } from "inngest"
import { z } from "zod"

const events = {
  "firecrawl/scrape": {
    data: z.object({
      url: z.string()
    })
  },
}

export const inngest = new Inngest({
  id: "marketr",
  schemas: new EventSchemas().fromZod(events)
})

export type Events = GetEvents<typeof inngest>
