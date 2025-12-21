import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
import DropZone from "./DropZone";
import { UseFormSetValue } from "react-hook-form";

type Props = {
  setValue: UseFormSetValue<CreateLesson>;
};
const ImageOption = ({ setValue }: Props) => {
  return (
    <DropZone
      onLoad={async (file) => {
        const string = Buffer.from(await file.arrayBuffer()).toString("base64");
        const base64 = `data:${file.type};base64,${string}`;
        setValue("content", base64, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }}
    />
  );
};

export default ImageOption;
