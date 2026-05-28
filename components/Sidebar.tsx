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
    <div>
      <button onClick={onCreateNote}>New Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => {
            console.log("li clicked:", note.id);
            onSelectNote(note.id)}}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
