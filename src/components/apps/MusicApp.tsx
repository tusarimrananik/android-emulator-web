"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
  ListMusic,
} from "lucide-react";
import { MusicTrack } from "@/types/android";
import { sounds } from "@/utils/soundEffects";

interface MusicAppProps {
  playlist: MusicTrack[];
}

export const MusicApp: React.FC<MusicAppProps> = ({ playlist }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progressSec, setProgressSec] = useState<number>(45);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);

  const currentTrack = playlist[currentIdx] || playlist[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgressSec((prev) => {
          if (prev >= currentTrack.durationSec) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const handleNext = () => {
    sounds.playTap();
    setCurrentIdx((prev) => (prev + 1) % playlist.length);
    setProgressSec(0);
  };

  const handlePrev = () => {
    sounds.playTap();
    setCurrentIdx((prev) => (prev - 1 + playlist.length) % playlist.length);
    setProgressSec(0);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white flex flex-col justify-between select-none p-4 pt-10">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <span className="text-sm font-bold text-red-400">YouTube Music</span>
        <button
          onClick={() => {
            sounds.playTap();
            setShowPlaylist(!showPlaylist);
          }}
          className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white"
        >
          <ListMusic className="w-4 h-4" />
        </button>
      </div>

      {showPlaylist ? (
        /* Playlist View */
        <div className="flex-1 overflow-y-auto space-y-2 py-4 android-scrollbar">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-1">Upcoming Tracks</span>
          {playlist.map((track, i) => (
            <div
              key={track.id}
              onClick={() => {
                sounds.playTap();
                setCurrentIdx(i);
                setProgressSec(0);
                setIsPlaying(true);
                setShowPlaylist(false);
              }}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                i === currentIdx ? "bg-red-500/20 border-red-500/40 text-red-300" : "bg-zinc-900/60 border-white/5 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <img src={track.coverUrl} alt="Art" className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold text-white truncate">{track.title}</span>
                  <span className="text-[10px] text-zinc-400">{track.artist}</span>
                </div>
              </div>
              <span className="text-xs font-mono text-zinc-500">{track.duration}</span>
            </div>
          ))}
        </div>
      ) : (
        /* Main Player View */
        <div className="flex-1 flex flex-col items-center justify-around py-4">
          {/* Album Art Cover */}
          <div className="w-56 h-56 rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group my-auto">
            <img src={currentTrack.coverUrl} alt={currentTrack.title} className="w-full h-full object-cover" />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center space-x-1 p-6">
                <span className="w-1.5 h-10 bg-red-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-1.5 h-14 bg-red-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                <span className="w-1.5 h-8 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-12 bg-red-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Title & Artist */}
          <div className="w-full flex items-center justify-between px-2 pt-4">
            <div className="flex flex-col truncate">
              <span className="text-base font-bold text-white tracking-tight truncate">{currentTrack.title}</span>
              <span className="text-xs text-zinc-400 truncate">{currentTrack.artist} • {currentTrack.album}</span>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 text-zinc-400 hover:text-rose-400"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "text-rose-500 fill-rose-500" : ""}`} />
            </button>
          </div>

          {/* Seeker Progress Bar */}
          <div className="w-full space-y-1.5 px-2 pt-3">
            <input
              type="range"
              min="0"
              max={currentTrack.durationSec}
              value={progressSec}
              onChange={(e) => setProgressSec(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>{formatTime(progressSec)}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="w-full flex items-center justify-around px-4 pt-2">
            <button onClick={() => sounds.playTap()} className="text-zinc-400 hover:text-white">
              <Shuffle className="w-4 h-4" />
            </button>

            <button onClick={handlePrev} className="p-2 text-zinc-300 hover:text-white active:scale-90">
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                setIsPlaying(!isPlaying);
              }}
              className="p-4 bg-red-600 hover:bg-red-500 active:scale-90 rounded-full text-white shadow-xl transition-all"
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
            </button>

            <button onClick={handleNext} className="p-2 text-zinc-300 hover:text-white active:scale-90">
              <SkipForward className="w-6 h-6" />
            </button>

            <button onClick={() => sounds.playTap()} className="text-zinc-400 hover:text-white">
              <Repeat className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
