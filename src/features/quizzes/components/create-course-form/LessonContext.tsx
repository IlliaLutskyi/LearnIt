import { Lesson } from "@/types/create-course";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { GenerateQuiz } from "../../schemas/generate-quiz";
type Props = {
  lesson: Lesson;
  fields: FieldArrayWithId<GenerateQuiz, "contents", "id">[];
  append: UseFieldArrayAppend<GenerateQuiz, "contents">;
  remove: UseFieldArrayRemove;
};
const LessonContext = ({ lesson, fields, append, remove }: Props) => {
  const isActive = fields.some((field) => field.value === lesson.content);
  function handleSelect() {
    const itemIndex = fields.findIndex(
      (field) => field.value === lesson.content
    );
    if (isActive && itemIndex !== -1) {
      remove(itemIndex);
    } else {
      append({ value: lesson.content || "" });
    }
  }

  return (
    <button
      type="button"
      className={`flex items-center justify-start text-md ${
        isActive
          ? "border-accent ring-1 bg-purple-50 text-accent scale-95"
          : "ring-1 hover:ring-accent hover:text-accent hover:bg-purple-50"
      } p-2 rounded-sm duration-400`}
      onClick={handleSelect}
    >
      <h1>{lesson.title}</h1>
    </button>
  );
};

export default LessonContext;
