"use client";

import Link from "next/link";
import {
  LayoutGrid,
  Settings,
  Search,
  Users,
  Workflow,
  ChevronDown,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Standard shadcn utility
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock Data for Nav Items
const mainNavItems = [
  { icon: Users, label: "Agents", href: "/agents" },
  { icon: Workflow, label: "Workflows", href: "/workflows" },
];

// Mock Data for History
const historyItems = [
  { label: "Design inspiration for a...", active: true },
  { label: "Brainstorming marketing...", active: false },
  { label: "Python script for data a...", active: false },
  { label: "Email to a potential client", active: false },
  { label: "Summer vacation planni...", active: false },
  { label: "How to cook a perfect st...", active: false },
  { label: "Learning about quantu...", active: false },
  { label: "Summarize the plot of D...", active: false },
];

export function Sidebar() {
  return (
    <div className="flex h-screen w-[280px] flex-col bg-[#0a1026] text-slate-300 border-r border-slate-800/50">
      {/* 1. Logo Section */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-2 font-bold text-xl text-white mb-6">
          <div className="bg-white/10 p-1.5 rounded-lg">
            <Layers className="h-6 w-6 text-white" />
          </div>
          <span>SketchAI</span>
        </div>
      </div>

      {/* 3. Main Navigation */}
      

      {/* 4. History Section (Scrollable) */}
      <div className="flex-1 overflow-hidden flex flex-col pt-4">
        <div className="px-6 mb-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            History
          </h3>
        </div>
        <ScrollArea className="flex-1 px-4">
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

      {/* 5. User Footer */}
      <div className="p-4 mt-auto border-t border-slate-800/50 bg-[#0a1026]">
        <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors text-left">
          <Avatar className="h-9 w-9 border border-slate-700">
            {/* Replace src with actual user image */}
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-indigo-900 text-indigo-200">
              JA
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Jason</p>
            <p className="text-xs text-slate-500 truncate">Personal Plan</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>
    </div>
  );
}
