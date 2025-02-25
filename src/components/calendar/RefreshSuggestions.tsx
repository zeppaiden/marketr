"use client";

import { useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";

// mock data for refresh suggestions
type RefreshItem = {
  id: string;
  title: string;
  url: string;
  publishDate: Date;
  lastUpdated: Date;
  performance: {
    traffic: number;
    engagement: number;
    conversion: number;
  };
  seoIssues: string[];
  potentialImpact: "high" | "medium" | "low";
  suggestedUpdates: string[];
};

const mockRefreshItems: RefreshItem[] = [
  {
    id: "1",
    title: "optimizing your blog for voice search",
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
    potentialImpact: "high",
    suggestedUpdates: [
      "update statistics with 2023 data",
      "add FAQ schema markup",
      "expand section on conversational keywords",
      "add new section on AI voice assistants"
    ]
  },
  {
    id: "2",
    title: "content marketing trends to watch",
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
    potentialImpact: "medium",
    suggestedUpdates: [
      "update with 2023 trends and remove outdated ones",
      "add section on AI content creation",
      "improve page load speed",
      "add more visual elements"
    ]
  },
  {
    id: "3",
    title: "how to measure content marketing ROI",
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
    potentialImpact: "high",
    suggestedUpdates: [
      "update tool recommendations",
      "add case study with real metrics",
      "consolidate with overlapping content",
      "add downloadable ROI calculator template"
    ]
  },
  {
    id: "4",
    title: "social media content strategy guide",
    url: "https://example.com/blog/social-media-content-strategy",
    publishDate: new Date(2022, 7, 12),
    lastUpdated: new Date(2022, 7, 12),
    performance: {
      traffic: 2800,
      engagement: 3.7,
      conversion: 1.5,
    },
    seoIssues: [
      "no mention of TikTok or newer platforms",
      "outdated algorithm information",
      "thin content on video strategy"
    ],
    potentialImpact: "medium",
    suggestedUpdates: [
      "add sections on TikTok and BeReal",
      "update algorithm information for each platform",
      "expand video content strategy section",
      "add more examples and case studies"
    ]
  },
  {
    id: "5",
    title: "email marketing best practices",
    url: "https://example.com/blog/email-marketing-best-practices",
    publishDate: new Date(2021, 9, 8),
    lastUpdated: new Date(2021, 9, 8),
    performance: {
      traffic: 1800,
      engagement: 2.9,
      conversion: 1.8,
    },
    seoIssues: [
      "outdated deliverability information",
      "no mention of iOS privacy changes",
      "missing information on automation"
    ],
    potentialImpact: "high",
    suggestedUpdates: [
      "update deliverability best practices",
      "add section on privacy changes impact",
      "expand on email automation workflows",
      "add more examples of successful campaigns"
    ]
  },
];

export function RefreshSuggestions() {
  const [refreshItems, setRefreshItems] = useState(mockRefreshItems);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  
  const getTimeSinceUpdate = (date: Date) => {
    const now = new Date();
    const diffMonths = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth();
    
    if (diffMonths === 0) {
      return "this month";
    } 
    
    if (diffMonths === 1) {
      return "1 month ago";
    }
    
    return `${diffMonths} months ago`;
  };
  
  const getImpactClass = (impact: "high" | "medium" | "low") => {
    if (impact === "high") {
      return "bg-green-100 text-green-800";
    }
    
    if (impact === "medium") {
      return "bg-yellow-100 text-yellow-800";
    }
    
    return "bg-gray-100 text-gray-800";
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">content refresh suggestions</h2>
        <div className="text-sm text-gray-500">
          showing {refreshItems.length} items that need updating
        </div>
      </div>
      
      <div className="space-y-4">
        {refreshItems.map(item => (
          <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    view content <ExternalLink className="h-3 w-3" />
                  </a>
                  <span>published: {formatDate(item.publishDate)}</span>
                  <span>last updated: {getTimeSinceUpdate(item.lastUpdated)}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${getImpactClass(item.potentialImpact)}`}>
                  {item.potentialImpact} impact
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  {item.performance.traffic.toLocaleString()} monthly visits
                </span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">SEO issues</h4>
                <ul className="mt-2 space-y-1">
                  {item.seoIssues.map((issue, i) => (
                    <li key={`${item.id}-issue-${i}`} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">suggested updates</h4>
                <ul className="mt-2 space-y-1">
                  {item.suggestedUpdates.map((update, i) => (
                    <li key={`${item.id}-update-${i}`} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                      {update}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
              >
                <RefreshCw className="h-3 w-3" />
                schedule refresh
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 