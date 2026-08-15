# 📱 Android 15 Web Mobile Phone Emulator (Pixel 8 Pro Edition)

An ultra-realistic, responsive in-browser **Android 15 (Vanilla Ice Cream)** mobile phone emulator built with **Next.js 15**, **React 19**, **Tailwind CSS**, **Framer Motion**, and **Web Audio API**.

---

## 🌟 Key Features

### 🎛️ 1. Authentic Android 15 OS Experience
- **Material You Dynamic Theming**: 6 dynamic color palettes with auto theme adaptation.
- **Interactive Notification Shade / Quick Settings**: Swipe down or click the status bar for Wi-Fi, Bluetooth, Flashlight, Do Not Disturb, Dark Mode, Auto-Rotate, Battery Saver, Airplane Mode, and live screen brightness controls.
- **Lock Screen**: Dual-line clock widget, live weather forecast, interactive fingerprint ripple animation with haptic unlock sound, and quick shortcuts.
- **App Drawer & Home Screen**: Google Search bar with voice search simulation, 4x5 App grid, swipe-up All Apps Drawer with live search filtering.
- **System Navigation**: Toggle between modern **Gesture Navigation** (pill swipe) and classic **3-Button Navigation** (Back, Home, Recents).
- **Task Switcher / Recents**: 3D swipeable card stack with force-close / swipe-up kill and "Clear All".
- **Power Menu**: Sleep, Wake, Restart, Power Off, and Screenshot.
- **On-Screen Volume HUD**: Dynamic interactive popout slider with synthesized audio clicks.

---

### 📲 2. 16 Fully Functional In-Emulator Apps

1. 📞 **Phone / Dialer**: Interactive dialpad with real DTMF tone sound effects, live calling screen with duration timer, contacts list, and call history.
2. 💬 **Messages / SMS**: Interactive conversations, message bubbles, preset replies, plus built-in **Gemini AI Assistant** you can chat with inside SMS.
3. 📷 **Camera**: Live real-time webcam video stream via WebRTC `getUserMedia`, photo snapshot with flash animation, mechanical shutter sound, camera flipping, and auto-save to Photos.
4. 🖼️ **Photos / Gallery**: Photo album grid with full-screen lightbox viewer, "Set as Wallpaper" button which updates the emulator's wallpaper in real time.
5. 🌐 **Chrome Browser**: In-emulator browser with address bar, search Google, bookmarks (Wikipedia, GitHub, HackerNews, YouTube, Reddit).
6. 🛍️ **Google Play Store**: App store with categories (For You, Top Charts, Games), search, and "Install / Open" buttons that dynamically install new apps onto the Android home screen!
7. ⚙️ **Settings**: Material You categories for Network, Display, Wallpaper & Style, Battery stats, Sound & Vibration, Navigation style, and About Phone (Device: Pixel 8 Pro, RAM: 12GB, Storage: 256GB, Developer Easter Egg).
8. 🔢 **Calculator**: Pixel calculator with basic arithmetic, history drawer, and scientific mode (`sin`, `cos`, `tan`, `log`, `ln`, `√`, `π`, `^`).
9. ⏰ **Clock & Timer**: Digital/Analog clock, World clock for major cities, Alarm creator with active toggles, Stopwatch with laps, and Countdown timer with buzzer.
10. 📁 **Files / Storage**: 256GB storage breakdown, folders explorer, and **real File Upload** to drop files from your computer into the emulator.
11. 🎵 **YouTube Music**: Spotify/YT Music player with album covers, track seeker, playlist, audio visualizer.
12. 🎮 **Play Games Arcade**:
    - **Flappy Android Droid** (smooth canvas arcade physics game with high score tracking)
    - **Tic-Tac-Toe** (Player vs Smart AI)
13. 📝 **Google Keep Notes**: Color-coded sticky notes with pin to top, search, create, edit, delete, saved to `localStorage`.
14. 🎙️ **Voice Recorder**: Microphone voice recorder with animated audio wave visualizer and saved recordings.
15. 📺 **YouTube**: Trending video feed, search query, and embedded video player.
16. 💻 **Termux**: Android Linux terminal emulator supporting `help`, `neofetch`, `uname`, `ls`, `cat`, `date`, `ping`, `whoami`, `pkg`, `clear`, `echo`.

---

### 🖥️ 3. Hardware Shell & Desktop Controls
- **3D Phone Chassis**: Google Pixel 8 Pro styling with visor camera bar, speaker slit, punch hole selfie camera, and metallic hardware buttons (Power, Volume Rocker).
- **Responsive Adaptability**:
  - **Desktop**: Renders inside the sleek Android hardware body with orientation toggle, wallpaper quick-switcher, sound effects toggle, fullscreen mode, and factory reset.
  - **Mobile Devices**: Automatically adapts to 100% full-screen native mobile viewport.
- **Zero External Audio Dependencies**: Custom Web Audio API synthesizer for instant, lag-free lock sounds, camera shutter clicks, DTMF dialpad tones, and notification chimes.

---

## 🛠️ Stack

- **Framework**: Next.js 15 (App Router)
- **UI & Animation**: React 19, Tailwind CSS, Lucide React, Framer Motion
- **Sound**: Native Web Audio API Sound Synthesizer
- **Media**: WebRTC Camera Stream (`getUserMedia`), `MediaRecorder` API
- **Deployment**: Vercel

---

## 🚀 Getting Started

```bash
git clone https://github.com/tusarimrananik/android-emulator-web.git
cd android-emulator-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📜 License
MIT License
