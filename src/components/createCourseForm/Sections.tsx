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
import React, { memo } from "react";
import { shiftSection } from "@/lib/slices/CreateCourseSlice";
import type { Section } from "@/types/section";
import SectionItem from "./Section";

type Props = {
  sections: Section[];
};
const Sections = ({ sections }: Props) => {
  const dispatch = useAppDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = (event: any) => {
    const { over, active } = event;

    if (over?.id !== active?.id) {
      const section = sections.find((section) => section.order === active.id);
      if (!section) return;
      const oldIndex = sections.findIndex(
        (section) => section.order === active.id
      );
      const newIndex = sections.findIndex(
        (section) => section.order === over.id
      );

      dispatch(
        shiftSection({
          sectionGroupOrder: section.sectionGroupId,
          newIndex: newIndex,
          oldIndex: oldIndex,
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
        className="flex flex-col gap-2 overflow-y-auto h-[18rem] p-3"
        id="scrollbar"
      >
        <SortableContext
          items={sections.map((section) => section.order)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => {
            return <SectionItem section={section} key={section.order} />;
          })}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default memo(Sections);
