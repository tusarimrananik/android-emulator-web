"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, RotateCcw, Trophy, Gamepad2 } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

export const GamesApp: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<"menu" | "flappy" | "2048" | "snake" | "tictactoe">("menu");

  // Flappy Droid States
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [flappyScore, setFlappyScore] = useState<number>(0);
  const [flappyHighScore, setFlappyHighScore] = useState<number>(0);
  const [flappyGameOver, setFlappyGameOver] = useState<boolean>(false);
  const [flappyPlaying, setFlappyPlaying] = useState<boolean>(false);

  // 2048 States
  const [board2048, setBoard2048] = useState<number[][]>([
    [0, 2, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [score2048, setScore2048] = useState<number>(0);

  // Tic-Tac-Toe
  const [tttBoard, setTttBoard] = useState<string[]>(Array(9).fill(""));
  const [tttWinner, setTttWinner] = useState<string | null>(null);

  // Flappy game loop
  useEffect(() => {
    if (selectedGame !== "flappy" || !flappyPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let birdY = 150;
    let velocity = 0;
    const gravity = 0.35;
    const jump = -6.5;
    let pipes: { x: number; top: number; bottom: number; passed: boolean }[] = [];
    let frame = 0;
    let localScore = 0;
    let animationId: number;

    const spawnPipe = () => {
      const gap = 110;
      const top = Math.random() * (canvas.height - gap - 60) + 30;
      pipes.push({ x: canvas.width, top, bottom: canvas.height - top - gap, passed: false });
    };

    const handleJump = () => {
      velocity = jump;
      sounds.playTap();
    };

    canvas.onclick = handleJump;

    const loop = () => {
      frame++;
      velocity += gravity;
      birdY += velocity;

      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Bird (Green Android Droid)
      ctx.fillStyle = "#81C995";
      ctx.beginPath();
      ctx.arc(50, birdY, 14, 0, Math.PI * 2);
      ctx.fill();
      // Eyes
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(55, birdY - 3, 3, 0, Math.PI * 2);
      ctx.fill();

      // Spawn pipes
      if (frame % 90 === 0) spawnPipe();

      // Update & Draw Pipes
      for (let i = 0; i < pipes.length; i++) {
        const p = pipes[i];
        p.x -= 2.5;

        ctx.fillStyle = "#3b82f6";
        // Top pipe
        ctx.fillRect(p.x, 0, 42, p.top);
        // Bottom pipe
        ctx.fillRect(p.x, canvas.height - p.bottom, 42, p.bottom);

        // Check score
        if (!p.passed && p.x + 42 < 50) {
          p.passed = true;
          localScore++;
          setFlappyScore(localScore);
          sounds.playTap();
        }

        // Collision Check
        if (
          50 + 14 > p.x &&
          50 - 14 < p.x + 42 &&
          (birdY - 14 < p.top || birdY + 14 > canvas.height - p.bottom)
        ) {
          setFlappyGameOver(true);
          setFlappyPlaying(false);
          setFlappyHighScore((h) => Math.max(h, localScore));
          sounds.playNotification();
          return;
        }
      }

      // Ground or ceiling collision
      if (birdY + 14 > canvas.height || birdY - 14 < 0) {
        setFlappyGameOver(true);
        setFlappyPlaying(false);
        setFlappyHighScore((h) => Math.max(h, localScore));
        sounds.playNotification();
        return;
      }

      // Cleanup offscreen pipes
      pipes = pipes.filter((p) => p.x > -50);

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      if (canvas) canvas.onclick = null;
    };
  }, [selectedGame, flappyPlaying]);

  // Tic-Tac-Toe Logic
  const handleTttClick = (idx: number) => {
    if (tttBoard[idx] || tttWinner) return;
    sounds.playTap();

    const newBoard = [...tttBoard];
    newBoard[idx] = "X";

    // Check Player Win
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    let won = false;
    for (const [a, b, c] of lines) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setTttWinner(newBoard[a]);
        won = true;
        break;
      }
    }

    if (won) {
      setTttBoard(newBoard);
      sounds.playNotification();
      return;
    }

    // AI Move
    const emptyIndices = newBoard.map((val, i) => (val === "" ? i : null)).filter((v) => v !== null) as number[];
    if (emptyIndices.length > 0) {
      const aiChoice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      newBoard[aiChoice] = "O";

      for (const [a, b, c] of lines) {
        if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
          setTttWinner(newBoard[a]);
          break;
        }
      }
    } else if (!won) {
      setTttWinner("Draw");
    }

    setTttBoard(newBoard);
  };

  const resetTtt = () => {
    sounds.playTap();
    setTttBoard(Array(9).fill(""));
    setTttWinner(null);
  };

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none p-4 pt-10">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          {selectedGame !== "menu" && (
            <button
              onClick={() => {
                sounds.playTap();
                setSelectedGame("menu");
                setFlappyPlaying(false);
              }}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Play Games</span>
        </div>
      </div>

      {/* Main Game Selector Menu */}
      {selectedGame === "menu" && (
        <div className="flex-1 overflow-y-auto space-y-3 py-4 android-scrollbar">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-1">Featured Games</span>

          {/* Game 1: Flappy Droid */}
          <div
            onClick={() => {
              sounds.playTap();
              setSelectedGame("flappy");
              setFlappyScore(0);
              setFlappyGameOver(false);
              setFlappyPlaying(true);
            }}
            className="p-4 rounded-3xl bg-gradient-to-r from-emerald-950/60 to-zinc-900 border border-emerald-500/30 flex items-center justify-between cursor-pointer hover:scale-102 active:scale-98 transition-all shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-zinc-950 font-bold flex items-center justify-center text-xl shadow">
                🤖
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Flappy Droid</span>
                <span className="text-xs text-zinc-400">Fly past obstacles & set high scores</span>
              </div>
            </div>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>

          {/* Game 2: Tic-Tac-Toe */}
          <div
            onClick={() => {
              sounds.playTap();
              setSelectedGame("tictactoe");
              resetTtt();
            }}
            className="p-4 rounded-3xl bg-gradient-to-r from-purple-950/60 to-zinc-900 border border-purple-500/30 flex items-center justify-between cursor-pointer hover:scale-102 active:scale-98 transition-all shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white font-bold flex items-center justify-center text-xl shadow">
                ❌
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Tic-Tac-Toe</span>
                <span className="text-xs text-zinc-400">Play against Android AI</span>
              </div>
            </div>
            <span className="text-xs font-bold text-purple-400">VS AI</span>
          </div>
        </div>
      )}

      {/* Game 1 View: Flappy Droid */}
      {selectedGame === "flappy" && (
        <div className="flex-1 flex flex-col items-center justify-between py-2">
          <div className="flex justify-between w-full px-2 text-xs font-mono">
            <span className="text-emerald-400 font-bold">Score: {flappyScore}</span>
            <span className="text-amber-400 font-bold">High: {flappyHighScore}</span>
          </div>

          <div className="relative w-full max-w-[280px] h-[340px] rounded-2xl overflow-hidden border border-white/10 my-auto shadow-2xl bg-black">
            <canvas ref={canvasRef} width={280} height={340} className="w-full h-full cursor-pointer" />

            {flappyGameOver && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 space-y-3">
                <span className="text-xl font-bold text-red-400">Game Over!</span>
                <span className="text-sm font-mono text-zinc-300">Final Score: {flappyScore}</span>
                <button
                  onClick={() => {
                    setFlappyScore(0);
                    setFlappyGameOver(false);
                    setFlappyPlaying(true);
                  }}
                  className="px-5 py-2 bg-emerald-500 text-zinc-950 font-bold text-xs rounded-full shadow hover:bg-emerald-400"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>

          <span className="text-[11px] text-zinc-400">Tap screen to jump & flap!</span>
        </div>
      )}

      {/* Game 2 View: Tic-Tac-Toe */}
      {selectedGame === "tictactoe" && (
        <div className="flex-1 flex flex-col items-center justify-around py-4">
          <div className="text-xs font-semibold text-purple-400">
            {tttWinner ? (tttWinner === "Draw" ? "It's a Draw!" : `Winner: ${tttWinner}! 🎉`) : "Your Turn (X)"}
          </div>

          <div className="grid grid-cols-3 gap-2 w-64 h-64 my-auto">
            {tttBoard.map((cell, idx) => (
              <button
                key={idx}
                onClick={() => handleTttClick(idx)}
                className={`rounded-2xl border flex items-center justify-center text-3xl font-bold transition-all ${
                  cell === "X"
                    ? "bg-blue-600/30 border-blue-500 text-blue-400"
                    : cell === "O"
                    ? "bg-purple-600/30 border-purple-500 text-purple-400"
                    : "bg-zinc-900 border-white/10 hover:bg-zinc-800"
                }`}
              >
                {cell}
              </button>
            ))}
          </div>

          <button
            onClick={resetTtt}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-xs font-bold flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Board</span>
          </button>
        </div>
      )}
    </div>
  );
};
