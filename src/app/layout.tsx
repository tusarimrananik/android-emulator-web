import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Android 15 Web Emulator | Pixel Edition",
  description:
    "A fully functional in-browser Android 15 mobile phone emulator with Material You, Camera, Dialer, Messages, Play Store, Games, and Terminal.",
  keywords: [
    "Android",
    "Android Emulator",
    "Web OS",
    "Pixel 8 Pro",
    "Next.js",
    "React 19",
    "Material You",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen overflow-x-hidden antialiased select-none font-sans">
        {children}
      </body>
    </html>
  );
}
