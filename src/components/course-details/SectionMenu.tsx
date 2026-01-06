"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { lazy, memo, Suspense, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LegacyAnimationControls } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { DbSection } from "@/types";
import { useRouter } from "next/navigation";

const ConfirmationForm = lazy(() => import("../common/ConfirmationForm"));
type Props = {
  section: DbSection;
  controls: LegacyAnimationControls;
};
const SectionMenu = ({ section, controls }: Props) => {
  const router = useRouter();
  const [isConfirmationFormOpen, setIsConfirmationFormOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/sections/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      await controls.start("exit");

      toast.success(data.message);

      return router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });

  async function onYes() {
    await deleteMutation.mutateAsync(section.id);
  }

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <HiDotsVertical />
          </MenubarTrigger>
          <MenubarContent className="pointer-events-auto">
            <MenubarItem onClick={() => setIsConfirmationFormOpen(true)}>
              Delete Section
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Suspense>
        <ConfirmationForm
          message="Are you sure?"
          description="This action cannot be undone and will delete all lessons in this section"
          isOpen={isConfirmationFormOpen}
          setIsOpen={setIsConfirmationFormOpen}
          onYes={onYes}
        />
      </Suspense>
    </>
  );
};

export default memo(SectionMenu);
