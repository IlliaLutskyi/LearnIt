type Props = {
  params: Promise<{ id: string }>;
};
const Course = async ({ params }: Props) => {
  const { id } = await params;
  if (!Number.isInteger(Number(id)) || Number(id) < 0)
    return <h1 className="text-center font-bold">The "{id}" id is invalid</h1>;
  return <></>;
};

export default Course;
