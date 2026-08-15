"use client";

import React from "react";
import { Power, RotateCcw, ShieldAlert, Camera, X } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

interface PowerMenuProps {
  visible: boolean;
  onClose: () => void;
  onRestart: () => void;
  onPowerOff: () => void;
  onScreenshot: () => void;
}

export const PowerMenu: React.FC<PowerMenuProps> = ({
  visible,
  onClose,
  onRestart,
  onPowerOff,
  onScreenshot,
}) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 w-full max-w-[280px] shadow-2xl flex flex-col items-center space-y-4">
        <div className="w-full flex justify-between items-center pb-2 border-b border-white/10">
          <span className="text-sm font-semibold text-zinc-300">Android Power</span>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-1 rounded-full text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            onClick={() => {
              sounds.playTap();
              onRestart();
            }}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all text-emerald-400 space-y-1.5"
          >
            <RotateCcw className="w-6 h-6" />
            <span className="text-xs font-medium text-zinc-200">Restart</span>
          </button>

          <button
            onClick={() => {
              sounds.playTap();
              onPowerOff();
            }}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all text-red-400 space-y-1.5"
          >
            <Power className="w-6 h-6" />
            <span className="text-xs font-medium text-zinc-200">Power off</span>
          </button>

          <button
            onClick={() => {
              sounds.playShutter();
              onScreenshot();
            }}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all text-blue-400 space-y-1.5"
          >
            <Camera className="w-6 h-6" />
            <span className="text-xs font-medium text-zinc-200">Screenshot</span>
          </button>

          <button
            onClick={() => {
              sounds.playTap();
              alert("Emergency SOS triggered (Simulated)");
              onClose();
            }}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all text-amber-400 space-y-1.5"
          >
            <ShieldAlert className="w-6 h-6" />
            <span className="text-xs font-medium text-zinc-200">Emergency</span>
          </button>
        </div>
      </div>
    </div>
  );
};
