"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Send, Trash2 } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

export const TermuxApp: React.FC = () => {
  const [history, setHistory] = useState<
    { command: string; output: string | React.ReactNode }[]
  >([
    {
      command: "neofetch",
      output: (
        <div className="font-mono text-[11px] leading-relaxed text-emerald-400 space-y-1">
          <div>&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;root@android-pixel8pro</div>
          <div>&nbsp;&nbsp;(_&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----------------------</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OS: Android 15 Vanilla Ice Cream</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Host: Google Pixel 8 Pro</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;__)\&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kernel: 6.8.0-android-arm64</div>
          <div>&nbsp;&nbsp;&nbsp;(___&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;Uptime: 14 days, 6 hours</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\___)&nbsp;&nbsp;&nbsp;Shell: bash 5.2.21</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Memory: 4120MiB / 12288MiB</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Storage: 48.2GiB / 256GiB</div>
        </div>
      ),
    },
  ]);
  const [inputCmd, setInputCmd] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCmd.trim()) return;

    sounds.playTap();
    const cmd = inputCmd.trim();
    const parts = cmd.split(" ");
    const main = parts[0].toLowerCase();
    let out: string | React.ReactNode = "";

    switch (main) {
      case "help":
        out = "Available commands: help, neofetch, uname, ls, cat, date, ping, whoami, pkg, echo, clear";
        break;
      case "neofetch":
        out = (
          <div className="font-mono text-[11px] leading-relaxed text-emerald-400 space-y-1">
            <div>&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;root@android-pixel8pro</div>
            <div>&nbsp;&nbsp;(_&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----------------------</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OS: Android 15 Vanilla Ice Cream</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Host: Google Pixel 8 Pro</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;__)\&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kernel: 6.8.0-android-arm64</div>
            <div>&nbsp;&nbsp;&nbsp;(___&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;Shell: bash 5.2.21</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\___)&nbsp;&nbsp;&nbsp;Memory: 4120MiB / 12288MiB</div>
          </div>
        );
        break;
      case "uname":
      case "uname -a":
        out = "Linux localhost 6.8.0-android15-arm64 #1 SMP PREEMPT Sat Aug 15 2026 aarch64 Android";
        break;
      case "ls":
        out = "DCIM/  Downloads/  Documents/  Music/  app-release.apk  system.log";
        break;
      case "cat":
        out = parts[1]
          ? `Reading ${parts[1]}: [Android 15 verified runtime ready]`
          : "cat: missing file operand";
        break;
      case "date":
        out = new Date().toString();
        break;
      case "whoami":
        out = "u0_a248 (Termux Root User)";
        break;
      case "ping":
        out = "PING 8.8.8.8 (8.8.8.8): 56 data bytes\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=12.4 ms\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=11.9 ms";
        break;
      case "echo":
        out = parts.slice(1).join(" ");
        break;
      case "pkg":
        out = "Package manager: All Android core dependencies are up-to-date.";
        break;
      case "clear":
        setHistory([]);
        setInputCmd("");
        return;
      default:
        out = `termux: command not found: ${main}. Type 'help' for commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output: out }]);
    setInputCmd("");
  };

  return (
    <div className="h-full w-full bg-black text-emerald-400 font-mono flex flex-col justify-between select-none p-3 pt-10">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-emerald-900/40 text-xs">
        <div className="flex items-center space-x-1.5 text-emerald-300">
          <Terminal className="w-4 h-4" />
          <span className="font-bold">Termux Android Shell</span>
        </div>
        <button
          onClick={() => {
            sounds.playTap();
            setHistory([]);
          }}
          className="p-1 text-zinc-500 hover:text-red-400"
          title="Clear Terminal"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Output Stream */}
      <div className="flex-1 overflow-y-auto space-y-3 py-3 text-xs android-scrollbar">
        {history.map((h, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center space-x-1 text-emerald-500 font-bold">
              <span>$</span>
              <span className="text-white">{h.command}</span>
            </div>
            <div className="text-zinc-300 text-[11px] whitespace-pre-wrap pl-2 border-l border-emerald-500/20">
              {h.output}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt */}
      <form
        onSubmit={handleRunCommand}
        className="flex items-center space-x-2 pt-2 border-t border-emerald-900/40"
      >
        <span className="text-emerald-400 font-bold text-xs">$</span>
        <input
          type="text"
          placeholder="type command (help, neofetch, ls)..."
          value={inputCmd}
          onChange={(e) => setInputCmd(e.target.value)}
          className="bg-transparent border-none outline-none text-xs text-white font-mono placeholder-zinc-700 w-full"
          autoFocus
        />
        <button type="submit" className="p-1 text-emerald-400 hover:text-white">
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
