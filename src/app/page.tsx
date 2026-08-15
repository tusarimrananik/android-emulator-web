"use client";

import React, { useState, useEffect } from "react";
import {
  AppDefinition,
  AppId,
  Contact,
  DeviceSettings,
  FileItem,
  MessageThread,
  MusicTrack,
  NoteItem,
  NotificationItem,
} from "@/types/android";
import {
  APPS,
  DEFAULT_SETTINGS,
  INITIAL_CONTACTS,
  INITIAL_FILES,
  INITIAL_MESSAGES,
  INITIAL_MUSIC,
  INITIAL_NOTES,
  INITIAL_NOTIFICATIONS,
} from "@/utils/constants";
import { sounds } from "@/utils/soundEffects";

// System Components
import { StatusBar } from "@/components/StatusBar";
import { NavigationBar } from "@/components/NavigationBar";
import { LockScreen } from "@/components/LockScreen";
import { HomeScreen } from "@/components/HomeScreen";
import { AppDrawer } from "@/components/AppDrawer";
import { NotificationShade } from "@/components/NotificationShade";
import { RecentsView } from "@/components/RecentsView";
import { VolumeHUD } from "@/components/VolumeHUD";
import { PowerMenu } from "@/components/PowerMenu";

// App Screens
import { PhoneApp } from "@/components/apps/PhoneApp";
import { MessagesApp } from "@/components/apps/MessagesApp";
import { CameraApp } from "@/components/apps/CameraApp";
import { PhotosApp } from "@/components/apps/PhotosApp";
import { ChromeApp } from "@/components/apps/ChromeApp";
import { PlayStoreApp } from "@/components/apps/PlayStoreApp";
import { SettingsApp } from "@/components/apps/SettingsApp";
import { CalculatorApp } from "@/components/apps/CalculatorApp";
import { ClockApp } from "@/components/apps/ClockApp";
import { FilesApp } from "@/components/apps/FilesApp";
import { MusicApp } from "@/components/apps/MusicApp";
import { GamesApp } from "@/components/apps/GamesApp";
import { NotesApp } from "@/components/apps/NotesApp";
import { VoiceRecorderApp } from "@/components/apps/VoiceRecorderApp";
import { YouTubeApp } from "@/components/apps/YouTubeApp";
import { TermuxApp } from "@/components/apps/TermuxApp";

export default function AndroidEmulatorPage() {
  // Device & OS State
  const [settings, setSettings] = useState<DeviceSettings>(DEFAULT_SETTINGS);
  const [isScreenOn, setIsScreenOn] = useState<boolean>(true);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [activeAppId, setActiveAppId] = useState<AppId | null>(null);
  const [openApps, setOpenApps] = useState<AppId[]>([]);

  // Modals & Overlays State
  const [shadeOpen, setShadeOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [recentsOpen, setRecentsOpen] = useState<boolean>(false);
  const [powerMenuOpen, setPowerMenuOpen] = useState<boolean>(false);
  const [volumeHudVisible, setVolumeHudVisible] = useState<boolean>(false);

  // App Data States
  const [appsList, setAppsList] = useState<AppDefinition[]>(APPS);
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_MESSAGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES);
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop",
  ]);

  // Load / Persist to localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("android_settings_v1");
      if (savedSettings) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(savedSettings) }));
      }
      const savedNotes = localStorage.getItem("android_notes_v1");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch {}
  }, []);

  const updateSettings = (newSettings: Partial<DeviceSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem("android_settings_v1", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Open / Switch App
  const openApp = (appId: AppId) => {
    sounds.playTap();
    setActiveAppId(appId);
    setDrawerOpen(false);
    setShadeOpen(false);
    setRecentsOpen(false);
    if (!openApps.includes(appId)) {
      setOpenApps((prev) => [appId, ...prev]);
    }
  };

  // Close Current App to Home
  const handleHome = () => {
    sounds.playTap();
    setActiveAppId(null);
    setDrawerOpen(false);
    setShadeOpen(false);
    setRecentsOpen(false);
  };

  // Back Button Logic
  const handleBack = () => {
    sounds.playTap();
    if (shadeOpen) setShadeOpen(false);
    else if (drawerOpen) setDrawerOpen(false);
    else if (recentsOpen) setRecentsOpen(false);
    else if (activeAppId) setActiveAppId(null);
  };

  // Recents Switcher
  const handleRecents = () => {
    sounds.playTap();
    setRecentsOpen(true);
    setDrawerOpen(false);
    setShadeOpen(false);
  };

  // Volume buttons handler
  const handleVolumeUp = () => {
    const next = Math.min(100, settings.volume + 10);
    updateSettings({ volume: next, soundMuted: false });
    setVolumeHudVisible(true);
    sounds.playVolumeTick(next);
  };

  const handleVolumeDown = () => {
    const next = Math.max(0, settings.volume - 10);
    updateSettings({ volume: next });
    setVolumeHudVisible(true);
    sounds.playVolumeTick(next);
  };

  // App Installation Toggle (Play Store)
  const handleToggleInstall = (appId: AppId) => {
    setAppsList((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, installed: !app.installed } : app))
    );
  };

  // Message Send & Assistant AI Auto-Reply
  const handleSendMessage = (threadId: string, text: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    const newMsg = {
      id: "m-" + Date.now(),
      sender: "me" as const,
      text,
      time: timeStr,
    };

    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, messages: [...t.messages, newMsg] } : t))
    );

    // AI Assistant Intelligent Reply
    if (threadId === "t1") {
      setTimeout(() => {
        sounds.playNotification();
        const aiReplies = [
          "I've processed your request. Everything on your Android device is performing optimally!",
          "That's awesome, Anik! The Android emulator viewport is responsive and running smoothly.",
          "I can assist you with your RUET lab reports, app launching, or running commands in Termux!",
          "Got it! Let me know if you want to change the wallpaper, play 2048, or test the camera.",
        ];
        const randomReply = aiReplies[Math.floor(Math.random() * aiReplies.length)];

        setThreads((prev) =>
          prev.map((t) =>
            t.id === "t1"
              ? {
                  ...t,
                  unreadCount: activeAppId === "messages" ? 0 : t.unreadCount + 1,
                  lastMessageTime: timeStr,
                  messages: [
                    ...t.messages,
                    {
                      id: "m-" + Date.now(),
                      sender: "them" as const,
                      text: randomReply,
                      time: timeStr,
                    },
                  ],
                }
              : t
          )
        );

        if (activeAppId !== "messages") {
          setNotifications((prev) => [
            {
              id: "n-" + Date.now(),
              appId: "messages",
              appName: "Messages",
              title: "Gemini AI Assistant",
              message: randomReply,
              time: "Just now",
              unread: true,
            },
            ...prev,
          ]);
        }
      }, 1000);
    }
  };

  // Photo Taken Action
  const handlePhotoTaken = (url: string) => {
    setPhotos((prev) => [url, ...prev]);
    setFiles((prev) => [
      {
        id: "f-" + Date.now(),
        name: `IMG_${Date.now().toString().slice(-4)}.jpg`,
        size: "2.8 MB",
        type: "image",
        date: "Just now",
        url,
      },
      ...prev,
    ]);
  };

  // Factory Reset Emulator
  const handleResetEmulator = () => {
    sounds.playNotification();
    localStorage.clear();
    setSettings(DEFAULT_SETTINGS);
    setAppsList(APPS);
    setContacts(INITIAL_CONTACTS);
    setThreads(INITIAL_MESSAGES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setNotes(INITIAL_NOTES);
    setFiles(INITIAL_FILES);
    setActiveAppId(null);
    setIsLocked(false);
  };

  // Render the current active app inside screen
  const renderActiveApp = () => {
    switch (activeAppId) {
      case "phone":
        return (
          <PhoneApp
            contacts={contacts}
            onAddContact={(c) => setContacts((prev) => [c, ...prev])}
          />
        );
      case "messages":
        return <MessagesApp threads={threads} onSendMessage={handleSendMessage} />;
      case "camera":
        return (
          <CameraApp
            onPhotoTaken={handlePhotoTaken}
            onOpenGallery={() => openApp("photos")}
            latestPhotoUrl={photos[0]}
          />
        );
      case "photos":
        return (
          <PhotosApp
            photos={photos}
            onSetWallpaper={(url) => updateSettings({ wallpaper: url })}
            onDeletePhoto={(url) => setPhotos((prev) => prev.filter((p) => p !== url))}
          />
        );
      case "chrome":
        return <ChromeApp />;
      case "playstore":
        return (
          <PlayStoreApp
            apps={appsList}
            onToggleInstall={handleToggleInstall}
            onOpenApp={openApp}
          />
        );
      case "settings":
        return <SettingsApp settings={settings} onUpdateSettings={updateSettings} />;
      case "calculator":
        return <CalculatorApp />;
      case "clock":
        return <ClockApp />;
      case "files":
        return (
          <FilesApp
            files={files}
            onUploadFile={(f) => setFiles((prev) => [f, ...prev])}
            onDeleteFile={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
          />
        );
      case "music":
        return <MusicApp playlist={INITIAL_MUSIC} />;
      case "games":
        return <GamesApp />;
      case "notes":
        return (
          <NotesApp
            notes={notes}
            onSaveNote={(n) => {
              const exists = notes.some((item) => item.id === n.id);
              const updated = exists
                ? notes.map((item) => (item.id === n.id ? n : item))
                : [n, ...notes];
              setNotes(updated);
              localStorage.setItem("android_notes_v1", JSON.stringify(updated));
            }}
            onDeleteNote={(id) => {
              const updated = notes.filter((item) => item.id !== id);
              setNotes(updated);
              localStorage.setItem("android_notes_v1", JSON.stringify(updated));
            }}
            onTogglePin={(id) => {
              const updated = notes.map((item) =>
                item.id === id ? { ...item, pinned: !item.pinned } : item
              );
              setNotes(updated);
              localStorage.setItem("android_notes_v1", JSON.stringify(updated));
            }}
          />
        );
      case "recorder":
        return <VoiceRecorderApp />;
      case "youtube":
        return <YouTubeApp />;
      case "termux":
        return <TermuxApp />;
      default:
        return null;
    }
  };

  return (
    <main className="w-full min-h-screen bg-black flex items-center justify-center p-0 overflow-hidden">
      {/* Direct Clean Android Viewport (No outer phone chassis, exact screen presentation) */}
      <div
        className="w-full h-screen max-w-lg mx-auto relative flex flex-col justify-between overflow-hidden bg-black text-white shadow-2xl"
        style={{
          filter: `brightness(${settings.brightness}%)`,
        }}
      >
        {/* Flashlight Screen Glow Effect */}
        {settings.flashlightEnabled && (
          <div className="absolute inset-0 bg-amber-100/30 z-30 pointer-events-none animate-pulse" />
        )}

        {/* Top Status Bar */}
        <StatusBar
          settings={settings}
          onOpenShade={() => {
            sounds.playTap();
            setShadeOpen(true);
          }}
        />

        {/* Main Operating Screen Content */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {isLocked ? (
            <LockScreen
              settings={settings}
              onUnlock={() => setIsLocked(false)}
              onOpenApp={openApp}
              notifications={notifications}
              onToggleFlashlight={() =>
                updateSettings({ flashlightEnabled: !settings.flashlightEnabled })
              }
            />
          ) : activeAppId ? (
            renderActiveApp()
          ) : (
            <HomeScreen
              apps={appsList}
              settings={settings}
              onOpenApp={openApp}
              onOpenDrawer={() => {
                sounds.playTap();
                setDrawerOpen(true);
              }}
              onSearchGoogle={(q) => {
                openApp("chrome");
              }}
            />
          )}

          {/* App Drawer Overlay */}
          <AppDrawer
            visible={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            apps={appsList}
            onOpenApp={openApp}
          />

          {/* Notification Shade / Quick Settings Overlay */}
          <NotificationShade
            visible={shadeOpen}
            onClose={() => setShadeOpen(false)}
            settings={settings}
            onUpdateSettings={updateSettings}
            notifications={notifications}
            onDismissNotification={(id) =>
              setNotifications((prev) => prev.filter((n) => n.id !== id))
            }
            onClearAllNotifications={() => setNotifications([])}
            onOpenApp={openApp}
          />

          {/* Recents App Switcher Overlay */}
          <RecentsView
            visible={recentsOpen}
            openApps={openApps}
            apps={appsList}
            activeAppId={activeAppId}
            onSwitchApp={(id) => {
              setActiveAppId(id);
              setRecentsOpen(false);
            }}
            onCloseApp={(id) => {
              setOpenApps((prev) => prev.filter((app) => app !== id));
              if (activeAppId === id) setActiveAppId(null);
            }}
            onClearAll={() => {
              setOpenApps([]);
              setActiveAppId(null);
              setRecentsOpen(false);
            }}
            onCloseRecents={() => setRecentsOpen(false)}
          />

          {/* Power Menu Modal */}
          <PowerMenu
            visible={powerMenuOpen}
            onClose={() => setPowerMenuOpen(false)}
            onRestart={() => {
              setPowerMenuOpen(false);
              setIsScreenOn(false);
              sounds.playNotification();
              setTimeout(() => {
                setIsScreenOn(true);
                setIsLocked(true);
              }, 1500);
            }}
            onPowerOff={() => {
              setPowerMenuOpen(false);
              setIsScreenOn(false);
            }}
            onScreenshot={() => {
              setPowerMenuOpen(false);
              alert("Screenshot captured and saved to Gallery!");
            }}
          />

          {/* Volume HUD Slider Overlay */}
          <VolumeHUD
            volume={settings.volume}
            visible={volumeHudVisible}
            onClose={() => setVolumeHudVisible(false)}
            onVolumeChange={(vol) => updateSettings({ volume: vol })}
          />
        </div>

        {/* Bottom Android Navigation Bar */}
        {!isLocked && (
          <NavigationBar
            navStyle={settings.navStyle}
            onBack={handleBack}
            onHome={handleHome}
            onRecents={handleRecents}
          />
        )}
      </div>
    </main>
  );
}
