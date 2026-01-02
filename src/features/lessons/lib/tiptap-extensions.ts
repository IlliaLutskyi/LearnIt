import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";

export const extensions = [
  StarterKit,
  Image.configure({
    allowBase64: true,
  }),
];
