"use client";

import { useState } from "react";
import { Filter, ArrowUpDown, Info } from "lucide-react";

// mock data for recommendations
type ContentRecommendation = {
  id: string;
  title: string;
  type: string;
  audience: string;
  impact: "high" | "medium" | "low";
  publishDate: Date;
  keywords: string[];
  rationale: string;
};

const mockRecommendations: ContentRecommendation[] = [
  {
    id: "1",
    title: "10 ways to improve your content strategy",
    type: "blog post",
    audience: "marketing VPs",
    impact: "high",
    publishDate: new Date(2023, 2, 5),
    keywords: ["content strategy", "marketing ROI", "content planning"],
    rationale: "based on your existing content, there's a gap in strategic planning resources. this post addresses that need while targeting high-value keywords with moderate competition.",
  },
  {
    id: "2",
    title: "content marketing ROI explained",
    type: "video",
    audience: "marketing teams",
    impact: "medium",
    publishDate: new Date(2023, 2, 12),
    keywords: ["marketing ROI", "content value", "ROI calculation"],
    rationale: "your audience shows high engagement with visual content. this video format will help explain complex ROI concepts that your written content hasn't fully addressed.",
  },
  {
    id: "3",
    title: "the future of SEO in 2023",
    type: "infographic",
    audience: "content strategists",
    impact: "high",
    publishDate: new Date(2023, 2, 18),
    keywords: ["SEO trends", "search optimization", "2023 SEO"],
    rationale: "trending topic with high search volume. infographic format will increase shareability across platforms and drive backlinks to your site.",
  },
  {
    id: "4",
    title: "interview with content marketing experts",
    type: "podcast",
    audience: "marketing VPs",
    impact: "medium",
    publishDate: new Date(2023, 2, 25),
    keywords: ["expert interview", "content marketing leaders", "industry insights"],
    rationale: "your audience consumes content on-the-go. this podcast format addresses the gap in audio content while positioning your brand alongside industry experts.",
  },
  {
    id: "5",
    title: "how AI is transforming content creation",
    type: "blog post",
    audience: "marketing teams",
    impact: "high",
    publishDate: new Date(2023, 3, 2),
    keywords: ["AI content", "content automation", "AI writing tools"],
    rationale: "trending topic with increasing search volume. your competitors haven't fully addressed this topic, creating an opportunity for thought leadership.",
  },
];

export function ContentRecommendations() {
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [sortField, setSortField] = useState<keyof ContentRecommendation>("publishDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const handleSort = (field: keyof ContentRecommendation) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    
    const sorted = [...recommendations].sort((a, b) => {
      if (field === "publishDate") {
        return sortDirection === "asc" 
          ? a[field].getTime() - b[field].getTime()
          : b[field].getTime() - a[field].getTime();
      }
      
      const aValue = String(a[field]).toLowerCase();
      const bValue = String(b[field]).toLowerCase();
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
    
    setRecommendations(sorted);
  };
  
  const filterByType = (type: string | null) => {
    setSelectedType(type);
    if (type === null) {
      setRecommendations(mockRecommendations);
      return;
    }
    
    setRecommendations(mockRecommendations.filter(item => item.type === type));
  };
  
  const uniqueTypes = Array.from(new Set(mockRecommendations.map(item => item.type)));
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
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
        <h2 className="text-xl font-semibold">recommended content</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1 text-sm"
            >
              <Filter className="h-4 w-4" />
              <span>filter by type</span>
            </button>
            <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
              <div 
                className={`cursor-pointer rounded-md px-2 py-1 text-sm ${selectedType === null ? 'bg-blue-50 text-blue-700' : ''}`}
                onClick={() => filterByType(null)}
              >
                all types
              </div>
              {uniqueTypes.map(type => (
                <div 
                  key={type}
                  className={`cursor-pointer rounded-md px-2 py-1 text-sm ${selectedType === type ? 'bg-blue-50 text-blue-700' : ''}`}
                  onClick={() => filterByType(type)}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-md border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="cursor-pointer px-4 py-2 text-left text-sm font-medium text-gray-500"
                onClick={() => handleSort("title")}
              >
                <div className="flex items-center gap-1">
                  title
                  {sortField === "title" && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                className="cursor-pointer px-4 py-2 text-left text-sm font-medium text-gray-500"
                onClick={() => handleSort("type")}
              >
                <div className="flex items-center gap-1">
                  type
                  {sortField === "type" && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                className="cursor-pointer px-4 py-2 text-left text-sm font-medium text-gray-500"
                onClick={() => handleSort("audience")}
              >
                <div className="flex items-center gap-1">
                  audience
                  {sortField === "audience" && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                className="cursor-pointer px-4 py-2 text-left text-sm font-medium text-gray-500"
                onClick={() => handleSort("impact")}
              >
                <div className="flex items-center gap-1">
                  impact
                  {sortField === "impact" && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                className="cursor-pointer px-4 py-2 text-left text-sm font-medium text-gray-500"
                onClick={() => handleSort("publishDate")}
              >
                <div className="flex items-center gap-1">
                  publish date
                  {sortField === "publishDate" && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                rationale
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recommendations.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{item.title}</td>
                <td className="px-4 py-3 text-sm">{item.type}</td>
                <td className="px-4 py-3 text-sm">{item.audience}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`rounded-full px-2 py-1 text-xs ${getImpactClass(item.impact)}`}>
                    {item.impact}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{formatDate(item.publishDate)}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="rounded-full p-1 hover:bg-gray-100"
                      title={item.rationale}
                    >
                      <Info className="h-4 w-4 text-gray-400" />
                    </button>
                    <span className="ml-2 line-clamp-1 text-xs text-gray-500">
                      {item.rationale.substring(0, 50)}...
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 