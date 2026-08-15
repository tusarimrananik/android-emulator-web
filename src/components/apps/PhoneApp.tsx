"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  PhoneCall,
  PhoneOff,
  UserPlus,
  Clock,
  Users,
  Search,
  Delete,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Grid,
} from "lucide-react";
import { Contact } from "@/types/android";
import { sounds } from "@/utils/soundEffects";

interface PhoneAppProps {
  contacts: Contact[];
  onAddContact: (contact: Contact) => void;
}

export const PhoneApp: React.FC<PhoneAppProps> = ({ contacts, onAddContact }) => {
  const [activeTab, setActiveTab] = useState<"keypad" | "recents" | "contacts">("keypad");
  const [dialNumber, setDialNumber] = useState<string>("");
  const [inCall, setInCall] = useState<boolean>(false);
  const [activeCallName, setActiveCallName] = useState<string>("");
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaker, setIsSpeaker] = useState<boolean>(false);
  const [searchContact, setSearchContact] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newContactName, setNewContactName] = useState<string>("");
  const [newContactPhone, setNewContactPhone] = useState<string>("");

  const [callHistory, setCallHistory] = useState([
    { id: "h1", name: "Gemini AI Assistant", phone: "1-800-GEMINI", type: "incoming", time: "10:30 AM" },
    { id: "h2", name: "Anik (Tusar)", phone: "+880 1712-345678", type: "outgoing", time: "Yesterday" },
    { id: "h3", name: "Mom", phone: "+880 1812-987654", type: "missed", time: "Aug 14" },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (inCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [inCall]);

  const handleKeyPress = (num: string) => {
    sounds.playDialTone(num);
    setDialNumber((prev) => prev + num);
  };

  const handleDelete = () => {
    sounds.playTap();
    setDialNumber((prev) => prev.slice(0, -1));
  };

  const startCall = (numberOrName: string) => {
    sounds.playTap();
    const contact = contacts.find((c) => c.phone === numberOrName || c.name === numberOrName);
    setActiveCallName(contact ? contact.name : numberOrName || "Unknown Number");
    setInCall(true);

    // Add to call history
    setCallHistory((prev) => [
      {
        id: "h-" + Date.now(),
        name: contact ? contact.name : numberOrName,
        phone: contact ? contact.phone : numberOrName,
        type: "outgoing",
        time: "Just now",
      },
      ...prev,
    ]);
  };

  const endCall = () => {
    sounds.playTap();
    setInCall(false);
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;
    const colors = ["bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-rose-600", "bg-amber-600"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    onAddContact({
      id: "c-" + Date.now(),
      name: newContactName,
      phone: newContactPhone,
      avatarColor: randomColor,
    });
    setNewContactName("");
    setNewContactPhone("");
    setShowAddModal(false);
    sounds.playNotification();
  };

  // Active Calling Screen
  if (inCall) {
    return (
      <div className="h-full w-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white flex flex-col justify-between p-6 pt-12 pb-12 animate-in fade-in duration-300">
        <div className="flex flex-col items-center space-y-3 pt-6">
          <div className="w-24 h-24 rounded-full bg-emerald-600/30 border-2 border-emerald-500/50 flex items-center justify-center text-3xl font-bold text-emerald-400 shadow-2xl animate-pulse">
            {activeCallName[0] || "U"}
          </div>
          <div className="text-2xl font-bold tracking-tight text-center">{activeCallName}</div>
          <div className="text-sm text-emerald-400 font-medium font-mono">{formatDuration(callDuration)}</div>
          <div className="text-xs text-zinc-400">HD Voice • Calling via 5G</div>
        </div>

        {/* Call Controls Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto w-full my-auto">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full flex flex-col items-center justify-center space-y-1 transition-all ${
              isMuted ? "bg-red-500 text-white" : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            <span className="text-[10px]">Mute</span>
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`p-4 rounded-full flex flex-col items-center justify-center space-y-1 transition-all ${
              isSpeaker ? "bg-blue-500 text-white" : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {isSpeaker ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            <span className="text-[10px]">Speaker</span>
          </button>

          <button
            onClick={() => sounds.playDialTone("1")}
            className="p-4 rounded-full bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 flex flex-col items-center justify-center space-y-1 transition-all"
          >
            <Grid className="w-5 h-5" />
            <span className="text-[10px]">Keypad</span>
          </button>
        </div>

        {/* End Call Button */}
        <div className="flex justify-center pb-4">
          <button
            onClick={endCall}
            className="p-5 rounded-full bg-red-600 hover:bg-red-500 active:scale-90 text-white shadow-2xl transition-all"
            title="End Call"
          >
            <PhoneOff className="w-8 h-8" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="p-4 pt-10 border-b border-white/5 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight text-emerald-400">Phone</span>
        <button
          onClick={() => setShowAddModal(true)}
          className="p-2 rounded-full bg-zinc-900 text-zinc-300 hover:text-white"
          title="Add Contact"
        >
          <UserPlus className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto android-scrollbar p-3">
        {/* Tab 1: Keypad */}
        {activeTab === "keypad" && (
          <div className="flex flex-col h-full justify-between py-2">
            {/* Number Display */}
            <div className="flex items-center justify-center h-14 relative px-4">
              <span className="text-2xl font-bold tracking-wider font-mono text-center truncate">
                {dialNumber || <span className="text-zinc-600 text-base font-sans font-normal">Enter phone number</span>}
              </span>
              {dialNumber && (
                <button onClick={handleDelete} className="absolute right-4 p-2 text-zinc-400 hover:text-white">
                  <Delete className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-3 gap-y-3 gap-x-6 max-w-xs mx-auto w-full my-auto px-4">
              {[
                { n: "1", sub: "" },
                { n: "2", sub: "ABC" },
                { n: "3", sub: "DEF" },
                { n: "4", sub: "GHI" },
                { n: "5", sub: "JKL" },
                { n: "6", sub: "MNO" },
                { n: "7", sub: "PQRS" },
                { n: "8", sub: "TUV" },
                { n: "9", sub: "WXYZ" },
                { n: "*", sub: "" },
                { n: "0", sub: "+" },
                { n: "#", sub: "" },
              ].map((k) => (
                <button
                  key={k.n}
                  onClick={() => handleKeyPress(k.n)}
                  className="w-16 h-16 rounded-full bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 active:scale-95 transition-all flex flex-col items-center justify-center mx-auto border border-white/5 shadow"
                >
                  <span className="text-xl font-bold text-white leading-none">{k.n}</span>
                  {k.sub && <span className="text-[9px] font-semibold text-zinc-500 mt-0.5">{k.sub}</span>}
                </button>
              ))}
            </div>

            {/* Call Action Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => startCall(dialNumber || "Gemini AI")}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-90 text-zinc-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all font-bold"
                title="Call"
              >
                <PhoneCall className="w-7 h-7 fill-current" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Recents */}
        {activeTab === "recents" && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-2">Call History</span>
            {callHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => startCall(item.phone)}
                className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-850 cursor-pointer border border-white/5 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-white">
                    {item.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs text-zinc-500">{item.phone}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-zinc-500">{item.time}</span>
                  <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Contacts */}
        {activeTab === "contacts" && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 bg-zinc-900 rounded-full px-3 py-2 border border-white/5">
              <Search className="w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchContact}
                onChange={(e) => setSearchContact(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-full"
              />
            </div>

            <div className="space-y-1.5">
              {contacts
                .filter((c) => c.name.toLowerCase().includes(searchContact.toLowerCase()) || c.phone.includes(searchContact))
                .map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => startCall(contact.name)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-850 cursor-pointer border border-white/5 transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full ${contact.avatarColor} flex items-center justify-center text-sm font-bold text-white shadow`}
                      >
                        {contact.name[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {contact.name}
                        </span>
                        <span className="text-xs text-zinc-500">{contact.phone}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startCall(contact.name);
                      }}
                      className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tabs Bar */}
      <div className="h-14 border-t border-white/10 bg-zinc-900/80 flex items-center justify-around px-4">
        <button
          onClick={() => {
            sounds.playTap();
            setActiveTab("recents");
          }}
          className={`flex flex-col items-center space-y-1 py-1 px-4 rounded-xl transition-all ${
            activeTab === "recents" ? "text-emerald-400 font-bold" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px]">Recents</span>
        </button>

        <button
          onClick={() => {
            sounds.playTap();
            setActiveTab("keypad");
          }}
          className={`flex flex-col items-center space-y-1 py-1 px-4 rounded-xl transition-all ${
            activeTab === "keypad" ? "text-emerald-400 font-bold" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px]">Keypad</span>
        </button>

        <button
          onClick={() => {
            sounds.playTap();
            setActiveTab("contacts");
          }}
          className={`flex flex-col items-center space-y-1 py-1 px-4 rounded-xl transition-all ${
            activeTab === "contacts" ? "text-emerald-400 font-bold" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px]">Contacts</span>
        </button>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in">
          <form
            onSubmit={handleCreateContact}
            className="bg-zinc-900 border border-white/10 rounded-3xl p-5 w-full max-w-xs shadow-2xl space-y-4"
          >
            <span className="text-sm font-bold text-white">Create New Contact</span>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Full Name"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                required
                className="w-full bg-zinc-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                required
                className="w-full bg-zinc-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs text-zinc-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 rounded-xl text-xs text-zinc-950 font-bold"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
