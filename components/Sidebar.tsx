"use client";

import { Note } from "@/types/types";

interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
}

export default function Sidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-white font-semibold mb-4 text-2xl">Noted.</h1>
      <button
        className="w-full py-2 bg-neutral-700 rounded-md text-white cursor-pointer hover:bg-neutral-600 mb-4"
        onClick={onCreateNote}
      >
        New Note
      </button>
      <ul>
        {notes.map((note) => (
          <li
            className={`w-full px-3 py-2 rounded-md cursor-pointer hover:bg-neutral-700 ${note.id === selectedNoteId ? "bg-neutral-800" : ""}`}
            key={note.id}
            onClick={() => {
              onSelectNote(note.id);
            }}
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
