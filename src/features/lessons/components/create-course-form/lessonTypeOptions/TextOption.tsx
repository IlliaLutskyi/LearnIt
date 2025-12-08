"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import TextMenuBar from "./TextMenuBar";
import Image from "@tiptap/extension-image";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
import { UseFormSetValue } from "react-hook-form";
import { extensions } from "@/features/lessons/lib/tiptap-extensions";
type Props = {
  isOpen: boolean;
  content: string;
  setValue: UseFormSetValue<CreateLesson>;
  error: string | undefined;
};
const TextOption = ({ isOpen, content, setValue, error }: Props) => {
  const editor = useEditor({
    extensions: [
      ...extensions,
      Image.configure({
        allowBase64: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm bg-background **:text-foreground focus:outline-none h-full w-full whitespace-pre-wrap",
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
    if (content && isOpen) {
      editor.commands.setContent(content);
    }
  }, [isOpen]);

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
