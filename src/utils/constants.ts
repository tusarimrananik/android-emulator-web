import { AppDefinition, Contact, DeviceSettings, FileItem, MessageThread, MusicTrack, NoteItem, NotificationItem } from "@/types/android";

export const DEFAULT_SETTINGS: DeviceSettings = {
  darkMode: true,
  themeColor: "#A8C7FA",
  brightness: 95,
  volume: 75,
  wifiEnabled: true,
  bluetoothEnabled: true,
  flashlightEnabled: false,
  dndEnabled: false,
  autoRotate: true,
  airplaneMode: false,
  batterySaver: false,
  screenTimeoutSec: 60,
  navStyle: "gesture",
  wallpaper: "/img/wallpaper/default.jpg",
  soundMuted: false,
  phoneSkin: "pixel",
  fontSize: "default",
};

export const WALLPAPERS = [
  {
    id: "default-android",
    name: "Android Stock",
    url: "/img/wallpaper/default.jpg",
  },
  {
    id: "default-android-dark",
    name: "Android Dark",
    url: "/img/wallpaper/default2.jpg",
  },
  {
    id: "blue-material",
    name: "Material Blue",
    url: "/img/blue.jpg",
  },
];

export const THEME_COLORS = [
  { name: "Pixel Sky", value: "#A8C7FA", darkSurface: "#1F232B", accent: "#7CABF5" },
  { name: "Coral Sunset", value: "#F28B82", darkSurface: "#2C1E20", accent: "#E57373" },
  { name: "Mint Emerald", value: "#81C995", darkSurface: "#1D2821", accent: "#66BB6A" },
  { name: "Material Violet", value: "#D0BCFF", darkSurface: "#272130", accent: "#B388FF" },
];

export const APPS: AppDefinition[] = [
  {
    id: "phone",
    name: "Phone",
    iconSrc: "/img/icon/apps/contacts.png",
    category: "system",
    installed: true,
    dock: true,
  },
  {
    id: "messages",
    name: "Messages",
    iconSrc: "/img/icon/apps/messages.png",
    category: "google",
    installed: true,
    dock: true,
  },
  {
    id: "chrome",
    name: "Chrome",
    iconSrc: "/img/icon/apps/chrome.png",
    category: "google",
    installed: true,
    dock: true,
  },
  {
    id: "camera",
    name: "Camera",
    iconSrc: "/img/icon/apps/photos.png",
    category: "system",
    installed: true,
    dock: true,
  },
  {
    id: "playstore",
    name: "Play Store",
    iconSrc: "/img/icon/apps/playstore.png",
    category: "google",
    installed: true,
    dock: true,
  },
  {
    id: "photos",
    name: "Photos",
    iconSrc: "/img/icon/apps/photos.png",
    category: "google",
    installed: true,
    dock: false,
  },
  {
    id: "gmail",
    name: "Gmail",
    iconSrc: "/img/icon/apps/gmail.png",
    category: "google",
    installed: true,
    dock: false,
  },
  {
    id: "maps",
    name: "Maps",
    iconSrc: "/img/icon/apps/maps.png",
    category: "google",
    installed: true,
    dock: false,
  },
  {
    id: "youtube",
    name: "YouTube",
    iconSrc: "/img/icon/apps/youtube.png",
    category: "media",
    installed: true,
    dock: false,
  },
  {
    id: "settings",
    name: "Settings",
    iconSrc: "/img/icon/apps/settings.png",
    category: "system",
    installed: true,
    dock: false,
  },
  {
    id: "clock",
    name: "Clock",
    iconSrc: "/img/icon/apps/calender.png",
    category: "system",
    installed: true,
    dock: false,
  },
  {
    id: "drive",
    name: "Drive",
    iconSrc: "/img/icon/apps/drive.png",
    category: "google",
    installed: true,
    dock: false,
  },
  {
    id: "notes",
    name: "Keep Notes",
    iconSrc: "/img/icon/apps/keep.png",
    category: "google",
    installed: true,
    dock: false,
  },
  {
    id: "contacts",
    name: "Contacts",
    iconSrc: "/img/icon/apps/contacts.png",
    category: "google",
    installed: true,
    dock: false,
  },
  {
    id: "games",
    name: "Play Games",
    iconSrc: "/img/icon/apps/playgames.png",
    category: "games",
    installed: true,
    dock: false,
  },
];

export const INITIAL_CONTACTS: Contact[] = [
  { id: "c1", name: "Gemini AI Assistant", phone: "1-800-GEMINI", avatarColor: "bg-purple-600", favorite: true },
  { id: "c2", name: "Anik (Tusar)", phone: "+880 1712-345678", avatarColor: "bg-blue-600", favorite: true },
  { id: "c3", name: "Google Support", phone: "1-800-555-0199", avatarColor: "bg-emerald-600" },
  { id: "c4", name: "Mom", phone: "+880 1812-987654", avatarColor: "bg-rose-600", favorite: true },
  { id: "c5", name: "Alex (RUET Lab)", phone: "+880 1912-778899", avatarColor: "bg-amber-600" },
  { id: "c6", name: "Dev Team Lead", phone: "+1 415-555-2671", avatarColor: "bg-teal-600" },
];

export const INITIAL_MESSAGES: MessageThread[] = [
  {
    id: "t1",
    contactId: "c1",
    contactName: "Gemini AI Assistant",
    avatarColor: "bg-purple-600",
    unreadCount: 1,
    lastMessageTime: "10:42 AM",
    messages: [
      { id: "m1", sender: "them", text: "Hello Anik! I am your Android AI Assistant.", time: "10:40 AM" },
      { id: "m2", sender: "me", text: "What's the status of the Android system?", time: "10:41 AM" },
      { id: "m3", sender: "them", text: "All Android stock apps and exact system icons are running on Android 15!", time: "10:42 AM" },
    ],
  },
  {
    id: "t2",
    contactId: "c2",
    contactName: "Anik (Tusar)",
    avatarColor: "bg-blue-600",
    unreadCount: 0,
    lastMessageTime: "Yesterday",
    messages: [
      { id: "m4", sender: "them", text: "Hey! Did you check the new Android UI?", time: "Yesterday" },
      { id: "m5", sender: "me", text: "Yes, the stock icons and gesture navigation are clean!", time: "Yesterday" },
    ],
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    appId: "messages",
    appName: "Messages",
    title: "Gemini AI Assistant",
    message: "Android system is running with official stock assets.",
    time: "Just now",
    unread: true,
  },
  {
    id: "n2",
    appId: "playstore",
    appName: "Google Play Store",
    title: "Updates Available",
    message: "4 applications have pending updates.",
    time: "15m ago",
    unread: true,
  },
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: "note-1",
    title: "Android System Notes",
    content: "1. Exact stock system icons\n2. Native Android home screen grid\n3. Pure screen viewport presentation",
    color: "#FEF08A",
    pinned: true,
    updatedAt: "Today, 11:20 AM",
  },
];

export const INITIAL_FILES: FileItem[] = [
  { id: "f1", name: "Camera", size: "3 items", type: "folder", date: "Aug 15, 2026" },
  { id: "f2", name: "Downloads", size: "5 items", type: "folder", date: "Aug 15, 2026" },
  { id: "f3", name: "Documents", size: "2 items", type: "folder", date: "Aug 14, 2026" },
  { id: "f4", name: "Music", size: "4 items", type: "folder", date: "Aug 13, 2026" },
];

export const INITIAL_MUSIC: MusicTrack[] = [
  {
    id: "m1",
    title: "Midnight City Lights",
    artist: "Synthwave Odyssey",
    album: "Future Echoes 2026",
    duration: "3:45",
    durationSec: 225,
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop",
  },
];
