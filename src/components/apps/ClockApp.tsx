"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlarmClock, Timer, Play, Pause, RotateCcw, Plus, Check } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

export const ClockApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"clock" | "alarm" | "stopwatch" | "timer">("clock");
  const [time, setTime] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");

  // Stopwatch state
  const [stopwatchRunning, setStopwatchRunning] = useState<boolean>(false);
  const [stopwatchMs, setStopwatchMs] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);

  // Timer state
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(300); // 5 mins default
  const [timerInitial, setTimerInitial] = useState<number>(300);

  // Alarms
  const [alarms, setAlarms] = useState([
    { id: "a1", time: "07:00 AM", label: "Morning RUET Class", active: true, days: "Mon, Tue, Wed, Thu" },
    { id: "a2", time: "08:30 PM", label: "EditGen Code Review", active: true, days: "Everyday" },
    { id: "a3", time: "11:30 PM", label: "Sleep Reminder", active: false, days: "Weekdays" },
  ]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }));
      setSeconds(now.getSeconds().toString().padStart(2, "0"));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Stopwatch timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchMs((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            sounds.playNotification();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatStopwatch = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const hundredths = Math.floor((ms % 1000) / 10);
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${hundredths
      .toString()
      .padStart(2, "0")}`;
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="p-4 pt-10 border-b border-white/5 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight text-indigo-400 capitalize">{activeTab}</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 android-scrollbar">
        {/* Tab 1: Clock */}
        {activeTab === "clock" && (
          <div className="flex flex-col items-center space-y-6 py-4">
            {/* Big Main Digital Clock */}
            <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-900/60 border border-white/5 w-full shadow-lg">
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-bold font-android-clock tracking-tight text-white">
                  {time.split(" ")[0]}
                </span>
                <span className="text-xl font-bold text-indigo-400">{time.split(" ")[1]}</span>
              </div>
              <span className="text-xs text-zinc-400 mt-2 font-medium">Dhaka, Bangladesh (GMT+6)</span>
            </div>

            {/* World Clock List */}
            <div className="w-full space-y-2">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-2">World Clock</span>
              {[
                { city: "Tokyo, Japan", diff: "+3 hrs", time: "03:45 PM" },
                { city: "London, UK", diff: "-5 hrs", time: "07:45 AM" },
                { city: "New York, USA", diff: "-10 hrs", time: "02:45 AM" },
              ].map((wc, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{wc.city}</span>
                    <span className="text-[10px] text-zinc-400">{wc.diff}</span>
                  </div>
                  <span className="text-sm font-bold font-mono text-zinc-200">{wc.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Alarm */}
        {activeTab === "alarm" && (
          <div className="space-y-3 py-2">
            {alarms.map((alarm) => (
              <div
                key={alarm.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/70 border border-white/5 shadow"
              >
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-android-clock text-white">{alarm.time}</span>
                  <span className="text-xs text-indigo-300 font-medium">{alarm.label}</span>
                  <span className="text-[10px] text-zinc-500">{alarm.days}</span>
                </div>
                <input
                  type="checkbox"
                  checked={alarm.active}
                  onChange={(e) => {
                    sounds.playTap();
                    setAlarms(
                      alarms.map((a) => (a.id === alarm.id ? { ...a, active: e.target.checked } : a))
                    );
                  }}
                  className="w-5 h-5 accent-indigo-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Stopwatch */}
        {activeTab === "stopwatch" && (
          <div className="flex flex-col items-center justify-between h-full py-6 space-y-6">
            <div className="flex flex-col items-center justify-center p-8 rounded-full border-4 border-indigo-500/30 w-64 h-64 bg-zinc-900/40 shadow-2xl">
              <span className="text-4xl font-bold font-mono text-white tracking-tight">
                {formatStopwatch(stopwatchMs)}
              </span>
            </div>

            {/* Stopwatch Controls */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => {
                  sounds.playTap();
                  if (stopwatchRunning) {
                    setLaps((prev) => [stopwatchMs, ...prev]);
                  } else {
                    setStopwatchMs(0);
                    setLaps([]);
                  }
                }}
                className="w-14 h-14 rounded-full bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs font-semibold text-zinc-300 flex items-center justify-center"
              >
                {stopwatchRunning ? "Lap" : "Reset"}
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setStopwatchRunning(!stopwatchRunning);
                }}
                className="w-18 h-18 p-4 rounded-full bg-indigo-500 hover:bg-indigo-400 active:scale-90 text-zinc-950 flex items-center justify-center shadow-lg shadow-indigo-500/30"
              >
                {stopwatchRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </button>
            </div>

            {/* Laps List */}
            {laps.length > 0 && (
              <div className="w-full max-w-xs max-h-36 overflow-y-auto android-scrollbar space-y-1 text-xs">
                {laps.map((lap, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-white/5 text-zinc-400">
                    <span>Lap {laps.length - i}</span>
                    <span className="font-mono font-bold text-white">{formatStopwatch(lap)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Timer */}
        {activeTab === "timer" && (
          <div className="flex flex-col items-center justify-between h-full py-6 space-y-6">
            <div className="flex flex-col items-center justify-center p-8 rounded-full border-4 border-indigo-500/40 w-64 h-64 bg-zinc-900/40 shadow-2xl">
              <span className="text-5xl font-bold font-mono text-white tracking-tight">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => {
                  sounds.playTap();
                  setTimerRunning(false);
                  setTimerSeconds(timerInitial);
                }}
                className="w-14 h-14 rounded-full bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs font-semibold text-zinc-300 flex items-center justify-center"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setTimerRunning(!timerRunning);
                }}
                className="w-18 h-18 p-4 rounded-full bg-indigo-500 hover:bg-indigo-400 active:scale-90 text-zinc-950 flex items-center justify-center shadow-lg shadow-indigo-500/30"
              >
                {timerRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tabs */}
      <div className="h-14 border-t border-white/10 bg-zinc-900/80 flex items-center justify-around px-4">
        {[
          { id: "clock", label: "Clock", icon: Clock },
          { id: "alarm", label: "Alarm", icon: AlarmClock },
          { id: "stopwatch", label: "Stopwatch", icon: Timer },
          { id: "timer", label: "Timer", icon: RotateCcw },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playTap();
                setActiveTab(tab.id as any);
              }}
              className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-xl transition-all ${
                activeTab === tab.id ? "text-indigo-400 font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
