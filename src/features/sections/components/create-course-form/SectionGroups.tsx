"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { shiftSectionGroup } from "@/lib/slices/create-course-slice";
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
  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over?.id !== active?.id) {
      const oldIndex = sectionGroups.findIndex(
        (sectionGroup) => sectionGroup.order === active.id
      );
      const newIndex = sectionGroups.findIndex(
        (sectionGroup) => sectionGroup.order === over?.id
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
        className="flex flex-col gap-2 overflow-y-auto h-[24rem] p-2"
        id="scrollbar"
      >
        <SortableContext
          items={sectionGroups.map((sectionGroup) => sectionGroup.order)}
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

export default memo(SectionGroups);
