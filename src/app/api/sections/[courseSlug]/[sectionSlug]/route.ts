import getSection from "@/services/get-section";

type Props = {
  params: Promise<{
    sectionSlug: string;
    courseSlug: string;
  }>;
};
export async function GET(_: Request, { params }: Props) {
  const { sectionSlug, courseSlug } = await params;
  return await getSection(sectionSlug, courseSlug);
}
