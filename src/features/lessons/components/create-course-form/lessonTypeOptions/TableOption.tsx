"use client";
import xlsx from "xlsx";
import { UseFormSetValue } from "react-hook-form";
import DropZone from "./DropZone";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
import { TableSchema } from "@/types/create-course/table";
import { toast } from "sonner";

type Props = {
  setValue: UseFormSetValue<CreateLesson>;
};
const TableOption = ({ setValue }: Props) => {
  return (
    <DropZone
      onLoad={async (file) => {
        const workbook = xlsx.read(await file.arrayBuffer(), {
          type: "buffer",
        });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const json = xlsx.utils.sheet_to_json(worksheet);

        const isValidJson = TableSchema.safeParse(json).success;

        if (!isValidJson) return toast.error("Invalid table");

        setValue("content", JSON.stringify(json));
      }}
    />
  );
};

export default TableOption;
