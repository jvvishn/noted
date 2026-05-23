"use client";

import { Note } from "@/types/types";
import { useState } from "react";
import DynamicEditor from "./DynamicEditor";

export default function NoteLayout() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    
    
    return (
        <div className="flex h-screen">
            <div className="w-64 bg-neutral-900">
              {/*empty for now*/}
            </div>
        <div className="flex-1 bg-neutral-950">
              <DynamicEditor />
          </div>
        </div>
    );
}