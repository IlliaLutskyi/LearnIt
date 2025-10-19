"use client";
import { Answer } from "@/types/create-course/answer";
import { useEffect, useRef, useState } from "react";

import BlurBackground from "../common/BlurBackground";
import { useAppDispatch } from "@/lib/hooks";
import { addQuizToSection, editQuiz } from "@/lib/slices/create-course-slice";
import { toast } from "sonner";
import Answers from "./Answers";
import { Lesson } from "@/types/create-course";
import Input from "../common/Input";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sectionOrder: number;
  sectionGroupOrder: number;
  lesson?: Lesson;
};
const CreateQuizForm = ({
  isOpen,
  sectionOrder,
  sectionGroupOrder,
  setIsOpen,
  lesson,
}: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

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
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title) return toast.error("Title is required");
    if (!question) return toast.error("Question is required");
    if (answers.length <= 1)
      return toast.error("At least two options are needed");
    if (answers.some((answer) => !answer.content))
      return toast.error("All answers have to contain a content");
    if (!lesson?.quiz) {
      dispatch(
        addQuizToSection({
          sectionGroupOrder,
          sectionOrder,
          quiz: { question, answers, explanation },
          title,
        })
      );
    } else {
      dispatch(
        editQuiz({
          sectionGroupOrder,
          sectionOrder,
          quiz: { question, answers, explanation },
          lessonId: lesson.order,
          title,
        })
      );
    }
    toast.success(
      lesson?.quiz ? "Quiz updated successfully" : "Quiz created successfully"
    );
    setIsOpen(false);
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

  if (!isOpen) return null;

  return (
    <>
      <BlurBackground />
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col gap-2 absolute top-[50%] left-1/2 translate-x-[-50%] translate-y-[-50%] p-5 w-5/6 bg-white rounded-sm"
      >
        <h1 className="text-lg font-bold self-center">Create Quiz</h1>
        <section className="flex flex-col gap-2">
          <Input
            label="title"
            value={title}
            className="w-full text-sm shadow-sm outline-none focus:ring-1 focus:ring-purple-500 p-2 rounded-sm"
            onChange={(e) => setTitle(e.target.value)}
          />
          <section className="grid grid-cols-2 gap-4">
            <Input
              label="question"
              multiline={true}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full text-sm outline-none focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm h-[6rem] resize-none"
            />
            <Input
              label="Explanation (optional)"
              value={explanation}
              className="w-full text-sm outline-none focus:ring-1 focus:ring-purple-500 shadow-sm p-2 rounded-sm h-[6rem] resize-none"
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
      +
    </>
  );
};

export default CreateQuizForm;
