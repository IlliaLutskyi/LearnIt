import { DbCourse } from "@/types";
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SectionGroup from "../SectionGroup";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditSectionGroups,
  EditSectionGroupsSchema,
} from "@/features/sections/schemas/edit-section-group-schema";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { Loader } from "@/components/common";
import { SectionGroupProperties } from "@/features/sections/schemas/section-group-properties";
import { lazy, Suspense, useState } from "react";
import ConfirmationForm from "@/components/common/ConfirmationForm";
import Change from "../Change";

const SectionGroupPropertiesForm = lazy(
  () =>
    import("@/features/sections/components/create-course-form/PropertiesForm")
);
const ConformationForm = lazy(
  () => import("@/components/common/ConfirmationForm")
);

type Props = {
  course: DbCourse;
};
const EditSectionGroupsTab = ({ course }: Props) => {
  const router = useRouter();

  const [isConfirmationFormOpen, setIsConfirmationFormOpen] = useState(false);

  const [
    isSectionGroupPropertiesFormOpen,
    setIsSectionGroupPropertiesFormOpen,
  ] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    resolver: zodResolver(EditSectionGroupsSchema),
    defaultValues: {
      sectionGroups: course.sectionGroups ? course.sectionGroups : [],
    },
  });

  const {
    fields: sectionGroups,
    update,
    append,
    remove,
    swap,
  } = useFieldArray({
    control,
    name: "sectionGroups",
    keyName: "key",
  });
  const saveMutation = useMutation({
    mutationFn: async (data: EditSectionGroups) => {
      const res = await api.patch(
        `/courses/${course.id}/section-groups`,
        data,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      return router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (!sectionGroups) return;
    if (over?.id !== active?.id) {
      const oldIndex = sectionGroups.findIndex(
        (sectionGroup) => sectionGroup.order === active.id
      );

      const newIndex = sectionGroups.findIndex(
        (sectionGroup) => sectionGroup.order === over?.id
      );

      if (oldIndex === -1 || newIndex === -1) return;

      swap(oldIndex, newIndex);
    }
  };
  async function createSectionGroup(data: SectionGroupProperties) {
    append({
      order: sectionGroups.length + 1,
      sections: [],
      action: "create",
      ...data,
    });
  }
  function showChanges() {
    const sections = sectionGroups
      .map((sectionGroup) => sectionGroup.sections)
      .flatMap((section) => section);
    return (
      <section className="flex flex-col gap-3">
        {sectionGroups.map((sectionGroup) => {
          if (!sectionGroup.action) return null;
          return (
            <Change
              changeType={sectionGroup.action}
              title={sectionGroup.title}
              key={sectionGroup.order}
            />
          );
        })}
        {sections.map((section) => {
          if (!section.action) return null;
          return (
            <Change
              changeType={section.action}
              title={section.title}
              key={section.order}
            />
          );
        })}
      </section>
    );
  }
  async function onSubmit(data: EditSectionGroups) {
    if (!isDirty) return;
    await saveMutation.mutateAsync(data);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg text-center font-bold">Edit Section Groups</h1>

        <section className="self-end">
          <button
            className="button-base"
            onClick={() => setIsSectionGroupPropertiesFormOpen(true)}
          >
            Add SectionGroup
          </button>
        </section>

        <section>
          {sectionGroups && (
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
                  items={sectionGroups.map(
                    (sectionGroup) => sectionGroup.order
                  )}
                  strategy={verticalListSortingStrategy}
                >
                  {sectionGroups.map((sectionGroup, index) => {
                    return (
                      <SectionGroup
                        index={index}
                        sectionGroup={sectionGroup}
                        update={update}
                        remove={remove}
                        key={sectionGroup.order}
                      />
                    );
                  })}
                </SortableContext>
              </div>
            </DndContext>
          )}
        </section>

        <button
          className="self-end bg-accent text-accent-foreground text-sm p-2 rounded-sm hover:scale-95 duration-400"
          onClick={() => setIsConfirmationFormOpen(true)}
          disabled={saveMutation.isPending || !isDirty}
        >
          {saveMutation.isPending ? <Loader /> : "Save"}
        </button>
      </div>

      <Suspense>
        <SectionGroupPropertiesForm
          isOpen={isSectionGroupPropertiesFormOpen}
          setIsOpen={setIsSectionGroupPropertiesFormOpen}
          onSave={createSectionGroup}
          sectionGroupProperties={{
            state: "Indevelopment",
          }}
        />
        <ConfirmationForm
          isOpen={isConfirmationFormOpen}
          setIsOpen={setIsConfirmationFormOpen}
          onYes={handleSubmit(onSubmit)}
          message="Are you sure you want to save changes?"
          description="This action cannot be undone."
          body={showChanges()}
        />
      </Suspense>
    </>
  );
};

export default EditSectionGroupsTab;
