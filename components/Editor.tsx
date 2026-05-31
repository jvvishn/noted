"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { Note } from "@/types/types";
import { Block } from "@blocknote/core";

export default function Editor({note, onContentChange, onTitleChange,}: { note: Note | undefined; onContentChange: (content: Block[]) => void; onTitleChange: (title: string) => void;}) {
  const editor = useCreateBlockNote({
    initialContent: note?.content.length ? note.content : undefined,
  });

  useEditorChange((editor) => {
    onContentChange(editor.document);
  }, editor);

  if (!note) {
    return <div>Select a note</div>;
  }

  return (
    <div className="h-full p-8 overflow-y-auto">
      <input className="font-bold text-3xl border-none outline-none bg-transparent text-white w-full mb-4" placeholder="Untitled" value={note.title} onChange={(e) => onTitleChange(e.target.value)} />
      <BlockNoteView editor={editor} theme="dark" className="px-3 py-2" />
    </div>
  );
}
