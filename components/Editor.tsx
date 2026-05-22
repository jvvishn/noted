"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

export default function Editor() {
  const saved = typeof window !== "undefined" ? localStorage.getItem("noteData") : null;
  const initialData = saved ? JSON.parse(saved) : undefined;

  const editor = useCreateBlockNote({
    initialContent: initialData,
  });

  useEditorChange((editor) => {
    localStorage.setItem("noteData", JSON.stringify(editor.document));
    console.log("saved: ", editor.document);
  }, editor);

  return <BlockNoteView editor={editor} theme="dark" />;
}
