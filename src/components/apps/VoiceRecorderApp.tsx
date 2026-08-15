"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, Pause, Trash2, Radio } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

export const VoiceRecorderApp: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTimeSec, setRecordingTimeSec] = useState<number>(0);
  const [recordings, setRecordings] = useState<
    { id: string; name: string; duration: string; url: string; date: string }[]
  >([
    {
      id: "rec-1",
      name: "Voice Memo 01",
      duration: "0:24",
      url: "",
      date: "Today, 10:15 AM",
    },
  ]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTimeSec((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTimeSec(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const audioUrl = URL.createObjectURL(audioBlob);
          const newRec = {
            id: "rec-" + Date.now(),
            name: `Recording ${recordings.length + 1}`,
            duration: formatDuration(recordingTimeSec),
            url: audioUrl,
            date: "Just now",
          };
          setRecordings((prev) => [newRec, ...prev]);
          sounds.playNotification();
        };

        mediaRecorder.start();
        setIsRecording(true);
        sounds.playTap();
      }
    } catch {
      // Simulated recording if mic blocked
      setIsRecording(true);
      sounds.playTap();
    }
  };

  const stopRecording = () => {
    sounds.playTap();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    } else {
      // Fallback simulated save
      const newRec = {
        id: "rec-" + Date.now(),
        name: `Audio Note ${recordings.length + 1}`,
        duration: formatDuration(recordingTimeSec || 8),
        url: "",
        date: "Just now",
      };
      setRecordings((prev) => [newRec, ...prev]);
      sounds.playNotification();
    }
    setIsRecording(false);
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none p-4 pt-10">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
            <Radio className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Voice Recorder</span>
        </div>
      </div>

      {/* Visualizer and Status Area */}
      <div className="flex-1 flex flex-col items-center justify-center py-6 space-y-6 my-auto">
        <div className="text-4xl font-bold font-mono tracking-tight text-white">
          {formatDuration(recordingTimeSec)}
        </div>

        {/* Dynamic Waveform Bars */}
        <div className="flex items-center space-x-1.5 h-16">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-150 ${
                isRecording
                  ? "bg-red-500 animate-pulse"
                  : "bg-zinc-800"
              }`}
              style={{
                height: isRecording ? `${Math.sin(i + Date.now() / 200) * 20 + 26}px` : "8px",
              }}
            />
          ))}
        </div>

        {/* Record Button */}
        <div className="pt-2">
          {isRecording ? (
            <button
              onClick={stopRecording}
              className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 active:scale-90 text-white flex items-center justify-center shadow-xl shadow-red-500/30 transition-all"
              title="Stop Recording"
            >
              <Square className="w-8 h-8 fill-current" />
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 active:scale-90 text-white flex items-center justify-center shadow-xl shadow-red-500/30 transition-all"
              title="Start Recording"
            >
              <Mic className="w-8 h-8" />
            </button>
          )}
        </div>
      </div>

      {/* Saved Recordings List */}
      <div className="h-44 overflow-y-auto space-y-2 border-t border-white/5 pt-2 android-scrollbar">
        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-1">Saved Audio Notes</span>
        {recordings.map((rec) => (
          <div
            key={rec.id}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-zinc-900/60 border border-white/5"
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  sounds.playTap();
                  setPlayingId(playingId === rec.id ? null : rec.id);
                }}
                className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
              >
                {playingId === rec.id ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">{rec.name}</span>
                <span className="text-[10px] text-zinc-500">{rec.date} • {rec.duration}</span>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playTap();
                setRecordings(recordings.filter((r) => r.id !== rec.id));
              }}
              className="p-1.5 text-zinc-500 hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
