import { memo, Suspense, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import { HiDotsVertical } from "react-icons/hi";
import ConfirmationForm from "../common/ConfirmationForm";
import { useDispatch } from "react-redux";
import { toggleConfirmationForm } from "@/lib/slices/confirmation-form-slice";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { DbSectionGroup } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { LegacyAnimationControls } from "framer-motion";
import PropertiesForm from "@/features/sections/components/create-course-form/PropertiesForm";
import { SectionGroupProperties } from "@/features/sections/schemas/section-group-properties";

type Props = {
  sectionGroup: DbSectionGroup;
  controls: LegacyAnimationControls;
};
const SectionGroupMenu = ({ sectionGroup, controls }: Props) => {
  const [isPropertiesFormOpen, setIsPropertiesFormOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
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

  async function handleDeleteSectionGroup() {
    await deleteMutation.mutateAsync(sectionGroup.id);
  }

  function openConfirmationForm() {
    dispatch(toggleConfirmationForm(true));
  }

  async function handleSaveProperties(data: SectionGroupProperties) {
    await updateMutation.mutateAsync(data);
  }

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <HiDotsVertical />
          </MenubarTrigger>
          <MenubarContent className="pointer-events-auto">
            <MenubarItem onClick={() => setIsPropertiesFormOpen(true)}>
              Properties
            </MenubarItem>

            <MenubarSeparator />

            <MenubarItem onClick={openConfirmationForm}>
              Delete SectionGroup
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Suspense>
        <PropertiesForm
          isOpen={isPropertiesFormOpen}
          setIsOpen={setIsPropertiesFormOpen}
          sectionGroup={sectionGroup}
          onSave={handleSaveProperties}
        />
        <ConfirmationForm
          onYes={handleDeleteSectionGroup}
          warning="Are you sure, you wanna delete this section group?"
          description="This action will remove all related sections and lessons."
        />
      </Suspense>
    </>
  );
};

export default memo(SectionGroupMenu);
