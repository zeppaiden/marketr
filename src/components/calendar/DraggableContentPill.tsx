import * as React from "react";

export type ContentPillType = "blog" | "video" | "infographic" | "podcast" | "refresh";

export interface ContentPill {
  id: string;
  title: string;
  type: ContentPillType;
  isRefresh?: boolean;
}

interface DraggableContentPillProps {
  pill: ContentPill;
  onDragStart: (pill: ContentPill) => void;
}

const TYPE_ICONS: Record<ContentPillType, string> = {
  blog: "📝",
  video: "🎬",
  infographic: "📊",
  podcast: "🎙️",
  refresh: "🔄",
};

const TYPE_COLORS: Record<ContentPillType, string> = {
  blog: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-50",
  video: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-50",
  infographic: "bg-green-100 text-green-800 border-green-200 hover:bg-green-50", 
  podcast: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-50",
  refresh: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-50",
};

export function DraggableContentPill({ pill, onDragStart }: DraggableContentPillProps) {
  const handleDragStart = (e: React.DragEvent) => {
    // Set the dragged data
    e.dataTransfer.setData("application/json", JSON.stringify(pill));
    // Call the parent's onDragStart handler
    onDragStart(pill);
  };

  const baseClasses = `
    group relative text-sm px-3 py-2 rounded-md border shadow-sm cursor-grab 
    flex items-center gap-2 transition-all duration-150
    ${pill.isRefresh ? 'border-dashed' : 'border-solid'} 
    ${TYPE_COLORS[pill.type]}
    hover:shadow active:scale-[0.98]
  `;

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={baseClasses}
      title={`${pill.title} (${pill.type}${pill.isRefresh ? ' - refresh' : ''})`}
    >
      <span className="flex-shrink-0 text-lg">{TYPE_ICONS[pill.type]}</span>
      <span className="truncate font-medium">
        {pill.title.length > 25 ? `${pill.title.substring(0, 25)}...` : pill.title}
      </span>
      <div className="absolute top-1 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="text-[10px] px-1.5 py-0.5 rounded bg-white/80 font-medium uppercase">
          {pill.type}
        </div>
      </div>
    </div>
  );
} 