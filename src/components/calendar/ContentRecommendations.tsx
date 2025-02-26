"use client";

import * as React from "react";
import { useState } from "react";
import { Filter, ArrowUpDown, Info, ChevronDown, ExternalLink } from "lucide-react";
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

// Mock data for recommendations
type ContentRecommendation = {
  id: string;
  title: string;
  type: string;
  audience: string;
  impact: "High" | "Medium" | "Low";
  publishDate: Date;
  keywords: string[];
  rationale: string;
};

const mockRecommendations: ContentRecommendation[] = [
  {
    id: "1",
    title: "10 Ways to Improve Your Content Strategy",
    type: "Blog Post",
    audience: "Marketing VPs",
    impact: "High",
    publishDate: new Date(2023, 2, 5),
    keywords: ["Content Strategy", "Marketing ROI", "Content Planning"],
    rationale: "Based on your existing content, there's a gap in strategic planning resources. This post addresses that need while targeting high-value keywords with moderate competition.",
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
  },
  {
    id: "4",
    title: "Building a Content Calendar That Works",
    type: "Blog Post",
    audience: "Content Strategists",
    impact: "Medium",
    publishDate: new Date(2023, 2, 25),
    keywords: ["Content Calendar", "Content Planning", "Editorial Calendar"],
    rationale: "Your audience frequently searches for planning resources. This comprehensive guide fills a content gap and establishes thought leadership in this area.",
  },
  {
    id: "5",
    title: "AI Tools for Content Creation: A Guide",
    type: "Blog Post",
    audience: "Marketing Teams",
    impact: "High",
    publishDate: new Date(2023, 3, 5),
    keywords: ["AI Content", "Content Creation", "AI Tools"],
    rationale: "Rapidly growing interest in AI content tools. This comprehensive guide will attract significant traffic and position you as a forward-thinking resource.",
  },
  {
    id: "6",
    title: "How to Measure Content Performance",
    type: "Video",
    audience: "Marketing VPs",
    impact: "High",
    publishDate: new Date(2023, 3, 12),
    keywords: ["Content Metrics", "Performance Measurement", "Analytics"],
    rationale: "Addresses a key pain point for decision-makers. Video format simplifies complex analytics concepts while providing actionable insights.",
  },
  {
    id: "7",
    title: "Social Media Content Distribution Cheat Sheet",
    type: "Infographic",
    audience: "Marketing Teams",
    impact: "Medium",
    publishDate: new Date(2023, 3, 19),
    keywords: ["Social Media", "Content Distribution", "Platform Strategy"],
    rationale: "Highly shareable format for a topic your audience consistently engages with. Will drive social traffic and generate backlinks.",
  },
];

export function ContentRecommendations() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
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
  
  const getImpactClass = (impact: "High" | "Medium" | "Low") => {
    switch (impact) {
      case "High":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleRowClick = (id: string) => {
    router.push(`/content-recommendations/${id}`);
  };

  const columns: ColumnDef<ContentRecommendation>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "audience",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Audience
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("audience")}</div>,
    },
    {
      accessorKey: "impact",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Impact
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const impact = row.getValue("impact") as "High" | "Medium" | "Low";
        return (
          <div className="flex justify-left">
            <span className={`rounded-full px-2 py-1 text-xs ${getImpactClass(impact)}`}>
              {impact}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "publishDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Publish Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = row.getValue("publishDate") as Date;
        return <div>{formatDate(date)}</div>
      },
      sortingFn: (rowA, rowB, columnId) => {
        const dateA = rowA.getValue(columnId) as Date;
        const dateB = rowB.getValue(columnId) as Date;
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      accessorKey: "rationale",
      header: "Rationale",
      cell: ({ row }) => {
        const rationale = row.getValue("rationale") as string;
        return (
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full p-0"
              title={rationale}
            >
              <Info className="h-4 w-4 text-gray-400" />
            </Button>
            <span className="ml-2 line-clamp-1 text-xs text-gray-500">
              {rationale.substring(0, 50)}...
            </span>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                handleRowClick(row.original.id);
              }}
            >
              View
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: mockRecommendations,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
        <h2 className="text-xl font-semibold">Content Recommendations</h2>
        <div className="flex items-center gap-2">
          <div>
            <Button
              variant="outline"
              className="ml-auto"
              onClick={() => table.getColumn("type")?.setFilterValue(undefined)}
            >
              Reset Filters
            </Button>
          </div>
          <div className="relative" ref={filterRef}>
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              <span>Filter by Type</span>
              <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </Button>
            {isFilterOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
                <div 
                  className="cursor-pointer rounded-md px-2 py-1 text-sm hover:bg-blue-50"
                  onClick={() => {
                    table.getColumn("type")?.setFilterValue(undefined);
                    setIsFilterOpen(false);
                  }}
                >
                  All Types
                </div>
                {Array.from(new Set(mockRecommendations.map(item => item.type))).map(type => (
                  <div 
                    key={type}
                    className="cursor-pointer rounded-md px-2 py-1 text-sm hover:bg-blue-50"
                    onClick={() => {
                      table.getColumn("type")?.setFilterValue([type]);
                      setIsFilterOpen(false);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
                  )
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
                  className="cursor-pointer"
                  onClick={() => handleRowClick(row.original.id)}
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
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} recommendation(s) found.
        </div>
        <div className="space-x-2">
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
    </div>
  );
} 