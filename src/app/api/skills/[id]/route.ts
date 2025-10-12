import deleteSkill from "@/services/delete-skill";

type Params = {
  params: Promise<{
    id: string;
  }>;
};
export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  return await deleteSkill(id);
}
