"use client";

import React from "react";

// Official Google 'G' Logo (4-color)
export const GoogleLogoIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <path
      fill="#4285F4"
      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
    />
    <path
      fill="#34A853"
      d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.3 6.3 14.7z"
    />
    <path
      fill="#FBBC05"
      d="M24 46c5.4 0 10.3-1.9 14.1-5.2l-6.5-5.3c-2.1 1.4-4.7 2.3-7.6 2.3-6.1 0-10.7-3.1-11.8-8.5L5.6 34.1C9 41.3 15.9 46 24 46z"
    />
    <path
      fill="#EA4335"
      d="M44.5 20H24v8.5h11.8c-1 3-3.1 5.5-5.8 7.2l6.5 5.3c3.8-3.5 6.5-8.8 6.5-17 0-1.3-.2-2.7-.5-4z"
    />
  </svg>
);

// Google Voice Search Colored Mic
export const GoogleMicIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#4285F4" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
    <path fill="#34A853" d="M11 18.92V22h2v-3.08c3.39-.49 6-3.4 6-6.92h-2c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.52 2.61 6.43 6 6.92z" />
    <path fill="#FBBC05" d="M7 11H5c0 1.93.78 3.68 2.05 4.95l1.41-1.41C7.56 13.63 7 12.38 7 11z" />
    <path fill="#EA4335" d="M19 11h-2c0 1.38-.56 2.63-1.46 3.54l1.41 1.41C18.22 14.68 19 12.93 19 11z" />
  </svg>
);

// Google Lens Icon
export const GoogleLensIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#4285F4" d="M6 3h4V1H6c-2.76 0-5 2.24-5 5v4h2V6c0-1.66 1.34-3 3-3z" />
    <path fill="#EA4335" d="M18 1h-4v2h4c1.66 0 3 1.34 3 3v4h2V6c0-2.76-2.24-5-5-5z" />
    <path fill="#34A853" d="M18 21h-4v2h4c2.76 0 5-2.24 5-5v-4h-2v4c0 1.66-1.34 3-3 3z" />
    <path fill="#FBBC05" d="M6 23h4v-2H6c-1.66 0-3-1.34-3-3v-4H1v4c0 2.76 2.24 5 5 5z" />
    <circle cx="12" cy="12" r="4" fill="#4285F4" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="#34A853" />
  </svg>
);

// Google Chrome Icon
export const ChromeIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <circle cx="96" cy="96" r="92" fill="#fff" />
    <path
      d="M165.6 136.2A80 80 0 0 0 96 16c-30.8 0-57.8 17.4-71.6 43l34.8 60.3L96 96h69.6z"
      fill="#EA4335"
    />
    <path
      d="M24.4 59A80 80 0 0 0 96 176c25.4 0 48.3-11.8 63.3-30.2L124.5 85.5 96 96 24.4 59z"
      fill="#34A853"
    />
    <path
      d="M96 176a80 80 0 0 0 69.6-39.8H96L59.2 119.3 24.4 59A80 80 0 0 0 96 176z"
      fill="#FBBC05"
    />
    <circle cx="96" cy="96" r="40" fill="#fff" />
    <circle cx="96" cy="96" r="32" fill="#4285F4" />
  </svg>
);

// Google Play Store Icon
export const PlayStoreIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className}>
    <path
      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 59.9.001.2z"
      fill="#00E676"
    />
    <path
      d="M47 0C34 7.5 25.1 21.3 25.1 38v436c0 16.7 8.9 30.5 21.9 38l240.2-237.7L47 0z"
      fill="#00B0FF"
    />
    <path
      d="M471.1 214.2l-85.7-49.7-60.1 59.9 60.1 60.1 85.8-49.8c15.1-8.7 20.3-27.9 11.6-43-.3-.6-.7-1.1-1.1-1.6l-10.6-15.9z"
      fill="#FFD600"
    />
    <path
      d="M104.6 499l280.9-161.3-60.2-60.1L104.6 499z"
      fill="#FF3D00"
    />
  </svg>
);

// Google Photos Icon (4-petal multicolored pinwheel)
export const GooglePhotosIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#fff" />
    {/* Yellow petal */}
    <path d="M96 96V44a26 26 0 1 1 52 0v52H96z" fill="#FBBC04" />
    {/* Red petal */}
    <path d="M96 96h52a26 26 0 1 1 0 52H96V96z" fill="#EA4335" />
    {/* Blue petal */}
    <path d="M96 96v52a26 26 0 1 1-52 0V96h52z" fill="#4285F4" />
    {/* Green petal */}
    <path d="M96 96H44a26 26 0 1 1 0-52h52v52z" fill="#34A853" />
  </svg>
);

// Google Phone Icon (Material Green/Teal)
export const AndroidPhoneIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#2E7D32" />
    <path
      fill="#fff"
      d="M141.2 121.6c-5.8-1.7-12-1.7-17.8 0l-7.4 7.4c-14.8-7.8-26.6-19.6-34.4-34.4l7.4-7.4c1.7-5.8 1.7-12 0-17.8l-12.8-31c-3.1-7.5-11.4-11.8-19.4-10-18.4 4.2-32.8 18.6-37 37-3.6 15.6-.2 32 9.5 45.4 16.5 23 37.9 44.4 60.9 60.9 13.4 9.7 29.8 13.1 45.4 9.5 18.4-4.2 32.8-18.6 37-37 1.8-8-2.5-16.3-10-19.4l-31-12.8.2.2z"
    />
  </svg>
);

// Google Messages Icon (Material Blue RCS)
export const AndroidMessagesIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#1A73E8" />
    <path
      fill="#fff"
      d="M48 48h96c8.8 0 16 7.2 16 16v56c0 8.8-7.2 16-16 16H80l-32 24V64c0-8.8 7.2-16 16-16z"
    />
    <circle cx="74" cy="92" r="7" fill="#1A73E8" />
    <circle cx="96" cy="92" r="7" fill="#1A73E8" />
    <circle cx="118" cy="92" r="7" fill="#1A73E8" />
  </svg>
);

// Google Camera Icon
export const AndroidCameraIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#202124" />
    <path
      fill="#5F6368"
      d="M136 56h-16l-8-12H80l-8 12H56c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h80c8.8 0 16-7.2 16-16V72c0-8.8-7.2-16-16-16z"
    />
    <circle cx="96" cy="104" r="32" fill="#1A73E8" />
    <circle cx="96" cy="104" r="22" fill="#202124" />
    <circle cx="96" cy="104" r="12" fill="#34A853" />
    <circle cx="132" cy="74" r="5" fill="#FBBC04" />
  </svg>
);

// Google Settings Icon
export const AndroidSettingsIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#5F6368" />
    <circle cx="96" cy="96" r="32" fill="#fff" />
    <path
      fill="#fff"
      d="M152 104v-16l-14.8-2.5c-1.2-4.4-2.9-8.5-5.2-12.2l8.8-12.4-11.3-11.3-12.4 8.8c-3.7-2.3-7.8-4-12.2-5.2L104 40H88l-2.5 14.8c-4.4 1.2-8.5 2.9-12.2 5.2l-12.4-8.8-11.3 11.3 8.8 12.4c-2.3 3.7-4 7.8-5.2 12.2L40 88v16l14.8 2.5c1.2 4.4 2.9 8.5 5.2 12.2l-8.8 12.4 11.3 11.3 12.4-8.8c3.7 2.3 7.8 4 12.2 5.2L88 152h16l2.5-14.8c4.4-1.2 8.5-2.9 12.2-5.2l12.4 8.8 11.3-11.3-8.8-12.4c2.3-3.7 4-7.8 5.2-12.2l13.2-2.3z"
    />
    <circle cx="96" cy="96" r="22" fill="#5F6368" />
  </svg>
);

// Google Calculator Icon
export const AndroidCalculatorIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#00838F" />
    <circle cx="70" cy="70" r="14" fill="#fff" opacity="0.3" />
    <text x="63" y="76" fill="#fff" fontSize="22" fontWeight="bold">÷</text>
    <circle cx="122" cy="70" r="14" fill="#fff" opacity="0.3" />
    <text x="115" y="76" fill="#fff" fontSize="22" fontWeight="bold">×</text>
    <circle cx="70" cy="122" r="14" fill="#fff" opacity="0.3" />
    <text x="63" y="128" fill="#fff" fontSize="22" fontWeight="bold">−</text>
    <circle cx="122" cy="122" r="14" fill="#FBBC04" />
    <text x="115" y="128" fill="#202124" fontSize="22" fontWeight="bold">=</text>
  </svg>
);

// Google Clock Icon
export const AndroidClockIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#1E88E5" />
    <circle cx="96" cy="96" r="64" fill="#fff" />
    <circle cx="96" cy="96" r="8" fill="#1E88E5" />
    <line x1="96" y1="96" x2="96" y2="56" stroke="#1E88E5" strokeWidth="6" strokeLinecap="round" />
    <line x1="96" y1="96" x2="126" y2="96" stroke="#1E88E5" strokeWidth="6" strokeLinecap="round" />
    <line x1="96" y1="96" x2="80" y2="124" stroke="#EA4335" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Google Files Icon
export const AndroidFilesIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#1A73E8" />
    <path
      fill="#fff"
      d="M48 64c0-8.8 7.2-16 16-16h32l16 16h32c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V64z"
    />
    <path fill="#4285F4" d="M120 90h-48v-12h48v12z" />
    <path fill="#34A853" d="M100 110h-28v-12h28v12z" />
    <circle cx="130" cy="116" r="14" fill="#FBBC04" />
  </svg>
);

// YouTube Music Icon
export const AndroidYTMusicIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#FF0000" />
    <circle cx="96" cy="96" r="60" fill="#202124" />
    <circle cx="96" cy="96" r="42" fill="#FF0000" />
    <circle cx="96" cy="96" r="32" fill="#202124" />
    <polygon points="86,76 116,96 86,116" fill="#fff" />
  </svg>
);

// Google Keep Notes Icon
export const AndroidKeepIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#FBBC04" />
    <path
      fill="#fff"
      d="M60 48h72c6.6 0 12 5.4 12 12v72c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12z"
    />
    <circle cx="96" cy="86" r="18" fill="#F29900" />
    <path fill="#F29900" d="M90 106h12v6H90zM92 114h8v4h-8z" />
  </svg>
);

// Google Play Games Icon
export const AndroidGamesIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#0F9D58" />
    <path
      fill="#fff"
      d="M136 72H56c-13.3 0-24 10.7-24 24v24c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V96c0-13.3-10.7-24-24-24zm-64 42H62v10H52v-10H42v-10h10V94h10v10h10v10zm46 4c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm16-16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
    />
  </svg>
);

// Voice Recorder Icon
export const AndroidRecorderIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#D93025" />
    <circle cx="96" cy="96" r="48" fill="#fff" opacity="0.2" />
    <path
      fill="#fff"
      d="M96 114c9.9 0 18-8.1 18-18V66c0-9.9-8.1-18-18-18s-18 8.1-18 18v30c0 9.9 8.1 18 18 18z"
    />
    <path
      fill="#fff"
      d="M124 96c0 15.5-12.5 28-28 28s-28-12.5-28-28H58c0 19.3 14.4 35.2 33 37.6V150h10v-16.4c18.6-2.4 33-18.3 33-37.6h-10z"
    />
  </svg>
);

// YouTube Icon
export const AndroidYouTubeIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#FF0000" />
    <polygon points="80,68 126,96 80,124" fill="#fff" />
  </svg>
);

// Termux Terminal Icon
export const AndroidTermuxIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className}>
    <rect width="192" height="192" rx="42" fill="#000" />
    <text x="42" y="112" fill="#00E676" fontSize="48" fontFamily="monospace" fontWeight="bold">&gt;_</text>
  </svg>
);
