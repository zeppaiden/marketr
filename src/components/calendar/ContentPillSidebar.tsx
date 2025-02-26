import * as React from "react";
import { ContentPill, ContentPillType, DraggableContentPill } from "./DraggableContentPill";
import { MoveDown } from "lucide-react";

interface ContentPillSidebarProps {
  removedItems: ContentPill[];
  onPillDragStart: (pill: ContentPill) => void;
  onUnscheduleContent?: (pill: ContentPill) => void;
}

export function ContentPillSidebar({ 
  removedItems = [],
  onPillDragStart,
  onUnscheduleContent
}: ContentPillSidebarProps) {
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);
  
  // Handle drop events (when a pill is dropped from the calendar)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    try {
      const contentData = e.dataTransfer.getData("application/json");
      
      if (contentData && onUnscheduleContent) {
        const pill = JSON.parse(contentData) as ContentPill;
        onUnscheduleContent(pill);
      }
    } catch (error) {
      console.error("Error parsing dropped content:", error);
    }
  };
  
  // Handle drag over events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };
  
  // Handle drag leave events
  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };
  
  return (
    <div 
      className={`h-full overflow-hidden rounded-lg border ${
        isDraggingOver 
          ? 'border-blue-400 bg-blue-50/50' 
          : 'border-gray-200 bg-white'
      } shadow-sm transition-colors`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-800">Unscheduled Content</h3>
      </div>
      
      <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 350px)' }}>
        {removedItems.length > 0 ? (
          <div className="space-y-2.5">
            {removedItems.map(pill => (
              <DraggableContentPill 
                key={pill.id} 
                pill={pill} 
                onDragStart={onPillDragStart} 
              />
            ))}
          </div>
        ) : (
          <div className="py-8 px-4 text-center">
            {isDraggingOver ? (
              <div className="p-6 border-2 border-dashed border-blue-300 rounded-md bg-blue-50 flex flex-col items-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-3">
                  <MoveDown className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-sm text-blue-600 font-medium">Drop to unschedule</p>
              </div>
            ) : (
              <>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-3">
                  <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">No unscheduled content yet</p>
                <p className="mt-1 text-xs text-gray-500">Drag calendar items here to unschedule them.</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 