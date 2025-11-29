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
      <section className="flex gap-4 items-center">
        <label className="text-sm">Video Source:</label>
        <select
          {...register("videoSource")}
          className="outline-0  text-sm shadow-sm p-2 rounded-sm"
        >
          <option value={"Youtube"}>Youtube</option>
        </select>
      </section>
      <Input
        label="Video URL:"
        {...register("content")}
        placeholder="e.g. https://www.youtube.com/watch?v=zHNxbJeEa"
        error={error}
        className="w-full text-sm shadow-sm p-2 focus:ring-1 focus:ring-purple-500 rounded-sm"
      />
    </div>
  );
};

export default VideoOption;
