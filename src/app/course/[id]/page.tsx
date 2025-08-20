import Content from "@/components/course/Content";
import SideBar from "@/components/course/SideBar";

type Props = {
  params: Promise<{ id: string }>;
};
const Course = async ({ params }: Props) => {
  const { id } = await params;
  if (!Number.isInteger(Number(id)) || Number(id) < 0)
    return <h1 className="text-center font-bold">The "{id}" id is invalid</h1>;
  return (
    <div className="grid max-sm:grid-cols-[1fr_2fr] grid-cols-[1fr_4fr] ">
      <SideBar id={id} />
      <Content />
    </div>
  );
};

export default Course;
