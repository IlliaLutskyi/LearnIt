"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAppDispatch } from "@/lib/hooks";
import {
  addLessonToSection,
  addQuizToSection,
  deleteSection,
  editSection,
} from "@/lib/slices/create-course-slice";
import { Quiz, Section } from "@/types/create-course";
import { lazy, memo, Suspense, useState } from "react";
import { SiGooglegemini } from "react-icons/si";
import { HiDotsVertical } from "react-icons/hi";
import { LegacyAnimationControls } from "framer-motion";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
import { CreateQuiz } from "@/features/quizzes/schemas/create-quiz";
import { toast } from "sonner";
import { GenerateQuiz } from "@/features/quizzes/schemas/generate-quiz";
import { GenerateLesson } from "@/features/lessons/schemas/generate-lesson-schema";
import { AiResponse } from "@/features/lessons/schemas/ai-response-schema";
import { SectionProperties } from "../../schemas/section-properties-schema";
const CreateLessonForm = lazy(
  () =>
    import("@/features/lessons/components/create-course-form/CreateLessonForm")
);
const CreateQuizForm = lazy(
  () =>
    import("@/features/quizzes/components/create-course-form/CreateQuizForm")
);
const RenameForm = lazy(() => import("./RenameForm"));
const GenerateLessonForm = lazy(
  () =>
    import(
      "@/features/lessons/components/create-course-form/GenerateLessonForm"
    )
);
const GenerateQuizForm = lazy(
  () =>
    import("@/features/quizzes/components/create-course-form/GenerateQuizForm")
);
type Props = {
  section: Section;
  controls: LegacyAnimationControls;
};
const SectionMenu = ({ section, controls }: Props) => {
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const [isSectionPropertiesOpen, setIsSectionPropertiesOpen] = useState(false);
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [isGenerateLessonOpen, setIsGenerateLessonOpen] = useState(false);
  const [isGenerateQuizOpen, setIsGenerateQuizOpen] = useState(false);

  const dispatch = useAppDispatch();
  async function handleDeleteSection() {
    await controls.start("exit");
    dispatch(
      deleteSection({
        sectionGroupOrder: section.sectionGroupOrder,
        sectionOrder: section.order,
      })
    );
  }
  async function onSaveLesson(data: CreateLesson) {
    dispatch(
      addLessonToSection({
        sectionGroupOrder: section.sectionGroupOrder,
        sectionOrder: section.order,
        ...data,
      })
    );
  }
  async function onSaveSectionProperties(data: SectionProperties) {
    dispatch(
      editSection({
        sectionGroupOrder: section.sectionGroupOrder,
        title: data.title,
        sectionOrder: section.order,
      })
    );
  }
  async function onSaveGenerateLesson(
    data: GenerateLesson & { lesson: AiResponse }
  ) {
    dispatch(
      addLessonToSection({
        sectionGroupOrder: section.sectionGroupOrder,
        sectionOrder: section.order,
        content: data.lesson.content,
        contentType: data.lesson.contentType,
        title: data.title,
      })
    );

    toast.message("Lesson added");
  }
  async function onSaveGenerateQuiz(
    data: GenerateQuiz & { quizzes: (Quiz & { title: string })[] }
  ) {
    data.quizzes.forEach((quiz) => {
      dispatch(
        addQuizToSection({
          quiz: {
            answers: quiz.answers,
            explanation: quiz.explanation,
            question: quiz.question,
          },
          sectionGroupOrder: section.sectionGroupOrder,
          sectionOrder: section.order,
          title: quiz.title,
        })
      );
    });

    toast.success(data.quizzes.length > 1 ? "Quizzes added" : "Quiz added");
  }
  async function onSaveQuiz(data: CreateQuiz) {
    dispatch(
      addQuizToSection({
        quiz: {
          answers: data.answers,
          explanation: data.explanation,
          question: data.question,
        },
        sectionGroupOrder: section.sectionGroupOrder,
        sectionOrder: section.order,
        title: data.title,
      })
    );

    toast.message("Quiz added");
  }
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <HiDotsVertical />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() => setIsCreateQuizOpen(true)}
              id="create-quiz-anchor"
            >
              Add Quiz
            </MenubarItem>
            <MenubarItem
              onClick={() => setIsCreateLessonOpen(true)}
              id="create-lesson-anchor"
            >
              Add Lesson
            </MenubarItem>
            <MenubarItem
              onClick={() => setIsSectionPropertiesOpen(true)}
              id="rename-anchor"
            >
              Properties
            </MenubarItem>
            <MenubarItem
              onClick={() => setIsGenerateLessonOpen(true)}
              id="generate-lesson-anchor"
            >
              <SiGooglegemini /> Generate Lesson With AI
            </MenubarItem>
            <MenubarItem
              onClick={() => setIsGenerateQuizOpen(true)}
              id="generate-lesson-anchor"
            >
              <SiGooglegemini /> Generate Quiz With AI
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleDeleteSection}>
              Delete Section
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Suspense>
        <CreateLessonForm
          isOpen={isCreateLessonOpen}
          setIsOpen={setIsCreateLessonOpen}
          onSave={onSaveLesson}
        />
        <RenameForm
          isOpen={isSectionPropertiesOpen}
          section={section}
          setIsOpen={setIsSectionPropertiesOpen}
          onSave={onSaveSectionProperties}
        />
        <CreateQuizForm
          isOpen={isCreateQuizOpen}
          onSave={onSaveQuiz}
          setIsOpen={setIsCreateQuizOpen}
        />
        <GenerateLessonForm
          isOpen={isGenerateLessonOpen}
          setIsOpen={setIsGenerateLessonOpen}
          onSave={onSaveGenerateLesson}
        />
        <GenerateQuizForm
          isOpen={isGenerateQuizOpen}
          setIsOpen={setIsGenerateQuizOpen}
          lessons={section.lessons}
          onSave={onSaveGenerateQuiz}
        />
      </Suspense>
    </>
  );
};

export default memo(SectionMenu);
