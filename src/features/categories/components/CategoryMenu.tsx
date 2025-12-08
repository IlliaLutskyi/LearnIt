"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import api from "@/lib/axios";
import { useAppDispatch } from "@/lib/hooks";
import {
  setCategory,
  toggleAddOrEditCategoryForm,
} from "@/lib/slices/add-or-edit-category-form-slice";
import { DbCategory } from "@/types";
import { MenubarMenu } from "@radix-ui/react-menubar";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { HiDotsVertical } from "react-icons/hi";
import { toast } from "sonner";

type Props = {
  category: DbCategory;
};
const CategoryMenu = ({ category }: Props) => {
  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await api.delete(`/categories/${category.id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);

      router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) return toast.error(err.response?.data.message);
    },
  });
  const dispatch = useAppDispatch();

  async function deleteCategory() {
    await deleteMutation.mutateAsync();
  }
  function editCategory() {
    dispatch(setCategory(category));
    dispatch(toggleAddOrEditCategoryForm(true));
  }
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <HiDotsVertical />
        </MenubarTrigger>

        <MenubarContent>
          <MenubarItem onClick={editCategory}>Edit</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={deleteCategory}>Delete</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default CategoryMenu;
