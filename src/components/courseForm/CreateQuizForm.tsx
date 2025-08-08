"use client";
import { Answer } from "@/types/answer";
import { FormEvent, useEffect, useRef, useState } from "react";
import InputField from "../common/InputField";
import BlurBackground from "../common/BlurBackground";
import { useAppDispatch } from "@/lib/hooks";
import { addQuizToSection, editQuiz } from "@/lib/slices/CreateCourseSlice";
import { toast } from "sonner";
import Answers from "./Answers";
import { Lesson } from "@/types/lesson";
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sectionOrder: number;
  lesson?: Lesson;
};
const CreateQuizForm = ({ isOpen, sectionOrder, setIsOpen, lesson }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  console.log("Re-render createQuiz happened");
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lesson?.quiz) {
      setTitle(lesson.title);
      setQuestion(lesson.quiz.question);
      setAnswers(lesson.quiz.answers);
      setExplanation(lesson.quiz.explanation);
    }
  }, [isOpen, lesson]);
  useEffect(() => {
    document.addEventListener("mousedown", clickOutsordere);
    return () => {
      document.removeEventListener("mousedown", clickOutsordere);
    };
  }, []);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title) return toast.error("Title is required");
    if (!question) return toast.error("Question is required");
    if (answers.length <= 1)
      return toast.error("At least two options are needed");
    if (answers.some((answer) => !answer.content))
      return toast.error("All answers has to contain content");
    if (!lesson?.quiz) {
      dispatch(
        addQuizToSection({
          sectionGroupOrder: lesson?.sectionGroupId!,
          sectionOrder,
          content: { question, answers, explanation },
          title,
        })
      );
    } else {
      dispatch(
        editQuiz({
          sectionGroupOrder: lesson?.sectionGroupId!,
          sectionOrder,
          content: { question, answers, explanation },
          lessonId: lesson.order,
          title,
        })
      );
    }

    setIsOpen(false);
    toast.success(
      lesson?.quiz ? "Quiz updated successfully" : "Quiz created successfully"
    );
  }
  function clickOutsordere(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (
      formRef.current &&
      !formRef.current.contains(target) &&
      target.id !== "create-quiz-anchor"
    ) {
      setIsOpen(false);
    }
  }
  function handleAddAnswer() {
    setAnswers([...answers, { content: ``, isCorrect: false }]);
  }

  return (
    <>
      {isOpen && (
        <>
          <BlurBackground />
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 absolute top-[50%] left-1/2 translate-x-[-50%] translate-y-[-50%] p-5 w-3/4  bg-white rounded-sm"
          >
            <h1 className="text-lg font-bold self-center">Create Quiz</h1>
            <section className="flex flex-col gap-2">
              <InputField
                label="Title"
                value={title}
                inputClassName="w-full text-sm shadow-sm focus:ring-1 focus:ring-purple-500 p-2 rounded-md "
                onChange={(e) => setTitle(e.target.value)}
              />
              <section className="grid  grid-cols-2 gap-4">
                <InputField
                  label="Question"
                  multiline={true}
                  value={question}
                  inputClassName="w-full text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-md h-[6rem] resize-none"
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <InputField
                  label="Explanation (optional)"
                  value={explanation}
                  inputClassName="w-full text-sm focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-md h-[6rem] resize-none"
                  onChange={(e) => setExplanation(e.target.value)}
                  multiline={true}
                />
              </section>
            </section>
            <section className="flex flex-col gap-1">
              <button
                onClick={handleAddAnswer}
                type="button"
                className="bg-purple-500 self-end text-white p-2 rounded-sm hover:bg-purple-700 hover:scale-95 focus:scale-95 duration-500"
              >
                Add answer
              </button>
              <div className="overflow-y-auto h-[12rem]" id="scrollbar">
                <Answers answers={answers} setAnswers={setAnswers} />
              </div>
            </section>

            <button
              type="submit"
              className="bg-purple-500 self-end text-white p-2 rounded-sm hover:bg-purple-700   hover:scale-95 focus:scale-95 duration-500 mt-2"
            >
              Save
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default CreateQuizForm;
