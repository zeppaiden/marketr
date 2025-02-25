"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

type ContentItem = {
  id: string;
  title: string;
  type: keyof typeof CONTENT_TYPES;
  date: Date;
  audience: string;
  impact: "high" | "medium" | "low";
};

// mock content data
const mockContentItems: ContentItem[] = [
  {
    id: "1",
    title: "10 ways to improve your content strategy",
    type: "blog",
    date: new Date(2023, 2, 5),
    audience: "marketing VPs",
    impact: "high",
  },
  {
    id: "2",
    title: "content marketing ROI explained",
    type: "video",
    date: new Date(2023, 2, 12),
    audience: "marketing teams",
    impact: "medium",
  },
  {
    id: "3",
    title: "the future of SEO in 2023",
    type: "infographic",
    date: new Date(2023, 2, 18),
    audience: "content strategists",
    impact: "high",
  },
  {
    id: "4",
    title: "interview with content marketing experts",
    type: "podcast",
    date: new Date(2023, 2, 25),
    audience: "marketing VPs",
    impact: "medium",
  },
  {
    id: "5",
    title: "refresh: optimizing your blog for voice search",
    type: "refresh",
    date: new Date(2023, 2, 8),
    audience: "SEO specialists",
    impact: "medium",
  },
];

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2023);
  
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
  
  // filter content items for current month
  const contentForMonth = mockContentItems.filter(
    item => item.date.getMonth() === currentMonth && item.date.getFullYear() === currentYear
  );
  
  // create calendar grid
  const calendarDays = [];
  
  // add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-24 border border-gray-100 bg-gray-50" />);
  }
  
  // add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const contentForDay = contentForMonth.filter(
      item => item.date.getDate() === day
    );
    
    calendarDays.push(
      <div key={`day-${day}`} className="h-24 border border-gray-100 p-1">
        <div className="text-xs font-medium text-gray-500">{day}</div>
        <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px]">
          {contentForDay.map(item => (
            <div 
              key={item.id}
              className={`text-xs p-1 rounded border ${CONTENT_TYPES[item.type].color} cursor-pointer`}
              title={`${item.title} - Impact: ${item.impact}`}
            >
              {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
            </div>
          ))}
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