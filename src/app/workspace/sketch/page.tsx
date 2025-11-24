"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Tldraw, useEditor } from "tldraw";
import "tldraw/tldraw.css";
import {
  Code,
  Eye,
  PenTool,
  Sparkles,
  Layout,
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { toast } from "sonner";

// --- Mock Sidebar Component (Inline for portability) ---

// --- Main Page Component ---
export default function Page() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("canvas"); // 'canvas' | 'preview' | 'code'
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  // This simulates the "Gemini" response
  const handleGenerate = () => {
    setIsGenerating(true);

    // Simulate API delay
    setTimeout(() => {
      const mockGeneratedCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Site</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen flex items-center justify-center font-sans">
    <div class="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-indigo-100">
        <div class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-3">It Works!</h1>
        <p class="text-gray-500 mb-8 leading-relaxed">
            This is a website generated from your whiteboard sketch using the Gemini API simulation.
        </p>
        <div class="flex gap-3 justify-center">
            <button class="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
                Get Started
            </button>
            <button class="px-6 py-2.5 bg-white text-indigo-600 border border-indigo-200 font-medium rounded-lg hover:bg-indigo-50 transition-colors">
                Learn More
            </button>
        </div>
    </div>
</body>
</html>`;
      setGeneratedCode(mockGeneratedCode);
      setIsGenerating(false);
      setActiveTab("preview"); // Auto switch to preview
    }, 2000);
  };

  return (
    <div className="flex w-screen h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
          {/* Mode Switcher Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("canvas")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "canvas"
                  ? "bg-white text-indigo-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <PenTool size={16} />
              Canvas
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              disabled={!generatedCode}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "preview"
                  ? "bg-white text-indigo-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              <Eye size={16} />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              disabled={!generatedCode}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "code"
                  ? "bg-white text-indigo-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              <Code size={16} />
              Code
            </button>
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden md:block">
              Draw your UI then click generate
            </span>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg ${
                isGenerating
                  ? "bg-indigo-400 cursor-wait"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Website
                </>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Content Body */}
        <main className="flex-1 relative bg-gray-50 overflow-hidden">
          {/* 1. Canvas Mode */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
              activeTab === "canvas"
                ? "opacity-100 z-10"
                : "opacity-0 pointer-events-none z-0"
            }`}
          >
            <Tldraw persistenceKey="my-tldraw-app">
              <CanvasListener />
            </Tldraw>
          </div>

          {/* 2. Preview Mode */}
          {activeTab === "preview" && (
            <div className="absolute inset-0 z-20 w-full h-full p-8 flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 relative">
                <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 px-3 py-0.5 bg-white rounded text-xs text-gray-400 border border-gray-200 w-64 text-center">
                    localhost:3000
                  </div>
                </div>
                <iframe
                  title="Preview"
                  srcDoc={generatedCode}
                  className="w-full h-[calc(100%-2rem)] border-none"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          )}

          {/* 3. Code Mode */}
          {activeTab === "code" && (
            <div className="absolute inset-0 z-20 w-full h-full p-8 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
              <div className="w-full h-full bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-700 flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-[#252526]">
                  <span className="text-gray-300 text-sm font-mono">
                    index.html
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode);
                      toast.success("Copies to clipboard");
                    }}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Copy to Clipboard
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                  <pre className="text-sm font-mono text-blue-300 leading-relaxed">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Hook to listen to Tldraw state (from your original snippet)
function CanvasListener() {
  const editor = useEditor();

  useEffect(() => {
    if (!editor) return;

    // Optional: Log initial state
    const snapshot = editor.getSnapshot();
    console.log("Initial Snapshot:", snapshot);

    // Listen to changes
    const unsub = editor.store.listen(
      (update) => {
        // This is where you would technically send data to Gemini
        // For now, we are just listening
        console.log("Canvas updated", update);
      },
      { source: "user", scope: "document" }
    );

    return () => unsub();
  }, [editor]);

  return null;
}
