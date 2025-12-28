import Content from "@/components/home/Content";
import Header from "@/components/home/Header";
import { getCategories } from "@/features/categories/services/get-categories";
const Home = async () => {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-4 px-4">
      <Header />
      <Content categories={categories} />
    </div>
  );
};

export default Home;
