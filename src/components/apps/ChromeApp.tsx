"use client";

import React, { useState } from "react";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Home,
  ShieldCheck,
  ExternalLink,
  Globe,
  Plus,
} from "lucide-react";
import { sounds } from "@/utils/soundEffects";

export const ChromeApp: React.FC = () => {
  const [urlInput, setUrlInput] = useState<string>("https://www.google.com");
  const [currentUrl, setCurrentUrl] = useState<string>("https://www.google.com");
  const [history, setHistory] = useState<string[]>(["https://www.google.com"]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [activeTabCount, setActiveTabCount] = useState<number>(1);

  const bookmarks = [
    { title: "Google", url: "https://www.google.com", icon: "🔍" },
    { title: "Wikipedia", url: "https://en.wikipedia.org", icon: "📚" },
    { title: "GitHub", url: "https://github.com", icon: "🐙" },
    { title: "HackerNews", url: "https://news.ycombinator.com", icon: "⚡" },
    { title: "YouTube", url: "https://www.youtube.com", icon: "▶️" },
    { title: "Reddit", url: "https://reddit.com", icon: "🤖" },
  ];

  const navigateTo = (targetUrl: string) => {
    sounds.playTap();
    let formatted = targetUrl.trim();
    if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
      if (formatted.includes(".") && !formatted.includes(" ")) {
        formatted = "https://" + formatted;
      } else {
        formatted = `https://www.google.com/search?q=${encodeURIComponent(formatted)}`;
      }
    }
    setUrlInput(formatted);
    setCurrentUrl(formatted);

    const newHist = history.slice(0, historyIdx + 1);
    newHist.push(formatted);
    setHistory(newHist);
    setHistoryIdx(newHist.length - 1);
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      sounds.playTap();
      const prev = history[historyIdx - 1];
      setHistoryIdx(historyIdx - 1);
      setUrlInput(prev);
      setCurrentUrl(prev);
    }
  };

  const handleForward = () => {
    if (historyIdx < history.length - 1) {
      sounds.playTap();
      const next = history[historyIdx + 1];
      setHistoryIdx(historyIdx + 1);
      setUrlInput(next);
      setCurrentUrl(next);
    }
  };

  const handleReload = () => {
    sounds.playTap();
    const cur = currentUrl;
    setCurrentUrl("");
    setTimeout(() => setCurrentUrl(cur), 100);
  };

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none">
      {/* Top Address & Controls Bar */}
      <div className="p-3 pt-10 bg-zinc-900 border-b border-white/10 space-y-2">
        <div className="flex items-center space-x-2">
          {/* Navigation buttons */}
          <button
            onClick={handleBack}
            disabled={historyIdx === 0}
            className="p-1.5 rounded-full hover:bg-zinc-800 disabled:opacity-30 text-zinc-300"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleForward}
            disabled={historyIdx >= history.length - 1}
            className="p-1.5 rounded-full hover:bg-zinc-800 disabled:opacity-30 text-zinc-300"
            title="Forward"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleReload}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300"
            title="Reload"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* URL Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigateTo(urlInput);
            }}
            className="flex-1 bg-zinc-800 rounded-full px-3 py-1.5 flex items-center space-x-1.5 border border-white/5 focus-within:border-blue-500"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-zinc-200 placeholder-zinc-500 w-full"
              placeholder="Search or enter web address"
            />
          </form>

          {/* Tabs Counter Button */}
          <button
            onClick={() => {
              sounds.playTap();
              setActiveTabCount((prev) => (prev < 5 ? prev + 1 : 1));
            }}
            className="w-7 h-7 rounded-lg border border-white/20 flex items-center justify-center text-xs font-bold text-zinc-300 hover:bg-zinc-800"
            title="Tabs"
          >
            {activeTabCount}
          </button>
        </div>

        {/* Bookmarks Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {bookmarks.map((bm) => (
            <button
              key={bm.title}
              onClick={() => navigateTo(bm.url)}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-xs text-zinc-300 border border-white/5 whitespace-nowrap active:scale-95 transition-all"
            >
              <span>{bm.icon}</span>
              <span>{bm.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Browser Viewport */}
      <div className="flex-1 bg-zinc-900 relative overflow-hidden flex flex-col">
        {currentUrl.includes("google.com") ? (
          /* Simulated Google Chrome Start Page */
          <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="text-4xl font-bold tracking-tight">
              <span className="text-blue-400">G</span>
              <span className="text-red-400">o</span>
              <span className="text-amber-400">o</span>
              <span className="text-blue-400">g</span>
              <span className="text-emerald-400">l</span>
              <span className="text-red-400">e</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigateTo(urlInput);
              }}
              className="w-full max-w-sm bg-zinc-800 rounded-full px-4 py-3 flex items-center space-x-2 border border-white/10 shadow-lg"
            >
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search Google or type a URL"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-full"
              />
            </form>

            <div className="grid grid-cols-3 gap-3 w-full max-w-xs pt-2">
              {bookmarks.map((b) => (
                <button
                  key={b.title}
                  onClick={() => navigateTo(b.url)}
                  className="flex flex-col items-center p-3 rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 space-y-1 transition-all active:scale-95"
                >
                  <span className="text-2xl">{b.icon}</span>
                  <span className="text-[11px] text-zinc-300 font-medium">{b.title}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Web Frame */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-zinc-950">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shadow">
              <Globe className="w-8 h-8" />
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-bold text-white">Navigated to External Web Resource</span>
              <span className="text-xs text-zinc-400 font-mono break-all max-w-xs">{currentUrl}</span>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => window.open(currentUrl, "_blank")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigateTo("https://www.google.com")}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-medium"
              >
                Return Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
