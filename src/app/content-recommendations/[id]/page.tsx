import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Users, Zap, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";

// Mock data for recommendations - In a real app this would come from API/database
const mockRecommendations = [
  {
    id: "1",
    title: "10 Ways to Improve Your Content Strategy",
    type: "Blog Post",
    audience: "Marketing VPs",
    impact: "High",
    publishDate: new Date(2023, 2, 5),
    keywords: ["Content Strategy", "Marketing ROI", "Content Planning"],
    rationale: "Based on your existing content, there's a gap in strategic planning resources. This post addresses that need while targeting high-value keywords with moderate competition.",
    outlineContent: [
      {
        heading: "Introduction",
        content: "Content marketing continues to be one of the most effective marketing strategies for brands of all sizes. But creating content without a clear strategy can lead to wasted resources and missed opportunities."
      },
      {
        heading: "1. Define Clear Content Goals",
        content: "Before creating any content, establish what you want to achieve. Your goals should be specific, measurable, achievable, relevant, and time-bound (SMART)."
      },
      {
        heading: "2. Understand Your Audience",
        content: "Develop detailed buyer personas based on market research and real data about your existing customers. This helps ensure your content speaks directly to your target audience's needs and pain points."
      },
      {
        heading: "3. Audit Existing Content",
        content: "Analyze your current content to identify gaps, opportunities, and top-performing assets. This helps inform your strategy and prevents duplication of efforts."
      },
      {
        heading: "4. Map Content to the Buyer's Journey",
        content: "Create content that addresses customer needs at each stage of the buying process—awareness, consideration, and decision."
      },
      {
        heading: "5. Develop a Content Calendar",
        content: "Plan your content creation and distribution schedule to maintain consistency and ensure strategic coverage of topics."
      }
    ]
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
    outlineContent: [
      {
        heading: "Introduction",
        content: "Understanding the return on investment for your content marketing efforts is crucial for justifying budgets and optimizing your strategy."
      },
      {
        heading: "Key Metrics to Track",
        content: "We'll explore traffic, engagement, lead generation, conversion rates, and customer retention metrics."
      },
      {
        heading: "Setting Up Tracking Systems",
        content: "How to implement proper analytics and attribution models to accurately measure content performance."
      },
      {
        heading: "Calculating Content ROI",
        content: "Step-by-step process for determining the financial return of your content investments."
      },
      {
        heading: "Case Studies",
        content: "Real-world examples of companies that have successfully measured and improved their content marketing ROI."
      }
    ]
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
    outlineContent: [
      {
        heading: "AI and Machine Learning Impacts",
        content: "How search algorithms are evolving with artificial intelligence and what it means for content creators."
      },
      {
        heading: "Voice Search Optimization",
        content: "Statistics on voice search growth and techniques for optimizing content for voice queries."
      },
      {
        heading: "Mobile-First Indexing",
        content: "Best practices for ensuring your content performs well on mobile devices as search engines prioritize mobile experiences."
      },
      {
        heading: "E-A-T Principles",
        content: "The growing importance of Expertise, Authoritativeness, and Trustworthiness in search rankings."
      },
      {
        heading: "User Experience Signals",
        content: "How page experience metrics like Core Web Vitals are influencing search positions."
      }
    ]
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
    outlineContent: [
      {
        heading: "The Importance of Content Planning",
        content: "Why an organized approach to content creation leads to better results and more efficient resource allocation."
      },
      {
        heading: "Essential Elements of a Content Calendar",
        content: "Key components to include: publication dates, content types, channels, topics, keywords, and team assignments."
      },
      {
        heading: "Tools and Templates",
        content: "Review of the best content calendar tools and customizable templates for different team sizes and needs."
      },
      {
        heading: "Content Calendar Workflow",
        content: "Step-by-step process for planning, creating, reviewing, publishing, and analyzing content."
      },
      {
        heading: "Maintaining Flexibility",
        content: "Strategies for balancing planned content with the ability to capitalize on trending topics and timely opportunities."
      }
    ]
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
    outlineContent: [
      {
        heading: "The State of AI in Content Creation",
        content: "Overview of how artificial intelligence is transforming content marketing and what it means for content teams."
      },
      {
        heading: "AI Writing Assistants",
        content: "Review of tools that help with writing, editing, and improving content quality and efficiency."
      },
      {
        heading: "Content Research and Optimization",
        content: "AI tools for keyword research, topic generation, and SEO optimization."
      },
      {
        heading: "Image and Video Generation",
        content: "Exploration of AI tools for creating visual content without extensive design skills."
      },
      {
        heading: "Finding the Right Balance",
        content: "Best practices for combining AI assistance with human creativity and expertise."
      }
    ]
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
    outlineContent: [
      {
        heading: "Setting Measurable Content Goals",
        content: "How to establish clear objectives that align with business outcomes and can be tracked effectively."
      },
      {
        heading: "Key Performance Indicators",
        content: "The most important metrics to track for different types of content and marketing objectives."
      },
      {
        heading: "Analytics Tools Comparison",
        content: "Overview of platforms and tools for tracking content performance across various channels."
      },
      {
        heading: "Creating Performance Dashboards",
        content: "How to build customized reporting systems that provide actionable insights to stakeholders."
      },
      {
        heading: "From Data to Decisions",
        content: "Framework for using performance data to optimize your content strategy and resource allocation."
      }
    ]
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
    outlineContent: [
      {
        heading: "Platform-Specific Best Practices",
        content: "Optimal content formats, dimensions, and posting times for each major social media platform."
      },
      {
        heading: "Hashtag Strategy",
        content: "Research-based guidance on hashtag usage across different platforms to maximize content discovery."
      },
      {
        heading: "Cross-Promotion Techniques",
        content: "Strategies for repurposing and adapting content across multiple social channels efficiently."
      },
      {
        heading: "Paid vs. Organic Distribution",
        content: "When to boost posts and how to maximize organic reach in an increasingly pay-to-play environment."
      },
      {
        heading: "Engagement Boosting Tactics",
        content: "Proven methods for increasing audience interaction with your social media content."
      }
    ]
  }
];

function getImpactClass(impact: "High" | "Medium" | "Low") {
  switch (impact) {
    case "High":
      return "bg-green-100 text-green-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Low":
      return "bg-gray-100 text-gray-800";
  }
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function ContentRecommendationPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch this data from an API or database using an async call
  // For mock data, we'll simulate an async operation
  const recommendation = await Promise.resolve(mockRecommendations.find(rec => rec.id === params.id));
  
  if (!recommendation) {
    notFound();
  }
  
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-6">
        <Link href="/calendar" passHref>
          <Button variant="ghost" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Content Recommendations
          </Button>
        </Link>
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{recommendation.title}</h1>
          
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getImpactClass(recommendation.impact as "High" | "Medium" | "Low")}`}>
                <Zap className="mr-1 h-3 w-3" />
                {recommendation.impact} Impact
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              Recommended publish date: {formatDate(recommendation.publishDate)}
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              Target audience: {recommendation.audience}
            </div>
          </div>
          
          <div className="mt-2">
            <span className="text-sm font-medium text-gray-700">Content Type:</span>
            <span className="ml-2 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
              {recommendation.type}
            </span>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {recommendation.keywords.map((keyword, index) => (
              <span key={index} className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs">
                <Tag className="mr-1 h-3 w-3" />
                {keyword}
              </span>
            ))}
          </div>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h2 className="mb-2 text-lg font-semibold">Rationale</h2>
          <p className="text-gray-700">{recommendation.rationale}</p>
        </div>
        
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Content Outline</h2>
          
          <div className="space-y-6 rounded-lg border border-gray-200 p-6">
            {recommendation.outlineContent.map((section, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="mb-2 text-lg font-medium">{section.heading}</h3>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-xl font-semibold text-blue-800">Ready to Create This Content?</h2>
          <p className="mb-4 text-blue-700">
            Use this outline to create high-impact content that resonates with your target audience.
          </p>
          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Create Content
            </Button>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Save for Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 