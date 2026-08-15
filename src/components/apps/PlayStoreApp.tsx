"use client";

import React, { useState } from "react";
import {
  Search,
  Star,
  Download,
  Check,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { AppDefinition, AppId } from "@/types/android";
import { sounds } from "@/utils/soundEffects";

interface PlayStoreAppProps {
  apps: AppDefinition[];
  onToggleInstall: (appId: AppId) => void;
  onOpenApp: (appId: AppId) => void;
}

export const PlayStoreApp: React.FC<PlayStoreAppProps> = ({
  apps,
  onToggleInstall,
  onOpenApp,
}) => {
  const [activeTab, setActiveTab] = useState<"foryou" | "top" | "games">("foryou");
  const [search, setSearch] = useState<string>("");
  const [installingId, setInstallingId] = useState<string | null>(null);

  const featuredStoreApps = [
    {
      id: "games" as AppId,
      name: "Play Games Arcade",
      dev: "Google LLC",
      rating: "4.8",
      size: "24 MB",
      category: "Games",
      iconSrc: "/img/icon/apps/playgames.png",
      description: "Play classic Flappy Droid, 2048 puzzle, Snake & Tic-Tac-Toe offline!",
    },
    {
      id: "termux" as AppId,
      name: "Termux Linux Terminal",
      dev: "Fredrik Fornwall",
      rating: "4.9",
      size: "48 MB",
      category: "Tools",
      iconSrc: "/img/icon/apps/github.png",
      description: "Powerful terminal emulation and Linux environment for Android.",
    },
    {
      id: "music" as AppId,
      name: "YouTube Music",
      dev: "Google LLC",
      rating: "4.7",
      size: "32 MB",
      category: "Media",
      iconSrc: "/img/icon/apps/ssmusic.png",
      description: "Official music streaming service with curated playlists and synthwave tracks.",
    },
    {
      id: "notes" as AppId,
      name: "Google Keep Notes",
      dev: "Google LLC",
      rating: "4.9",
      size: "18 MB",
      category: "Productivity",
      iconSrc: "/img/icon/apps/keep.png",
      description: "Quickly capture what's on your mind with color tags and pin notes.",
    },
    {
      id: "recorder" as AppId,
      name: "Pixel Voice Recorder",
      dev: "Google LLC",
      rating: "4.8",
      size: "12 MB",
      category: "Tools",
      iconSrc: "/img/icon/apps/ssrecorder.png",
      description: "Record audio with real-time waveform visualizer.",
    },
    {
      id: "youtube" as AppId,
      name: "YouTube",
      dev: "Google LLC",
      rating: "4.6",
      size: "56 MB",
      category: "Media",
      iconSrc: "/img/icon/apps/youtube.png",
      description: "Watch your favorite videos, creators, and trending content worldwide.",
    },
  ];

  const handleInstallClick = (appId: AppId) => {
    sounds.playTap();
    setInstallingId(appId);
    setTimeout(() => {
      onToggleInstall(appId);
      setInstallingId(null);
      sounds.playNotification();
    }, 1200);
  };

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none">
      {/* Top Search Bar */}
      <div className="p-4 pt-10 border-b border-white/5 space-y-3 bg-zinc-900/60">
        <div className="flex items-center space-x-2 bg-zinc-900 rounded-full px-3.5 py-2.5 border border-white/10 shadow-md">
          <Search className="w-4 h-4 text-cyan-400" />
          <input
            type="text"
            placeholder="Search Google Play Store"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-full"
          />
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-6 text-xs font-semibold px-2">
          <button
            onClick={() => {
              sounds.playTap();
              setActiveTab("foryou");
            }}
            className={`${activeTab === "foryou" ? "text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1" : "text-zinc-400 hover:text-white"}`}
          >
            For you
          </button>
          <button
            onClick={() => {
              sounds.playTap();
              setActiveTab("top");
            }}
            className={`${activeTab === "top" ? "text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1" : "text-zinc-400 hover:text-white"}`}
          >
            Top charts
          </button>
          <button
            onClick={() => {
              sounds.playTap();
              setActiveTab("games");
            }}
            className={`${activeTab === "games" ? "text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1" : "text-zinc-400 hover:text-white"}`}
          >
            Games
          </button>
        </div>
      </div>

      {/* Main Apps Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 android-scrollbar">
        {/* Hero Spotlight Card */}
        <div className="bg-gradient-to-br from-cyan-900/40 via-zinc-900 to-purple-900/40 border border-cyan-500/30 rounded-3xl p-4 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Featured Android App</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-base font-bold text-white">Play Games & Retro Arcade</span>
          <span className="text-xs text-zinc-300 mt-1">Play 2048, Snake & Flappy Droid directly inside the emulator.</span>
          
          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400">Verified by Play Protect</span>
            <button
              onClick={() => {
                sounds.playTap();
                onOpenApp("games");
              }}
              className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 rounded-full text-xs font-bold shadow"
            >
              Open
            </button>
          </div>
        </div>

        {/* Featured App List */}
        <div className="space-y-3">
          <span className="text-sm font-bold text-white tracking-tight">Recommended for you</span>
          <div className="space-y-3">
            {featuredStoreApps
              .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()))
              .map((item) => {
                const isInstalled = apps.find((a) => a.id === item.id)?.installed ?? true;
                const isInstalling = installingId === item.id;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-zinc-900/70 border border-white/5 flex items-center justify-between shadow-sm hover:bg-zinc-850 transition-all"
                  >
                    <div className="flex items-center space-x-3 truncate mr-2">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center shadow shrink-0">
                        <img src={item.iconSrc} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="text-xs font-bold text-white truncate">{item.name}</span>
                        <span className="text-[10px] text-zinc-400">{item.dev}</span>
                        <div className="flex items-center space-x-1.5 text-[10px] text-zinc-400 mt-0.5">
                          <span className="flex items-center space-x-0.5 text-amber-400">
                            <span>{item.rating}</span>
                            <Star className="w-2.5 h-2.5 fill-current" />
                          </span>
                          <span>•</span>
                          <span>{item.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isInstalled ? (
                        <button
                          onClick={() => {
                            sounds.playTap();
                            onOpenApp(item.id);
                          }}
                          className="px-4 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-cyan-400 text-xs font-bold border border-cyan-500/30 active:scale-95 transition-all"
                        >
                          Open
                        </button>
                      ) : (
                        <button
                          onClick={() => handleInstallClick(item.id)}
                          disabled={isInstalling}
                          className="px-4 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-zinc-950 text-xs font-bold active:scale-95 transition-all flex items-center space-x-1 shadow"
                        >
                          {isInstalling ? (
                            <span>Installing...</span>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>Install</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
