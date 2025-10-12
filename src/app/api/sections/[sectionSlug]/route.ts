import getSection from "@/services/get-section";

type Props = {
  params: Promise<{
    sectionSlug: string;
  }>;
};
export async function GET(_: Request, { params }: Props) {
  const { sectionSlug } = await params;
  return await getSection(sectionSlug);
}
