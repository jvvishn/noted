"use client";

import { Note } from "@/types/types";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: string) => void;
}

export default function Sidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-white font-semibold mb-4 text-2xl">Noted.</h1>
      <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="mb-4 p-2 rounded-md bg-neutral-800 text-white border-none outline-none" />
      <button
        className="w-full py-2 bg-neutral-700 rounded-md text-white cursor-pointer hover:bg-neutral-600 mb-4"
        onClick={onCreateNote}
      >
        New Note
      </button>
      <ul>
        {filteredNotes.map((note) => (
          <li
            className={`group w-full flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-neutral-700 ${note.id === selectedNoteId ? "bg-neutral-800" : ""}`}
            key={note.id}
            onClick={() => {
              onSelectNote(note.id);
            }}
          >
            <span className="truncate flex-1">
              {" "}
              {note.title || "Untitled"}{" "}
            </span>
            <button
              className="opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNote(note.id);
              }}
            >
              {" "}
              <Trash2 size={14} />{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
