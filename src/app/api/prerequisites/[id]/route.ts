import deletePreriquisite from "@/services/delete-preriquisite";

type Params = {
  params: Promise<{
    id: string;
  }>;
};
export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  return await deletePreriquisite(id);
}
