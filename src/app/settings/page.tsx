"use client"

import * as React from "react"
import { Save, Users, Calendar, Sliders, BellRing, PlusCircle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

// Form schema
const generalFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  strategyName: z.string().min(2, {
    message: "Strategy name must be at least 2 characters.",
  }),
  calendarRange: z.string(),
  timeZone: z.string(),
  enableAI: z.boolean().default(true),
  enableSEO: z.boolean().default(true),
})

type GeneralFormValues = z.infer<typeof generalFormSchema>

// Default values
const defaultValues: Partial<GeneralFormValues> = {
  companyName: "Contently Inc.",
  strategyName: "Q2 2023 Content Strategy",
  calendarRange: "3months",
  timeZone: "et",
  enableAI: true,
  enableSEO: true,
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("general")

  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues,
  })

  function onSubmit(data: GeneralFormValues) {
    toast.success("Settings saved successfully")
    console.log(data)
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={form.handleSubmit(onSubmit)}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 w-full justify-start border-b bg-transparent p-0">
          <TabsTrigger 
            value="general" 
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            General
          </TabsTrigger>
          <TabsTrigger 
            value="audience" 
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Audience Personas
          </TabsTrigger>
          <TabsTrigger 
            value="content" 
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Content Types
          </TabsTrigger>
          <TabsTrigger 
            value="integrations" 
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Integrations
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-muted-foreground" />
                <CardTitle>General Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Used in reports and exports
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="strategyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Strategy Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Default strategy name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Default name for new content strategies
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="calendarRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Calendar Range</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="3months">3 months</SelectItem>
                              <SelectItem value="6months">6 months</SelectItem>
                              <SelectItem value="12months">12 months</SelectItem>
                              <SelectItem value="custom">Custom range</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timeZone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Zone</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time zone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="et">Eastern Time (ET) - UTC-5</SelectItem>
                              <SelectItem value="pt">Pacific Time (PT) - UTC-8</SelectItem>
                              <SelectItem value="cet">Central European Time (CET) - UTC+1</SelectItem>
                              <SelectItem value="utc">UTC+0</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="enableAI"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Enable AI Content Recommendations</FormLabel>
                          <FormDescription>
                            Allow the system to recommend content types, topics, and publishing schedules
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="enableSEO"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Enable SEO Insights</FormLabel>
                          <FormDescription>
                            Include search engine optimization recommendations in your content strategy
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audience">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>Audience Personas</CardTitle>
                </div>
                <Button variant="outline" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Persona
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">You have no audience personas yet. Add one to get started.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Content Types</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Configure your content types here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Connect your content calendar to other services.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Configure your notification preferences.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 