"use client";

import { useState } from "react";
import { Link, X, Upload, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

type UrlInputProps = {
  onAnalyze: (urls: string[]) => void;
};

export function UrlInput({ onAnalyze }: UrlInputProps) {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [urls, setUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  
  // URL validation
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const addUrl = () => {
    // Reset any previous errors
    setError(null);
    
    // Check if URL is empty
    if (!currentUrl.trim()) {
      setError("Please enter a URL");
      return;
    }
    
    // Check if URL is valid
    if (!isValidUrl(currentUrl)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    
    // Check if URL is already in the list
    if (urls.includes(currentUrl)) {
      setError("This URL has already been added");
      return;
    }
    
    // Simulate URL validation (checking if it's accessible)
    setIsValidating(true);
    
    setTimeout(() => {
      // Add the URL to the list
      setUrls([...urls, currentUrl]);
      
      // Clear the input
      setCurrentUrl("");
      setIsValidating(false);
      toast.success("URL added successfully");
    }, 800);
  };
  
  const removeUrl = (urlToRemove: string) => {
    setUrls(urls.filter(url => url !== urlToRemove));
    toast.info("URL removed");
  };
  
  const handleAnalyze = () => {
    if (urls.length === 0) {
      setError("Please add at least one URL to analyze");
      return;
    }
    
    onAnalyze(urls);
    toast.success(`Analyzing ${urls.length} URLs`);
  };
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Enter URLs of your existing content to analyze and generate a content strategy
      </p>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            placeholder="https://example.com/your-content"
            className={`pl-9 ${error ? "border-red-300" : ""}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addUrl();
              }
            }}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Link className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <Button
          type="button"
          onClick={addUrl}
          disabled={isValidating}
          variant="secondary"
        >
          {isValidating ? (
            <>
              <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              <span>Validating...</span>
            </>
          ) : (
            <>
              <span>Add URL</span>
            </>
          )}
        </Button>
        <Button
          type="button"
          onClick={handleAnalyze}
          disabled={urls.length === 0}
        >
          <Upload className="mr-2 h-4 w-4" />
          <span>Analyze Content</span>
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {urls.length > 0 && (
        <Card className="p-4">
          <h3 className="mb-2 text-sm font-medium">Added URLs ({urls.length})</h3>
          <div className="space-y-2">
            {urls.map((url, index) => (
              <div key={index} className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                <span className="font-mono">{url}</span>
                <Button
                  type="button"
                  onClick={() => removeUrl(url)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {urls.length > 0 && (
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Tip:</strong> For best results, include a diverse set of content URLs
            representing different topics and content types.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
} 