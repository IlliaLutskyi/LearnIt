"use client";
import { DbLesson, DbSection } from "@/types";
import React, { FormEvent, useEffect, useState } from "react";
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

type Props = {
  section: DbSection;
};
const EditContentForm = ({ section }: Props) => {
  const [lessons, setLessons] = useState<DbLesson[]>();
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
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  useEffect(() => {
    setLessons(section.lessons);
  }, []);

  if (!isOpen || !lessons) return null;
  return (
    <>
      <BlurBackground />
      <form
        className="flex flex-col gap-2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-6 w-9/10 bg-white rounded-sm min-h-[400px]"
        onSubmit={onSubmit}
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
      </form>
    </>
  );
};

export default EditContentForm;
