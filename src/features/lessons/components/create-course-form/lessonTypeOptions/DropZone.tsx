import React, { DragEvent, useRef, useState } from "react";
import { toast } from "sonner";
type Props = {
  onLoad?: (file: File) => void;
  previewComponent?: (
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => React.ReactNode;
  message?: string;
  error?: string;
  label?: string;
};
const DropZone = ({
  onLoad,
  error,
  label,
  message = "Click to upload or drag and drop a file",
  previewComponent,
}: Props) => {
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
      onLoad?.(file);
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
      onLoad?.(file);

      setUploadStatus("complete");
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <section
      className="h-full"
      onDrop={handleDropFile}
      onDragEnter={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
    >
      {previewComponent ? (
        previewComponent(inputRef)
      ) : (
        <div className="flex flex-col gap-1 h-full">
          <label htmlFor="file-upload" className="text-xs">
            {label}
          </label>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={`w-full h-full p-2 border-[1px] rounded-sm text-sm ${
              uploadStatus === "complete"
                ? "border-success text-success"
                : "text-accent border-accent hover:border-secondary-accent hover:text-secondary-accent"
            } duration-400`}
          >
            {uploadStatus == "complete" && "Upload completed, you can save now"}
            {uploadStatus == "idle" && message}
          </button>

          <p className="text-xs text-error">{error}</p>
        </div>
      )}

      <input
        id="file-upload"
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileUpload}
      />
    </section>
  );
};

export default DropZone;
