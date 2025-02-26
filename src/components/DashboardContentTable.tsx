"use client"

import * as React from "react"
import { useState } from "react"
import { Filter, ArrowUpDown, ExternalLink, RefreshCw, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
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
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Content item type for analyzed content
export type AnalyzedContentItem = {
  id: string
  title: string
  type: string
  url: string
  publishDate: Date
  lastUpdated?: Date
  performance?: {
    traffic: number
    engagement: number
    conversion: number
  }
}

// Mock data for analyzed content
const mockAnalyzedContent: AnalyzedContentItem[] = [
  {
    id: "r1",
    title: "Optimizing Your Blog for Voice Search",
    type: "Blog Post",
    url: "https://example.com/blog/voice-search-optimization",
    publishDate: new Date(2022, 1, 15),
    lastUpdated: new Date(2022, 1, 15),
    performance: {
      traffic: 1200,
      engagement: 2.5,
      conversion: 0.8,
    }
  },
  {
    id: "r2",
    title: "Content Marketing Trends to Watch",
    type: "Blog Post",
    url: "https://example.com/blog/content-marketing-trends",
    publishDate: new Date(2022, 3, 10),
    lastUpdated: new Date(2022, 3, 10),
    performance: {
      traffic: 3500,
      engagement: 3.2,
      conversion: 1.2,
    }
  },
  {
    id: "r3",
    title: "How to Measure Content Marketing ROI",
    type: "Blog Post",
    url: "https://example.com/blog/content-marketing-roi",
    publishDate: new Date(2021, 11, 5),
    lastUpdated: new Date(2022, 5, 20),
    performance: {
      traffic: 5200,
      engagement: 4.1,
      conversion: 2.3,
    }
  }
]

export function DashboardContentTable() {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const filterRef = React.useRef<HTMLDivElement>(null)
  
  // Handle outside clicks to close the dropdown
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }
  
  const handleRowClick = (id: string) => {
    router.push(`/content-refresh/${id}`)
  }
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  
  // Get unique content types from data
  const contentTypes = React.useMemo(() => {
    const types = new Set<string>()
    mockAnalyzedContent.forEach(item => types.add(item.type))
    return Array.from(types)
  }, [])
  
  // Handle type checkbox change
  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes(prev => [...prev, type])
    } else {
      setSelectedTypes(prev => prev.filter(t => t !== type))
    }
  }
  
  // Apply checkbox filters to data
  const applyFilters = () => {
    let filtered = mockAnalyzedContent
    
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(item => selectedTypes.includes(item.type))
    }
    
    return filtered
  }
  
  // Update the filtered data to include checkbox filters
  const finalFilteredData = React.useMemo(() => {
    if (selectedTypes.length === 0) {
      return mockAnalyzedContent
    }
    return applyFilters()
  }, [selectedTypes])
  
  const columns: ColumnDef<AnalyzedContentItem>[] = [
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
        return (
          <div className="flex items-center space-x-2">
            <span className="font-medium">{row.original.title}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.original.type}</div>,
    },
    {
      accessorKey: "publishDate",
      header: ({ column }) => (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published Date
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
        return row.original.lastUpdated ? formatDate(row.original.lastUpdated) : "N/A"
      },
    },
    {
      id: "trafficMetric",
      header: "Traffic",
      cell: ({ row }) => {
        const traffic = row.original.performance?.traffic || 0
        return <div>{traffic.toLocaleString()}</div>
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
              onClick={(e) => {
                e.stopPropagation()
                handleRowClick(row.original.id)
              }}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View Details
            </Button>
          </div>
        )
      },
    },
  ]

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
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
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
              
              <div className="flex items-center justify-between pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedTypes([])
                  }}
                >
                  Reset
                </Button>
                <div className="text-sm text-muted-foreground">
                  {finalFilteredData.length} of {mockAnalyzedContent.length} items
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
                  className="cursor-pointer hover:bg-gray-50"
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
                  No content found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-gray-500">
          Showing {table.getRowModel().rows.length} of {mockAnalyzedContent.length} items
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
  )
} 