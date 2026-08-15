"use client";

import React, { useState } from "react";
import { History, Delete, ChevronDown, ChevronUp } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [equation, setEquation] = useState<string>("");
  const [history, setHistory] = useState<{ eq: string; res: string }[]>([]);
  const [showScientific, setShowScientific] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handleNum = (num: string) => {
    sounds.playTap();
    if (display === "0" || display === "Error") {
      setDisplay(num);
    } else {
      setDisplay((prev) => prev + num);
    }
  };

  const handleOp = (op: string) => {
    sounds.playTap();
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const handleClear = () => {
    sounds.playTap();
    setDisplay("0");
    setEquation("");
  };

  const handleDelete = () => {
    sounds.playTap();
    if (display.length > 1) {
      setDisplay((prev) => prev.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const handleEqual = () => {
    sounds.playTap();
    try {
      const fullEq = equation + display;
      const sanitized = fullEq
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E");

      // eslint-disable-next-line no-eval
      const result = String(eval(sanitized));
      setHistory((prev) => [{ eq: fullEq, res: result }, ...prev]);
      setDisplay(result);
      setEquation("");
    } catch {
      setDisplay("Error");
    }
  };

  const handleScientific = (fn: string) => {
    sounds.playTap();
    const val = parseFloat(display);
    if (isNaN(val)) return;

    let res = 0;
    switch (fn) {
      case "sin":
        res = Math.sin((val * Math.PI) / 180);
        break;
      case "cos":
        res = Math.cos((val * Math.PI) / 180);
        break;
      case "tan":
        res = Math.tan((val * Math.PI) / 180);
        break;
      case "sqrt":
        res = Math.sqrt(val);
        break;
      case "log":
        res = Math.log10(val);
        break;
      case "ln":
        res = Math.log(val);
        break;
      case "sqr":
        res = val * val;
        break;
    }
    setDisplay(String(res));
  };

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none p-4 pt-10">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-bold text-teal-400">Calculator</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sounds.playTap();
              setShowScientific(!showScientific);
            }}
            className="p-1.5 rounded-full bg-zinc-900 text-zinc-300 hover:text-white"
            title="Toggle Scientific"
          >
            {showScientific ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              sounds.playTap();
              setShowHistory(!showHistory);
            }}
            className="p-1.5 rounded-full bg-zinc-900 text-zinc-300 hover:text-white"
            title="History"
          >
            <History className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* History Drawer */}
      {showHistory ? (
        <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-zinc-900/80 rounded-2xl border border-white/5 android-scrollbar my-2">
          <div className="flex justify-between items-center px-2 py-1 text-xs text-zinc-400 font-semibold border-b border-white/5">
            <span>Calculation History</span>
            <button onClick={() => setHistory([])} className="text-red-400 hover:underline">
              Clear
            </button>
          </div>
          {history.length === 0 ? (
            <div className="text-center py-10 text-xs text-zinc-500">No history yet</div>
          ) : (
            history.map((h, i) => (
              <div
                key={i}
                onClick={() => {
                  setDisplay(h.res);
                  setShowHistory(false);
                }}
                className="p-2 rounded-xl hover:bg-zinc-800 cursor-pointer flex flex-col text-right"
              >
                <span className="text-xs text-zinc-400">{h.eq}</span>
                <span className="text-sm font-bold text-teal-400">= {h.res}</span>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Display Area */
        <div className="flex-1 flex flex-col items-end justify-end pb-4 px-2 space-y-1">
          <span className="text-xs text-zinc-400 font-mono tracking-wider h-4">{equation}</span>
          <span className="text-4xl font-bold font-mono tracking-tight text-white truncate max-w-full">
            {display}
          </span>
        </div>
      )}

      {/* Scientific Row if open */}
      {showScientific && (
        <div className="grid grid-cols-4 gap-2 mb-2">
          {["sin", "cos", "tan", "sqrt", "log", "ln", "sqr", "π"].map((fn) => (
            <button
              key={fn}
              onClick={() => (fn === "π" ? handleNum(String(Math.PI)) : handleScientific(fn))}
              className="py-2 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-teal-400 border border-white/5 active:scale-95 transition-all"
            >
              {fn}
            </button>
          ))}
        </div>
      )}

      {/* Main Buttons Grid */}
      <div className="grid grid-cols-4 gap-2.5 pb-2">
        {/* Row 1 */}
        <button onClick={handleClear} className="h-14 rounded-2xl bg-rose-500/20 text-rose-300 font-bold hover:bg-rose-500/30 active:scale-95 transition-all shadow">
          AC
        </button>
        <button onClick={handleDelete} className="h-14 rounded-2xl bg-zinc-900 text-zinc-300 font-bold hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center shadow">
          <Delete className="w-5 h-5" />
        </button>
        <button onClick={() => handleOp("%")} className="h-14 rounded-2xl bg-zinc-900 text-teal-400 font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          %
        </button>
        <button onClick={() => handleOp("÷")} className="h-14 rounded-2xl bg-teal-500/20 text-teal-300 text-xl font-bold hover:bg-teal-500/30 active:scale-95 transition-all shadow">
          ÷
        </button>

        {/* Row 2 */}
        <button onClick={() => handleNum("7")} className="h-14 rounded-2xl bg-zinc-900 text-white text-lg font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          7
        </button>
        <button onClick={() => handleNum("8")} className="h-14 rounded-2xl bg-zinc-900 text-white text-lg font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          8
        </button>
        <button onClick={() => handleNum("9")} className="h-14 rounded-2xl bg-zinc-900 text-white text-lg font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          9
        </button>
        <button onClick={() => handleOp("×")} className="h-14 rounded-2xl bg-teal-500/20 text-teal-300 text-xl font-bold hover:bg-teal-500/30 active:scale-95 transition-all shadow">
          ×
        </button>

        {/* Row 3 */}
        <button onClick={() => handleNum("4")} className="h-14 rounded-2xl bg-zinc-900 text-white text-lg font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          4
        </button>
        <button onClick={() => handleNum("5")} className="h-14 rounded-2xl bg-zinc-900 text-white text-lg font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          5
        </button>
        <button onClick={() => handleNum("6")} className="h-14 rounded-2xl bg-zinc-900 text-white text-lg font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          6
        </button>
        <button onClick={() => handleOp("−")} className="h-14 rounded-2xl bg-teal-500/20 text-teal-300 text-xl font-bold hover:bg-teal-500/30 active:scale-95 transition-all shadow">
          −
        </button>

        {/* Row 4 */}
        <button onClick={() => handleNum("1")} className="h-14 rounded-2xl bg-zinc-900 text-white text-lg font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          1
        </button>
        <button onClick={() => handleNum("2")} className="h-14 rounded-2xl bg-zinc-900 text-white text-lg font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          2
        </button>
        <button onClick={() => handleNum("3")} className="h-14 rounded-2xl bg-zinc-900 text-white text-lg font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          3
        </button>
        <button onClick={() => handleOp("+")} className="h-14 rounded-2xl bg-teal-500/20 text-teal-300 text-xl font-bold hover:bg-teal-500/30 active:scale-95 transition-all shadow">
          +
        </button>

        {/* Row 5 */}
        <button onClick={() => handleNum("0")} className="h-14 col-span-2 rounded-2xl bg-zinc-900 text-white text-lg font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          0
        </button>
        <button onClick={() => handleNum(".")} className="h-14 rounded-2xl bg-zinc-900 text-white text-lg font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow">
          .
        </button>
        <button onClick={handleEqual} className="h-14 rounded-2xl bg-teal-500 text-zinc-950 text-2xl font-bold hover:bg-teal-400 active:scale-95 transition-all shadow-lg shadow-teal-500/30">
          =
        </button>
      </div>
    </div>
  );
};
