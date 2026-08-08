"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { Note } from "@/types/types";
import { Block } from "@blocknote/core";

export default function Editor({
  note,
  onContentChange,
  onTitleChange,
}: {
  note: Note | undefined;
  onContentChange: (content: Block[]) => void;
  onTitleChange: (title: string) => void;
}) {
  const editor = useCreateBlockNote({
    initialContent: note?.content.length ? note.content : undefined,
  });

  useEditorChange((editor) => {
    onContentChange(editor.document);
  }, editor);

  const handleExport = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (note.title || "untitled") + ".md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePDFExport = async () => {
    const html = await editor.blocksToHTMLLossy(editor.document);
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
  <html>
    <head>
      <title>${note.title || "Untitled"}</title>
    </head>
    <body>
      <h1>${note.title || "Untitled"}</h1>
      ${html}
    </body>
  </html>
`);
    printWindow.document.close();
    printWindow.print();
  };

  if (!note) {
    return <div className="bg-neutral-950 flex items-center justify-center h-full p-16">
      <div className="bg-neutral-900 rounded-4xl flex flex-col gap-4 w-full h-full items-center justify-center">
        <div className="text-2xl font-semibold text-neutral-400">Select or create a note.</div>
      </div>
    </div>
  }

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="flex items-center mb-4">
        <input
          className="font-bold text-3xl border-none outline-none bg-transparent text-white w-full"
          placeholder="Untitled"
          value={note.title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <button onClick={handleExport} className="ml-2 px-3 py-1 bg-neutral-700 text-white text-sm rounded-md hover:bg-neutral-600 cursor-pointer">
          Export Markdown
        </button>
        <button onClick={handlePDFExport} className="ml-2 px-3 py-1 bg-neutral-700 text-white text-sm rounded-md hover:bg-neutral-600 cursor-pointer">
          Export PDF
        </button>
      </div>
      <BlockNoteView editor={editor} theme="dark" className="px-3 py-2" />
    </div>
  );
}
