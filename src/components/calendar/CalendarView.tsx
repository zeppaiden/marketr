"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Calendar, Clock, RefreshCw } from "lucide-react";
import { ContentPill } from "./DraggableContentPill";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// mock data for demonstration
const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];

const CONTENT_TYPES = {
  blog: { color: "bg-blue-100 text-blue-800 border-blue-200" },
  video: { color: "bg-purple-100 text-purple-800 border-purple-200" },
  infographic: { color: "bg-green-100 text-green-800 border-green-200" },
  podcast: { color: "bg-orange-100 text-orange-800 border-orange-200" },
  refresh: { color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
};

export type ScheduledContentItem = ContentPill & {
  date: Date;
};

// Mock initial scheduled content
const INITIAL_SCHEDULED_CONTENT: ScheduledContentItem[] = [
  {
    id: "scheduled-1",
    title: "10 Ways to Improve Your Content Strategy",
    type: "blog",
    date: new Date(2023, 2, 5)
  },
  {
    id: "scheduled-2",
    title: "Content Marketing ROI Explained",
    type: "video",
    date: new Date(2023, 2, 12)
  },
  {
    id: "scheduled-3",
    title: "The Future of SEO in 2023",
    type: "infographic",
    date: new Date(2023, 2, 18)
  },
  {
    id: "scheduled-4",
    title: "Interview with Content Marketing Experts",
    type: "podcast",
    date: new Date(2023, 2, 25)
  },
  {
    id: "scheduled-5",
    title: "Optimizing Your Blog for Voice Search",
    type: "blog",
    isRefresh: true,
    date: new Date(2023, 2, 8)
  }
];

interface CalendarViewProps {
  scheduledItems: ScheduledContentItem[];
  onScheduleContentPill?: (pill: ContentPill, date: Date) => void;
  onRemoveContentPill?: (pill: ScheduledContentItem) => void;
}

export function CalendarView({ 
  scheduledItems,
  onScheduleContentPill,
  onRemoveContentPill
}: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2023);
  // State for tracking drag operations
  const [isDraggingOver, setIsDraggingOver] = useState<number | null>(null);
  // State for tracking which item is being dragged
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Handler for when content is dropped on a calendar day
  const handleDrop = (e: React.DragEvent, day: number) => {
    e.preventDefault();
    setIsDraggingOver(null);
    
    try {
      // Try to get data from the dataTransfer
      const contentData = e.dataTransfer.getData("application/json");
      
      if (contentData && onScheduleContentPill) {
        const pill = JSON.parse(contentData) as ContentPill;
        const date = new Date(currentYear, currentMonth, day);
        
        // Call the parent callback to update the pills
        onScheduleContentPill(pill, date);
        
        setDraggingItemId(null);
      }
    } catch (error) {
      console.error("Error parsing dropped content:", error);
    }
  };
  
  // Handler for drag over
  const handleDragOver = (e: React.DragEvent, day: number) => {
    e.preventDefault();
    setIsDraggingOver(day);
  };
  
  // Handler for drag leave
  const handleDragLeave = () => {
    setIsDraggingOver(null);
  };
  
  // Handler for when a calendar item starts being dragged
  const handleCalendarItemDragStart = (e: React.DragEvent, item: ScheduledContentItem) => {
    setDraggingItemId(item.id);
    // Set data transfer for compatibility with the drop handler
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };
  
  // filter content items for current month
  const contentForMonth = scheduledItems.filter(
    item => item.date.getMonth() === currentMonth && item.date.getFullYear() === currentYear
  );
  
  // create calendar grid
  const calendarDays = [];
  
  // add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-36 border border-gray-100 bg-gray-50" />);
  }
  
  // add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const contentForDay = contentForMonth.filter(
      item => item.date.getDate() === day
    );
    
    const isDraggedOver = isDraggingOver === day;
    const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
    const isWeekend = new Date(currentYear, currentMonth, day).getDay() === 0 || new Date(currentYear, currentMonth, day).getDay() === 6;
    
    calendarDays.push(
      <div 
        key={`day-${day}`} 
        className={`h-36 border relative ${
          isDraggedOver 
            ? 'border-blue-400 bg-blue-50' 
            : isToday
              ? 'border-blue-300 bg-blue-50'
              : isWeekend
                ? 'border-gray-100 bg-gray-50/50'
                : 'border-gray-100'
        } p-1 transition-colors`}
        onDrop={(e) => handleDrop(e, day)}
        onDragOver={(e) => handleDragOver(e, day)}
        onDragLeave={handleDragLeave}
      >
        <div className={`text-xs font-medium ${isToday ? 'bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center' : 'text-gray-500'} mb-2`}>
          {day}
        </div>
        <div className="relative overflow-visible h-[calc(100%-18px)]">
          <div className="relative h-full" style={{ maxHeight: `${Math.min(contentForDay.length * 20, 90)}px` }}>
            {contentForDay.slice().reverse().map((item, index) => (
              <Popover key={`${item.id}-${day}`}>
                <PopoverTrigger asChild>
                  <div 
                    className={`text-xs p-1.5 rounded-md border ${item.isRefresh ? 'border-dashed' : 'border-solid'} 
                      ${CONTENT_TYPES[item.type].color} cursor-pointer 
                      absolute w-[calc(100%-0.5rem)] 
                      transition-all duration-200 ease-in-out
                      hover:z-20 hover:shadow-md hover:scale-[1.03] hover:brightness-95 hover:translate-y-[-2px]
                      active:scale-[0.98] active:brightness-90`}
                    style={{ 
                      top: `${index * 16}px`,
                      zIndex: index,
                      opacity: index < contentForDay.length - 4 && index !== 0 ? 0.7 : 1
                    }}
                    title={`${item.title} (Click to view details)`}
                    draggable
                    onDragStart={(e) => handleCalendarItemDragStart(e, item)}
                  >
                    <div className="flex items-center gap-1.5 min-h-[16px]">
                      <span className="flex-shrink-0 text-base">{item.type === "refresh" ? "🔄" : item.type === "blog" ? "📝" : item.type === "video" ? "🎬" : item.type === "infographic" ? "📊" : "🎙️"}</span>
                      <span className="truncate">
                        {item.title.length > 18 ? `${item.title.substring(0, 18)}...` : item.title}
                      </span>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 shadow-lg rounded-lg overflow-hidden border border-gray-200"
                                side="top"
                                align="start"
                                sideOffset={5}>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {item.type === "refresh" ? "🔄" : item.type === "blog" ? "📝" : 
                           item.type === "video" ? "🎬" : item.type === "infographic" ? "📊" : "🎙️"}
                        </span>
                        <div>
                          <h3 className="text-base font-medium">{item.title}</h3>
                          <p className="text-gray-500 capitalize text-sm">{item.type} {item.isRefresh ? '(Refresh)' : ''}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Scheduled for {item.date.toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Est. creation time: 3 hours</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Content Brief</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.isRefresh 
                            ? `Update the existing ${item.type} with current information and trends for 2023.` 
                            : `Create a comprehensive ${item.type} that explores ${item.title.toLowerCase()} with actionable insights.`}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Instructions</h4>
                        <div className="text-sm text-gray-600 mt-1 flex items-start gap-2">
                          <RefreshCw className="h-4 w-4 text-gray-400 mt-0.5" />
                          <p>To unschedule this content, drag it to the "Unscheduled Content" sidebar.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {MONTHS[currentMonth]} {currentYear}
        </h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={prevMonth}
            type="button"
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={nextMonth}
            type="button"
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px">
        {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        {calendarDays}
      </div>
      
      <div className="flex flex-wrap gap-2 pt-2">
        {Object.entries(CONTENT_TYPES).map(([type, { color }]) => (
          <div key={type} className="flex items-center gap-1">
            <div className={`h-3 w-3 rounded-full ${color.split(' ')[0]}`} />
            <span className="text-xs text-gray-600">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 