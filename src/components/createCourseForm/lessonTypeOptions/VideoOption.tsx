"use client";
import InputField from "../../common/InputField";
import { CreateLesson } from "../CreateLessonForm";

type Props = {
  setFormData: React.Dispatch<React.SetStateAction<CreateLesson>>;
  formData: CreateLesson;
};
const VideoOption = ({ formData, setFormData }: Props) => {
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <>
      <section className="flex gap-4 items-center">
        <label className="text-sm">Video Source:</label>
        <select
          value={formData.videoSource}
          onChange={handleChange}
          className="outline-0  text-sm shadow-sm p-2 rounded-md"
        >
          <option value={"Youtube"}>Youtube</option>
        </select>
      </section>
      <InputField
        label="Video URL (YouTube):"
        onChange={handleChange}
        name="content"
        value={formData.content}
        rootClassName="flex gap-1 items-center"
        placeholder="for example: https://www.youtube.com/watch?v=zHNxbJeEa"
        inputClassName="w-full text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 focus:ring-1 focus:ring-purple-500 rounded-md "
      />
    </>
  );
};

export default VideoOption;
