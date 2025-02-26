import { NextResponse } from "next/server"
import { inngest } from "@/inngest/client"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      )
    }

    // Trigger the inngest function to scrape the URL
    await inngest.send({
      name: "firecrawl/scrape",
      data: { url }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error triggering scrape:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
} 