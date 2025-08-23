"use client";
import { CreateLesson } from "../CreateLessonForm";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import TextMenuBar from "./TextMenuBar";
import Image from "@tiptap/extension-image";

type Props = {
  setFormData: React.Dispatch<React.SetStateAction<CreateLesson>>;
  formData: CreateLesson;
};
const TextOption = ({ formData, setFormData }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none",
      },
    },
    content: formData.content,
    immediatelyRender: true,
    autofocus: true,
  });

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const html = editor.getHTML();
      setFormData((prev) => ({ ...prev, content: html }));
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);

  return (
    <div>
      <TextMenuBar editor={editor} setFormData={setFormData} />
      <label className="text-sm">Content</label>
      <div
        className="overflow-y-auto h-[270px] border-[1px] border-gray-300 p-2 rounded-sm"
        id="scrollbar"
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextOption;
