"use client";

import React from "react";

// Official Google Material Symbol: Wi-Fi / Internet
export const AndroidWifiIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4z" />
  </svg>
);

// Official Google Material Symbol: Bluetooth
export const AndroidBluetoothIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
  </svg>
);

// Official Google Material Symbol: Flashlight (flashlight_on)
export const AndroidFlashlightIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M6 2h12v3l-4 4v11c0 1.1-.9 2-2 2s-2-.9-2-2V9L6 5V2zm2 2v1.38l3.41 3.41.59.59.59-.59L16 5.38V4H8zm3 9h2v7h-2v-7z" />
  </svg>
);

// Official Google Material Symbol: Dark Theme (contrast half circle)
export const AndroidDarkThemeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14v12c3.31 0 6-2.69 6-6s-2.69-6-6-6z" />
  </svg>
);

// Official Google Material Symbol: Do Not Disturb (circle with minus bar)
export const AndroidDndIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
  </svg>
);

// Official Google Material Symbol: Auto-Rotate (screen_rotation)
export const AndroidAutoRotateIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-12.96 0L2.19 3.84 6 7.66l.03-.66C6.03 3.22 10.84-1.22 17.1-1.22l.66.03-3.81 3.81-1.33-1.32c-3.27 1.55-5.61 4.72-5.97 8.48H5.15C5.51 7.24 7.85 4.07 11.12 2.52zM1.55 13c-.36 3.76 1.98 6.93 5.25 8.48l1.33-1.32-3.81-3.81-.66.03c6.26 0 11.07-4.44 11.07-10.66l-.03-.66-3.81 3.81 1.33 1.32c-3.27-1.55-5.61-4.72-5.97-8.48h-1.5zM22.45 11c.36-3.76-1.98-6.93-5.25-8.48l-1.33 1.32 3.81 3.81.66-.03c-6.26 0-11.07 4.44-11.07 10.66l.03.66 3.81-3.81-1.33-1.32c3.27 1.55 5.61 4.72 5.97 8.48h1.5z" />
    <path d="M7.52 21.48C4.25 19.93 1.91 16.76 1.55 13H.05C.51 19.16 5.66 24 11.95 24l.66-.03-3.81-3.81-1.28 1.32zM16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.49 4.84 18.34 0 12.05 0l-.66.03 3.81 3.81 1.28-1.32z" />
  </svg>
);

// Official Google Material Symbol: Battery Saver (battery with plus symbol)
export const AndroidBatterySaverIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M16 4h-1V2h-6v2H8c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 16H9V6h6v14zm-4-3h2v-3h3v-2h-3V9h-2v3H8v2h3v3z" />
  </svg>
);

// Official Google Material Symbol: Airplane Mode (flight)
export const AndroidAirplaneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

// Official Google Material Symbol: Sun / Brightness Slider Icon (brightness_6)
export const AndroidSunBrightnessIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
  </svg>
);

// Official Google Material Symbol: Settings Cog (settings)
export const AndroidSettingsCogIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

// Official Google Material Symbol: Lock (lock)
export const AndroidLockIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

// Official Google Material Symbol: Fingerprint (fingerprint)
export const AndroidFingerprintIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.9 4.04 14.1 4.04 17.16 5.66c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4 0-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.4.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.16-.37.16zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.72 2.54.72.24 0 .64-.04 1.14-.13.27-.05.53.13.58.4.05.27-.13.53-.4.58-.65.12-1.14.15-1.42.15zm-1.87-3.95c-.06 0-.13-.01-.19-.04-.25-.11-.36-.4-.25-.65.73-1.63 1.1-2.94 1.1-3.89 0-1.08-.34-2.05-1.01-2.88-.89-1.1-2.28-1.74-3.71-1.74-1.43 0-2.82.64-3.71 1.74-.67.83-1.01 1.8-1.01 2.88 0 .86.29 2.01.87 3.42.11.26-.01.55-.26.66-.26.11-.55-.01-.66-.26-.65-1.57-.97-2.88-.97-3.82 0-1.34.42-2.55 1.25-3.58 1.11-1.37 2.83-2.17 4.6-2.17s3.49.8 4.6 2.17c.83 1.03 1.25 2.24 1.25 3.58 0 1.12-.41 2.58-1.22 4.39-.08.15-.22.23-.38.23z" />
  </svg>
);

// Official Google Material Symbol: Camera Shutter Outline
export const AndroidCameraOutlineIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0-4.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z" />
    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm11 16H4V6h4.05l1.83-2h4.24l1.83 2H20v12z" />
  </svg>
);
