"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Mic,
  Camera as LensIcon,
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
  CloudSun,
  ChevronUp,
} from "lucide-react";
import { AppDefinition, AppId, DeviceSettings } from "@/types/android";
import { sounds } from "@/utils/soundEffects";

interface HomeScreenProps {
  apps: AppDefinition[];
  settings: DeviceSettings;
  onOpenApp: (appId: AppId) => void;
  onOpenDrawer: () => void;
  onSearchGoogle: (query?: string) => void;
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
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  apps,
  settings,
  onOpenApp,
  onOpenDrawer,
  onSearchGoogle,
}) => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })
      );
      setDate(
        now.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const gridApps = apps.filter((a) => !a.dock && a.installed);
  const dockApps = apps.filter((a) => a.dock && a.installed);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playTap();
    onSearchGoogle(searchQuery);
  };

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-4 pt-10 pb-2 select-none overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.5)), url(${settings.wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top Section: At a Glance Widget & Search Bar */}
      <div className="space-y-4">
        {/* At a Glance Widget */}
        <div
          onClick={() => {
            sounds.playTap();
            onOpenApp("clock");
          }}
          className="flex flex-col text-white cursor-pointer px-2 pt-2 transition-transform active:scale-98"
        >
          <div className="flex items-center space-x-2 text-3xl font-semibold tracking-tight font-android-clock drop-shadow">
            <span>{time || "12:00"}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-medium text-white/90 drop-shadow mt-0.5">
            <span>{date || "Sat, Aug 15"}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <CloudSun className="w-3.5 h-3.5" />
              <span>26°C Dhaka</span>
            </span>
          </div>
        </div>

        {/* Google Search Bar (Material You Pill) */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-2.5 flex items-center justify-between shadow-lg text-white group focus-within:bg-white/30 transition-all"
        >
          <div className="flex items-center space-x-2.5 flex-1 mr-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold text-xs text-blue-600 shadow-sm shrink-0">
              G
            </div>
            <input
              type="text"
              placeholder="Search or type URL"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-white placeholder-white/70 w-full"
            />
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                onSearchGoogle("AI voice search");
              }}
              className="p-1 rounded-full text-white/80 hover:text-white transition-colors"
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                onOpenApp("camera");
              }}
              className="p-1 rounded-full text-white/80 hover:text-white transition-colors"
              title="Google Lens"
            >
              <LensIcon className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Center Section: App Icons Grid */}
      <div className="grid grid-cols-4 gap-y-4 gap-x-2 my-auto px-1">
        {gridApps.map((app) => {
          const Icon = ICON_MAP[app.iconName] || ShoppingBag;
          return (
            <button
              key={app.id}
              onClick={() => {
                sounds.playTap();
                onOpenApp(app.id);
              }}
              className="flex flex-col items-center space-y-1.5 group active:scale-90 transition-transform"
            >
              <div
                className={`w-13 h-13 p-3 rounded-2xl ${app.bgColor} ${app.textColor} shadow-lg flex items-center justify-center border border-white/10 group-hover:shadow-xl group-hover:scale-105 transition-all`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium text-white drop-shadow truncate w-full text-center px-0.5">
                {app.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Section: Swipe Up Arrow & Dock */}
      <div className="space-y-3">
        {/* Swipe up for App Drawer indicator */}
        <button
          onClick={() => {
            sounds.playTap();
            onOpenDrawer();
          }}
          className="w-full flex flex-col items-center text-white/70 hover:text-white transition-colors active:scale-95"
          title="Open All Apps Drawer"
        >
          <ChevronUp className="w-4 h-4 animate-bounce" />
        </button>

        {/* 5-App Bottom Dock */}
        <div className="w-full bg-white/15 backdrop-blur-lg border border-white/20 rounded-3xl p-2.5 px-3 flex items-center justify-around shadow-2xl">
          {dockApps.map((app) => {
            const Icon = ICON_MAP[app.iconName] || ShoppingBag;
            return (
              <button
                key={app.id}
                onClick={() => {
                  sounds.playTap();
                  onOpenApp(app.id);
                }}
                className="p-2.5 rounded-2xl bg-black/20 hover:bg-black/30 active:scale-90 transition-all text-white shadow"
                title={app.name}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${app.bgColor} ${app.textColor} flex items-center justify-center shadow`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
