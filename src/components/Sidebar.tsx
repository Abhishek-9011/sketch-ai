"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Settings, 
  Search, 
  Users, 
  Workflow, 
  Layers, 
  ChevronLeft,
  History 
} from "lucide-react";
import { cn } from "@/lib/utils"; 
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock Data
const mainNavItems = [
  { icon: Users, label: "Agents", href: "/agents" },
  { icon: Workflow, label: "Workflows", href: "/workflows" },
];

const historyItems = [
  { label: "Design inspiration for a...", active: true },
  { label: "Brainstorming marketing...", active: false },
  { label: "Python script for data a...", active: false },
  { label: "Email to a potential client", active: false },
  { label: "Summer vacation planni...", active: false },
  { label: "How to cook a perfect st...", active: false },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  
  // Helper to determine layout classes based on state
  const sidebarWidth = isCollapsed ? "w-[80px]" : "w-[280px]";
  const commonLinkClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-300";

  return (
    <TooltipProvider delayDuration={0}>
      <div 
        className={cn(
          "relative flex h-screen flex-col bg-[#0a1026] border-r border-slate-800/50 transition-all duration-300 ease-in-out",
          sidebarWidth
        )}
      >
        
        {/* --- Toggle Button (Floating on Border) --- */}
        <div className="absolute -right-3 top-7 z-50">
          <Button
            variant="secondary"
            size="icon"
            className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white shadow-md"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft className={cn("h-3 w-3 transition-transform", isCollapsed && "rotate-180")} />
          </Button>
        </div>

        {/* --- 1. Logo Section --- */}
        <div className={cn("flex items-center h-16 px-6", isCollapsed ? "justify-center px-2" : "")}>
          <div className="bg-white/10 p-1.5 rounded-lg flex-shrink-0">
            <Layers className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl text-white ml-3 transition-opacity duration-300">
              SketchAI
            </span>
          )}
        </div>

        {/* --- 2. Search Bar --- */}
     
        {/* --- 3. Main Navigation --- */}
        <div className="px-4 py-2 space-y-1 flex-1 flex flex-col overflow-hidden">

          {/* --- 4. History Section (Hidden when collapsed) --- */}
          <div className={cn(
              "flex-1 overflow-hidden flex flex-col pt-6 transition-opacity duration-300",
              isCollapsed ? "opacity-0 pointer-events-none hidden" : "opacity-100"
            )}>
            <div className="px-2 mb-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">History</h3>
            </div>
            <ScrollArea className="flex-1 px-2">
              <div className="space-y-1 pr-2 pb-4">
                {historyItems.map((item, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-all truncate",
                      item.active 
                        ? "bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white shadow-lg shadow-indigo-900/20" 
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Icon-only version of history for collapsed state (Optional - usually just hidden) */}
          {isCollapsed && (
            <div className="flex-1 flex flex-col items-center pt-4 opacity-50">
              <History className="w-5 h-5 text-slate-600" />
            </div>
          )}
        </div>

        {/* --- 5. User Footer --- */}
        <div className="p-4 mt-auto border-t border-slate-800/50 bg-[#0a1026]">
           <button className={cn(
             "flex items-center gap-3 w-full rounded-lg hover:bg-white/5 transition-colors text-left",
             isCollapsed ? "justify-center p-0" : "p-2"
           )}>
            <Avatar className="h-9 w-9 border border-slate-700">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-indigo-900 text-indigo-200">JA</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Jason</p>
                <p className="text-xs text-slate-500 truncate">Personal Plan</p>
              </div>
            )}
          </button>
        </div>

      </div>
    </TooltipProvider>
  );
}