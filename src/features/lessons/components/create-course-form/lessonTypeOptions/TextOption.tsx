"use client";
import { useEditor, EditorContent, generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import TextMenuBar from "./TextMenuBar";
import { UseFormSetValue } from "react-hook-form";
import Image from "@tiptap/extension-image";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
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
        class:
          "prose prose-sm focus:outline-none h-full w-full whitespace-pre-wrap",
      },
    },
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

  useEffect(() => {
    if (content) {
      editor.commands.setContent(
        generateHTML(JSON.parse(content), [StarterKit, Image])
      );
    } else {
      editor.commands.clearContent();
    }
  }, [content]);

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
