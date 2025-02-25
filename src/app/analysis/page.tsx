import * as React from "react"
import { Sigma, PieChart, TrendingUp, Lightbulb, FileText, RefreshCw } from "lucide-react"

export default function AnalysisPage() {
  return (
    <React.Suspense>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">content analysis</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              <RefreshCw className="h-4 w-4" />
              re-analyze
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              export results
            </button>
          </div>
        </div>

        {/* Analysis Overview Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-2">
              <Sigma className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium">content audit</h3>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">total content pieces</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">blog posts</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">video content</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">infographics</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">podcasts</span>
                <span className="font-medium">1</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-medium">audience alignment</h3>
            </div>
            <div className="mt-4 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">marketing VPs</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 w-[45%] rounded-full bg-blue-500"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">content strategists</span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 w-[30%] rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">marketing teams</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 w-[25%] rounded-full bg-purple-500"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-medium">performance metrics</h3>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">avg. engagement rate</span>
                <span className="font-medium">3.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">avg. time on page</span>
                <span className="font-medium">2:45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">social shares (avg.)</span>
                <span className="font-medium">28</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">conversion rate</span>
                <span className="font-medium">1.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Gaps Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">identified content gaps</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">5 gaps found</span>
          </div>
          <div className="space-y-4">
            <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">AI content creation tools</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    No content addressing how AI tools are changing content creation workflows. 
                    This is a significant trend that your audience is searching for.
                  </p>
                  <div className="mt-2">
                    <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">high priority</span>
                    <span className="ml-2 text-xs text-gray-500">Search volume: 5.2k/mo</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">content ROI measurement</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Limited coverage on measuring the return on investment for content marketing efforts. 
                    This is a key concern for your Marketing VP persona.
                  </p>
                  <div className="mt-2">
                    <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">high priority</span>
                    <span className="ml-2 text-xs text-gray-500">Search volume: 3.8k/mo</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">content distribution strategies</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Minimal content about effectively distributing content across platforms.
                    Your competitors are gaining traffic with this topic.
                  </p>
                  <div className="mt-2">
                    <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">medium priority</span>
                    <span className="ml-2 text-xs text-gray-500">Search volume: 2.1k/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Refresh Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">content refresh opportunities</h2>
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">4 pieces need updates</span>
          </div>
          <div className="overflow-hidden rounded-md border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">content title</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">type</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">published</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">issue</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">potential impact</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">content strategy for 2022</td>
                  <td className="px-4 py-3 text-sm">blog post</td>
                  <td className="px-4 py-3 text-sm">Mar 15, 2022</td>
                  <td className="px-4 py-3 text-sm">outdated information</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">high</span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-blue-600 hover:text-blue-700">view details</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">SEO best practices</td>
                  <td className="px-4 py-3 text-sm">blog post</td>
                  <td className="px-4 py-3 text-sm">Jun 8, 2022</td>
                  <td className="px-4 py-3 text-sm">algorithm changes</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">high</span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-blue-600 hover:text-blue-700">view details</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">social media content guide</td>
                  <td className="px-4 py-3 text-sm">infographic</td>
                  <td className="px-4 py-3 text-sm">Sep 22, 2022</td>
                  <td className="px-4 py-3 text-sm">missing platforms</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">medium</span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-blue-600 hover:text-blue-700">view details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Keyword Analysis Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">keyword analysis</h2>
            <button className="text-blue-600 hover:text-blue-700">view all keywords</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
              <h3 className="text-sm font-medium">top performing keywords</h3>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">content strategy</span>
                  <span className="text-xs font-medium">position #3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">marketing ROI</span>
                  <span className="text-xs font-medium">position #5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">content calendar</span>
                  <span className="text-xs font-medium">position #7</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
              <h3 className="text-sm font-medium">keyword gaps</h3>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">AI content tools</span>
                  <span className="text-xs font-medium">not ranking</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">content distribution</span>
                  <span className="text-xs font-medium">not ranking</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">content measurement</span>
                  <span className="text-xs font-medium">position #28</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
              <h3 className="text-sm font-medium">trending keywords</h3>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">AI content creation</span>
                  <span className="text-xs font-medium">+125% searches</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">content ROI</span>
                  <span className="text-xs font-medium">+82% searches</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">content analytics</span>
                  <span className="text-xs font-medium">+64% searches</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Suspense>
  )
} 