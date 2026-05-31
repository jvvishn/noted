"use client"
import dynamic from "next/dynamic";
import { Note } from "@/types/types";
import { Block } from "@blocknote/core";

const DynamicEditor = dynamic<{ note: Note | undefined, onContentChange: (content: Block[]) => void, onTitleChange: (title: string) => void }>(
    () => import("./Editor"),
    { ssr: false }
);

export default DynamicEditor;