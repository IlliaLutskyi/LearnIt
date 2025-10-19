"use client";

import { CreateLesson } from "@/types/create-course";
import xlsx from "xlsx";
import { DragEvent, useRef, useState } from "react";
import { toast } from "sonner";
import dompurify from "dompurify";
import { SetValueConfig, UseFormSetValue } from "react-hook-form";

type Props = {
  setValue: UseFormSetValue<CreateLesson>;
};
const TableOption = ({ setValue }: Props) => {
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "loading" | "complete"
  >("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDropFile(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setUploadStatus("loading");
    const file = e.dataTransfer?.files[0];
    if (!file) return toast.error("No file was dropped");
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      const workbook = xlsx.read(buffer, { type: "buffer" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const unsafeHtml = xlsx.utils.sheet_to_html(worksheet);
      const html = dompurify.sanitize(unsafeHtml);

      setValue("content", html);
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
      const workbook = xlsx.read(buffer, { type: "buffer" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const html = xlsx.utils.sheet_to_html(worksheet);

      setValue("content", html);
      setUploadStatus("complete");
    };
    reader.readAsArrayBuffer(file);
  }
  return (
    <div>
      <section
        onDrop={handleDropFile}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
      >
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
          {uploadStatus == "idle" && "Click to upload or drag and drop"}
        </button>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
      </section>
    </div>
  );
};

export default TableOption;
