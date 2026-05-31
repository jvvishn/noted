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
      title: "",
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

  const handleTitleChange = (title: string) => {
    setNotes(
      notes.map((note) =>
        note.id === selectedNoteId ? { ...note, title } : note,
      ),
    );
  };

  const handleDeleteNote = (id: string) => {
    const index = notes.findIndex((note) => note.id === id);

    if (notes.length === 1) {
      setSelectedNoteId(null);
    } else if (index === 0) {
      setSelectedNoteId(notes[index + 1].id);
    } else {
      setSelectedNoteId(notes[Math.max(0, index - 1)].id);
    }

    setNotes(notes.filter((note) => note.id !== id));
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
          onDeleteNote={handleDeleteNote}
        />
      </div>
      <div className="flex-1 bg-neutral-950">
        <DynamicEditor
          key={selectedNoteId}
          note={selectedNote}
          onContentChange={handleContentChange}
          onTitleChange={handleTitleChange}
        />
      </div>
    </div>
  );
}
