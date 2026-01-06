import { lazy, memo, Suspense, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import { HiDotsVertical } from "react-icons/hi";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { DbSectionGroup } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { LegacyAnimationControls } from "framer-motion";
import { SectionGroupProperties } from "@/features/sections/schemas/section-group-properties";
import { EditSection } from "@/features/sections/schemas/edit-section-schema";

const SectionGroupPropertiesForm = lazy(
  () =>
    import("@/features/sections/components/create-course-form/PropertiesForm")
);
const ConfirmationForm = lazy(() => import("../common/ConfirmationForm"));
const EditContentForm = lazy(() => import("../course-content/EditContentForm"));

type Props = {
  sectionGroup: DbSectionGroup;
  controls: LegacyAnimationControls;
};
const SectionGroupMenu = ({ sectionGroup, controls }: Props) => {
  const [
    isSectionGroupPropertiesFormOpen,
    setIsSectionGroupPropertiesFormOpen,
  ] = useState(false);

  const [isConfirmationFormOpen, setIsConfirmationFormOpen] = useState(false);
  const [isAddSectionFormOpen, setIsAddSectionFormOpen] = useState(false);

  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/section-groups/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      await controls.start("hidden");

      toast.success(data.message);

      return router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { title: string; showSectionsOnly: boolean }) => {
      const res = await api.patch(`/section-groups/${sectionGroup.id}`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      return router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  const addSectionMutation = useMutation({
    mutationFn: async (data: EditSection) => {
      const res = await api.post(
        `/section-groups/${sectionGroup.id}/sections`,
        data,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      return router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });
  async function handleDeleteSectionGroup() {
    await deleteMutation.mutateAsync(sectionGroup.id);
  }

  async function handleSaveSectionGroupProperties(
    data: SectionGroupProperties
  ) {
    await updateMutation.mutateAsync(data);
  }

  async function onSaveSection(data: EditSection) {
    await addSectionMutation.mutateAsync(data);
  }

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <HiDotsVertical />
          </MenubarTrigger>
          <MenubarContent className="pointer-events-auto">
            <MenubarItem
              onClick={() => setIsSectionGroupPropertiesFormOpen(true)}
            >
              Properties
            </MenubarItem>

            <MenubarItem onClick={() => setIsAddSectionFormOpen(true)}>
              Add Section
            </MenubarItem>

            <MenubarSeparator />

            <MenubarItem onClick={() => setIsConfirmationFormOpen(true)}>
              Delete SectionGroup
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Suspense>
        <SectionGroupPropertiesForm
          isOpen={isSectionGroupPropertiesFormOpen}
          setIsOpen={setIsSectionGroupPropertiesFormOpen}
          sectionGroup={sectionGroup}
          onSave={handleSaveSectionGroupProperties}
        />
        <EditContentForm
          isOpen={isAddSectionFormOpen}
          setIsOpen={setIsAddSectionFormOpen}
          onSave={onSaveSection}
        />
        <ConfirmationForm
          isOpen={isConfirmationFormOpen}
          setIsOpen={setIsConfirmationFormOpen}
          onYes={handleDeleteSectionGroup}
          message="Are you sure?"
          description="This action will delete all sections and lessons that contains the sectionGroup"
        />
      </Suspense>
    </>
  );
};

export default memo(SectionGroupMenu);
