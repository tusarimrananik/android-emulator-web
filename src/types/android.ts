export type AppId =
  | "phone"
  | "messages"
  | "chrome"
  | "camera"
  | "photos"
  | "playstore"
  | "settings"
  | "calculator"
  | "clock"
  | "files"
  | "music"
  | "games"
  | "notes"
  | "recorder"
  | "youtube"
  | "termux"
  | "maps"
  | "gmail"
  | "drive"
  | "contacts";

export interface AppDefinition {
  id: AppId;
  name: string;
  iconSrc: string;
  category: "google" | "system" | "media" | "tools" | "games";
  installed: boolean;
  dock: boolean;
}

export interface NotificationItem {
  id: string;
  appId: AppId;
  appName: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  avatar?: string;
  actions?: { label: string; action: () => void }[];
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatarColor: string;
  favorite?: boolean;
}

export interface MessageThread {
  id: string;
  contactId: string;
  contactName: string;
  avatarColor: string;
  unreadCount: number;
  lastMessageTime: string;
  messages: {
    id: string;
    sender: "me" | "them";
    text: string;
    time: string;
  }[];
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  color: string;
  pinned: boolean;
  updatedAt: string;
}

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: "image" | "audio" | "video" | "doc" | "folder";
  url?: string;
  date: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSec: number;
  coverUrl: string;
  audioUrl?: string;
}

export interface DeviceSettings {
  darkMode: boolean;
  themeColor: string;
  brightness: number;
  volume: number;
  wifiEnabled: boolean;
  bluetoothEnabled: boolean;
  flashlightEnabled: boolean;
  dndEnabled: boolean;
  autoRotate: boolean;
  airplaneMode: boolean;
  batterySaver: boolean;
  screenTimeoutSec: number;
  navStyle: "3button" | "gesture";
  wallpaper: string;
  soundMuted: boolean;
  phoneSkin: "pixel" | "galaxy" | "minimal";
  fontSize: "small" | "default" | "large";
}
