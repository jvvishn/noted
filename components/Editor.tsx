"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { Note } from "@/types/types";
import { Block } from "@blocknote/core";

export default function Editor({ note, onContentChange }: { note: Note | undefined; onContentChange: (content: Block[]) => void }) {
  const editor = useCreateBlockNote({
  initialContent: note?.content.length ? note.content : undefined
  });

  useEditorChange((editor) => {
    onContentChange(editor.document);
  }, editor);

  if (!note) {
    return <div>Select a note</div>;
  }

  return <BlockNoteView editor={editor} theme="dark" />;
}
