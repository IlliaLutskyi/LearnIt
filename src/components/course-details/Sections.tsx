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
import { memo } from "react";
import Section from "./Section";
import { EditSectionGroups } from "@/features/sections/schemas/edit-section-group-schema";

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
      const section = sections.find((section) => section.order === active.id);
      if (!section) return;

      const oldIndex = sections.findIndex(
        (section) => section.order === active.id
      );

      const newIndex = sections.findIndex(
        (section) => section.order === over?.id
      );

      if (oldIndex === -1 || newIndex === -1) return;

      updateSections(arrayMove(sections, oldIndex, newIndex));
    }
  };
  function update(
    order: number,
    edits: EditSectionGroups["sectionGroups"][number]["sections"][number]
  ) {
    updateSections(
      sections.map((section) => {
        if (section.order === order)
          return {
            ...edits,
          };
        return section;
      })
    );
  }
  function remove(order: number) {
    const section = sections.find((section) => section.order === order);
    if (!section) return;

    if (section.action === "create")
      return updateSections(
        sections.filter((section) => section.order !== order)
      );

    return updateSections(
      sections.map((section) => {
        if (section.order === order)
          return {
            ...section,
            action: "delete",
          };

        return section;
      })
    );
  }

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
            return (
              <Section
                section={section}
                key={section.order}
                update={update}
                remove={remove}
              />
            );
          })}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default memo(Sections);
