"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import Section from "./Section";
import { shiftSections } from "@/lib/slices/CreateCourseSlice";

const Sections = () => {
  const dispatch = useAppDispatch();
  const sections = useAppSelector((state) => state.CreateCourse.sections);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = (event: any) => {
    const { over, active } = event;

    if (over?.id !== active?.id) {
      const oldIndex = sections.findIndex(
        (section) => section.order === active.id
      );
      const newIndex = sections.findIndex(
        (section) => section.order === over.id
      );

      dispatch(shiftSections({ newIndex: newIndex, oldIndex: oldIndex }));
    }
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div
        className="flex flex-col gap-2 overflow-y-auto h-[18rem] p-3"
        id="scrollbar"
      >
        <SortableContext
          items={sections.map((section) => section.order)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => {
            return <Section section={section} key={section.order} />;
          })}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default Sections;
