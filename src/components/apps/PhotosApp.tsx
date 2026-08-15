"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Share2,
  Trash2,
  Check,
  ArrowLeft,
  Wallpaper,
  Sparkles,
  Heart,
} from "lucide-react";
import { sounds } from "@/utils/soundEffects";

interface PhotosAppProps {
  photos: string[];
  onSetWallpaper: (url: string) => void;
  onDeletePhoto?: (url: string) => void;
}

export const PhotosApp: React.FC<PhotosAppProps> = ({
  photos,
  onSetWallpaper,
  onDeletePhoto,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [wallpaperSetSuccess, setWallpaperSetSuccess] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleSetAsWallpaper = (url: string) => {
    sounds.playNotification();
    onSetWallpaper(url);
    setWallpaperSetSuccess(true);
    setTimeout(() => setWallpaperSetSuccess(false), 2500);
  };

  const handleDelete = (url: string) => {
    sounds.playTap();
    if (onDeletePhoto) {
      onDeletePhoto(url);
    }
    setSelectedPhoto(null);
  };

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none">
      {/* Fullscreen Photo Viewer Modal */}
      {selectedPhoto ? (
        <div className="h-full flex flex-col justify-between bg-black animate-in fade-in duration-200">
          {/* Top Viewer Bar */}
          <div className="p-4 pt-10 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
            <button
              onClick={() => {
                sounds.playTap();
                setSelectedPhoto(null);
              }}
              className="p-2 rounded-full bg-zinc-900/80 text-white hover:bg-zinc-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold text-zinc-300">Google Photos</span>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-full bg-zinc-900/80 text-white hover:bg-zinc-800"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "text-rose-500 fill-rose-500" : "text-white"}`} />
            </button>
          </div>

          {/* Image Display */}
          <div className="flex-1 flex items-center justify-center p-2 relative overflow-hidden">
            <img
              src={selectedPhoto}
              alt="View"
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />

            {/* Toast feedback when wallpaper applied */}
            {wallpaperSetSuccess && (
              <div className="absolute bottom-6 px-4 py-2 bg-emerald-500 text-zinc-950 rounded-full text-xs font-bold shadow-2xl flex items-center space-x-1.5 animate-in slide-in-from-bottom duration-200">
                <Check className="w-4 h-4" />
                <span>Wallpaper applied to Home & Lock screen!</span>
              </div>
            )}
          </div>

          {/* Bottom Photo Actions Bar */}
          <div className="p-4 pb-8 bg-zinc-950 border-t border-white/10 flex items-center justify-around">
            <button
              onClick={() => handleSetAsWallpaper(selectedPhoto)}
              className="flex flex-col items-center space-y-1 p-2 text-zinc-300 hover:text-white active:scale-95 transition-all"
            >
              <Wallpaper className="w-5 h-5 text-blue-400" />
              <span className="text-[10px] font-medium">Set Wallpaper</span>
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                alert("Simulated share sheet opened");
              }}
              className="flex flex-col items-center space-y-1 p-2 text-zinc-300 hover:text-white active:scale-95 transition-all"
            >
              <Share2 className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-medium">Share</span>
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                alert("Magic Editor Enhanced with Google AI (Simulated)");
              }}
              className="flex flex-col items-center space-y-1 p-2 text-zinc-300 hover:text-white active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-[10px] font-medium">Edit AI</span>
            </button>

            <button
              onClick={() => handleDelete(selectedPhoto)}
              className="flex flex-col items-center space-y-1 p-2 text-zinc-300 hover:text-red-400 active:scale-95 transition-all"
            >
              <Trash2 className="w-5 h-5 text-red-400" />
              <span className="text-[10px] font-medium">Delete</span>
            </button>
          </div>
        </div>
      ) : (
        /* Photos Grid Screen */
        <div className="h-full flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 pt-10 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Photos</span>
            </div>
            <span className="text-xs text-zinc-500">{photos.length} items</span>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-3 android-scrollbar">
            <div className="grid grid-cols-3 gap-2">
              {photos.map((url, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    sounds.playTap();
                    setSelectedPhoto(url);
                  }}
                  className="aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer hover:opacity-90 active:scale-95 transition-all relative group"
                >
                  <img src={url} alt={`Photo ${idx}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer bar */}
          <div className="p-3 border-t border-white/5 bg-zinc-900/60 text-center text-xs text-zinc-400">
            Backed up with Google One
          </div>
        </div>
      )}
    </div>
  );
};
