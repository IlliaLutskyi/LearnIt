"use client";
import { useAppDispatch } from "@/lib/hooks";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { memo } from "react";
import Lesson from "./Lesson";
import { shiftLessons } from "@/lib/slices/CreateCourseSlice";

type Props = {
  lessons: Lesson[];
};
const Lessons = ({ lessons }: Props) => {
  const dispatch = useAppDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over?.id !== active?.id) {
      const oldIndex = lessons.findIndex(
        (lesson) => lesson.order === active.id
      );
      const newIndex = lessons.findIndex((lesson) => lesson.order === over?.id);

      dispatch(
        shiftLessons({
          newIndex: newIndex,
          oldIndex: oldIndex,
          sectionOrder: lessons[0].sectionId,
        })
      );
    }
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div
        className="flex flex-col gap-2 overflow-y-auto h-[20rem]  p-3 "
        id="scrollbar"
      >
        <SortableContext
          items={lessons.map((lesson) => lesson.order)}
          strategy={verticalListSortingStrategy}
        >
          {lessons.map((lesson) => {
            return <Lesson lesson={lesson} key={lesson.order} />;
          })}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default memo(Lessons);
