"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import TextMenuBar from "./TextMenuBar";
import Image from "@tiptap/extension-image";
import { CreateLesson } from "@/types/create-course";
import { UseFormSetValue } from "react-hook-form";
import dompurify from "dompurify";
type Props = {
  content: string;
  setValue: UseFormSetValue<CreateLesson>;
  error: string | undefined;
};
const TextOption = ({ content, setValue, error }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none h-full w-full",
      },
    },
    content: content || "",
    immediatelyRender: true,
    autofocus: true,
  });

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const unsafeHtml = editor.getHTML();
      const html = dompurify.sanitize(unsafeHtml);

      setValue("content", html);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);

  return (
    <div>
      <TextMenuBar editor={editor} setValue={setValue} />
      <label className="text-xs">Content</label>
      <div
        className="overflow-y-auto h-[20rem] border-[1px] rounded-sm border-purple-500 p-4"
        id="styledScrollbar"
      >
        <EditorContent editor={editor} />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextOption;
