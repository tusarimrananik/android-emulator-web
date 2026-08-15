"use client";

import React, { useState, useEffect } from "react";
import { DeviceSettings } from "@/types/android";

interface StatusBarProps {
  settings: DeviceSettings;
  onOpenShade: () => void;
  darkIcons?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  settings,
  onOpenShade,
  darkIcons = false,
}) => {
  const [time, setTime] = useState<string>("");

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
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const textColor = darkIcons ? "text-zinc-900" : "text-white";

  return (
    <div
      onClick={onOpenShade}
      className={`h-8 w-full px-6 flex items-center justify-between z-30 cursor-pointer select-none transition-colors ${textColor} pt-1`}
      title="Click or swipe down for Quick Settings"
    >
      {/* Left side: Authentic Android Clock */}
      <div className="flex items-center space-x-1.5 font-semibold text-[13px] tracking-tight">
        <span className="font-sans font-bold">{time || "12:00"}</span>
        {/* Notification dot indicator */}
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-90 inline-block" />
      </div>

      {/* Center: Top Camera Hole Offset */}
      <div className="w-3.5 h-3.5 rounded-full bg-black/60 pointer-events-none" />

      {/* Right side: Android Status Indicators */}
      <div className="flex items-center space-x-2 text-xs font-medium">
        {/* 5G Signal Bars Icon */}
        <div className="flex items-end space-x-[2px] h-3">
          <span className="w-[3px] h-[4px] bg-current rounded-sm" />
          <span className="w-[3px] h-[6px] bg-current rounded-sm" />
          <span className="w-[3px] h-[9px] bg-current rounded-sm" />
          <span className="w-[3px] h-[12px] bg-current rounded-sm" />
        </div>

        {/* 5G Badge */}
        <span className="text-[11px] font-bold tracking-tight">5G</span>

        {/* Wi-Fi Icon */}
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4z" />
        </svg>

        {/* Battery with percentage & lightning */}
        <div className="flex items-center space-x-1 pl-0.5">
          <span className="text-[11px] font-mono font-bold tracking-tighter">
            {settings.batterySaver ? "84%" : "92%"}
          </span>
          <div className="relative w-5 h-2.5 border-[1.5px] border-current rounded-[3px] flex items-center p-[1px]">
            <div
              className={`h-full rounded-[1px] ${
                settings.batterySaver ? "bg-emerald-400 w-[84%]" : "bg-current w-[92%]"
              }`}
            />
            {/* Battery Nipple */}
            <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1 bg-current rounded-r-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};
