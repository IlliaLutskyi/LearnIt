"use client";
import Input from "@/components/common/Input";
import { UseFormRegister } from "react-hook-form";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";

type Props = {
  register: UseFormRegister<CreateLesson>;
  error: string | undefined;
};
const VideoOption = ({ register, error }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-1">
        <label className="text-xs">Video Source:</label>
        <select {...register("videoSource")} className="input-field">
          <option value={"Youtube"}>Youtube</option>
        </select>
      </section>
      <Input
        label="Video URL"
        {...register("content")}
        placeholder="e.g. https://www.youtube.com/watch?v=zHNxbJeEa"
        error={error}
        className="input-field"
      />
    </div>
  );
};

export default VideoOption;
