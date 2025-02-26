import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, LineChart, RefreshCw, AlertTriangle, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock data for refresh suggestions - In a real app this would come from API/database
const mockRefreshSuggestions = [
  {
    id: "r1",
    title: "Optimizing Your Blog for Voice Search",
    type: "Blog Post",
    impact: "high",
    url: "https://example.com/blog/voice-search-optimization",
    publishDate: new Date(2022, 1, 15),
    lastUpdated: new Date(2022, 1, 15),
    performance: {
      traffic: 1200,
      engagement: 2.5,
      conversion: 0.8,
    },
    seoIssues: [
      "outdated statistics (2021 data)",
      "missing structured data for voice search",
      "keyword cannibalization with newer content"
    ],
    suggestedUpdates: [
      "update statistics with 2023 data",
      "add FAQ schema markup",
      "expand section on conversational keywords",
      "add new section on AI voice assistants"
    ]
  },
  {
    id: "r2",
    title: "Content Marketing Trends to Watch",
    type: "Blog Post",
    impact: "medium",
    url: "https://example.com/blog/content-marketing-trends",
    publishDate: new Date(2022, 3, 10),
    lastUpdated: new Date(2022, 3, 10),
    performance: {
      traffic: 3500,
      engagement: 3.2,
      conversion: 1.2,
    },
    seoIssues: [
      "outdated trends (pre-2023)",
      "declining organic traffic (-15% MoM)",
      "high bounce rate (72%)"
    ],
    suggestedUpdates: [
      "update with 2023 trends and remove outdated ones",
      "add section on AI content creation",
      "improve page load speed",
      "add more visual elements"
    ]
  },
  {
    id: "r3",
    title: "How to Measure Content Marketing ROI",
    type: "Blog Post",
    impact: "high",
    url: "https://example.com/blog/content-marketing-roi",
    publishDate: new Date(2021, 11, 5),
    lastUpdated: new Date(2022, 5, 20),
    performance: {
      traffic: 5200,
      engagement: 4.1,
      conversion: 2.3,
    },
    seoIssues: [
      "outdated tools mentioned",
      "missing internal links to newer content",
      "competing with similar article on site"
    ],
    suggestedUpdates: [
      "update tool recommendations",
      "add case study with real metrics",
      "consolidate with overlapping content",
      "add downloadable ROI calculator template"
    ]
  }
];

function getImpactClass(impact: string) {
  const normalizedImpact = impact.toLowerCase();
  switch (normalizedImpact) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function getMetricStatus(value: number, metricType: string): "good" | "average" | "poor" {
  if (metricType === "traffic") {
    if (value > 3000) return "good";
    if (value > 1000) return "average";
    return "poor";
  }
  if (metricType === "engagement") {
    if (value > 3.5) return "good";
    if (value > 2) return "average";
    return "poor";
  }
  if (metricType === "conversion") {
    if (value > 2) return "good";
    if (value > 1) return "average";
    return "poor";
  }
  return "average";
}

function getMetricColor(status: "good" | "average" | "poor") {
  switch (status) {
    case "good":
      return "text-green-700";
    case "average":
      return "text-yellow-700";
    case "poor":
      return "text-red-700";
    default:
      return "";
  }
}

function getMetricProgressColor(status: "good" | "average" | "poor") {
  switch (status) {
    case "good":
      return "bg-green-500";
    case "average":
      return "bg-yellow-500";
    case "poor":
      return "bg-red-500";
    default:
      return "";
  }
}

function getMetricProgressValue(value: number, metricType: string): number {
  if (metricType === "traffic") {
    return Math.min(100, (value / 5000) * 100);
  }
  if (metricType === "engagement") {
    return Math.min(100, (value / 5) * 100);
  }
  if (metricType === "conversion") {
    return Math.min(100, (value / 3) * 100);
  }
  return 50;
}

export default async function ContentRefreshPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch this data from an API or database using an async call
  // For mock data, we'll simulate an async operation
  const refreshSuggestion = await Promise.resolve(mockRefreshSuggestions.find(rec => rec.id === params.id));
  
  if (!refreshSuggestion) {
    notFound();
  }
  
  const daysSinceLastUpdate = Math.floor((new Date().getTime() - refreshSuggestion.lastUpdated.getTime()) / (1000 * 3600 * 24));
  
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-6">
        <Link href="/content-strategy" passHref>
          <Button variant="ghost" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Content Recommendations
          </Button>
        </Link>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-blue-600" />
            <h1 className="text-3xl font-bold">{refreshSuggestion.title}</h1>
          </div>
          
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getImpactClass(refreshSuggestion.impact)}`}>
                <AlertTriangle className="mr-1 h-3 w-3" />
                {refreshSuggestion.impact.charAt(0).toUpperCase() + refreshSuggestion.impact.slice(1)} Priority
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              Published: {formatDate(refreshSuggestion.publishDate)}
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              Last updated: {formatDate(refreshSuggestion.lastUpdated)} ({daysSinceLastUpdate} days ago)
            </div>
          </div>
          
          <div className="mt-2">
            <span className="text-sm font-medium text-gray-700">Content Type:</span>
            <span className="ml-2 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
              {refreshSuggestion.type}
            </span>
          </div>
          
          <div className="mt-4">
            <a 
              href={refreshSuggestion.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-4 w-4" />
              View Original Content
            </a>
          </div>
        </div>
        
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-semibold">Current Performance</h2>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Traffic (monthly)</span>
                <span className={`text-sm font-bold ${getMetricColor(getMetricStatus(refreshSuggestion.performance.traffic, "traffic"))}`}>
                  {refreshSuggestion.performance.traffic.toLocaleString()}
                </span>
              </div>
              <Progress 
                value={getMetricProgressValue(refreshSuggestion.performance.traffic, "traffic")} 
                className="h-2"
                indicatorClassName={getMetricProgressColor(getMetricStatus(refreshSuggestion.performance.traffic, "traffic"))}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Engagement (avg. time in minutes)</span>
                <span className={`text-sm font-bold ${getMetricColor(getMetricStatus(refreshSuggestion.performance.engagement, "engagement"))}`}>
                  {refreshSuggestion.performance.engagement.toFixed(1)}
                </span>
              </div>
              <Progress 
                value={getMetricProgressValue(refreshSuggestion.performance.engagement, "engagement")} 
                className="h-2"
                indicatorClassName={getMetricProgressColor(getMetricStatus(refreshSuggestion.performance.engagement, "engagement"))}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Conversion Rate (%)</span>
                <span className={`text-sm font-bold ${getMetricColor(getMetricStatus(refreshSuggestion.performance.conversion, "conversion"))}`}>
                  {refreshSuggestion.performance.conversion.toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={getMetricProgressValue(refreshSuggestion.performance.conversion, "conversion")} 
                className="h-2"
                indicatorClassName={getMetricProgressColor(getMetricStatus(refreshSuggestion.performance.conversion, "conversion"))}
              />
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-red-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-red-800">Current Issues</h2>
          
          <ul className="space-y-2">
            {refreshSuggestion.seoIssues.map((issue, index) => (
              <li key={index} className="flex items-start gap-2 text-red-700">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{issue.charAt(0).toUpperCase() + issue.slice(1)}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-blue-800">Suggested Updates</h2>
          
          <ul className="space-y-2">
            {refreshSuggestion.suggestedUpdates.map((update, index) => (
              <li key={index} className="flex items-start gap-2 text-blue-700">
                <RefreshCw className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{update.charAt(0).toUpperCase() + update.slice(1)}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-indigo-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-indigo-800">Ready to Refresh This Content?</h2>
          <p className="mb-4 text-indigo-700">
            Use these suggestions to update your existing content and improve its performance.
          </p>
          <div className="flex gap-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Start Refresh
            </Button>
            <Button variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-100">
              Schedule for Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 