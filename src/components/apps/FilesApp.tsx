"use client";

import React, { useState, useRef } from "react";
import {
  Folder,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  Upload,
  Trash2,
  HardDrive,
  Check,
} from "lucide-react";
import { FileItem } from "@/types/android";
import { sounds } from "@/utils/soundEffects";

interface FilesAppProps {
  files: FileItem[];
  onUploadFile: (file: FileItem) => void;
  onDeleteFile: (id: string) => void;
}

export const FilesApp: React.FC<FilesAppProps> = ({
  files,
  onUploadFile,
  onDeleteFile,
}) => {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    sounds.playNotification();
    const sizeMb = (uploaded.size / (1024 * 1024)).toFixed(1) + " MB";
    let fileType: FileItem["type"] = "doc";
    if (uploaded.type.startsWith("image/")) fileType = "image";
    else if (uploaded.type.startsWith("audio/")) fileType = "audio";
    else if (uploaded.type.startsWith("video/")) fileType = "video";

    const newFile: FileItem = {
      id: "f-" + Date.now(),
      name: uploaded.name,
      size: sizeMb,
      type: fileType,
      date: "Just now",
      url: URL.createObjectURL(uploaded),
    };

    onUploadFile(newFile);
  };

  const getFileIcon = (type: FileItem["type"]) => {
    switch (type) {
      case "folder":
        return <Folder className="w-5 h-5 text-sky-400" />;
      case "image":
        return <ImageIcon className="w-5 h-5 text-rose-400" />;
      case "audio":
        return <Music className="w-5 h-5 text-purple-400" />;
      case "video":
        return <Video className="w-5 h-5 text-red-400" />;
      default:
        return <FileText className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none p-4 pt-10">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Folder className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Files</span>
        </div>

        {/* Upload Action */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-zinc-950 text-xs font-bold flex items-center space-x-1 shadow"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload</span>
        </button>
      </div>

      {/* Storage Breakdown Bar */}
      <div className="p-4 rounded-3xl bg-zinc-900/70 border border-white/5 my-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <HardDrive className="w-4 h-4 text-sky-400" />
            <span className="font-semibold text-white">Internal Storage</span>
          </div>
          <span className="text-zinc-400 font-mono">48.2 GB / 256 GB</span>
        </div>
        <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden flex">
          <div className="h-full bg-sky-500 w-[18%]" title="Images" />
          <div className="h-full bg-purple-500 w-[8%]" title="Audio" />
          <div className="h-full bg-rose-500 w-[12%]" title="Videos" />
          <div className="h-full bg-emerald-500 w-[6%]" title="Documents" />
        </div>
        <div className="flex justify-between text-[10px] text-zinc-500 pt-1">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
            <span>Images</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
            <span>Audio</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
            <span>Videos</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Docs</span>
          </span>
        </div>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto space-y-2 android-scrollbar">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-1">Recent Files</span>
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-850 border border-white/5 transition-all group"
          >
            <div className="flex items-center space-x-3 truncate mr-2">
              <div className="p-2.5 rounded-xl bg-zinc-800 shrink-0">
                {getFileIcon(file.type)}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-white truncate">{file.name}</span>
                <span className="text-[10px] text-zinc-500">{file.size} • {file.date}</span>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playTap();
                onDeleteFile(file.id);
              }}
              className="p-2 text-zinc-500 hover:text-red-400 rounded-full hover:bg-zinc-800 transition-colors"
              title="Delete File"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-2 text-center text-xs text-zinc-500 border-t border-white/5">
        Pixel Files • Protected by Google Play Protect
      </div>
    </div>
  );
};
