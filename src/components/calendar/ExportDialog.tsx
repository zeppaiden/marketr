"use client";

import { useState } from "react";
import { Download, Calendar, FileText, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type ExportFormat = "csv" | "google" | "ical" | "excel";

type ExportDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ExportDialog({ isOpen, onClose }: ExportDialogProps) {
  const [format, setFormat] = useState<ExportFormat>("csv");
  const [dateRange, setDateRange] = useState<string>("3months");
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleExport = () => {
    setLoading(true);
    
    // Simulate API call/processing
    setTimeout(() => {
      setLoading(false);
      
      // In a real implementation, this would trigger a download or integration
      if (format === "csv" || format === "excel") {
        // Simulate file download
        const a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);
        a.href = "#";
        a.download = `content-calendar-export.${format}`;
        a.click();
        document.body.removeChild(a);
      }
      toast.success("Calendar exported successfully");
    }, 1500);
  };
  
  const handleCopyLink = () => {
    // In a real implementation, this would copy a share URL
    navigator.clipboard.writeText("https://app.contently.com/share/calendar/abc123");
    toast.success("Link copied to clipboard");
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Calendar</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={() => setFormat("csv")}
                variant={format === "csv" ? "default" : "outline"}
                className="justify-start"
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>CSV</span>
              </Button>
              <Button
                type="button"
                onClick={() => setFormat("google")}
                variant={format === "google" ? "default" : "outline"}
                className="justify-start"
              >
                <Calendar className="mr-2 h-4 w-4" />
                <span>Google Calendar</span>
              </Button>
              <Button
                type="button"
                onClick={() => setFormat("ical")}
                variant={format === "ical" ? "default" : "outline"}
                className="justify-start"
              >
                <Calendar className="mr-2 h-4 w-4" />
                <span>iCal</span>
              </Button>
              <Button
                type="button"
                onClick={() => setFormat("excel")}
                variant={format === "excel" ? "default" : "outline"}
                className="justify-start"
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>Excel</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Next 3 months</SelectItem>
                <SelectItem value="6months">Next 6 months</SelectItem>
                <SelectItem value="12months">Next 12 months</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {dateRange === "custom" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Start date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">End date</Label>
                <Input type="date" />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Content to include</Label>
            <Separator className="my-2" />
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="all-content" defaultChecked />
                <Label htmlFor="all-content">All content types</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-rationale" defaultChecked />
                <Label htmlFor="include-rationale">Include content rationale</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-audience" defaultChecked />
                <Label htmlFor="include-audience">Include audience targets</Label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-col gap-2">
          <Button
            onClick={handleExport}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                <span>Export Calendar</span>
              </>
            )}
          </Button>
          
          <Separator className="my-2" />
          
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full"
          >
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy shareable link</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 