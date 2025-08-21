import mammoth from "mammoth";
import { CreateLesson } from "../CreateLessonForm";
import { toast } from "sonner";
import { Editor } from "@tiptap/react";
type Props = {
  editor: Editor;
  setFormData: React.Dispatch<React.SetStateAction<CreateLesson>>;
};
const UploadDocButton = ({ editor, setFormData }: Props) => {
  async function handleFileConvert(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    if (!file) return;
    try {
      const result = await mammoth.convertToHtml(
        {
          arrayBuffer: await file.arrayBuffer(),
        },
        {
          convertImage: mammoth.images.imgElement(function (image) {
            return image.read("base64").then(function (imageBuffer) {
              return {
                src: "data:" + image.contentType + ";base64," + imageBuffer,
              };
            });
          }),
        }
      );

      setFormData((prev) => ({ ...prev, content: result.value }));
      editor.commands.setContent(result.value!);
      toast.success("File was converted successfully", { duration: 5000 });
    } catch (err) {
      return toast.error("File must be in .docx or .doc format", {
        duration: 5000,
      });
    }
  }
  return (
    <div>
      <label htmlFor="docs">
        <span className="bg-gray-100 px-2 rounded-sm text-xs hover:bg-gray-200 duration-400">
          Upload Document
        </span>
      </label>
      <input
        type="file"
        className="hidden"
        id="docs"
        onChange={handleFileConvert}
      />
    </div>
  );
};

export default UploadDocButton;
