#!/usr/bin/env bun
/**
 * Utility script to invoke Inngest functions for testing
 * 
 * Usage:
 * 1. Run a specific function by ID:
 *    bun src/inngest/script/invoke.ts --function=hello-world --data='{"name":"John Doe"}'
 * 
 * 2. Send an event to trigger functions:
 *    bun src/inngest/script/invoke.ts --event=test/hello.world --data='{"name":"John Doe"}'
 * 
 * 3. List all registered functions:
 *    bun src/inngest/script/invoke.ts --list
 * 
 * 4. Debug function structure:
 *    bun src/inngest/script/invoke.ts --debug
 */

import { inngest } from "../client";
import functions from "../index";

// Define a mock step object for testing
type MockStepTools = {
  run: <T>(name: string, fn: () => Promise<T>) => Promise<T>;
  sleep: (name: string, duration: string) => Promise<void>;
  sendEvent: (name: string, payload: Record<string, unknown>) => Promise<{ ids: string[] }>;
  waitForEvent: (name: string, options: Record<string, unknown>) => Promise<null>;
};

// Use a more specific type for Inngest functions
type InngestFunctionType = {
  opts?: {
    id?: string;
    triggers?: Array<{
      event?: string;
      cron?: string;
    }>;
  };
  // These properties are actually private in Inngest, but we need to access them
  fn?: (input: Record<string, unknown>) => Promise<Record<string, unknown>>;
  client?: unknown;
  [key: string]: unknown;
};

// Helper function to safely cast the Inngest function to our type
function castFunction(fn: unknown): InngestFunctionType {
  return fn as unknown as InngestFunctionType;
}

// Examine the source code to extract function metadata
function extractFunctionInfo(fn: InngestFunctionType) {
  // Initialize with defaults
  const info = {
    id: 'unknown',
    triggerType: 'unknown',
    eventName: null as string | null,
    cronPattern: null as string | null,
    hasHandler: false
  };
  
  try {
    // Check if the function has the expected structure based on debug output
    if (fn && typeof fn === 'object') {
      // Try to access the opts object which contains the id and triggers
      if (fn.opts) {
        if (fn.opts.id) {
          info.id = fn.opts.id;
        }
        
        // Check for triggers array
        if (Array.isArray(fn.opts.triggers) && fn.opts.triggers.length > 0) {
          const trigger = fn.opts.triggers[0];
          
          if (trigger?.event) {
            info.eventName = trigger.event;
            info.triggerType = `event: ${trigger.event}`;
          } else if (trigger?.cron) {
            info.cronPattern = trigger.cron;
            info.triggerType = `cron: ${trigger.cron}`;
          }
        }
      }
      
      // Verify if function has a handler
      if (typeof fn.fn === 'function') {
        info.hasHandler = true;
      }
      
      // If we couldn't determine the trigger, try regex as a fallback
      if (info.triggerType === 'unknown') {
        const fnStr = String(fn);
        const eventMatch = fnStr.match(/event:\s*["']([^"']+)["']/);
        const cronMatch = fnStr.match(/cron:\s*["']([^"']+)["']/);
        
        if (eventMatch?.[1]) {
          info.eventName = eventMatch[1];
          info.triggerType = `event: ${eventMatch[1]}`;
        } else if (cronMatch?.[1]) {
          info.cronPattern = cronMatch[1];
          info.triggerType = `cron: ${cronMatch[1]}`;
        }
      }
    }
  } catch (_) {
    // Silently handle errors, keeping defaults
  }
  
  return info;
}

async function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  const options: Record<string, string> = {};
  for (const arg of args) {
    if (arg.startsWith('--')) {
      const parts = arg.substring(2).split('=');
      if (parts.length > 0) {
        const key = parts[0];
        if (key) { // Only set if key is defined
          const value = parts.length > 1 && parts[1] !== undefined ? parts[1] : 'true';
          options[key] = value;
        }
      }
    }
  }

  // Debug mode
  if (options.debug === 'true') {
    console.log("Debugging Inngest Functions Structure:");
    console.log(`Found ${functions.length} functions`);
    
    for (let i = 0; i < functions.length && i < 10; i++) {
      const fn = castFunction(functions[i]);
      console.log(`\nFunction ${i+1}:`);
      
      try {
        // Output useful debug information
        if (fn) {
          console.log("Keys:", Object.keys(fn).filter(k => k !== undefined));
          
          // Try to access common properties
          if (fn.opts) {
            console.log("opts:", fn.opts);
          }
          if (fn.fn) {
            console.log("fn exists:", !!fn.fn);
          }
          if (fn.client) {
            console.log("client exists:", !!fn.client);
          }
          
          // Call our extraction function
          const info = extractFunctionInfo(fn);
          console.log("Extracted info:", info);
          
          // Output sample source
          try {
            const fnString = String(fn);
            console.log(`Function toString: ${fnString.substring(0, 100)}...`);
          } catch (_) {
            console.log("Could not stringify function");
          }
        } else {
          console.log("Function is undefined or null");
        }
      } catch (err) {
        console.log("Error examining function:", err);
      }
    }
    return;
  }

  // List all registered functions
  if (options.list === 'true') {
    console.log("Registered Inngest Functions:");
    
    if (functions.length === 0) {
      console.log("No functions found!");
      return;
    }
    
    for (let i = 0; i < functions.length; i++) {
      const fn = castFunction(functions[i]);
      const info = extractFunctionInfo(fn);
      console.log(`- ${info.id} (Trigger: ${info.triggerType})`);
    }
    return;
  }

  // Send an event to trigger functions
  if (options.event) {
    const eventName = options.event;
    let eventData: Record<string, unknown> = {};
    
    try {
      if (options.data) {
        eventData = JSON.parse(options.data);
      }
    } catch (error) {
      console.error("Error parsing event data JSON:", error);
      return;
    }
    
    console.log(`Sending event '${eventName}' with data:`, eventData);
    console.log("\nNote: Make sure you have the Inngest dev server running with:");
    console.log("  npx inngest-cli@latest dev");
    console.log("  or");
    console.log("  bunx inngest-cli@latest dev\n");
    
    try {
      // We need to use a type assertion here for dynamic event names
      const result = await inngest.send({
        name: eventName,
        data: eventData
      } as Parameters<typeof inngest.send>[0]);
      
      console.log("Event sent successfully!");
      console.log("Result:", result);
      console.log("\nCheck the Inngest dev server at http://localhost:8288 to see the function execution.");
    } catch (error) {
      console.error("Error sending event:", error);
      console.error("\nThis error may occur if you don't have the Inngest dev server running.");
      console.error("Run the dev server with: bunx inngest-cli@latest dev");
    }
    
    return;
  }

  // Direct function invocation (test/development only)
  if (options.function) {
    const functionId = options.function;
    let targetFunction = null;
    
    // Find the function by ID
    for (const fn of functions) {
      const typedFn = castFunction(fn);
      const info = extractFunctionInfo(typedFn);
      if (info.id === functionId) {
        targetFunction = typedFn;
        break;
      }
    }
    
    if (!targetFunction) {
      console.error(`Function '${functionId}' not found. Available functions:`);
      for (const fn of functions) {
        const info = extractFunctionInfo(castFunction(fn));
        console.log(`- ${info.id}`);
      }
      return;
    }
    
    // Parse input data for the function
    let inputData: Record<string, unknown> = {};
    try {
      if (options.data) {
        inputData = JSON.parse(options.data);
      }
    } catch (error) {
      console.error("Error parsing function data JSON:", error);
      return;
    }
    
    console.log(`Testing function '${functionId}' with data:`, inputData);
    
    // Create a mock step object for testing
    const mockStep: MockStepTools = {
      run: async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
        console.log(`[Step] Executing ${name}...`);
        const result = await fn();
        console.log(`[Step] ${name} completed with result:`, result);
        return result;
      },
      sleep: async (name: string, duration: string): Promise<void> => {
        console.log(`[Step] Sleeping at ${name} for ${duration}...`);
        // For testing, we don't actually need to sleep the full duration
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log(`[Step] Sleep completed for ${name}`);
      },
      sendEvent: async (name: string, payload: Record<string, unknown>): Promise<{ ids: string[] }> => {
        console.log(`[Step] Sending event ${name} with payload:`, payload);
        return { ids: ['test-event-id'] };
      },
      waitForEvent: async (name: string, options: Record<string, unknown>): Promise<null> => {
        console.log(`[Step] Waiting for event at ${name} with options:`, options);
        return null; // Simulate timeout for simplicity
      }
    };
    
    try {
      // Try to access the handler function
      if (targetFunction.fn && typeof targetFunction.fn === 'function') {
        // Call the handler function directly
        const result = await targetFunction.fn({
          event: { data: inputData },
          step: mockStep
        });
        
        console.log("\nFunction execution completed successfully!");
        console.log("Result:", result);
      } else {
        console.error("Could not find handler function for", functionId);
      }
    } catch (error) {
      console.error("Error executing function:", error);
    }
    
    return;
  }

  // No valid options provided
  console.log(`
Inngest Function Invocation Tool

Usage:
  bun src/inngest/script/invoke.ts [options]

Options:
  --list                            List all registered functions
  --event=EVENT_NAME                Send an event to trigger functions
  --function=FUNCTION_ID            Test a specific function directly
  --data='{"key":"value"}'          Data to send with the event or function
  --debug                           Debug function structure (advanced)

Examples:
  bun src/inngest/script/invoke.ts --list
  bun src/inngest/script/invoke.ts --event=test/hello.world --data='{"name":"John Doe"}'
  bun src/inngest/script/invoke.ts --function=hello-world --data='{"name":"John Doe"}'
  `);
}

main().catch(console.error); 