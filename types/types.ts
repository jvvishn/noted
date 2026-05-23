import { Block } from "@blocknote/core";

export interface Note {
  id: string;
  title: string;
  content: Block[];
}