"use client";
import { CreateLesson } from "../CreateLessonForm";
import { generateHTML } from "@tiptap/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import TextMenuBar from "./TextMenuBar";

type Props = {
  setFormData: React.Dispatch<React.SetStateAction<CreateLesson>>;
  formData: CreateLesson;
};
const TextOption = ({ formData, setFormData }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none",
      },
    },
    content: formData.content
      ? generateHTML(JSON.parse(formData.content), [StarterKit.configure()])
      : "",
    immediatelyRender: true,
    autofocus: true,
  });

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const json = editor.getJSON();
      setFormData((prev) => ({ ...prev, content: JSON.stringify(json) }));
    };

    editor.on("update", handleUpdate);

    // Cleanup
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);

  return (
    <div>
      <TextMenuBar editor={editor} />
      <label className="text-sm">Content</label>
      <div
        className="overflow-y-auto h-[250px] border-[1px] border-gray-300 p-2 rounded-sm"
        id="scrollbar"
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextOption;
