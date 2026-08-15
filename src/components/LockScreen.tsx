"use client";

import React, { useState, useEffect } from "react";
import { CloudSun } from "lucide-react";
import { DeviceSettings, NotificationItem } from "@/types/android";
import { sounds } from "@/utils/soundEffects";
import {
  AndroidFlashlightIcon,
  AndroidCameraOutlineIcon,
  AndroidFingerprintIcon,
  AndroidLockIcon,
} from "@/components/AndroidSystemIcons";

interface LockScreenProps {
  settings: DeviceSettings;
  onUnlock: () => void;
  onOpenApp: (appId: any) => void;
  notifications: NotificationItem[];
  onToggleFlashlight: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  settings,
  onUnlock,
  onOpenApp,
  notifications,
  onToggleFlashlight,
}) => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);

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
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlockTrigger = () => {
    setIsUnlocking(true);
    sounds.playUnlock();
    setTimeout(() => {
      onUnlock();
      setIsUnlocking(false);
    }, 200);
  };

  return (
    <div
      onClick={handleUnlockTrigger}
      className="absolute inset-0 z-40 flex flex-col justify-between p-6 select-none cursor-pointer overflow-hidden transition-all duration-300"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url(${settings.wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top Lock Indicator */}
      <div className="w-full flex justify-center pt-2">
        <div className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white/90">
          <AndroidLockIcon className="w-4 h-4" />
        </div>
      </div>

      {/* Center Clock Widget (Material You 2-Line Typography) */}
      <div className="flex flex-col items-center justify-center my-auto text-white text-center space-y-1">
        <div className="text-7xl font-bold tracking-tighter font-android-clock drop-shadow-lg leading-none">
          {time || "12:00"}
        </div>
        <div className="text-sm font-medium text-white/90 drop-shadow flex items-center space-x-1.5 pt-1">
          <span>{date || "Saturday, August 15"}</span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <CloudSun className="w-4 h-4 text-amber-300" />
            <span>26°C</span>
          </span>
        </div>

        {/* Lock Screen Notifications */}
        {notifications.length > 0 && (
          <div className="w-full max-w-xs mt-6 space-y-2">
            {notifications.slice(0, 2).map((n) => (
              <div
                key={n.id}
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playTap();
                  onOpenApp(n.appId);
                  onUnlock();
                }}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-left shadow-lg text-white"
              >
                <div className="flex items-center justify-between text-[11px] text-white/70 mb-0.5">
                  <span className="font-semibold">{n.appName}</span>
                  <span>{n.time}</span>
                </div>
                <div className="text-xs font-medium truncate">{n.title}</div>
                <div className="text-[11px] text-white/80 line-clamp-1">{n.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Area: Fingerprint & Shortcuts */}
      <div className="flex flex-col items-center space-y-5 pb-2">
        {/* Fingerprint Reader */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleUnlockTrigger();
          }}
          className={`relative p-4 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white transition-transform duration-200 active:scale-90 ${
            isUnlocking ? "animate-ping" : ""
          }`}
          title="Tap fingerprint to unlock"
        >
          <AndroidFingerprintIcon className="w-8 h-8 text-blue-300" />
        </button>

        <span className="text-xs text-white/70 font-medium tracking-wide">
          Swipe up or tap fingerprint to unlock
        </span>

        {/* Bottom Corner Shortcuts */}
        <div className="w-full flex items-center justify-between px-2">
          {/* Flashlight Shortcut */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playTap();
              onToggleFlashlight();
            }}
            className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all ${
              settings.flashlightEnabled
                ? "bg-amber-400 text-zinc-950 shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                : "bg-black/30 text-white hover:bg-black/50"
            }`}
            title="Toggle Flashlight"
          >
            <AndroidFlashlightIcon className="w-5 h-5" />
          </button>

          {/* Camera Shortcut */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playTap();
              onOpenApp("camera");
              onUnlock();
            }}
            className="p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-black/50 transition-all"
            title="Open Camera"
          >
            <AndroidCameraOutlineIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
