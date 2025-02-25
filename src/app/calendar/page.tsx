import { CalendarView } from "@/components/calendar/CalendarView";
import { ContentRecommendations } from "@/components/calendar/ContentRecommendations";
import { RefreshSuggestions } from "@/components/calendar/RefreshSuggestions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">content strategy calendar</h1>
        <div className="flex items-center gap-2">
          <select className="rounded-md border border-gray-200 px-3 py-1 text-sm">
            <option>next 3 months</option>
            <option>next 6 months</option>
            <option>custom range</option>
          </select>
          <button 
            type="button"
            className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
          >
            export calendar
          </button>
        </div>
      </div>
      
      <Tabs defaultValue="calendar">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">calendar view</TabsTrigger>
          <TabsTrigger value="recommendations">content recommendations</TabsTrigger>
          <TabsTrigger value="refresh">refresh suggestions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <CalendarView />
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
      
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="mb-4 text-xl font-semibold">strategy insights</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
            <h3 className="text-sm font-medium text-gray-700">content mix</h3>
            <p className="mt-1 text-xs text-gray-500">
              your strategy includes a balanced mix of blog posts (40%), videos (30%), 
              infographics (20%), and podcasts (10%) based on your audience engagement patterns.
            </p>
          </div>
          <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
            <h3 className="text-sm font-medium text-gray-700">audience alignment</h3>
            <p className="mt-1 text-xs text-gray-500">
              content is optimized for your primary persona (marketing VPs) with 
              secondary focus on content strategists and editors.
            </p>
          </div>
          <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
            <h3 className="text-sm font-medium text-gray-700">SEO impact</h3>
            <p className="mt-1 text-xs text-gray-500">
              projected 25% increase in organic traffic with implementation of 
              recommended content strategy and refresh actions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 