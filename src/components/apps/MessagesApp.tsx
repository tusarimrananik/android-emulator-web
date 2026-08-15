"use client";

import React, { useState } from "react";
import {
  Search,
  Send,
  ArrowLeft,
  MoreVertical,
  Plus,
  Smile,
  Bot,
  MessageSquarePlus,
} from "lucide-react";
import { MessageThread } from "@/types/android";
import { sounds } from "@/utils/soundEffects";

interface MessagesAppProps {
  threads: MessageThread[];
  onSendMessage: (threadId: string, text: string) => void;
}

export const MessagesApp: React.FC<MessagesAppProps> = ({
  threads,
  onSendMessage,
}) => {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const activeThread = threads.find((t) => t.id === activeThreadId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThreadId) return;

    sounds.playTap();
    onSendMessage(activeThreadId, inputText.trim());
    setInputText("");
  };

  const smartReplies = ["Sounds great! 👍", "I'm on it.", "Talk to you soon!", "Running on Android 15! 🚀"];

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none">
      {/* If Inside a Thread */}
      {activeThread ? (
        <div className="h-full flex flex-col justify-between">
          {/* Thread Header (Pixel Style) */}
          <div className="p-3 pt-8 border-b border-white/10 bg-zinc-900/90 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  sounds.playTap();
                  setActiveThreadId(null);
                }}
                className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div
                className={`w-9 h-9 rounded-full ${activeThread.avatarColor} flex items-center justify-center font-bold text-sm shadow`}
              >
                {activeThread.contactName.includes("AI") ? <Bot className="w-5 h-5" /> : activeThread.contactName[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">
                  {activeThread.contactName}
                </span>
                <span className="text-[10px] text-blue-400 font-medium flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span>RCS Chat • End-to-end encrypted</span>
                </span>
              </div>
            </div>

            <button className="p-2 text-zinc-400 hover:text-white">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 android-scrollbar">
            {activeThread.messages.map((msg) => {
              const isMe = msg.sender === "me";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-3xl text-xs shadow-md leading-relaxed ${
                      isMe
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-zinc-800 text-zinc-100 rounded-bl-sm border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-1 px-1">{msg.time}</span>
                </div>
              );
            })}
          </div>

          {/* Smart Replies Suggestions */}
          <div className="px-3 py-1.5 flex items-center space-x-2 overflow-x-auto no-scrollbar border-t border-white/5 bg-zinc-900/50">
            {smartReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => {
                  sounds.playTap();
                  if (activeThreadId) {
                    onSendMessage(activeThreadId, reply);
                  }
                }}
                className="px-3 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-[11px] text-zinc-300 whitespace-nowrap border border-white/10 active:scale-95 transition-all"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-zinc-900 border-t border-white/10 flex items-center space-x-2"
          >
            <div className="flex-1 bg-zinc-800 rounded-full px-3.5 py-2 flex items-center space-x-2 border border-white/10 focus-within:border-blue-500">
              <button type="button" className="text-zinc-400 hover:text-white">
                <Smile className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="RCS message"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-full"
              />
            </div>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 active:scale-90 text-white transition-all shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Conversations List (Official Google Messages Style) */
        <div className="h-full flex flex-col justify-between relative">
          {/* Top Search Bar */}
          <div className="p-3 pt-8 border-b border-white/5 space-y-2 bg-zinc-950">
            <div className="flex items-center space-x-2 bg-zinc-900 rounded-full px-4 py-2.5 border border-white/10 shadow-sm">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search conversations"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-full font-medium"
              />
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                A
              </div>
            </div>
          </div>

          {/* Threads List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 android-scrollbar">
            {threads
              .filter(
                (t) =>
                  t.contactName.toLowerCase().includes(search.toLowerCase()) ||
                  t.messages.some((m) => m.text.toLowerCase().includes(search.toLowerCase()))
              )
              .map((thread) => {
                const lastMsg = thread.messages[thread.messages.length - 1];
                return (
                  <div
                    key={thread.id}
                    onClick={() => {
                      sounds.playTap();
                      setActiveThreadId(thread.id);
                    }}
                    className="flex items-center space-x-3 p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-850 cursor-pointer border border-white/5 transition-all group"
                  >
                    <div
                      className={`w-11 h-11 rounded-full ${thread.avatarColor} flex items-center justify-center font-bold text-sm text-white shadow shrink-0`}
                    >
                      {thread.contactName.includes("AI") ? <Bot className="w-6 h-6" /> : thread.contactName[0]}
                    </div>

                    <div className="flex-1 truncate">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                          {thread.contactName}
                        </span>
                        <span className="text-[10px] text-zinc-500">{thread.lastMessageTime}</span>
                      </div>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        {lastMsg ? lastMsg.text : "No messages yet"}
                      </p>
                    </div>

                    {thread.unreadCount > 0 && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 text-zinc-950 font-bold text-[10px] flex items-center justify-center shrink-0 shadow">
                        {thread.unreadCount}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Floating Action Button (FAB): "Start chat" */}
          <div className="absolute right-4 bottom-4">
            <button
              onClick={() => {
                sounds.playTap();
                if (threads[0]) setActiveThreadId(threads[0].id);
              }}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-bold text-xs flex items-center space-x-2 shadow-2xl active:scale-95 transition-all"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Start chat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
