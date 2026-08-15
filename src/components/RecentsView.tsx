"use client";

import React from "react";
import { X, Trash2, Smartphone } from "lucide-react";
import { AppDefinition, AppId } from "@/types/android";
import { sounds } from "@/utils/soundEffects";

interface RecentsViewProps {
  visible: boolean;
  openApps: AppId[];
  apps: AppDefinition[];
  activeAppId: AppId | null;
  onSwitchApp: (appId: AppId) => void;
  onCloseApp: (appId: AppId) => void;
  onClearAll: () => void;
  onCloseRecents: () => void;
}

export const RecentsView: React.FC<RecentsViewProps> = ({
  visible,
  openApps,
  apps,
  activeAppId,
  onSwitchApp,
  onCloseApp,
  onClearAll,
  onCloseRecents,
}) => {
  if (!visible) return null;

  return (
    <div
      onClick={onCloseRecents}
      className="absolute inset-0 bg-black/80 backdrop-blur-xl z-40 flex flex-col justify-between p-4 pt-12 pb-16 text-white animate-in fade-in duration-200"
    >
      <div className="flex items-center justify-between px-2">
        <span className="text-sm font-semibold text-zinc-300">
          Running Applications ({openApps.length})
        </span>
        {openApps.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              sounds.playTap();
              onClearAll();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-zinc-800 text-xs text-red-400 hover:bg-zinc-700 active:scale-95 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Cards Carousel */}
      <div className="flex-1 flex items-center overflow-x-auto space-x-4 px-4 py-6 android-scrollbar">
        {openApps.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-zinc-500 space-y-2">
            <Smartphone className="w-12 h-12 opacity-30" />
            <span className="text-xs">No recent applications</span>
          </div>
        ) : (
          openApps.map((appId) => {
            const app = apps.find((a) => a.id === appId);
            if (!app) return null;
            const isCurrent = activeAppId === appId;

            return (
              <div
                key={appId}
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playTap();
                  onSwitchApp(appId);
                }}
                className={`relative shrink-0 w-52 h-80 rounded-3xl bg-zinc-900 border ${
                  isCurrent ? "border-blue-500 ring-2 ring-blue-500/30" : "border-white/10"
                } shadow-2xl p-4 flex flex-col justify-between cursor-pointer hover:scale-102 active:scale-95 transition-all group`}
              >
                {/* Header with App icon, title and Close X */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-lg overflow-hidden flex items-center justify-center">
                      <img src={app.iconSrc} alt={app.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-200">
                      {app.name}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playTap();
                      onCloseApp(appId);
                    }}
                    className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
                    title="Close App"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Simulated Screen Preview Inside Card */}
                <div className="flex-1 my-3 bg-zinc-950 rounded-2xl border border-white/5 p-3 flex flex-col items-center justify-center space-y-2 text-zinc-500">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shadow">
                    <img src={app.iconSrc} alt={app.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[11px] font-medium">{app.name} is running</span>
                </div>

                {/* Bottom Tag */}
                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                  <span>Swipe up to force close</span>
                  <span className="text-blue-400 font-medium">Tap to open</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="text-center text-xs text-zinc-400">
        Tap outside or select an app to continue
      </div>
    </div>
  );
};
