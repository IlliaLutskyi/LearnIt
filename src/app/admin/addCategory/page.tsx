import AddCategoryButton from "@/features/categories/components/AddCategoryButton";
import AddOrEditCategoryForm from "@/features/categories/components/AddCategoryForm";
import CategoryTable from "@/features/categories/components/CategoryTable";
import { getCategories } from "@/features/categories/services/get-categories";

const AddCategory = async () => {
  const categories = await getCategories();
  return (
    <main className="flex flex-col gap-4 px-6 py-4">
      <AddCategoryButton />
      <CategoryTable categories={categories} />
      <AddOrEditCategoryForm />
    </main>
  );
};

export default AddCategory;
