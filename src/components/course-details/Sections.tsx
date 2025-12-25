import { DbSection } from "@/types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
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
import { memo, useState } from "react";
import Section from "./Section";
import { EditSectionGroups } from "@/features/sections/schemas/edit-section-group-schema";
import updateSection from "@/features/sections/services/server/update-section";

type Props = {
  sections: EditSectionGroups["sectionGroups"][number]["sections"];
  updateSections: (
    sections: EditSectionGroups["sectionGroups"][number]["sections"]
  ) => void;
};
const Sections = ({ sections, updateSections }: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (!sections) return;

    if (over?.id !== active?.id) {
      const section = sections.find((section) => section.id === active.id);
      if (!section) return;

      const oldIndex = sections.findIndex(
        (section) => section.id === active.id
      );

      const newIndex = sections.findIndex((section) => section.id === over?.id);

      if (oldIndex === -1 || newIndex === -1) return;

      updateSections(arrayMove(sections, oldIndex, newIndex));
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
          items={sections.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => {
            return <Section section={section} key={section.id} />;
          })}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default memo(Sections);
