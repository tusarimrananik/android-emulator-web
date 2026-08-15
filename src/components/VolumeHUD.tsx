"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

interface VolumeHUDProps {
  volume: number;
  onVolumeChange: (vol: number) => void;
  visible: boolean;
  onClose: () => void;
}

export const VolumeHUD: React.FC<VolumeHUDProps> = ({
  volume,
  onVolumeChange,
  visible,
  onClose,
}) => {
  const [localVol, setLocalVol] = useState(volume);

  useEffect(() => {
    setLocalVol(volume);
  }, [volume]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, localVol, onClose]);

  if (!visible) return null;

  return (
    <div className="absolute right-3 top-24 z-50 flex flex-col items-center bg-zinc-900/95 backdrop-blur-md text-white rounded-3xl p-3 py-4 shadow-2xl border border-white/10 w-14 animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Icon */}
      <button
        onClick={() => {
          const next = localVol === 0 ? 50 : 0;
          setLocalVol(next);
          onVolumeChange(next);
          sounds.playVolumeTick(next);
        }}
        className="mb-3 text-zinc-300 hover:text-white"
      >
        {localVol === 0 ? (
          <VolumeX className="w-5 h-5 text-red-400" />
        ) : localVol < 50 ? (
          <Volume1 className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5 text-blue-400" />
        )}
      </button>

      {/* Vertical Slider Bar */}
      <div className="relative h-32 w-4 bg-zinc-800 rounded-full overflow-hidden flex flex-col justify-end">
        <div
          className="w-full bg-blue-500 rounded-full transition-all duration-75"
          style={{ height: `${localVol}%` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={localVol}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setLocalVol(val);
            onVolumeChange(val);
            sounds.playVolumeTick(val);
          }}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full [writing-mode:bt-lr] -rotate-90 origin-center"
        />
      </div>

      <span className="text-[10px] font-mono mt-2 text-zinc-400">{localVol}%</span>
    </div>
  );
};
