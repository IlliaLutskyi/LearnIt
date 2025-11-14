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
} from "@/lib/slices/create-course-slice";
import { ContentType, Section } from "@/types/create-course";
import { lazy, memo, Suspense, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LegacyAnimationControls } from "framer-motion";
import { CreateLesson } from "@/features/lessons/schemas/create-lesson-schema";
import { CreateQuiz } from "@/features/quizes/schemas/create-quiz";
import GenerateLessonForm from "@/features/lessons/components/create-course-form/GenerateLessonForm";
const CreateLessonForm = lazy(
  () =>
    import("@/features/lessons/components/create-course-form/CreateLessonForm")
);
const CreateQuizForm = lazy(
  () => import("@/features/quizes/components/create-course-form/CreateQuizForm")
);
const RenameForm = lazy(() => import("./RenameForm"));
type Props = {
  section: Section;
  controlls: LegacyAnimationControls;
};
const SectionMenu = ({ section, controlls }: Props) => {
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const [isRenameSectionOpen, setIsRenameSectionOpen] = useState(false);
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [isGenerateLessonOpen, setIsGenerateLessonOpen] = useState(false);
  const dispatch = useAppDispatch();
  async function handleDeleteSection() {
    await controlls.start("exit");
    dispatch(
      deleteSection({
        sectionGroupOrder: section.sectionGroupOrder,
        sectionOrder: section.order,
      })
    );
  }
  function handleAddLesson() {
    setIsCreateLessonOpen(true);
  }
  function handleAddQuiz() {
    setIsCreateQuizOpen(true);
  }
  function handleRenameSection() {
    setIsRenameSectionOpen(true);
  }
  function handleGenerateLesson() {
    setIsGenerateLessonOpen(true);
  }
  function onSaveLesson(data: CreateLesson) {
    dispatch(
      addLessonToSection({
        sectionGroupOrder: section.sectionGroupOrder,
        sectionOrder: section.order,
        content: data.content,
        contentType: data.contentType,
        title: data.title,
        videoSource: data.videoSource,
      })
    );
  }
  function onSaveGenerateLesson(data: {
    content: string;
    title: string;
    contentType: ContentType;
  }) {
    dispatch(
      addLessonToSection({
        sectionGroupOrder: section.sectionGroupOrder,
        sectionOrder: section.order,
        content: data.content,
        contentType: data.contentType,
        title: data.title,
      })
    );
  }
  function onSaveQuiz(data: CreateQuiz) {
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
  }
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <HiDotsVertical />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={handleAddQuiz} id="create-quiz-anchor">
              Add Quiz
            </MenubarItem>
            <MenubarItem onClick={handleAddLesson} id="create-lesson-anchor">
              Add Lesson
            </MenubarItem>
            <MenubarItem onClick={handleRenameSection} id="rename-anchor">
              Rename
            </MenubarItem>
            <MenubarItem
              onClick={handleGenerateLesson}
              id="generate-lesson-anchor"
            >
              Generate Lesson With AI
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
          isOpen={isRenameSectionOpen}
          section={section}
          setIsOpen={setIsRenameSectionOpen}
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
      </Suspense>
    </>
  );
};

export default memo(SectionMenu);
