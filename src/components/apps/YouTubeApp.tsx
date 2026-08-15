"use client";

import React, { useState } from "react";
import { Search, Tv, Play, ArrowLeft, ThumbsUp, Share2 } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

export const YouTubeApp: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
    channel: string;
    views: string;
    time: string;
    embedId: string;
    thumbnail: string;
  } | null>(null);

  const videos = [
    {
      id: "v1",
      title: "Android 15 Official Features & Deep Dive Overview",
      channel: "Android Developers",
      views: "1.4M views",
      time: "2 days ago",
      embedId: "dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "v2",
      title: "Building an In-Browser Android Emulator with Next.js 15 & React 19",
      channel: "Tech Innovation Hub",
      views: "850K views",
      time: "1 week ago",
      embedId: "dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "v3",
      title: "Synthwave Cyberpunk Chill Mix - 24/7 Lo-Fi Radio",
      channel: "Chill Odyssey Beats",
      views: "4.2M views",
      time: "Streamed live",
      embedId: "dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="p-3 pt-10 bg-zinc-900 border-b border-white/5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {selectedVideo && (
              <button
                onClick={() => {
                  sounds.playTap();
                  setSelectedVideo(null);
                }}
                className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
              <Tv className="w-4 h-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-white">YouTube</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-2 bg-zinc-800 rounded-full px-3.5 py-1.5 border border-white/5">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search YouTube..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-full"
          />
        </div>
      </div>

      {/* Content Feed */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 android-scrollbar">
        {selectedVideo ? (
          /* Video Player View */
          <div className="space-y-3 animate-in fade-in">
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl relative border border-white/10">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.embedId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full border-none"
              />
            </div>

            <div className="space-y-2 px-1">
              <span className="text-sm font-bold text-white leading-snug">{selectedVideo.title}</span>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>{selectedVideo.channel}</span>
                <span>{selectedVideo.views} • {selectedVideo.time}</span>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => sounds.playTap()}
                  className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-full text-xs font-semibold flex items-center space-x-1.5"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Like</span>
                </button>
                <button
                  onClick={() => sounds.playTap()}
                  className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-full text-xs font-semibold flex items-center space-x-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Trending Video Feed */
          videos
            .filter((v) => v.title.toLowerCase().includes(search.toLowerCase()) || v.channel.toLowerCase().includes(search.toLowerCase()))
            .map((video) => (
              <div
                key={video.id}
                onClick={() => {
                  sounds.playTap();
                  setSelectedVideo(video);
                }}
                className="space-y-2 cursor-pointer hover:opacity-95 transition-all group"
              >
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 relative shadow-md group-hover:scale-101 transition-transform">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 px-1">
                  <div className="w-9 h-9 rounded-full bg-red-700 flex items-center justify-center font-bold text-xs text-white shrink-0 mt-0.5">
                    {video.channel[0]}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-bold text-white leading-tight group-hover:text-red-400 transition-colors">
                      {video.title}
                    </span>
                    <span className="text-[11px] text-zinc-400 mt-0.5">
                      {video.channel} • {video.views}
                    </span>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};
