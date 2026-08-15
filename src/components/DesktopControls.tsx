"use client";

import React from "react";
import {
  RotateCw,
  Volume2,
  VolumeX,
  Smartphone,
  RefreshCw,
  Github,
  Palette,
  Maximize2,
  Power,
} from "lucide-react";
import { DeviceSettings } from "@/types/android";
import { THEME_COLORS } from "@/utils/constants";
import { sounds } from "@/utils/soundEffects";

interface DesktopControlsProps {
  settings: DeviceSettings;
  onUpdateSettings: (settings: Partial<DeviceSettings>) => void;
  isLandscape: boolean;
  onToggleLandscape: () => void;
  onResetEmulator: () => void;
  onOpenPowerMenu: () => void;
}

export const DesktopControls: React.FC<DesktopControlsProps> = ({
  settings,
  onUpdateSettings,
  isLandscape,
  onToggleLandscape,
  onResetEmulator,
  onOpenPowerMenu,
}) => {
  const toggleSound = () => {
    const nextMuted = !settings.soundMuted;
    sounds.setMuted(nextMuted);
    onUpdateSettings({ soundMuted: nextMuted });
    if (!nextMuted) sounds.playNotification();
  };

  const toggleFullscreen = () => {
    sounds.playTap();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="hidden lg:flex flex-col items-center space-y-4 p-4 max-w-xs text-white select-none">
      {/* Title & Badge */}
      <div className="flex flex-col space-y-1 text-center">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-white">Android 15 WebOS</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">
            PRO
          </span>
        </div>
        <span className="text-xs text-zinc-400">
          In-Browser Google Pixel 8 Pro Emulator
        </span>
      </div>

      {/* Control Card */}
      <div className="w-full bg-zinc-900/80 border border-white/10 rounded-3xl p-4 shadow-xl space-y-4">
        {/* Quick Toggles */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Quick Actions
          </span>
          <div className="grid grid-cols-2 gap-2">
            {/* Rotate */}
            <button
              onClick={() => {
                sounds.playTap();
                onToggleLandscape();
              }}
              className="p-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all flex items-center space-x-2 text-xs text-zinc-200 border border-white/5"
            >
              <RotateCw className="w-4 h-4 text-blue-400" />
              <span>{isLandscape ? "Portrait" : "Landscape"}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-2xl border active:scale-95 transition-all flex items-center space-x-2 text-xs ${
                settings.soundMuted
                  ? "bg-zinc-800/60 border-white/5 text-zinc-400"
                  : "bg-blue-500/20 border-blue-500/40 text-blue-300 font-bold"
              }`}
            >
              {settings.soundMuted ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-blue-400" />
              )}
              <span>{settings.soundMuted ? "Muted" : "Sound On"}</span>
            </button>

            {/* Power Menu */}
            <button
              onClick={() => {
                sounds.playTap();
                onOpenPowerMenu();
              }}
              className="p-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all flex items-center space-x-2 text-xs text-red-400 border border-white/5"
            >
              <Power className="w-4 h-4" />
              <span>Power</span>
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all flex items-center space-x-2 text-xs text-zinc-200 border border-white/5"
            >
              <Maximize2 className="w-4 h-4 text-amber-400" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Dynamic Color Theme Palette */}
        <div className="space-y-2 pt-1 border-t border-white/5">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Palette className="w-3.5 h-3.5" />
            <span>Material You Theme</span>
          </span>
          <div className="flex items-center justify-between pt-1">
            {THEME_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  sounds.playTap();
                  onUpdateSettings({ themeColor: c.value });
                }}
                className={`w-7 h-7 rounded-full transition-all border-2 ${
                  settings.themeColor === c.value
                    ? "border-white scale-125 shadow-lg"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Reset Emulator */}
        <div className="pt-1 border-t border-white/5">
          <button
            onClick={() => {
              if (confirm("Reset Android Emulator to factory settings?")) {
                onResetEmulator();
              }
            }}
            className="w-full py-2.5 rounded-2xl bg-zinc-800 hover:bg-red-500/20 hover:text-red-300 text-xs font-medium text-zinc-400 flex items-center justify-center space-x-1.5 border border-white/5 transition-all active:scale-98"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Factory Reset Emulator</span>
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="text-[11px] text-zinc-500 text-center leading-relaxed">
        Supports WebRTC Camera, DTMF Dialpad, Web Audio API, Fullscreen, Google Play & Linux Termux.
      </div>
    </div>
  );
};
