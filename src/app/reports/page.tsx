"use client"

import { useState } from "react"
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  CartesianGrid, 
  XAxis, 
  YAxis 
} from "recharts"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent,
  type ChartConfig 
} from "@/components/ui/chart"

// Mock data for the reports
const monthlyData = [
  { month: "January", adoptionRate: 72, timeSaved: 24, seoImprovement: 18, engagement: 1240, leads: 28 },
  { month: "February", adoptionRate: 78, timeSaved: 28, seoImprovement: 22, engagement: 1580, leads: 34 },
  { month: "March", adoptionRate: 85, timeSaved: 32, seoImprovement: 27, engagement: 1920, leads: 42 },
  { month: "April", adoptionRate: 82, timeSaved: 30, seoImprovement: 24, engagement: 1760, leads: 38 },
  { month: "May", adoptionRate: 88, timeSaved: 36, seoImprovement: 31, engagement: 2140, leads: 45 },
  { month: "June", adoptionRate: 92, timeSaved: 38, seoImprovement: 33, engagement: 2360, leads: 52 },
]

const quarterlyData = [
  { quarter: "Q1", adoptionRate: 78, timeSaved: 28, seoImprovement: 22, engagement: 4740, leads: 104 },
  { quarter: "Q2", adoptionRate: 87, timeSaved: 35, seoImprovement: 29, engagement: 6260, leads: 135 },
]

// Format engagement data by content type
const engagementByFormat = [
  { format: "Blog Posts", views: 4250, likes: 620, comments: 184, shares: 192 },
  { format: "Infographics", views: 3150, likes: 840, comments: 92, shares: 372 },
  { format: "Videos", views: 2860, likes: 560, comments: 124, shares: 286 },
  { format: "Podcasts", views: 1580, likes: 310, comments: 73, shares: 142 },
]

// Chart configuration with direct references to CSS variables
const adoptionChartConfig = {
  adoptionRate: {
    label: "Content Strategy Adoption Rate",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig

const timeChartConfig = {
  timeSaved: {
    label: "Hours Saved in Content Audit",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

const seoChartConfig = {
  seoImprovement: {
    label: "SEO Performance Uplift (%)",
    color: "hsl(var(--chart-3))",
  }
} satisfies ChartConfig

const engagementChartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
  likes: {
    label: "Likes",
    color: "hsl(var(--chart-2))",
  },
  comments: {
    label: "Comments",
    color: "hsl(var(--chart-3))",
  },
  shares: {
    label: "Shares",
    color: "hsl(var(--chart-4))",
  }
} satisfies ChartConfig

const leadsChartConfig = {
  leads: {
    label: "Lead Generation & Conversions",
    color: "hsl(var(--chart-5))",
  }
} satisfies ChartConfig

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly">("monthly")
  
  const data = timeframe === "monthly" ? monthlyData : quarterlyData
  const xAxisKey = timeframe === "monthly" ? "month" : "quarter"
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Content Performance Reports</h1>
        <Select
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as "monthly" | "quarterly")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Content Strategy Adoption Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Content Strategy Adoption Rate</CardTitle>
            <CardDescription>
              Percentage of AI-generated calendar items that users approve and schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={adoptionChartConfig} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={xAxisKey}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="adoptionRate"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  stroke="var(--chart-1)"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Measures the tool's perceived value and relevancy.
            </p>
          </CardFooter>
        </Card>
        
        {/* Time Savings in Content Audit */}
        <Card>
          <CardHeader>
            <CardTitle>Time Savings in Content Audit</CardTitle>
            <CardDescription>
              Reduction in hours spent manually assessing existing content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={timeChartConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={data} barGap={8} barCategoryGap={24}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={xAxisKey}
                  tickLine={false}
                  tickMargin={10} 
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}h`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="timeSaved"
                  radius={6}
                  fill="var(--chart-2)"
                  barSize={40}
                  fillOpacity={0.85}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Validates automation's efficiency gains.
            </p>
          </CardFooter>
        </Card>
        
        {/* SEO Performance Uplift */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Performance Uplift</CardTitle>
            <CardDescription>
              Improvements in keyword rankings and organic traffic for refreshed content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={seoChartConfig} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={xAxisKey}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="seoImprovement"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  stroke="var(--chart-3)"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Shows direct impact on search visibility and audience reach.
            </p>
          </CardFooter>
        </Card>
        
        {/* Format Engagement Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Format Engagement Metrics</CardTitle>
            <CardDescription>
              Engagement across recommended content formats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={engagementChartConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={engagementByFormat} barGap={0} barCategoryGap={40}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="format"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="views" radius={4} stackId="a" fill="var(--chart-1)" barSize={50} fillOpacity={1} />
                <Bar dataKey="likes" radius={4} stackId="a" fill="var(--chart-2)" fillOpacity={0.9} />
                <Bar dataKey="comments" radius={4} stackId="a" fill="var(--chart-3)" fillOpacity={0.8} />
                <Bar dataKey="shares" radius={4} stackId="a" fill="var(--chart-4)" fillOpacity={0.7} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Demonstrates how well multi-format strategies resonate with audiences.
            </p>
          </CardFooter>
        </Card>
        
        {/* Lead Generation & Conversions */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Lead Generation & Conversions</CardTitle>
            <CardDescription>
              Increase in form fills, demo requests, or sales inquiries tied to content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={leadsChartConfig} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={xAxisKey}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="leads"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  stroke="var(--chart-5)"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Connects content initiatives to real business ROI.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 