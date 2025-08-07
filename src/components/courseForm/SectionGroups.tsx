"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { shiftSectionGroup } from "@/lib/slices/CreateCourseSlice";
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
import SectionGroup from "./SectionGroup";

const SectionGroups = () => {
  const dispatch = useAppDispatch();
  const sectionGroups = useAppSelector(
    (state) => state.CreateCourse.sectionGroups
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = (event: any) => {
    const { over, active } = event;

    if (over?.id !== active?.id) {
      const oldIndex = sectionGroups.findIndex(
        (section) => section.order === active.id
      );
      const newIndex = sectionGroups.findIndex(
        (section) => section.order === over.id
      );
      dispatch(shiftSectionGroup({ newIndex, oldIndex }));
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
          items={sectionGroups.map((sectionGroup) => sectionGroup.order)}
          key={"sectionGroups"}
          strategy={verticalListSortingStrategy}
        >
          {sectionGroups.map((sectionGroup) => {
            return (
              <SectionGroup
                sectionGroup={sectionGroup}
                key={sectionGroup.order}
              />
            );
          })}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default SectionGroups;
