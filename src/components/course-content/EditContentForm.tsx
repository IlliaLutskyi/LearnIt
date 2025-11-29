"use client";
import { DbLesson, DbSection } from "@/types";
import { memo, SetStateAction, useState } from "react";
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
import Lesson from "@/features/lessons/components/Lesson";
import { AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
type Props = {
  section: DbSection;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};
const EditContentForm = ({ section, isOpen, setIsOpen }: Props) => {
  const [lessons, setLessons] = useState<DbLesson[]>(
    section.lessons ? section.lessons : []
  );
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
  function handleSubmit() {
    return;
  }

  if (!lessons) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent
            asChild
            className="w-9/10 p-6 bg-popover text-popover-foreground"
          >
            <div className="flex flex-col gap-4">
              <DialogTitle className="text-center text-lg font-bold">
                Edit Content
              </DialogTitle>

              <section className="grow">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <div
                    className="flex flex-col gap-2 overflow-y-auto h-[25rem] max-h-full p-2"
                    id="scrollbar"
                  >
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
              </section>

              <button
                className="self-end p-2 bg-accent text-accent-foreground text-sm hover:scale-95 rounded-sm duration-500"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default memo(EditContentForm);
