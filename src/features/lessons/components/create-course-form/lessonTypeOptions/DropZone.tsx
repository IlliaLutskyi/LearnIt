import { DragEvent, useRef, useState } from "react";
import { toast } from "sonner";
type Props = {
  onLoad: (buffer: ArrayBuffer, file: File) => void;
  error?: string;
  label?: string;
};
const DropZone = ({ onLoad, error, label }: Props) => {
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "loading" | "complete"
  >("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDropFile(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();

    setUploadStatus("loading");

    const file = e.dataTransfer?.files[0];
    if (!file) return toast.error("No file was dropped");

    const reader = new FileReader();

    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      onLoad(buffer, file);
      setUploadStatus("complete");
    };

    reader.readAsArrayBuffer(file);
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setUploadStatus("loading");

    const file = e.target.files![0];
    if (!file) return toast.error("No file was uploaded");

    const reader = new FileReader();

    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;

      onLoad(buffer, file);

      setUploadStatus("complete");
    };

    reader.readAsArrayBuffer(file);
  }
  return (
    <section
      className="flex flex-col gap-2"
      onDrop={handleDropFile}
      onDragEnter={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs">{label}</label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`w-full border-[1px] rounded-sm h-[15rem] text-sm ${
            uploadStatus === "complete"
              ? "border-green-500 text-green-500"
              : "text-purple-400 border-purple-400 hover:border-purple-700 hover:text-purple-700"
          } duration-200`}
        >
          {uploadStatus == "complete" && "Upload completed, you can save now"}
          {uploadStatus == "idle" && "Click to upload or drag and drop a file"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileUpload}
      />
      <p className="text-xs text-error">{error}</p>
    </section>
  );
};

export default DropZone;
