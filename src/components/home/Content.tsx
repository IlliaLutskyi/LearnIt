import { DbCategory } from "@/types";
import Card from "./Card";

type Props = {
  categories: DbCategory[];
};
const Content = ({ categories }: Props) => {
  return (
    <main className="flex flex-col gap-4 pb-20">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">
          Ready to take your skills further? Explore advanced learning paths
        </h2>

        <div className="grid sm:grid-cols-3 md:grid-cols-4 grid-cols-1 items-start gap-2">
          {categories.map((category) => (
            <Card key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Content;
