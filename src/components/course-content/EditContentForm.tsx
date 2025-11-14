"use client";
import { DbLesson, DbSection } from "@/types";
import React, { FormEvent, memo, useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAppSelector } from "@/lib/hooks";
import BlurBackground from "../common/BlurBackground";
import Lesson from "../../features/lessons/components/Lesson";
import { toggleEditCourseContentForm } from "@/lib/slices/edit-course-content-form-slice";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { formEmergenceVariants } from "@/features/animations/form-emergence";
type Props = {
  section: DbSection;
};
const EditContentForm = ({ section }: Props) => {
  const [lessons, setLessons] = useState<DbLesson[]>();
  const formRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { isOpen } = useAppSelector((store) => store.EditCourseContent);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(e: any) {
    const { over, active } = e;
    if (!lessons) return;
    if (over?.id !== active?.id) {
      const oldIndex = lessons.findIndex(
        (lesson) => lesson.order === active.id
      );
      const newIndex = lessons.findIndex((lesson) => lesson.order === over?.id);
      return arrayMove(lessons, oldIndex, newIndex);
    }
  }
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.id === "edit-content-form-anchor" ||
        target.id === "create-lesson-anchor" ||
        target.id === "create-quiz-anchor"
      )
        return;
      if (formRef.current && !formRef.current.contains(target)) {
        dispatch(toggleEditCourseContentForm(false));
      }
    }
    document.addEventListener("click", handleClickOutside);
    setLessons(section.lessons);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!lessons) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <BlurBackground />
          <motion.div
            ref={formRef}
            variants={formEmergenceVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-9/10 bg-white rounded-sm min-h-[400px]"
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="overflow-y-auto h-[20rem] " id="scrollbar">
                <SortableContext
                  items={lessons.map((lesson) => lesson.order)}
                  strategy={verticalListSortingStrategy}
                >
                  {lessons.map((lesson) => {
                    return <Lesson key={lesson.id} lesson={lesson} />;
                  })}
                </SortableContext>
              </div>
            </DndContext>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(EditContentForm);
