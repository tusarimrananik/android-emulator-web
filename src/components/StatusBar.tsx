"use client";

import React, { useState, useEffect } from "react";
import { Wifi, Signal, Battery, BatteryCharging, Bluetooth, VolumeX, Moon } from "lucide-react";
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
      className={`h-7 w-full px-5 flex items-center justify-between z-30 cursor-pointer select-none transition-colors ${textColor}`}
      title="Click or swipe down for Quick Settings"
    >
      {/* Left side: Time */}
      <div className="flex items-center space-x-1 font-semibold text-[13px] tracking-tight">
        <span>{time || "12:00"}</span>
        {settings.dndEnabled && <Moon className="w-3 h-3 opacity-80" />}
      </div>

      {/* Center: Punch hole camera placeholder offset */}
      <div className="w-4 h-4 rounded-full bg-black/80 pointer-events-none opacity-0" />

      {/* Right side: Status icons */}
      <div className="flex items-center space-x-1.5 text-xs font-medium">
        {settings.soundMuted && <VolumeX className="w-3.5 h-3.5" />}
        {settings.bluetoothEnabled && <Bluetooth className="w-3 h-3 opacity-90" />}
        
        {settings.wifiEnabled ? (
          <Wifi className="w-3.5 h-3.5" />
        ) : (
          <Signal className="w-3.5 h-3.5" />
        )}

        <div className="flex items-center space-x-0.5">
          <span className="text-[11px] font-semibold">5G</span>
          <Signal className="w-3 h-3" />
        </div>

        <div className="flex items-center space-x-1">
          <span className="text-[11px] font-mono font-medium">
            {settings.batterySaver ? "84%" : "92%"}
          </span>
          {settings.batterySaver ? (
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
          ) : (
            <Battery className="w-4 h-4" />
          )}
        </div>
      </div>
    </div>
  );
};
