"use client";
import dompurify from "dompurify";
import { UseFormSetValue } from "react-hook-form";
import DropZone from "./DropZone";
import { marked } from "marked";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
type Props = {
  setValue: UseFormSetValue<CreateLesson>;
};
const MarkdownOption = ({ setValue }: Props) => {
  return (
    <DropZone
      onLoad={async (file) => {
        const text = new TextDecoder("utf-8").decode(file);

        const unsafeHtml = await marked.parse(text);
        const html = dompurify.sanitize(unsafeHtml);

        setValue("content", html);
      }}
    />
  );
};

export default MarkdownOption;
