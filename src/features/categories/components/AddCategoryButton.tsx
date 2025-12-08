"use client";
import { useAppDispatch } from "@/lib/hooks";
import { toggleAddOrEditCategoryForm } from "@/lib/slices/add-or-edit-category-form-slice";

const AddCategoryButton = () => {
  const dispatch = useAppDispatch();
  function openAddCategoryForm() {
    dispatch(toggleAddOrEditCategoryForm(true));
  }
  return (
    <button
      className="self-end bg-accent text-accent-foreground text-sm p-2 hover:scale-95 rounded-sm duration-400"
      onClick={openAddCategoryForm}
    >
      Add category
    </button>
  );
};

export default AddCategoryButton;
