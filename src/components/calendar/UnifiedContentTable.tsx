"use client";

import * as React from "react";
import { useState } from "react";
import { Filter, ArrowUpDown, Info, ChevronDown, ExternalLink, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Unified content item type that combines both recommendation and refresh suggestion
export type UnifiedContentItem = {
  id: string;
  title: string;
  type: string;
  audience?: string;
  impact: "High" | "Medium" | "Low" | "high" | "medium" | "low";
  publishDate: Date;
  lastUpdated?: Date;
  keywords?: string[];
  rationale?: string;
  url?: string;
  performance?: {
    traffic: number;
    engagement: number;
    conversion: number;
  };
  seoIssues?: string[];
  suggestedUpdates?: string[];
  // Flag to identify if this is a refresh suggestion
  isRefresh: boolean;
};

// Mock data combining both content types
const mockRecommendations: UnifiedContentItem[] = [
  {
    id: "1",
    title: "10 Ways to Improve Your Content Strategy",
    type: "Blog Post",
    audience: "Marketing VPs",
    impact: "High",
    publishDate: new Date(2023, 2, 5),
    keywords: ["Content Strategy", "Marketing ROI", "Content Planning"],
    rationale: "Based on your existing content, there's a gap in strategic planning resources. This post addresses that need while targeting high-value keywords with moderate competition.",
    isRefresh: false
  },
  {
    id: "2",
    title: "Content Marketing ROI Explained",
    type: "Video",
    audience: "Marketing Teams",
    impact: "Medium",
    publishDate: new Date(2023, 2, 12),
    keywords: ["Marketing ROI", "Content Value", "ROI Calculation"],
    rationale: "Your audience shows high engagement with visual content. This video format will help explain complex ROI concepts that your written content hasn't fully addressed.",
    isRefresh: false
  },
  {
    id: "3",
    title: "The Future of SEO in 2023",
    type: "Infographic",
    audience: "Content Strategists",
    impact: "High",
    publishDate: new Date(2023, 2, 18),
    keywords: ["SEO Trends", "Search Optimization", "2023 SEO"],
    rationale: "Trending topic with high search volume. Infographic format will increase shareability across platforms and drive backlinks to your site.",
    isRefresh: false
  },
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
    ],
    isRefresh: true
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
    ],
    isRefresh: true
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
    ],
    isRefresh: true
  }
];

export function UnifiedContentTable() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [contentType, setContentType] = useState<"all" | "new" | "refresh">("all");
  
  const filterRef = React.useRef<HTMLDivElement>(null);
  
  // Handle outside clicks to close the dropdown
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  
  const getImpactClass = (impact: "High" | "Medium" | "Low" | "high" | "medium" | "low") => {
    const normalizedImpact = impact.toLowerCase() as "high" | "medium" | "low";
    switch (normalizedImpact) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const handleRowClick = (id: string, isRefresh: boolean) => {
    if (isRefresh) {
      // Navigate to content refresh page
      router.push(`/content-refresh/${id}`);
    } else {
      // For new content recommendations
      router.push(`/content-recommendations/${id}`);
    }
  };
  
  // Filter data based on content type selection
  const filteredData = React.useMemo(() => {
    if (contentType === "all") return mockRecommendations;
    if (contentType === "new") return mockRecommendations.filter(item => !item.isRefresh);
    return mockRecommendations.filter(item => item.isRefresh);
  }, [contentType]);
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedImpacts, setSelectedImpacts] = useState<string[]>([]);
  
  // Get unique content types from data
  const contentTypes = React.useMemo(() => {
    const types = new Set<string>();
    mockRecommendations.forEach(item => types.add(item.type));
    return Array.from(types);
  }, []);
  
  // Handle type checkbox change
  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes(prev => [...prev, type]);
    } else {
      setSelectedTypes(prev => prev.filter(t => t !== type));
    }
  };
  
  // Handle impact checkbox change
  const handleImpactChange = (impact: string, checked: boolean) => {
    if (checked) {
      setSelectedImpacts(prev => [...prev, impact]);
    } else {
      setSelectedImpacts(prev => prev.filter(i => i !== impact));
    }
  };
  
  // Apply checkbox filters to data
  const applyFilters = () => {
    let filtered = filteredData;
    
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(item => selectedTypes.includes(item.type));
    }
    
    if (selectedImpacts.length > 0) {
      filtered = filtered.filter(item => {
        const normalizedImpact = item.impact.toLowerCase();
        return selectedImpacts.some(impact => impact.toLowerCase() === normalizedImpact);
      });
    }
    
    return filtered;
  };
  
  // Update the filtered data to include checkbox filters
  const finalFilteredData = React.useMemo(() => {
    if (selectedTypes.length === 0 && selectedImpacts.length === 0) {
      return filteredData;
    }
    return applyFilters();
  }, [filteredData, selectedTypes, selectedImpacts]);
  
  const columns: ColumnDef<UnifiedContentItem>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center space-x-2">
            {item.isRefresh && (
              <span className="text-blue-500">
                <RefreshCw className="h-4 w-4" />
              </span>
            )}
            <span className="font-medium">{item.title}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.original.type}</div>,
    },
    {
      accessorKey: "impact",
      header: "Impact",
      cell: ({ row }) => {
        const impact = row.original.impact;
        return (
          <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getImpactClass(impact)}`}>
            {typeof impact === "string" && impact.charAt(0).toUpperCase() + impact.slice(1)}
          </div>
        );
      },
    },
    {
      accessorKey: "publishDate",
      header: ({ column }) => (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {mockRecommendations.some(item => item.isRefresh) ? "Original Date" : "Publish Date"}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => formatDate(row.original.publishDate),
    },
    {
      id: "lastUpdated",
      accessorFn: (row) => row.lastUpdated,
      header: "Last Updated",
      cell: ({ row }) => {
        const item = row.original;
        return item.lastUpdated ? formatDate(item.lastUpdated) : "N/A";
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex justify-end space-x-2">
            {item.isRefresh ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRowClick(item.id, item.isRefresh)}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Refresh Details
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRowClick(item.id, item.isRefresh)}
              >
                View Details
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: finalFilteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={contentType === "all" ? "default" : "outline"}
            onClick={() => setContentType("all")}
            className="text-sm"
          >
            All Content
          </Button>
          <Button
            variant={contentType === "new" ? "default" : "outline"}
            onClick={() => setContentType("new")}
            className="text-sm"
          >
            New Content
          </Button>
          <Button
            variant={contentType === "refresh" ? "default" : "outline"}
            onClick={() => setContentType("refresh")}
            className="text-sm"
          >
            Refresh Content
          </Button>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-50">
            <div className="space-y-4">
              <h3 className="font-medium">Filter by Type</h3>
              <div className="space-y-2">
                {contentTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type}`} 
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={(checked) => 
                        handleTypeChange(type, checked === true)
                      }
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
              
              <h3 className="font-medium border-t pt-3">Filter by Impact</h3>
              <div className="space-y-2">
                {["High", "Medium", "Low"].map(impact => (
                  <div key={impact} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`impact-${impact}`} 
                      checked={selectedImpacts.includes(impact)}
                      onCheckedChange={(checked) => 
                        handleImpactChange(impact, checked === true)
                      }
                    />
                    <Label htmlFor={`impact-${impact}`} className="text-sm font-normal">
                      {impact}
                    </Label>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedTypes([]);
                    setSelectedImpacts([]);
                  }}
                >
                  Reset
                </Button>
                <div className="text-sm text-muted-foreground">
                  {finalFilteredData.length} of {filteredData.length} items
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(row.original.id, row.original.isRefresh)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-gray-500">
          Showing {table.getRowModel().rows.length} of {mockRecommendations.length} items
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
} 