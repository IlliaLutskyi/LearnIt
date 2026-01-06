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
  arrayMove,
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

type Props = {
  course: DbCourse;
};
const EditSectionGroupsTab = ({ course }: Props) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm({
    resolver: zodResolver(EditSectionGroupsSchema),
    defaultValues: {
      sectionGroups: course.sectionGroups,
    },
  });
  const sectionGroups = watch("sectionGroups");
  const { update } = useFieldArray({
    control,
    name: "sectionGroups",
  });

  const saveMutation = useMutation({
    mutationFn: async (data: EditSectionGroups) => {
      const res = await api.patch(`/section-groups`, data, {
        withCredentials: true,
      });
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
        (sectionGroup) => sectionGroup.id === active.id
      );

      const newIndex = sectionGroups.findIndex(
        (sectionGroup) => sectionGroup.id === over?.id
      );

      if (oldIndex === -1 || newIndex === -1) return;

      setValue("sectionGroups", arrayMove(sectionGroups, oldIndex, newIndex), {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  async function onSubmit(data: EditSectionGroups) {
    if (!isDirty) return;
    await saveMutation.mutateAsync(data);
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg text-center font-bold">Edit Section Groups</h1>

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
                items={sectionGroups?.map((sectionGroup) => sectionGroup.id)}
                strategy={verticalListSortingStrategy}
              >
                {sectionGroups.map((sectionGroup, index) => {
                  return (
                    <SectionGroup
                      index={index}
                      sectionGroup={sectionGroup}
                      update={update}
                      key={sectionGroup.id}
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
        onClick={handleSubmit(onSubmit)}
        disabled={saveMutation.isPending}
      >
        {saveMutation.isPending ? <Loader /> : "Save"}
      </button>
    </div>
  );
};

export default EditSectionGroupsTab;
