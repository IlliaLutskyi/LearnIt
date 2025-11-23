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
import React, { memo, lazy, Suspense } from "react";
import { shiftLessons } from "@/lib/slices/create-course-slice";
import { Lesson as TLesson } from "@/types/create-course";
import { Loader } from "@/components/common";
const Lesson = lazy(() => import("./Lesson"));
type Props = {
  lessons: TLesson[];
};
const Lessons = ({ lessons }: Props) => {
  console.log("Lessons rendered");
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
          sectionGroupOrder: lessons[0].sectionGroupOrder,
          newIndex: newIndex,
          oldIndex: oldIndex,
          sectionOrder: lessons[0].sectionOrder,
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
        className="flex flex-col gap-2 overflow-y-auto h-[20rem] p-3"
        id="scrollbar"
      >
        <SortableContext
          items={lessons.map((lesson) => lesson.order)}
          strategy={verticalListSortingStrategy}
        >
          {lessons.map((lesson) => {
            return (
              <Suspense key={lesson.order} fallback={<Loader />}>
                <Lesson lesson={lesson} key={lesson.order} />
              </Suspense>
            );
          })}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default memo(Lessons);
