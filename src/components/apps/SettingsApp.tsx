"use client";

import React, { useState } from "react";
import {
  Wifi,
  Palette,
  Sun,
  Volume2,
  Battery,
  Smartphone,
  ChevronRight,
  ArrowLeft,
  Check,
  Search,
  Sliders,
  ShieldCheck,
  Bell,
  HardDrive,
} from "lucide-react";
import { DeviceSettings } from "@/types/android";
import { THEME_COLORS, WALLPAPERS } from "@/utils/constants";
import { sounds } from "@/utils/soundEffects";

interface SettingsAppProps {
  settings: DeviceSettings;
  onUpdateSettings: (settings: Partial<DeviceSettings>) => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [developerClicks, setDeveloperClicks] = useState<number>(0);
  const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false);

  const handleDevClick = () => {
    sounds.playTap();
    const next = developerClicks + 1;
    setDeveloperClicks(next);
    if (next >= 5) {
      setShowEasterEgg(true);
      sounds.playNotification();
    }
  };

  const renderMainMenu = () => (
    <div className="space-y-4 p-3 pt-8">
      {/* Top Search bar (Google Pixel Settings Style) */}
      <div className="bg-zinc-900 border border-white/10 rounded-full px-4 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2.5 text-xs text-zinc-400">
          <Search className="w-4 h-4 text-zinc-400" />
          <span>Search settings</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
          A
        </div>
      </div>

      <div className="px-2 pt-1 pb-1">
        <span className="text-2xl font-bold tracking-tight text-white font-sans">Settings</span>
      </div>

      {/* Main Settings Sections */}
      <div className="space-y-1.5">
        {/* Network & Internet */}
        <button
          onClick={() => {
            sounds.playTap();
            setActiveSubMenu("network");
          }}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-850 border border-white/5 transition-all text-left group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-full bg-blue-500/20 text-blue-400">
              <Wifi className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Network & internet
              </span>
              <span className="text-[11px] text-zinc-400">
                Wi-Fi, Mobile, Hotspot
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </button>

        {/* Wallpaper & Style (Material You) */}
        <button
          onClick={() => {
            sounds.playTap();
            setActiveSubMenu("wallpaper");
          }}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-850 border border-white/5 transition-all text-left group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-full bg-purple-500/20 text-purple-400">
              <Palette className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">
                Wallpaper & style
              </span>
              <span className="text-[11px] text-zinc-400">
                Material You colors, Wallpapers
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </button>

        {/* Display */}
        <button
          onClick={() => {
            sounds.playTap();
            setActiveSubMenu("display");
          }}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-850 border border-white/5 transition-all text-left group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-full bg-amber-500/20 text-amber-400">
              <Sun className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                Display
              </span>
              <span className="text-[11px] text-zinc-400">
                Dark theme, Brightness, Navigation
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </button>

        {/* Sound & Vibration */}
        <button
          onClick={() => {
            sounds.playTap();
            setActiveSubMenu("sound");
          }}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-850 border border-white/5 transition-all text-left group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-full bg-emerald-500/20 text-emerald-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                Sound & vibration
              </span>
              <span className="text-[11px] text-zinc-400">
                Volume, Haptics, Do Not Disturb
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </button>

        {/* Battery */}
        <button
          onClick={() => {
            sounds.playTap();
            setActiveSubMenu("battery");
          }}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-850 border border-white/5 transition-all text-left group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-full bg-teal-500/20 text-teal-400">
              <Battery className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white group-hover:text-teal-400 transition-colors">
                Battery
              </span>
              <span className="text-[11px] text-zinc-400">
                {settings.batterySaver ? "84%" : "92%"} • Battery Saver
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </button>

        {/* About Phone */}
        <button
          onClick={() => {
            sounds.playTap();
            setActiveSubMenu("about");
          }}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-850 border border-white/5 transition-all text-left group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-full bg-rose-500/20 text-rose-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors">
                About phone
              </span>
              <span className="text-[11px] text-zinc-400">
                Pixel 8 Pro • Android 15
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none overflow-y-auto android-scrollbar">
      {activeSubMenu ? (
        <div className="p-4 pt-8 space-y-5">
          {/* Sub Menu Header */}
          <div className="flex items-center space-x-3 pb-2 border-b border-white/10">
            <button
              onClick={() => {
                sounds.playTap();
                setActiveSubMenu(null);
              }}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-white capitalize">
              {activeSubMenu.replace("-", " ")}
            </span>
          </div>

          {/* Sub Menu 1: Network & Internet */}
          {activeSubMenu === "network" && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-white/5">
                <div className="flex flex-col">
                  <span className="font-bold text-white">Wi-Fi 6E</span>
                  <span className="text-zinc-400 text-[11px]">Connected to Ultra-Fiber 5G</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.wifiEnabled}
                  onChange={(e) => onUpdateSettings({ wifiEnabled: e.target.checked })}
                  className="w-5 h-5 accent-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-white/5">
                <div className="flex flex-col">
                  <span className="font-bold text-white">Airplane mode</span>
                  <span className="text-zinc-400 text-[11px]">Disable all wireless radios</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.airplaneMode}
                  onChange={(e) => onUpdateSettings({ airplaneMode: e.target.checked })}
                  className="w-5 h-5 accent-blue-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Sub Menu 2: Wallpaper & Style */}
          {activeSubMenu === "wallpaper" && (
            <div className="space-y-5 text-xs">
              <div className="space-y-2">
                <span className="font-bold text-white">Material You Color Palette</span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {THEME_COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        sounds.playTap();
                        onUpdateSettings({ themeColor: c.value });
                      }}
                      className={`p-2.5 rounded-2xl border flex items-center space-x-2 transition-all ${
                        settings.themeColor === c.value
                          ? "border-white bg-zinc-800"
                          : "border-white/5 bg-zinc-900 hover:bg-zinc-800"
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full shadow" style={{ backgroundColor: c.value }} />
                      <span className="text-[11px] font-medium text-zinc-300 truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-bold text-white">Select Wallpaper</span>
                <div className="grid grid-cols-3 gap-2">
                  {WALLPAPERS.map((wp) => (
                    <div
                      key={wp.id}
                      onClick={() => {
                        sounds.playTap();
                        onUpdateSettings({ wallpaper: wp.url });
                      }}
                      className={`aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer relative border-2 transition-all ${
                        settings.wallpaper === wp.url ? "border-blue-500 scale-102" : "border-transparent opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                      {settings.wallpaper === wp.url && (
                        <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                          <Check className="w-5 h-5 text-white bg-blue-600 rounded-full p-1 shadow" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub Menu 3: Display & Navigation */}
          {activeSubMenu === "display" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-white/5">
                <div className="flex flex-col">
                  <span className="font-bold text-white">Dark Theme</span>
                  <span className="text-zinc-400 text-[11px]">AMOLED pure black styling</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => onUpdateSettings({ darkMode: e.target.checked })}
                  className="w-5 h-5 accent-blue-500 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-2xl bg-zinc-900 border border-white/5 space-y-2">
                <span className="font-bold text-white">System Navigation</span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      sounds.playTap();
                      onUpdateSettings({ navStyle: "gesture" });
                    }}
                    className={`py-2 px-3 rounded-xl border text-center font-semibold transition-all ${
                      settings.navStyle === "gesture"
                        ? "bg-blue-500 text-zinc-950 border-blue-400"
                        : "bg-zinc-800 border-white/5 text-zinc-400"
                    }`}
                  >
                    Gesture Navigation
                  </button>
                  <button
                    onClick={() => {
                      sounds.playTap();
                      onUpdateSettings({ navStyle: "3button" });
                    }}
                    className={`py-2 px-3 rounded-xl border text-center font-semibold transition-all ${
                      settings.navStyle === "3button"
                        ? "bg-blue-500 text-zinc-950 border-blue-400"
                        : "bg-zinc-800 border-white/5 text-zinc-400"
                    }`}
                  >
                    3-Button Navigation
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sub Menu 4: Sound & Volume */}
          {activeSubMenu === "sound" && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Media Volume</span>
                  <span className="font-mono text-blue-400">{settings.volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.volume}
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    onUpdateSettings({ volume: v });
                    sounds.playVolumeTick(v);
                  }}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          )}

          {/* Sub Menu 5: Battery */}
          {activeSubMenu === "battery" && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-3xl bg-zinc-900 border border-white/5 flex flex-col items-center justify-center space-y-2 py-6">
                <span className="text-4xl font-bold text-emerald-400 font-mono">92%</span>
                <span className="text-zinc-400">Battery health: 100% (Excellent)</span>
              </div>
            </div>
          )}

          {/* Sub Menu 6: About Phone */}
          {activeSubMenu === "about" && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-3xl bg-zinc-900 border border-white/5 space-y-2">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Device name</span>
                  <span className="font-bold text-white">Pixel 8 Pro</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Android version</span>
                  <span className="font-bold text-emerald-400">Android 15 (Vanilla Ice Cream)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Processor</span>
                  <span className="font-bold text-white">Google Tensor G3 (4nm)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">RAM</span>
                  <span className="font-bold text-white">12 GB LPDDR5X</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Storage</span>
                  <span className="font-bold text-white">256 GB UFS 4.0</span>
                </div>
                <div
                  onClick={handleDevClick}
                  className="flex justify-between py-1 cursor-pointer hover:text-blue-400 transition-colors"
                >
                  <span className="text-zinc-400">Build Number</span>
                  <span className="font-mono text-zinc-300">AP2A.260805.002 (Tap 5x)</span>
                </div>
              </div>

              {showEasterEgg && (
                <div className="p-3 bg-blue-500/20 border border-blue-500/40 rounded-2xl text-center text-blue-300 font-bold animate-in fade-in">
                  🎉 Developer Mode Unlocked: Android 15 Master!
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        renderMainMenu()
      )}
    </div>
  );
};
