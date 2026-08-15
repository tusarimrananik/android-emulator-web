"use client";

import React from "react";
import { ArrowLeft, Circle, Square } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

interface NavigationBarProps {
  navStyle: "3button" | "gesture";
  onBack: () => void;
  onHome: () => void;
  onRecents: () => void;
  darkIcons?: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  navStyle,
  onBack,
  onHome,
  onRecents,
  darkIcons = false,
}) => {
  const iconColor = darkIcons ? "text-zinc-800" : "text-white";

  if (navStyle === "gesture") {
    return (
      <div className="h-6 w-full flex items-center justify-center z-30 select-none pb-1">
        <button
          onClick={() => {
            sounds.playTap();
            onHome();
          }}
          className={`w-32 h-1 rounded-full transition-all duration-200 active:w-36 active:scale-95 ${
            darkIcons ? "bg-zinc-800/80" : "bg-white/80"
          }`}
          title="Swipe up for Home, click for Recents"
          onContextMenu={(e) => {
            e.preventDefault();
            sounds.playTap();
            onRecents();
          }}
        />
      </div>
    );
  }

  return (
    <div className={`h-11 w-full flex items-center justify-around z-30 select-none px-6 ${iconColor}`}>
      {/* Back Button */}
      <button
        onClick={() => {
          sounds.playTap();
          onBack();
        }}
        className="p-2 rounded-full active:bg-white/10 transition-transform active:scale-90"
        title="Back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Home Button */}
      <button
        onClick={() => {
          sounds.playTap();
          onHome();
        }}
        className="p-2 rounded-full active:bg-white/10 transition-transform active:scale-90"
        title="Home"
      >
        <Circle className="w-4 h-4" />
      </button>

      {/* Recents Button */}
      <button
        onClick={() => {
          sounds.playTap();
          onRecents();
        }}
        className="p-2 rounded-full active:bg-white/10 transition-transform active:scale-90"
        title="Recent Apps"
      >
        <Square className="w-4 h-4" />
      </button>
    </div>
  );
};
