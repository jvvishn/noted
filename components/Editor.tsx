"use client"

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css"
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

export default function Editor() {
    const editor = useCreateBlockNote({});
    
    return (
        <BlockNoteView editor={editor} />
    );
}