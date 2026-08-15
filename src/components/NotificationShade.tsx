"use client";

import React, { useState, useEffect } from "react";
import {
  Wifi,
  Bluetooth,
  Flashlight,
  Moon,
  Sun,
  RotateCcw,
  BatteryCharging,
  Plane,
  Sliders,
  ChevronUp,
  X,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Trash2,
} from "lucide-react";
import { DeviceSettings, NotificationItem } from "@/types/android";
import { sounds } from "@/utils/soundEffects";
import { APPS } from "@/utils/constants";

interface NotificationShadeProps {
  visible: boolean;
  onClose: () => void;
  settings: DeviceSettings;
  onUpdateSettings: (settings: Partial<DeviceSettings>) => void;
  notifications: NotificationItem[];
  onDismissNotification: (id: string) => void;
  onClearAllNotifications: () => void;
  onOpenApp: (appId: any) => void;
}

export const NotificationShade: React.FC<NotificationShadeProps> = ({
  visible,
  onClose,
  settings,
  onUpdateSettings,
  notifications,
  onDismissNotification,
  onClearAllNotifications,
  onOpenApp,
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isPlayingMedia, setIsPlayingMedia] = useState<boolean>(true);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      );
      setCurrentDate(
        now.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const quickTiles = [
    {
      id: "wifi",
      label: "Internet",
      subLabel: settings.wifiEnabled ? "Wi-Fi 6 Connected" : "Disabled",
      icon: Wifi,
      active: settings.wifiEnabled,
      onClick: () => onUpdateSettings({ wifiEnabled: !settings.wifiEnabled }),
    },
    {
      id: "bluetooth",
      label: "Bluetooth",
      subLabel: settings.bluetoothEnabled ? "Pixel Buds Pro" : "Off",
      icon: Bluetooth,
      active: settings.bluetoothEnabled,
      onClick: () =>
        onUpdateSettings({ bluetoothEnabled: !settings.bluetoothEnabled }),
    },
    {
      id: "flashlight",
      label: "Flashlight",
      subLabel: settings.flashlightEnabled ? "On" : "Off",
      icon: Flashlight,
      active: settings.flashlightEnabled,
      onClick: () =>
        onUpdateSettings({ flashlightEnabled: !settings.flashlightEnabled }),
    },
    {
      id: "darkmode",
      label: "Dark theme",
      subLabel: settings.darkMode ? "Always on" : "Off",
      icon: settings.darkMode ? Moon : Sun,
      active: settings.darkMode,
      onClick: () => onUpdateSettings({ darkMode: !settings.darkMode }),
    },
    {
      id: "dnd",
      label: "Do Not Disturb",
      subLabel: settings.dndEnabled ? "Priority only" : "Off",
      icon: Moon,
      active: settings.dndEnabled,
      onClick: () => onUpdateSettings({ dndEnabled: !settings.dndEnabled }),
    },
    {
      id: "autorotate",
      label: "Auto-rotate",
      subLabel: settings.autoRotate ? "On" : "Locked",
      icon: RotateCcw,
      active: settings.autoRotate,
      onClick: () => onUpdateSettings({ autoRotate: !settings.autoRotate }),
    },
    {
      id: "batterysaver",
      label: "Battery Saver",
      subLabel: settings.batterySaver ? "On (84%)" : "Off",
      icon: BatteryCharging,
      active: settings.batterySaver,
      onClick: () =>
        onUpdateSettings({ batterySaver: !settings.batterySaver }),
    },
    {
      id: "airplane",
      label: "Airplane mode",
      subLabel: settings.airplaneMode ? "On" : "Off",
      icon: Plane,
      active: settings.airplaneMode,
      onClick: () => onUpdateSettings({ airplaneMode: !settings.airplaneMode }),
    },
  ];

  const getAppIconSrc = (appId: string) => {
    const app = APPS.find((a) => a.id === appId);
    return app?.iconSrc || "/img/icon/apps/google.png";
  };

  return (
    <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-xl z-50 flex flex-col text-zinc-100 animate-in slide-in-from-top duration-300 overflow-hidden">
      {/* Top Bar: Time and Quick Controls */}
      <div className="px-5 pt-8 pb-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-white">
            {currentTime}
          </span>
          <span className="text-xs text-zinc-400 font-medium">
            {currentDate} • 26°C Sunny
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sounds.playTap();
              onOpenApp("settings");
              onClose();
            }}
            className="p-2.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 active:scale-95 transition-all text-zinc-300"
            title="Settings"
          >
            <Sliders className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-2.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 active:scale-95 transition-all text-zinc-300"
            title="Close Shade"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Brightness Slider */}
      <div className="px-5 py-2">
        <div className="flex items-center space-x-3 bg-zinc-900/80 rounded-2xl p-3 border border-white/5">
          <Sun className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="range"
            min="20"
            max="100"
            value={settings.brightness}
            onChange={(e) =>
              onUpdateSettings({ brightness: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
          <span className="text-xs font-mono text-zinc-400 w-8 text-right">
            {settings.brightness}%
          </span>
        </div>
      </div>

      {/* Scrollable Tiles and Notifications */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-4 android-scrollbar">
        {/* Quick Settings Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {quickTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <button
                key={tile.id}
                onClick={() => {
                  sounds.playTap();
                  tile.onClick();
                }}
                className={`flex items-center space-x-3 p-3 rounded-2xl transition-all duration-200 active:scale-98 ${
                  tile.active
                    ? "bg-blue-500/20 border border-blue-500/40 text-blue-300"
                    : "bg-zinc-900/70 border border-white/5 text-zinc-400 hover:bg-zinc-800/60"
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    tile.active
                      ? "bg-blue-500 text-zinc-950 font-bold"
                      : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left truncate">
                  <span className="text-xs font-semibold text-zinc-200 truncate">
                    {tile.label}
                  </span>
                  <span className="text-[10px] text-zinc-400 truncate">
                    {tile.subLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Media Player Card */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-850 border border-white/10 rounded-2xl p-3.5 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3 truncate">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow shrink-0">
              <img src="/img/icon/apps/youtube.png" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-white truncate">
                Midnight City Lights
              </span>
              <span className="text-[11px] text-zinc-400 truncate">
                Synthwave Odyssey • YT Music
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1 shrink-0">
            <button
              onClick={() => {
                sounds.playTap();
              }}
              className="p-1.5 text-zinc-400 hover:text-white"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sounds.playTap();
                setIsPlayingMedia(!isPlayingMedia);
              }}
              className="p-2 bg-blue-500 text-zinc-950 rounded-full hover:bg-blue-400 font-bold"
            >
              {isPlayingMedia ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
            <button
              onClick={() => {
                sounds.playTap();
              }}
              className="p-1.5 text-zinc-400 hover:text-white"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">
              Notifications ({notifications.length})
            </span>
            {notifications.length > 0 && (
              <button
                onClick={() => {
                  sounds.playTap();
                  onClearAllNotifications();
                }}
                className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center space-x-1 font-medium"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear all</span>
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-6 text-xs text-zinc-500">
              No new notifications
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  sounds.playTap();
                  onOpenApp(n.appId);
                  onClose();
                }}
                className="bg-zinc-900/90 border border-white/5 rounded-2xl p-3.5 flex flex-col space-y-1.5 cursor-pointer hover:bg-zinc-850 transition-all relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                      <img src={getAppIconSrc(n.appId)} alt="" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs font-medium text-zinc-400">
                      {n.appName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-zinc-500">{n.time}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playTap();
                        onDismissNotification(n.id);
                      }}
                      className="p-1 rounded-full text-zinc-500 hover:text-zinc-300 hover:bg-white/10"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">
                    {n.title}
                  </span>
                  <span className="text-xs text-zinc-300 line-clamp-2">
                    {n.message}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Dismiss Bar */}
      <div className="py-2 flex justify-center border-t border-white/5">
        <button
          onClick={() => {
            sounds.playTap();
            onClose();
          }}
          className="w-24 h-1 bg-zinc-700 rounded-full"
        />
      </div>
    </div>
  );
};
