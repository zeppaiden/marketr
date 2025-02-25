"use client";

import * as React from "react"
import { useState } from "react"
import { PlusCircle, Upload, GanttChart, BarChart3, Calendar } from "lucide-react"
import { UrlInput } from "@/components/UrlInput"

export default function DashboardPage() {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  
  const handleAnalyze = (urls: string[]) => {
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };
  
  return (
    <React.Suspense>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">content strategy dashboard</h1>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <PlusCircle className="h-4 w-4" />
            new content strategy
          </button>
        </div>

        {/* Content Ingestion Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">content ingestion</h2>
          
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-8">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
              <p className="text-center font-medium text-gray-700">analyzing your content...</p>
              <p className="text-center text-sm text-gray-500">this may take a few minutes</p>
            </div>
          ) : analysisComplete ? (
            <div className="space-y-4">
              <div className="rounded-md bg-green-50 p-4 text-green-800">
                <p className="flex items-center gap-2 font-medium">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Analysis complete!</span>
                </p>
                <p className="mt-2 text-sm">
                  We've analyzed your content and generated recommendations. View your content strategy in the calendar section.
                </p>
                <div className="mt-4 flex gap-2">
                  <a 
                    href="/calendar" 
                    className="rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
                  >
                    View calendar
                  </a>
                  <a 
                    href="/analysis" 
                    className="rounded-md border border-green-700 bg-transparent px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
                  >
                    View detailed analysis
                  </a>
                </div>
              </div>
              
              <button
                onClick={() => setAnalysisComplete(false)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Analyze more content
              </button>
            </div>
          ) : (
            <UrlInput onAnalyze={handleAnalyze} />
          )}
        </div>
        
        {/* Analysis Overview Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">analysis overview</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <GanttChart className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-medium">content gaps</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">5</p>
              <p className="mt-1 text-xs text-gray-500">key topic areas with insufficient coverage</p>
            </div>
            
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <h3 className="text-sm font-medium">content performance</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">+23%</p>
              <p className="mt-1 text-xs text-gray-500">projected traffic increase with new strategy</p>
            </div>
            
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <h3 className="text-sm font-medium">strategy timeline</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">3 months</p>
              <p className="mt-1 text-xs text-gray-500">optimized content calendar duration</p>
            </div>
          </div>
        </div>
        
        {/* Recent Activity Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">recent activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 border-l-2 border-blue-500 pl-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Upload className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">content analysis completed</p>
                <p className="text-xs text-gray-500">3 URLs analyzed • 12 content pieces extracted</p>
              </div>
              <div className="ml-auto text-xs text-gray-400">2 hours ago</div>
            </div>
            
            <div className="flex items-center gap-3 border-l-2 border-green-500 pl-3">
              <div className="rounded-full bg-green-100 p-2">
                <GanttChart className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">strategy generated</p>
                <p className="text-xs text-gray-500">6-month content plan with 24 recommendations</p>
              </div>
              <div className="ml-auto text-xs text-gray-400">2 hours ago</div>
            </div>
            
            <div className="flex items-center gap-3 border-l-2 border-yellow-500 pl-3">
              <div className="rounded-full bg-yellow-100 p-2">
                <Calendar className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">calendar updated</p>
                <p className="text-xs text-gray-500">added 8 new content pieces to your calendar</p>
              </div>
              <div className="ml-auto text-xs text-gray-400">1 hour ago</div>
            </div>
          </div>
        </div>
      </div>
    </React.Suspense>
  )
}
