"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  RotateCcw,
  Zap,
  ZapOff,
  Image as ImageIcon,
  Sliders,
  Video,
} from "lucide-react";
import { sounds } from "@/utils/soundEffects";

interface CameraAppProps {
  onPhotoTaken: (photoUrl: string) => void;
  onOpenGallery: () => void;
  latestPhotoUrl?: string;
}

export const CameraApp: React.FC<CameraAppProps> = ({
  onPhotoTaken,
  onOpenGallery,
  latestPhotoUrl,
}) => {
  const [cameraMode, setCameraMode] = useState<"photo" | "video">("photo");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [flashEnabled, setFlashEnabled] = useState<boolean>(false);
  const [flashActive, setFlashActive] = useState<boolean>(false);
  const [streamActive, setStreamActive] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let activeStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setErrorMsg("Camera API not supported in this browser");
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });

        activeStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
        setStreamActive(true);
        setErrorMsg("");
      } catch (err: any) {
        console.warn("Webcam access error:", err);
        setErrorMsg("Camera permission not granted or device not available. Click to take virtual simulated photo.");
        setStreamActive(false);
      }
    };

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const capturePhoto = () => {
    sounds.playShutter();

    if (flashEnabled) {
      setFlashActive(true);
      setTimeout(() => setFlashActive(false), 200);
    }

    if (streamActive && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        onPhotoTaken(dataUrl);
        return;
      }
    }

    // Fallback simulated capture if webcam isn't present
    const simulatedWallpapers = [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop",
    ];
    const randomImg = simulatedWallpapers[Math.floor(Math.random() * simulatedWallpapers.length)];
    onPhotoTaken(randomImg);
  };

  const flipCamera = () => {
    sounds.playTap();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  return (
    <div className="h-full w-full bg-black text-white flex flex-col justify-between select-none relative overflow-hidden">
      {/* Hidden canvas for capturing video frame */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera Flash Overlay */}
      {flashActive && <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-200" />}

      {/* Top Camera Controls */}
      <div className="p-4 pt-10 flex items-center justify-between z-20 bg-gradient-to-b from-black/70 to-transparent">
        <button
          onClick={() => {
            sounds.playTap();
            setFlashEnabled(!flashEnabled);
          }}
          className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60"
        >
          {flashEnabled ? <Zap className="w-5 h-5 text-amber-400 fill-amber-400" /> : <ZapOff className="w-5 h-5" />}
        </button>

        <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-semibold text-white/90">
          Android 15 Pixel Camera
        </div>

        <button
          onClick={() => sounds.playTap()}
          className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60"
        >
          <Sliders className="w-5 h-5" />
        </button>
      </div>

      {/* Camera Viewport */}
      <div className="flex-1 relative flex items-center justify-center bg-zinc-950 overflow-hidden">
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className={`w-full h-full object-cover ${facingMode === "user" ? "-scale-x-100" : ""}`}
        />

        {/* Fallback Viewport Overlay when webcam not granted */}
        {!streamActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-zinc-900 via-zinc-950 to-zinc-900">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
              <Camera className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
            <span className="text-sm font-bold text-white mb-1">Pixel HDR+ Camera Viewfinder</span>
            <span className="text-xs text-zinc-400 max-w-xs">{errorMsg}</span>
          </div>
        )}

        {/* Viewfinder crosshairs */}
        <div className="absolute w-36 h-36 border border-white/20 rounded-2xl pointer-events-none flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-amber-400/80" />
        </div>
      </div>

      {/* Bottom Camera Controls & Shutter */}
      <div className="p-6 pb-10 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-20 flex flex-col items-center space-y-4">
        {/* Mode Selector */}
        <div className="flex items-center space-x-6 text-xs font-semibold">
          <button
            onClick={() => {
              sounds.playTap();
              setCameraMode("photo");
            }}
            className={`${cameraMode === "photo" ? "text-amber-400 font-bold border-b-2 border-amber-400 pb-0.5" : "text-zinc-400 hover:text-white"}`}
          >
            PHOTO
          </button>
          <button
            onClick={() => {
              sounds.playTap();
              setCameraMode("video");
            }}
            className={`${cameraMode === "video" ? "text-amber-400 font-bold border-b-2 border-amber-400 pb-0.5" : "text-zinc-400 hover:text-white"}`}
          >
            VIDEO
          </button>
          <span className="text-zinc-500">PORTRAIT</span>
          <span className="text-zinc-500">NIGHT</span>
        </div>

        {/* Shutter Bar */}
        <div className="w-full flex items-center justify-around px-4">
          {/* Gallery Thumbnail Preview */}
          <button
            onClick={() => {
              sounds.playTap();
              onOpenGallery();
            }}
            className="w-12 h-12 rounded-2xl bg-zinc-800 border-2 border-white/30 overflow-hidden flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-all"
            title="Open Gallery"
          >
            {latestPhotoUrl ? (
              <img src={latestPhotoUrl} alt="Thumbnail" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-6 h-6 text-zinc-400" />
            )}
          </button>

          {/* Shutter Button */}
          <button
            onClick={capturePhoto}
            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1.5 active:scale-90 transition-transform shadow-2xl"
            title="Take Photo"
          >
            <div
              className={`w-full h-full rounded-full transition-all ${
                cameraMode === "video" ? "bg-red-600 rounded-2xl" : "bg-white hover:bg-zinc-200"
              }`}
            />
          </button>

          {/* Flip Camera Button */}
          <button
            onClick={flipCamera}
            className="w-12 h-12 rounded-2xl bg-zinc-800/80 hover:bg-zinc-700 active:scale-90 border border-white/10 flex items-center justify-center text-white transition-all shadow"
            title="Flip Camera"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
