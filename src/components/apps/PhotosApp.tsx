"use client";

import React, { useState } from "react";
import {
  Share2,
  Trash2,
  Check,
  ArrowLeft,
  Wallpaper,
  Sparkles,
  Heart,
  Search,
  Cast,
  FolderLock,
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
  const [activeBottomTab, setActiveBottomTab] = useState<"photos" | "search" | "library">("photos");

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
          <div className="p-4 pt-8 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
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

            {wallpaperSetSuccess && (
              <div className="absolute bottom-6 px-4 py-2 bg-emerald-500 text-zinc-950 rounded-full text-xs font-bold shadow-2xl flex items-center space-x-1.5 animate-in slide-in-from-bottom duration-200">
                <Check className="w-4 h-4" />
                <span>Wallpaper applied to Home & Lock screen!</span>
              </div>
            )}
          </div>

          {/* Bottom Photo Actions Bar */}
          <div className="p-4 pb-6 bg-zinc-950 border-t border-white/10 flex items-center justify-around">
            <button
              onClick={() => handleSetAsWallpaper(selectedPhoto)}
              className="flex flex-col items-center space-y-1 p-2 text-zinc-300 hover:text-white active:scale-95 transition-all"
            >
              <Wallpaper className="w-5 h-5 text-blue-400" />
              <span className="text-[10px] font-medium">Use as</span>
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
                alert("Magic Editor Enhanced with Google AI");
              }}
              className="flex flex-col items-center space-y-1 p-2 text-zinc-300 hover:text-white active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-[10px] font-medium">Edit</span>
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
        /* Photos Grid Screen (Official Google Photos UI) */
        <div className="h-full flex flex-col justify-between">
          {/* Top Header */}
          <div className="p-3 pt-8 pb-2 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/img/icon/apps/photos.png" alt="" className="w-6 h-6 object-contain" />
              <span className="text-base font-bold tracking-tight text-white">Google Photos</span>
            </div>
            <div className="flex items-center space-x-3">
              <Cast className="w-4 h-4 text-zinc-400" />
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center">
                A
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 android-scrollbar">
            {/* Memories Stories Carousel */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-zinc-400">Recent Highlights</span>
              <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1">
                {photos.map((url, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      sounds.playTap();
                      setSelectedPhoto(url);
                    }}
                    className="shrink-0 w-24 h-36 rounded-2xl overflow-hidden border-2 border-rose-500/40 relative cursor-pointer active:scale-95 transition-transform"
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                      <span className="text-[10px] font-bold text-white leading-tight">Best of August</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white">Today</span>
              <div className="grid grid-cols-3 gap-1.5">
                {photos.map((url, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      sounds.playTap();
                      setSelectedPhoto(url);
                    }}
                    className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer active:scale-95 transition-all"
                  >
                    <img src={url} alt={`Photo ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Google Photos Navigation Bar */}
          <div className="h-14 border-t border-white/10 bg-zinc-900/90 flex items-center justify-around px-4">
            <button
              onClick={() => setActiveBottomTab("photos")}
              className={`flex flex-col items-center space-y-0.5 py-1 px-4 rounded-xl transition-all ${
                activeBottomTab === "photos" ? "text-blue-400 font-bold bg-blue-500/10" : "text-zinc-400 hover:text-white"
              }`}
            >
              <img src="/img/icon/apps/photos.png" alt="" className="w-4 h-4 object-contain" />
              <span className="text-[10px]">Photos</span>
            </button>

            <button
              onClick={() => setActiveBottomTab("search")}
              className={`flex flex-col items-center space-y-0.5 py-1 px-4 rounded-xl transition-all ${
                activeBottomTab === "search" ? "text-blue-400 font-bold bg-blue-500/10" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="text-[10px]">Search</span>
            </button>

            <button
              onClick={() => setActiveBottomTab("library")}
              className={`flex flex-col items-center space-y-0.5 py-1 px-4 rounded-xl transition-all ${
                activeBottomTab === "library" ? "text-blue-400 font-bold bg-blue-500/10" : "text-zinc-400 hover:text-white"
              }`}
            >
              <FolderLock className="w-4 h-4" />
              <span className="text-[10px]">Library</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
