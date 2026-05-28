"use client";

import { Note } from "@/types/types";
import { useState, useEffect } from "react";
import DynamicEditor from "./DynamicEditor";
import Sidebar from "./Sidebar";
import { Block } from "@blocknote/core";

export default function NoteLayout() {
  console.log("NoteLayout rendering");
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const handleSelectNote = (id: string) => {
    console.log("Selected note ID:", id);
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
    setNotes(
      notes.map((note) =>
        note.id === selectedNoteId ? { ...note, content } : note,
      ),
    );
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
