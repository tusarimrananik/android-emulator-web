"use client";

import React, { useState, useEffect } from "react";
import { CloudSun, ChevronUp } from "lucide-react";
import { AppDefinition, AppId, DeviceSettings } from "@/types/android";
import { sounds } from "@/utils/soundEffects";
import {
  GoogleLogoIcon,
  GoogleMicIcon,
  GoogleLensIcon,
  ChromeIcon,
  PlayStoreIcon,
  GooglePhotosIcon,
  AndroidPhoneIcon,
  AndroidMessagesIcon,
  AndroidCameraIcon,
  AndroidSettingsIcon,
  AndroidCalculatorIcon,
  AndroidClockIcon,
  AndroidFilesIcon,
  AndroidYTMusicIcon,
  AndroidKeepIcon,
  AndroidGamesIcon,
  AndroidRecorderIcon,
  AndroidYouTubeIcon,
  AndroidTermuxIcon,
} from "@/components/AndroidIcons";

interface HomeScreenProps {
  apps: AppDefinition[];
  settings: DeviceSettings;
  onOpenApp: (appId: AppId) => void;
  onOpenDrawer: () => void;
  onSearchGoogle: (query?: string) => void;
}

export const getAppIconComponent = (id: string, className = "w-full h-full") => {
  switch (id) {
    case "phone":
      return <AndroidPhoneIcon className={className} />;
    case "messages":
      return <AndroidMessagesIcon className={className} />;
    case "chrome":
      return <ChromeIcon className={className} />;
    case "camera":
      return <AndroidCameraIcon className={className} />;
    case "playstore":
      return <PlayStoreIcon className={className} />;
    case "photos":
      return <GooglePhotosIcon className={className} />;
    case "settings":
      return <AndroidSettingsIcon className={className} />;
    case "calculator":
      return <AndroidCalculatorIcon className={className} />;
    case "clock":
      return <AndroidClockIcon className={className} />;
    case "files":
      return <AndroidFilesIcon className={className} />;
    case "music":
      return <AndroidYTMusicIcon className={className} />;
    case "games":
      return <AndroidGamesIcon className={className} />;
    case "notes":
      return <AndroidKeepIcon className={className} />;
    case "recorder":
      return <AndroidRecorderIcon className={className} />;
    case "youtube":
      return <AndroidYouTubeIcon className={className} />;
    case "termux":
      return <AndroidTermuxIcon className={className} />;
    default:
      return <PlayStoreIcon className={className} />;
  }
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
      className="w-full h-full flex flex-col justify-between p-4 pt-10 pb-2 select-none overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.45)), url(${settings.wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top Section: Pixel At-a-Glance Widget & Google Search */}
      <div className="space-y-4">
        {/* At a Glance Widget */}
        <div
          onClick={() => {
            sounds.playTap();
            onOpenApp("clock");
          }}
          className="flex flex-col text-white cursor-pointer px-2 pt-2 transition-transform active:scale-98"
        >
          <div className="flex items-center space-x-2 text-4xl font-semibold tracking-tight font-android-clock drop-shadow-md">
            <span>{time || "12:00"}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm font-medium text-white/95 drop-shadow-md mt-1">
            <span>{date || "Sat, Aug 15"}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <CloudSun className="w-4 h-4 text-amber-300" />
              <span>26°C Dhaka</span>
            </span>
          </div>
        </div>

        {/* Official Google Search Bar Widget */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full bg-white/90 backdrop-blur-md rounded-full px-3.5 py-2.5 flex items-center justify-between shadow-xl text-zinc-900 group focus-within:bg-white transition-all"
        >
          <div className="flex items-center space-x-2.5 flex-1 mr-2">
            <GoogleLogoIcon className="w-5 h-5 shrink-0" />
            <input
              type="text"
              placeholder="Search or type URL"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-zinc-800 placeholder-zinc-500 w-full font-medium"
            />
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                onSearchGoogle("voice");
              }}
              className="p-1 text-zinc-600 hover:text-zinc-900 transition-colors"
              title="Voice Search"
            >
              <GoogleMicIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                onOpenApp("camera");
              }}
              className="p-1 text-zinc-600 hover:text-zinc-900 transition-colors"
              title="Google Lens"
            >
              <GoogleLensIcon className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Center Section: App Icons Grid (4 columns, Android Squircles) */}
      <div className="grid grid-cols-4 gap-y-5 gap-x-3 my-auto px-1">
        {gridApps.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              sounds.playTap();
              onOpenApp(app.id);
            }}
            className="flex flex-col items-center space-y-1.5 group active:scale-90 transition-transform"
          >
            <div className="w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-105 transition-all overflow-hidden drop-shadow-md">
              {getAppIconComponent(app.id, "w-full h-full")}
            </div>
            <span className="text-[11px] font-medium text-white drop-shadow-md truncate w-full text-center px-0.5 tracking-tight">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Section: Swipe Up Arrow & Dock */}
      <div className="space-y-3">
        {/* Swipe up for App Drawer indicator */}
        <button
          onClick={() => {
            sounds.playTap();
            onOpenDrawer();
          }}
          className="w-full flex flex-col items-center text-white/80 hover:text-white transition-colors active:scale-95"
          title="Open All Apps Drawer"
        >
          <ChevronUp className="w-4 h-4 animate-bounce drop-shadow" />
        </button>

        {/* 5-App Bottom Dock (Exact Android Material Dock) */}
        <div className="w-full bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-2 px-3 flex items-center justify-around shadow-2xl">
          {dockApps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                sounds.playTap();
                onOpenApp(app.id);
              }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 hover:scale-105 transition-all overflow-hidden drop-shadow"
              title={app.name}
            >
              {getAppIconComponent(app.id, "w-full h-full")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
