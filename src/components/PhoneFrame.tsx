"use client";

import React from "react";
import { DeviceSettings } from "@/types/android";
import { sounds } from "@/utils/soundEffects";

interface PhoneFrameProps {
  settings: DeviceSettings;
  children: React.ReactNode;
  isScreenOn: boolean;
  onPowerClick: () => void;
  onPowerLongPress: () => void;
  onVolumeUp: () => void;
  onVolumeDown: () => void;
  isLandscape?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  settings,
  children,
  isScreenOn,
  onPowerClick,
  onPowerLongPress,
  onVolumeUp,
  onVolumeDown,
  isLandscape = false,
}) => {
  return (
    <div className="relative flex items-center justify-center p-2 sm:p-4">
      {/* Outer Hardware Buttons on Right Side */}
      <div className="hidden sm:flex flex-col absolute -right-2 top-28 space-y-4 z-0">
        {/* Power Button */}
        <button
          onClick={() => {
            sounds.playLock();
            onPowerClick();
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            sounds.playTap();
            onPowerLongPress();
          }}
          className="w-2.5 h-12 bg-gradient-to-r from-zinc-700 to-zinc-500 rounded-r-md shadow-md active:scale-95 hover:brightness-125 transition-all cursor-pointer"
          title="Power Button (Click to Sleep/Wake, Right Click / Hold for Power Menu)"
        />

        {/* Volume Up */}
        <button
          onClick={() => {
            onVolumeUp();
          }}
          className="w-2.5 h-11 bg-gradient-to-r from-zinc-700 to-zinc-500 rounded-r-md shadow-md active:scale-95 hover:brightness-125 transition-all cursor-pointer"
          title="Volume Up"
        />

        {/* Volume Down */}
        <button
          onClick={() => {
            onVolumeDown();
          }}
          className="w-2.5 h-11 bg-gradient-to-r from-zinc-700 to-zinc-500 rounded-r-md shadow-md active:scale-95 hover:brightness-125 transition-all cursor-pointer"
          title="Volume Down"
        />
      </div>

      {/* Main Phone Chassis Body */}
      <div
        className={`relative bg-zinc-900 border-[8px] border-zinc-800 rounded-[48px] sm:rounded-[56px] phone-shadow overflow-hidden transition-all duration-300 ${
          isLandscape
            ? "w-[840px] h-[420px]"
            : "w-full max-w-[395px] h-[100dvh] sm:h-[820px]"
        }`}
        style={{
          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.8), 0 0 50px ${settings.themeColor}22, inset 0 0 4px 2px rgba(255,255,255,0.1)`,
        }}
      >
        {/* Top Speaker Ear Slit */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-zinc-800 rounded-full z-40" />

        {/* Front Punch Hole Selfie Camera */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full border border-zinc-800 z-40 flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80" />
        </div>

        {/* Screen Content or Black Sleep Screen */}
        <div
          className={`w-full h-full relative overflow-hidden bg-black transition-opacity duration-300 ${
            isScreenOn ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            filter: `brightness(${settings.brightness}%)`,
          }}
        >
          {children}
        </div>

        {/* Screen Turned Off Layer */}
        {!isScreenOn && (
          <div
            onClick={() => {
              sounds.playUnlock();
              onPowerClick();
            }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 cursor-pointer text-zinc-600 select-none p-6 text-center"
          >
            <span className="text-xs font-medium">Screen is asleep</span>
            <span className="text-[10px] text-zinc-700 mt-1">Tap screen or power button to wake</span>
          </div>
        )}
      </div>
    </div>
  );
};
