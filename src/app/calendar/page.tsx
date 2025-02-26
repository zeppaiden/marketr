"use client";

import { useState } from "react";
import { CalendarView, ScheduledContentItem } from "@/components/calendar/CalendarView";
import { ContentRecommendations } from "@/components/calendar/ContentRecommendations";
import { RefreshSuggestions } from "@/components/calendar/RefreshSuggestions";
import { ContentPillSidebar } from "@/components/calendar/ContentPillSidebar";
import { ExportDialog } from "@/components/calendar/ExportDialog";
import { ContentPill } from "@/components/calendar/DraggableContentPill";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Mock content data for the calendar
const mockCalendarContent: ScheduledContentItem[] = [
  // New content
  {
    id: "new-1",
    title: "10 Ways to Improve Your Content Strategy",
    type: "blog",
    date: new Date(2023, 2, 5)
  },
  {
    id: "new-2",
    title: "Content Marketing ROI Explained",
    type: "video",
    date: new Date(2023, 2, 12)
  },
  {
    id: "new-3",
    title: "The Future of SEO in 2023",
    type: "infographic",
    date: new Date(2023, 2, 18)
  },
  {
    id: "new-4",
    title: "Interview with Content Marketing Experts",
    type: "podcast",
    date: new Date(2023, 2, 25)
  },
  {
    id: "new-5",
    title: "How to Build a Content Calendar",
    type: "blog",
    date: new Date(2023, 2, 8)
  },
  // Refresh content
  {
    id: "refresh-1",
    title: "Optimizing Your Blog for Voice Search",
    type: "blog",
    isRefresh: true,
    date: new Date(2023, 2, 3)
  },
  {
    id: "refresh-2",
    title: "Content Marketing Trends to Watch",
    type: "blog",
    isRefresh: true,
    date: new Date(2023, 2, 15)
  },
  {
    id: "refresh-3",
    title: "How to Measure Content Marketing ROI",
    type: "blog",
    isRefresh: true,
    date: new Date(2023, 2, 22)
  }
];

export default function CalendarPage() {
  const [timeRange, setTimeRange] = useState("3months");
  const [showExportDialog, setShowExportDialog] = useState(false);
  // State for calendar items and removed items
  const [scheduledItems, setScheduledItems] = useState<ScheduledContentItem[]>(mockCalendarContent);
  const [removedItems, setRemovedItems] = useState<ContentPill[]>([]);
  
  // Handle when a pill is dragged from the sidebar
  const handlePillDragStart = (pill: ContentPill) => {
    // Just a placeholder, actual drag data is handled by component
  };
  
  // Handle when a pill is scheduled on the calendar
  const handleScheduleContent = (pill: ContentPill, date: Date) => {
    console.log(`Scheduling ${pill.title} for ${date.toLocaleDateString()}`);
    
    // Remove from unscheduled items
    setRemovedItems(prev => prev.filter(item => item.id !== pill.id));
    
    // Add to scheduled items
    setScheduledItems(prev => [
      ...prev.filter(item => item.id !== pill.id),
      { ...pill, date } as ScheduledContentItem
    ]);
  };
  
  // Handle when a pill is unscheduled (dropped into the sidebar)
  const handleUnscheduleContent = (pill: ContentPill) => {
    console.log(`Unscheduling ${pill.title} from calendar`);
    
    // Find the full scheduled item with date information
    const scheduledItem = scheduledItems.find(item => item.id === pill.id);
    
    if (scheduledItem) {
      // Remove from scheduled items
      setScheduledItems(prev => prev.filter(item => item.id !== pill.id));
      
      // Add to removed items (without the date)
      const { date, ...contentPill } = scheduledItem;
      setRemovedItems(prev => [...prev, contentPill]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Content Strategy Calendar</h1>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setShowExportDialog(true)}
            className="h-10 px-5 font-medium"
            variant="default"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Calendar
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="calendar">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="recommendations">Content Recommendations</TabsTrigger>
          <TabsTrigger value="refresh">Refresh Suggestions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-4">
          <div className="grid grid-cols-4 gap-6">
            {/* Sidebar with removed content pills */}
            <div className="col-span-1">
              <ContentPillSidebar
                removedItems={removedItems}
                onPillDragStart={handlePillDragStart}
                onUnscheduleContent={handleUnscheduleContent}
              />
            </div>
            
            {/* Calendar area */}
            <div className="col-span-3 rounded-lg border border-gray-200 bg-white p-4">
              <CalendarView 
                scheduledItems={scheduledItems}
                onScheduleContentPill={handleScheduleContent}
                onRemoveContentPill={undefined} // No longer using click to remove
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="mt-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <ContentRecommendations />
          </div>
        </TabsContent>
        
        <TabsContent value="refresh" className="mt-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <RefreshSuggestions />
          </div>
        </TabsContent>
      </Tabs>
      
      <ExportDialog 
        isOpen={showExportDialog} 
        onClose={() => setShowExportDialog(false)} 
      />
    </div>
  );
} 