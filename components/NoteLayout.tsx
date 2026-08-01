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
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const isResizingRef = useRef(false);

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

  const handleMouseDown = () => {
    isResizingRef.current = true;
  }

  useEffect(() => {
  const saved = localStorage.getItem("notes");
  if (saved) setNotes(JSON.parse(saved));
}, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return;
      setSidebarWidth(Math.max(150, Math.min(500, e.clientX)));
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div className="bg-neutral-900" style={{ width: sidebarWidth }}>
        <Sidebar
          notes={notes}
          selectedNoteId={selectedNoteId}
          onSelectNote={handleSelectNote}
          onCreateNote={handleCreateNote}
          onDeleteNote={handleDeleteNote}
        />
      </div>
      <div className="w-1 cursor-col-resize bg-neutral-700 hover:bg-blue-500 transition-colors" onMouseDown={handleMouseDown}/>
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
