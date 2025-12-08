import Content from "@/components/home/Content";
import Header from "@/components/home/Header";
import prisma from "@/lib/db";
const Home = async () => {
  const categories = await prisma.category.findMany();

  return (
    <div className="flex flex-col gap-4 px-4">
      <Header />
      <Content />
    </div>
  );
};

export default Home;
