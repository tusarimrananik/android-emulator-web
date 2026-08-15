"use client";

import React, { useState } from "react";
import {
  StickyNote,
  Plus,
  Search,
  Pin,
  Trash2,
  X,
  Palette,
  Check,
} from "lucide-react";
import { NoteItem } from "@/types/android";
import { sounds } from "@/utils/soundEffects";

interface NotesAppProps {
  notes: NoteItem[];
  onSaveNote: (note: NoteItem) => void;
  onDeleteNote: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export const NotesApp: React.FC<NotesAppProps> = ({
  notes,
  onSaveNote,
  onDeleteNote,
  onTogglePin,
}) => {
  const [search, setSearch] = useState<string>("");
  const [editingNote, setEditingNote] = useState<NoteItem | null>(null);
  const [titleInput, setTitleInput] = useState<string>("");
  const [contentInput, setContentInput] = useState<string>("");
  const [colorInput, setColorInput] = useState<string>("#FEF08A");

  const colors = [
    { name: "Yellow", value: "#FEF08A" },
    { name: "Green", value: "#BBF7D0" },
    { name: "Blue", value: "#BAE6FD" },
    { name: "Purple", value: "#E9D5FF" },
    { name: "Rose", value: "#FECDD3" },
  ];

  const handleOpenEdit = (note?: NoteItem) => {
    sounds.playTap();
    if (note) {
      setEditingNote(note);
      setTitleInput(note.title);
      setContentInput(note.content);
      setColorInput(note.color);
    } else {
      setEditingNote({
        id: "note-" + Date.now(),
        title: "",
        content: "",
        color: "#FEF08A",
        pinned: false,
        updatedAt: "Just now",
      });
      setTitleInput("");
      setContentInput("");
      setColorInput("#FEF08A");
    }
  };

  const handleSave = () => {
    if (!editingNote || (!titleInput.trim() && !contentInput.trim())) {
      setEditingNote(null);
      return;
    }

    sounds.playTap();
    onSaveNote({
      ...editingNote,
      title: titleInput.trim() || "Untitled Note",
      content: contentInput.trim(),
      color: colorInput,
      updatedAt: "Just now",
    });
    setEditingNote(null);
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full w-full bg-zinc-950 text-white flex flex-col justify-between select-none p-4 pt-10">
      {/* Editor Modal */}
      {editingNote ? (
        <div className="h-full flex flex-col justify-between bg-zinc-900 rounded-2xl p-4 border border-white/10 animate-in fade-in">
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-zinc-400">Edit Note</span>
              <button
                onClick={() => setEditingNote(null)}
                className="p-1 rounded-full text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="bg-transparent border-none outline-none text-base font-bold text-white placeholder-zinc-500 w-full"
            />

            <textarea
              placeholder="Note content..."
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-zinc-200 placeholder-zinc-500 w-full flex-1 resize-none android-scrollbar"
            />

            {/* Color tags */}
            <div className="flex items-center space-x-2 pt-2 border-t border-white/5">
              {colors.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColorInput(c.value)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    colorInput === c.value ? "border-white scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          <div className="pt-3 flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center space-x-1 shadow"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      ) : (
        /* Notes Feed */
        <div className="h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center">
                <StickyNote className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Google Keep</span>
            </div>

            <button
              onClick={() => handleOpenEdit()}
              className="p-2 rounded-full bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Search bar */}
          <div className="flex items-center space-x-2 bg-zinc-900 rounded-full px-3.5 py-2 border border-white/5 my-3">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search your notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-full"
            />
          </div>

          {/* Notes Grid */}
          <div className="flex-1 overflow-y-auto space-y-2.5 android-scrollbar">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleOpenEdit(note)}
                className="p-3.5 rounded-2xl border border-black/10 cursor-pointer shadow-md hover:scale-101 active:scale-98 transition-all relative group text-zinc-900"
                style={{ backgroundColor: note.color }}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-bold truncate pr-4">{note.title}</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playTap();
                        onTogglePin(note.id);
                      }}
                      className={`p-1 rounded-full hover:bg-black/10 ${note.pinned ? "text-red-600" : "text-zinc-600"}`}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playTap();
                        onDeleteNote(note.id);
                      }}
                      className="p-1 rounded-full hover:bg-black/10 text-zinc-600 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-800 line-clamp-3 leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>

                <div className="text-[9px] text-zinc-600 mt-2 font-medium">{note.updatedAt}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
