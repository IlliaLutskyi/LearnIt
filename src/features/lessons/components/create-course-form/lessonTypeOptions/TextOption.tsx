"use client";

import { useEditor, EditorContent, generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import TextMenuBar from "./TextMenuBar";
import { CreateLesson } from "@/types/create-course";
import { UseFormSetValue } from "react-hook-form";
import Image from "@tiptap/extension-image";
// import Bold from "@tiptap/extension-bold";
// import Italic from "@tiptap/extension-italic";
// import Underline from "@tiptap/extension-underline";
// import Strike from "@tiptap/extension-strike";
// import Code from "@tiptap/extension-code";
// import CodeBlock from "@tiptap/extension-code-block";
// import Link from "@tiptap/extension-link";
// import Headline from "@tiptap/extension-heading";
// import BulletList from "@tiptap/extension-bullet-list";
// import OrderedList from "@tiptap/extension-ordered-list";
// import BlockQuote from "@tiptap/extension-blockquote";
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
    content: content
      ? generateHTML(JSON.parse(content), [StarterKit, Image])
      : null,
    immediatelyRender: true,
    autofocus: true,
  });

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const json = editor.getJSON();

      setValue("content", JSON.stringify(json));
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
        className="overflow-y-auto h-[18rem] border-[1px] rounded-sm border-purple-500 p-4"
        id="styledScrollbar"
      >
        <EditorContent editor={editor} />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextOption;
