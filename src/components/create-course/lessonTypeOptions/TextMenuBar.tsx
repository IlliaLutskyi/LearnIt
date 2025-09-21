"use client";
import { Editor, useEditorState } from "@tiptap/react";
import { CreateLesson } from "../CreateLessonForm";
import UploadDocButton from "../buttons/UploadDocButton";
type Props = {
  editor: Editor;
  setFormData: React.Dispatch<React.SetStateAction<CreateLesson>>;
};
const TextMenuBar = ({ editor, setFormData }: Props) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });
  return (
    <div className="flex flex-wrap gap-1 items-baseline">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        type="button"
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        type="button"
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        type="button"
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
        type="button"
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
      >
        Code
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        type="button"
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
      >
        Clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        type="button"
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
      >
        Clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        type="button"
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
      >
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        H4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        H5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        H6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        Bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        Ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        Code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        Blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        type="button"
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
      >
        Horizontal rule
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        type="button"
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
      >
        Hard break
      </button>
      <UploadDocButton editor={editor} setFormData={setFormData} />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        className="bg-gray-100 p-1 rounded-sm text-xs hover:bg-gray-200 duration-400"
        type="button"
      >
        Redo
      </button>
    </div>
  );
};

export default TextMenuBar;
