"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Phone,
  MessageSquare,
  Compass,
  Camera,
  ShoppingBag,
  Image as ImageIcon,
  Settings,
  Calculator,
  Clock,
  Folder,
  Music,
  Gamepad2,
  StickyNote,
  Tv,
  Terminal,
  Mic,
  X,
} from "lucide-react";
import { AppDefinition, AppId } from "@/types/android";
import { sounds } from "@/utils/soundEffects";

interface AppDrawerProps {
  visible: boolean;
  onClose: () => void;
  apps: AppDefinition[];
  onOpenApp: (appId: AppId) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Phone,
  MessageSquare,
  Compass,
  Camera,
  ShoppingBag,
  Image: ImageIcon,
  Settings,
  Calculator,
  Clock,
  Folder,
  Music,
  Gamepad2,
  StickyNote,
  Tv,
  Terminal,
  Mic,
};

export const AppDrawer: React.FC<AppDrawerProps> = ({
  visible,
  onClose,
  apps,
  onOpenApp,
}) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  if (!visible) return null;

  const categories = [
    { id: "all", label: "All" },
    { id: "google", label: "Google" },
    { id: "system", label: "System" },
    { id: "tools", label: "Tools" },
    { id: "media", label: "Media" },
    { id: "games", label: "Games" },
  ];

  const filteredApps = apps.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-2xl z-40 flex flex-col p-4 pt-10 text-white animate-in slide-in-from-bottom duration-300 overflow-hidden">
      {/* Top Search Bar */}
      <div className="flex items-center space-x-2 bg-zinc-900 border border-white/10 rounded-full px-4 py-2.5 shadow-lg">
        <Search className="w-4 h-4 text-zinc-400 shrink-0" />
        <input
          type="text"
          placeholder="Search apps & device..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-full"
          autoFocus
        />
        {search ? (
          <button
            onClick={() => setSearch("")}
            className="p-1 rounded-full text-zinc-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-1 rounded-full text-zinc-400 hover:text-white"
            title="Close Drawer"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 py-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              sounds.playTap();
              setSelectedCategory(cat.id);
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-blue-500 text-zinc-950 font-bold"
                : "bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Apps Grid */}
      <div className="flex-1 overflow-y-auto android-scrollbar py-2">
        {filteredApps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-500 space-y-2">
            <ShoppingBag className="w-8 h-8 opacity-40" />
            <span className="text-xs">No matching applications found</span>
            <button
              onClick={() => {
                sounds.playTap();
                onOpenApp("playstore");
                onClose();
              }}
              className="text-xs text-blue-400 hover:underline pt-2"
            >
              Search on Google Play
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-y-5 gap-x-2">
            {filteredApps.map((app) => {
              const Icon = ICON_MAP[app.iconName] || ShoppingBag;
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    sounds.playTap();
                    onOpenApp(app.id);
                    onClose();
                  }}
                  className="flex flex-col items-center space-y-1.5 group active:scale-90 transition-transform"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${app.bgColor} ${app.textColor} shadow-md flex items-center justify-center border border-white/10 group-hover:scale-105 transition-all`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-medium text-zinc-300 truncate w-full text-center px-0.5">
                    {app.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Dismiss Handle */}
      <div className="pt-2 flex justify-center border-t border-white/5">
        <button
          onClick={() => {
            sounds.playTap();
            onClose();
          }}
          className="w-20 h-1 bg-zinc-700 rounded-full"
        />
      </div>
    </div>
  );
};
