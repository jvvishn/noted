"use client";

import { Note } from "@/types/types";
import { useState, useEffect, useRef } from "react";
import DynamicEditor from "./DynamicEditor";
import Sidebar from "./Sidebar";
import { Block } from "@blocknote/core";

export default function NoteLayout() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
  };

  const handleCreateNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "New Note",
      content: [],
    };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const handleContentChange = (content: Block[]) => {
    clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      setNotes(
        notes.map((note) =>
          note.id === selectedNoteId ? { ...note, content } : note,
        ),
      );
    }, 500);
  };

  useEffect(() => {
    typeof window !== "undefined" &&
      localStorage.getItem("notes") &&
      setNotes(JSON.parse(localStorage.getItem("notes")!));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-neutral-900">
        <Sidebar
          notes={notes}
          selectedNoteId={selectedNoteId}
          onSelectNote={handleSelectNote}
          onCreateNote={handleCreateNote}
        />
      </div>
      <div className="flex-1 bg-neutral-950">
        <DynamicEditor
          key={selectedNoteId}
          note={selectedNote}
          onContentChange={handleContentChange}
        />
      </div>
    </div>
  );
}
